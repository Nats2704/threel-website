import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowDown, Building2, Check, Cross, Mail, Users } from 'lucide-react';
import { contact, partnerSteps, partnerTypes } from '@/lib/content';
import { cn } from '@/lib/cn';
import { Container, Eyebrow, SectionHeading } from '@/components/ui/section';
import { InstagramIcon } from '@/components/ui/icons';
import { PartnerForm } from '@/components/forms/partner-form';

export const metadata: Metadata = { title: 'Bermitra' };

const typeIcons = { building: Building2, medical: Cross, users: Users };
const typeTones = { building: 'bg-brand text-white', medical: 'bg-forest text-white', users: 'bg-gold-deep text-forest' };

const benefits = [
  'Laporan dampak dan keuangan program yang transparan',
  'Jaringan relawan pemuda lintas kampus',
  'Sembilan program siap kolaborasi di tiga pilar',
  'Publikasi dan dokumentasi kegiatan bersama',
];

export default function BermitraPage() {
  return (
    <>
      <section className="bg-forest py-16 text-white lg:py-[88px]">
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-20">
          <div className="flex flex-col gap-5">
            <nav aria-label="Breadcrumb" className="font-mono text-xs font-semibold tracking-[0.1em] text-sage-muted">
              <Link href="/" className="hover:text-white">
                BERANDA
              </Link>{' '}
              / BERMITRA
            </nav>
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-[54px]">
              Bermitra untuk dampak yang terukur dan terlaporkan.
            </h1>
            <p className="text-lg leading-relaxed text-sage">
              Portal kerja sama untuk korporasi (CSR), instansi medis, kampus, dan komunitas. Ajukan pendanaan program,
              kolaborasi kegiatan, atau studi banding.
            </p>
            <div className="flex flex-col gap-4 pt-1.5 sm:flex-row">
              <Link
                href="#form"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-gold px-6 font-bold text-forest hover:bg-gold-soft"
              >
                Ajukan kerja sama
                <ArrowDown className="size-[18px]" aria-hidden />
              </Link>
              <a
                href={`mailto:${contact.email}?subject=${encodeURIComponent('Permintaan Proposal Kemitraan')}`}
                className="inline-flex h-[52px] items-center justify-center rounded-full border-2 border-white/50 px-6 font-bold text-white hover:border-white"
              >
                Minta proposal kemitraan
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-3xl border border-white/15 bg-white/6 p-8">
            <Eyebrow tone="gold">Yang mitra dapatkan</Eyebrow>
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-3.5">
                <Check className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={2.6} aria-hidden />
                <span className="text-base leading-relaxed">{b}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="jenis-title" className="py-20 lg:py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            id="jenis-title"
            eyebrow="Jenis mitra"
            title="Tiga jalur kolaborasi, satu standar pelaporan."
            aside="Pilih jalur yang paling sesuai dengan institusimu. Tim kemitraan akan menyesuaikan bentuk kerja sama dengan kebutuhanmu."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {partnerTypes.map((t) => {
              const Icon = typeIcons[t.icon];
              return (
                <article key={t.id} className="flex flex-col gap-4 rounded-[20px] border border-line p-8">
                  <span className={cn('flex size-[52px] items-center justify-center rounded-[14px]', typeTones[t.icon])}>
                    <Icon className="size-[26px]" aria-hidden />
                  </span>
                  <h3 className="text-[22px] font-extrabold text-forest">{t.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{t.desc}</p>
                  <div className="flex flex-col gap-2.5 border-t border-[#EDF2EF] pt-4">
                    <span className="font-mono text-[11px] font-semibold tracking-[0.1em] text-brand">
                      BENTUK KERJA SAMA
                    </span>
                    {t.forms.map((f) => (
                      <span key={f} className="text-[15px]">
                        {f}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/bermitra?jenis=${t.id}#form`}
                    className="mt-auto inline-flex w-fit items-center gap-2 pt-2 text-sm font-bold text-brand hover:text-forest"
                  >
                    Ajukan sebagai {t.title}
                  </Link>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section aria-labelledby="alur-mitra-title" className="bg-surface py-20 lg:py-24">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col gap-3.5">
            <Eyebrow>Alur kemitraan</Eyebrow>
            <h2 id="alur-mitra-title" className="text-3xl font-extrabold tracking-tight text-forest sm:text-[40px]">
              Empat langkah dari pengajuan ke laporan.
            </h2>
          </div>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partnerSteps.map((s, i) => (
              <li
                key={s.no}
                className={cn('flex flex-col gap-3 border-t-[3px] pt-5', i === 3 ? 'border-gold-deep' : 'border-brand')}
              >
                <span className={cn('font-mono text-[13px] font-semibold', i === 3 ? 'text-gold-ink' : 'text-brand')}>
                  {s.no}
                </span>
                <h3 className="text-[19px] font-extrabold text-forest">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{s.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="form" aria-labelledby="form-title" className="scroll-mt-20 py-20 lg:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-4">
            <Eyebrow>Formulir kemitraan</Eyebrow>
            <h2 id="form-title" className="text-3xl font-extrabold leading-tight tracking-tight text-forest sm:text-[40px]">
              Ceritakan rencana kolaborasimu.
            </h2>
            <p className="text-base leading-relaxed text-muted">
              Isian bertanda bintang wajib diisi. Data hanya dipakai untuk menindaklanjuti pengajuan kerja sama.
            </p>
            <div className="mt-2 flex flex-col gap-3.5 rounded-2xl bg-mint p-6">
              <span className="text-sm font-bold text-forest">Lebih suka lewat email?</span>
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
