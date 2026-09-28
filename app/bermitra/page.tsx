import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowDown, Mail } from 'lucide-react';
import { contact } from '@/lib/content';
import { Container, Eyebrow, SectionHeading } from '@/components/ui/section';
import { InstagramIcon } from '@/components/ui/icons';
import { PartnerForm } from '@/components/forms/partner-form';
import { PartnerPhotoStrip } from '@/components/site/partner-photo-strip';
import { PartnerProcess } from '@/components/site/partner-process';
import { PartnerTypeCards } from '@/components/site/partner-type-cards';
import { T } from '@/lib/i18n';

export const metadata: Metadata = { title: 'Bermitra' };


export default function BermitraPage() {
  return (
    <>
      <section
        aria-labelledby="mitra-title"
        className="relative isolate overflow-hidden bg-[radial-gradient(90%_70%_at_50%_0%,#d9eee2_0%,#eef7f2_42%,#ffffff_78%)]"
      >
        {/* Cahaya hijau lembut di belakang judul. */}
        <div
          aria-hidden
          className="absolute left-1/2 top-24 -z-10 h-72 w-[min(760px,90vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(18,128,92,0.16),transparent)] blur-2xl"
        />
        <Container className="flex flex-col items-center gap-6 pt-14 text-center lg:pt-20">
          <h1
            id="mitra-title"
            className="rise max-w-4xl text-[40px] font-extrabold leading-[1.04] tracking-[-0.03em] text-forest sm:text-6xl lg:text-[68px]"
            style={{ '--d': '80ms' } as React.CSSProperties}
          >
            <T id="Bermitra untuk dampak" en="Partner for impact" />{' '}
            <span className="bg-gradient-to-r from-brand-bright via-brand to-forest bg-clip-text text-transparent">
              <T id="yang terukur & terlaporkan." en="that is measured & reported." />
            </span>
          </h1>
          <p
            className="rise max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
            style={{ '--d': '180ms' } as React.CSSProperties}
          >
            <T
              id="Portal kerja sama untuk korporasi (CSR), instansi medis, kampus, dan komunitas. Ajukan pendanaan program, kolaborasi kegiatan, atau studi banding."
              en="A partnership portal for companies (CSR), medical institutions, universities, and communities. Propose program funding, joint activities, or benchmarking visits."
            />
          </p>
          {/* Tombol duduk di atas pita foto yang memudar, seperti referensi. */}
          <div
            className="rise relative z-10 flex flex-col items-center gap-3 pt-2 sm:flex-row sm:gap-4"
            style={{ '--d': '280ms' } as React.CSSProperties}
          >
            <Link
              href="#form"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-brand-bright to-brand px-8 text-[17px] font-bold text-white shadow-[0_14px_30px_-10px_rgba(15,107,79,0.65),inset_0_1px_0_rgba(255,255,255,0.25)] transition hover:-translate-y-0.5 hover:from-brand hover:to-forest"
            >
              <T id="Ajukan kerja sama" en="Propose a partnership" />
              <ArrowDown className="size-[18px]" aria-hidden />
            </Link>
            <a
              href={`mailto:${contact.email}?subject=${encodeURIComponent('Permintaan Proposal Kemitraan')}`}
              className="inline-flex h-14 items-center justify-center rounded-full border border-mint-line bg-white/90 px-7 text-[17px] font-bold text-forest shadow-[0_10px_24px_-16px_rgba(11,59,46,0.5)] backdrop-blur transition hover:-translate-y-0.5 hover:border-brand"
            >
              <T id="Minta proposal kemitraan" en="Request a partnership proposal" />
            </a>
          </div>
        </Container>
        <PartnerPhotoStrip className="-mt-12 sm:-mt-16 lg:-mt-20" />
      </section>

      <section aria-labelledby="jenis-title" className="py-20 lg:py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            id="jenis-title"
            eyebrow={<T id="Jenis mitra" en="Partner types" />}
            title={<T id="Tiga jalur kolaborasi, satu standar pelaporan." en="Three ways to collaborate, one reporting standard." />}
            aside={
              <T
                id="Pilih jalur yang paling sesuai dengan institusimu. Tim kemitraan akan menyesuaikan bentuk kerja sama dengan kebutuhanmu."
                en="Choose the path that best fits your institution. Our partnerships team will tailor the collaboration to your needs."
              />
            }
          />
          <PartnerTypeCards />
        </Container>
      </section>

      <section aria-labelledby="alur-mitra-title" className="bg-surface py-20 lg:py-24">
        <Container>
          <PartnerProcess />
        </Container>
      </section>

      <section id="form" aria-labelledby="form-title" className="scroll-mt-20 py-20 lg:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-4">
            <Eyebrow>
              <T id="Formulir kemitraan" en="Partnership form" />
            </Eyebrow>
            <h2 id="form-title" className="text-3xl font-extrabold leading-tight tracking-tight text-forest sm:text-[40px]">
              <T id="Ceritakan rencana kolaborasimu." en="Tell us about your collaboration plan." />
            </h2>
            <p className="text-base leading-relaxed text-muted">
              <T
                id="Isian bertanda bintang wajib diisi. Data hanya dipakai untuk menindaklanjuti pengajuan kerja sama."
                en="Fields marked with an asterisk are required. Your data is only used to follow up on your partnership proposal."
              />
            </p>
            <div className="mt-2 flex flex-col gap-3.5 rounded-2xl bg-mint p-6">
              <span className="text-sm font-bold text-forest">
                <T id="Lebih suka lewat email?" en="Prefer email?" />
              </span>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 text-[15px] font-semibold text-brand">
                <Mail className="size-[18px]" aria-hidden />
                {contact.email}
              </a>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[15px] font-semibold text-brand"
              >
                <InstagramIcon className="size-[18px]" />@{contact.instagram}
              </a>
            </div>
          </div>
          <Suspense fallback={<div className="min-h-[900px] rounded-3xl border border-line bg-surface" />}>
            <PartnerForm />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
