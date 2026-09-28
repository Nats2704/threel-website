import Link from 'next/link';
import { Mail } from 'lucide-react';
import { contact } from '@/lib/content';
import { T, type Bi } from '@/lib/i18n';
import { InstagramIcon } from '@/components/ui/icons';
import { LogoMark } from './logo';
import { NewsletterForm } from './footer-controls';

const quickLinks: { href: string; label: Bi }[] = [
  { href: '/', label: { id: 'Beranda', en: 'Home' } },
  { href: '/tentang', label: { id: 'Tentang Kami', en: 'About Us' } },
  { href: '/program', label: { id: 'Program', en: 'Programs' } },
  { href: '/kabar', label: { id: 'Kabar & Dokumentasi', en: 'News & Stories' } },
  { href: '/bermitra', label: { id: 'Bermitra', en: 'Partner' } },
];

const bottomLinks: { href: string; label: Bi }[] = [
  { href: '/faq', label: { id: 'FAQ', en: 'FAQ' } },
  { href: '/daftar', label: { id: 'Daftar Anggota', en: 'Join Us' } },
  { href: '/bermitra', label: { id: 'Kerja Sama', en: 'Partnerships' } },
];

const heading = 'text-lg font-semibold tracking-tight text-forest lg:text-2xl';
const list = 'flex flex-col gap-3 lg:gap-4 lg:pt-2';
const item = 'w-fit text-base text-ink transition-colors hover:text-brand lg:text-lg';
const social =
  'flex size-12 items-center justify-center rounded-full border border-mint-line bg-white text-forest transition hover:border-brand hover:text-brand lg:size-14';

export function Footer() {
  return (
    <footer className="border-t border-mint-line bg-mint">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* HP dan tablet: logo di tengah, lalu Tautan Cepat + Hubungi Kami berdampingan, lalu Ikuti Kami di tengah. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 pb-10 pt-12 lg:grid-cols-[1.1fr_0.8fr_1.2fr_0.9fr] lg:gap-8 lg:pb-16 lg:pt-20">
          <div className="relative col-span-2 flex flex-col items-center gap-5 text-center lg:col-span-1 lg:items-start lg:gap-6 lg:text-left">
            {/* Semburat terang di belakang logo. */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-16 left-1/2 size-72 -translate-x-1/2 lg:-left-16 lg:translate-x-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9),transparent_62%)] blur-2xl lg:size-80"
            />
            <Link href="/" aria-label="ThreeL Community" className="relative flex w-fit items-center gap-3 text-left text-forest lg:gap-4">
              <span className="size-[88px] shrink-0 lg:-ml-3 lg:size-[112px] [&>img]:size-full">
                <LogoMark size={112} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[28px] font-extrabold tracking-tight lg:text-[36px]">ThreeL</span>
                <span className="mt-1.5 text-xs font-bold tracking-[0.22em] text-muted lg:text-[13px]">COMMUNITY</span>
              </span>
            </Link>
            <p className="relative max-w-[320px] text-base leading-relaxed text-muted lg:text-xl">
              <T
                id="Dapatkan kabar kegiatan dan rekrutmen terbaru ThreeL langsung di email kamu."
                en="Get the latest ThreeL activities and recruitment news straight to your inbox."
              />
            </p>
            <div className="relative w-full max-w-[306px] text-left lg:pt-2">
              <NewsletterForm />
            </div>
          </div>

          <nav aria-labelledby="footer-links" className="flex flex-col gap-4 lg:gap-5 lg:pl-2">
            <h2 id="footer-links" className={heading}>
              <T id="Tautan Cepat" en="Quick Links" />
            </h2>
            <div className={list}>
              {quickLinks.map((l) => (
                <Link key={l.href} href={l.href} className={item}>
                  <T v={l.label} />
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex flex-col gap-4 lg:gap-5">
            <h2 className={heading}>
              <T id="Hubungi Kami" en="Contact Us" />
            </h2>
            <div className={list}>
              <p className="text-base text-ink lg:text-lg">ThreeL Community, Indonesia</p>
              <a href={`mailto:${contact.email}`} className={item}>
                <span className="max-lg:hidden">Email: </span>
                {/* Di HP kolomnya sempit: alamat boleh patah sebelum tanda @. */}
                {contact.email.split('@')[0]}
                <wbr />@{contact.email.split('@')[1]}
              </a>
              <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className={item}>
                <span className="max-lg:hidden">Instagram: </span>@{contact.instagram}
              </a>
            </div>
          </div>

          <div className="col-span-2 flex flex-col items-center gap-4 max-lg:order-last lg:col-span-1 lg:items-start lg:gap-5">
            <h2 className={heading}>
              <T id="Ikuti Kami" en="Follow Us" />
            </h2>
            <div className="flex gap-3 lg:gap-5 lg:pt-2">
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram ThreeL"
                className={social}
              >
                <InstagramIcon className="size-5 lg:size-[22px]" />
              </a>
              <a href={`mailto:${contact.email}`} aria-label="Email ThreeL" className={social}>
                <Mail className="size-5 lg:size-[22px]" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 border-t border-mint-line py-6 text-center text-sm md:flex-row md:text-left md:items-center md:justify-between lg:py-10 lg:text-lg">
          <p className="text-muted">
            © 2026 ThreeL Community. <T id="Hak cipta dilindungi." en="All rights reserved." />
          </p>
          <nav aria-label="Tautan tambahan" className="flex flex-wrap justify-center gap-x-5 gap-y-2 lg:gap-x-6">
            {bottomLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-ink transition-colors hover:text-brand">
                <T v={l.label} />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
