import Link from 'next/link';
import { Mail } from 'lucide-react';
import { contact, pillars } from '@/lib/content';
import { InstagramIcon } from '@/components/ui/icons';
import { LogoMark } from './logo';

const explore = [
  { href: '/tentang', label: 'Tentang Kami' },
  { href: '/program', label: 'Program' },
  { href: '/bermitra', label: 'Bermitra' },
  { href: '/kabar', label: 'Kabar & Dokumentasi' },
  { href: '/daftar', label: 'Daftar' },
];

const heading = 'font-mono text-xs font-semibold tracking-[0.1em] text-gold';
const link = 'text-sm text-[#E6F0EB] transition hover:text-gold';

export function Footer() {
  return (
    <footer className="bg-forest text-white">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 pb-8 pt-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr] lg:px-8">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex w-fit items-center gap-3" aria-label="ThreeL Community, beranda">
            <LogoMark size={44} />
            <span className="text-lg font-extrabold tracking-tight">ThreeL Community</span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-sage">
            Organisasi pemuda nirlaba yang bergerak di pengentasan kemiskinan, pendidikan, teknologi, dan pemberdayaan
            sosial.
          </p>
          <span className="font-mono text-[13px] font-semibold text-gold">#ShapingChangemakers</span>
        </div>

        <nav aria-label="Tautan footer" className="flex flex-col gap-3">
          <span className={heading}>JELAJAHI</span>
          {explore.map((l) => (
            <Link key={l.href} href={l.href} className={link}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <span className={heading}>PILAR</span>
          {pillars.map((p) => (
            <Link key={p.id} href={`/program#${p.id}`} className={link}>
              {p.title}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className={heading}>KONTAK RESMI</span>
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 text-sm hover:text-gold">
            <Mail className="size-[18px]" aria-hidden />
            {contact.email}
          </a>
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-sm hover:text-gold"
          >
            <InstagramIcon className="size-[18px]" />@{contact.instagram}
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] border-t border-white/15 px-4 py-6 text-center text-[13px] text-sage-muted sm:px-6 lg:px-8">
        © 2026 ThreeL Community (Threel.Comm). Hak cipta dilindungi.
      </div>
    </footer>
  );
}
