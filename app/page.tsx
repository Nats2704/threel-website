'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Eye, Flag } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { DragMarquee } from '@/components/ui/drag-marquee';
import { lookLearnLead } from '@/lib/content';
import { useLang } from '@/lib/i18n';
import { ArrowLink, Container, PhotoPlaceholder, SectionHeading } from '@/components/ui/section';
import { HeroPlanet } from '@/components/site/hero-planet';
import { ConstellationField } from '@/components/ui/constellation-field';
import { ProblemBoard } from '@/components/site/problem-board';
import { ParallaxBackdrop } from '@/components/ui/parallax-backdrop';

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowWeMove />
      {/* Latar lembah hanya untuk Konteks Masalah dan Dampak; berhenti sebelum ajakan bergabung. */}
      <ParallaxBackdrop src="/images/latar-lembah.webp" direction="down" tone="vivid">
        <ProblemContext />
        <Impact />
      </ParallaxBackdrop>
      <JoinCta />
    </>
  );
}

function Hero() {
  const { t } = useLang();
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex flex-col overflow-hidden bg-[radial-gradient(110%_85%_at_78%_30%,#eef7f2_0%,#ffffff_60%)] lg:min-h-[calc(100dvh-5rem)]"
    >
      <Container className="pointer-events-none relative z-10 flex flex-1 flex-col pb-8 pt-14 lg:pb-10 lg:pt-20">
        <div className="pointer-events-auto my-auto flex flex-col gap-7 lg:max-w-[min(600px,44vw)]">
          <p className="rise font-mono text-xs font-semibold uppercase tracking-[0.28em] text-brand">
            #ShapingChangemakers
          </p>
          <h1
            id="hero-title"
            className="text-[38px] font-extrabold leading-[1.04] tracking-[-0.04em] text-forest sm:text-[52px] lg:text-[42px] xl:text-[50px]"
          >
            <span className="rise block" style={{ '--d': '80ms' } as React.CSSProperties}>
              {t('Memberdayakan pemuda, mengentaskan kemiskinan', 'Empowering youth, ending poverty')}
            </span>
            <span
              className="rise mt-1 block font-serif text-[44px] font-normal italic leading-[1.02] tracking-[-0.01em] text-brand-bright sm:text-[60px] lg:text-[50px] xl:text-[58px]"
              style={{ '--d': '200ms' } as React.CSSProperties}
            >
              {t('lewat pendidikan & teknologi.', 'through education & technology.')}
            </span>
          </h1>
          <p
            className="rise max-w-[460px] text-lg leading-relaxed text-muted sm:text-xl"
            style={{ '--d': '320ms' } as React.CSSProperties}
          >
            {t(
              'Menjembatani potensi pemuda dengan aksi nyata bagi masyarakat prasejahtera, dari ruang kelas dan posko donor darah hingga kebun kota.',
              'Connecting young people’s potential with real action for low-income communities, from classrooms and blood drives to city gardens.',
            )}
          </p>
          <div
            className="rise flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7"
            style={{ '--d': '440ms' } as React.CSSProperties}
          >
            <Link
              href="/program"
              className="inline-flex h-[54px] items-center justify-center gap-2.5 rounded-full bg-forest px-7 font-bold text-white shadow-[0_10px_30px_-12px_rgba(11,59,46,0.6)] transition hover:bg-brand"
            >
              {t('Kenali Program Kami', 'Explore Our Programs')}
              <ArrowRight className="size-[18px]" aria-hidden />
            </Link>
            <ArrowLink href="/bermitra" className="justify-center text-base">
              {t('Ajukan kemitraan', 'Become a partner')}
            </ArrowLink>
          </div>
        </div>

        <div
          className="rise pointer-events-auto mt-12 flex flex-col gap-3 lg:mt-10"
          style={{ '--d': '560ms' } as React.CSSProperties}
        >
          <span className="h-px w-8 bg-slate-400" aria-hidden />
          <p className="flex flex-col gap-1">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              {t('Fokus kami', 'Our focus')}
            </span>
            <span className="max-w-[300px] text-[15px] leading-relaxed text-muted">
              {t('Pendidikan, teknologi, kesehatan, dan lingkungan', 'Education, technology, health, and the environment')}
            </span>
          </p>
        </div>
      </Container>

      <div className="relative h-[400px] sm:h-[480px] lg:absolute lg:inset-0 lg:h-auto">
        <HeroPlanet />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent"
      />
    </section>
  );
}

const stageIcons = { Look: Eye, Learn: BookOpen, Lead: Flag } as const;
// Foto latar tiap tahap (sumber: public/images/siklus/CREDITS.md).
const stagePhotos = { Look: '/images/siklus/look.webp', Learn: '/images/siklus/learn.webp', Lead: '/images/siklus/lead.webp' } as const;

function StageCard({ stage, hidden }: { stage: (typeof lookLearnLead)[number]; hidden?: boolean }) {
  const { t } = useLang();
  const Icon = stageIcons[stage.title];
  return (
    <li
      aria-hidden={hidden || undefined}
      className="relative isolate flex min-h-[300px] w-[300px] shrink-0 flex-col overflow-hidden rounded-3xl border border-white/10 sm:min-h-[330px] sm:w-[480px]"
    >
      <Image src={stagePhotos[stage.title]} alt="" fill sizes="480px" className="-z-20 object-cover" draggable={false} />
      {/* Gradasi hijau: pekat di kiri atas tempat teks, sedikit lebih terang di kanan bawah agar foto tetap terasa. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(155deg,rgba(11,59,46,0.95)_0%,rgba(11,59,46,0.86)_48%,rgba(15,107,79,0.62)_100%)]"
      />
      <div className="flex flex-1 flex-col gap-6 p-7 sm:p-9">
        <div className="flex items-center gap-4">
          {/* Tempat logo tiap tahap; ganti ikon ini dengan <Image> saat logonya sudah siap. */}
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gold text-forest sm:size-16">
            <Icon className="size-7 sm:size-8" strokeWidth={2} aria-hidden />
          </span>
          <span className="text-4xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl">{stage.title}</span>
        </div>
        <p className="text-lg leading-snug text-white [text-shadow:0_1px_12px_rgba(11,59,46,0.6)] sm:text-[22px]">
          {t(stage.detail)}
        </p>
      </div>
    </li>
  );
}

function HowWeMove() {
  const { t } = useLang();
  // Dua paruh identik (masing-masing 2x tiga kartu) supaya geseran -50% berulang tanpa celah di layar lebar.
  const half = [...lookLearnLead, ...lookLearnLead];
  return (
    <section
      aria-labelledby="gerak-title"
      className="overflow-hidden bg-forest bg-[radial-gradient(120%_90%_at_15%_0%,#14573f_0%,#0b3b2e_55%,#082c22_100%)] py-20 lg:py-24"
    >
      <Container>
        <Reveal>
          <h2 id="gerak-title" className="text-3xl font-extrabold leading-tight tracking-tight sm:text-[44px]">
            <span className="block text-white">{t('Cara kami bergerak', 'How we move')}</span>
            <span className="block text-sage-muted">{t('Satu siklus, satu tujuan.', 'One cycle, one goal.')}</span>
          </h2>
        </Reveal>
      </Container>
      <Reveal delay={150} className="marquee-mask mt-12 lg:mt-14">
        <DragMarquee className="gap-6 px-3">
          {half.map((s, i) => (
            <StageCard key={`a${i}`} stage={s} hidden={i >= lookLearnLead.length} />
          ))}
          {half.map((s, i) => (
            <StageCard key={`b${i}`} stage={s} hidden />
          ))}
        </DragMarquee>
      </Reveal>
    </section>
  );
}

function ProblemContext() {
  const { t } = useLang();
  return (
    <section aria-labelledby="konteks-title" className="overflow-hidden py-20 lg:py-24">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            id="konteks-title"
            eyebrow={t('Konteks masalah', 'The problem')}
            title={t('Tiga masalah yang tidak bisa menunggu generasi berikutnya.', 'Three problems that cannot wait for the next generation.')}
            aside={t(
              'Setiap program ThreeL berangkat dari data. Ketuk salah satu catatan untuk membaca cerita di balik angkanya.',
              'Every ThreeL program starts from data. Tap a note to read the story behind the number.',
            )}
          />
        </Reveal>
        <ProblemBoard />
      </Container>
    </section>
  );
}

function Impact() {
  const { t } = useLang();
  return (
    <section aria-labelledby="dampak-title" className="py-20 lg:py-24">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            id="dampak-title"
            eyebrow={t('Dampak & dokumentasi', 'Impact & documentation')}
            title={t('Dampak yang bisa dihitung, cerita yang bisa dilihat.', 'Impact you can count, stories you can see.')}
            aside={t(
              'Potret kegiatan relawan ThreeL di lapangan, dari ruang kelas sampai kebun kota.',
              'Snapshots of ThreeL volunteers in the field, from classrooms to city gardens.',
            )}
          />
        </Reveal>
        <div className="flex flex-col gap-5">
          <Reveal className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-[22px] font-extrabold text-forest">{t('Dokumentasi lapangan', 'Field documentation')}</h3>
            <ArrowLink href="/kabar">{t('Lihat semua di Kabar', 'See everything in News')}</ArrowLink>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-[220px_220px]">
            <Reveal className="col-span-2 lg:row-span-2">
              <PhotoPlaceholder caption="ThreeL Mengajar" src="/images/dokumentasi/threel-mengajar.webp" size="lg" className="h-full min-h-60" />
            </Reveal>
            <Reveal delay={90}>
              <PhotoPlaceholder
                caption="ThreeL Blood"
                src="/images/dokumentasi/threel-blood.webp"
                className="h-full"
              />
            </Reveal>
            <Reveal delay={180}>
              <PhotoPlaceholder caption="ThreeL Berakar" src="/images/dokumentasi/threel-berakar.webp" className="h-full" />
            </Reveal>
            <Reveal delay={270}>
              <PhotoPlaceholder
                caption="ThreeL Berbagi"
                src="/images/dokumentasi/threel-berbagi.webp"
                credit="Foto: KITA PEDULI BANJARNEGARA, CC BY-SA 4.0"
                className="h-full"
              />
            </Reveal>
            <Reveal delay={360}>
              <PhotoPlaceholder caption="ThreeL Berkelana" src="/images/dokumentasi/threel-berkelana.webp" className="h-full" />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function JoinCta() {
  const { t } = useLang();
  return (
    <section
      aria-labelledby="gabung-title"
      className="relative isolate flex min-h-[600px] items-center overflow-hidden bg-[#F4F9F6] py-24 lg:min-h-[720px]"
    >
      <ConstellationField className="absolute inset-0 -z-10" />
      {/* Lingkaran terang di tengah agar judul tetap terbaca di atas kisi. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_50%_50%,rgba(244,249,246,0.92)_0%,rgba(244,249,246,0.55)_55%,transparent_100%)]"
      />
      <Container className="pointer-events-none flex flex-col items-center gap-6 text-center">
        <h2
          id="gabung-title"
          className="max-w-5xl text-[44px] font-extrabold leading-[0.98] tracking-[-0.04em] text-forest sm:text-7xl lg:text-[92px]"
        >
          {t('Satu langkah kecil,', 'One small step,')}{' '}
          <span className="bg-gradient-to-r from-brand-bright to-forest bg-clip-text text-transparent">
            {t('dampaknya menjalar.', 'impact that spreads.')}
          </span>
        </h2>
        <p className="max-w-xl font-mono text-[15px] leading-relaxed text-muted sm:text-base">
          {t(
            'Setiap relawan, mitra, dan program saling terhubung seperti titik-titik ini. Pilih caramu ikut bergerak bersama ThreeL.',
            'Every volunteer, partner, and program is connected like these dots. Choose how you want to move with ThreeL.',
          )}
        </p>
        <div className="pointer-events-auto mt-2 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/daftar"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-forest px-8 text-[17px] font-bold text-white shadow-[0_14px_30px_-12px_rgba(11,59,46,0.7)] transition hover:-translate-y-0.5 hover:bg-brand"
          >
            {t('Gabung sebagai anggota', 'Join as a member')}
            <ArrowRight className="size-[18px]" aria-hidden />
          </Link>
          <Link
            href="/bermitra"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-[1.5px] border-brand bg-white/80 px-8 text-[17px] font-bold text-brand backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
          >
            {t('Jadi mitra kami', 'Become a partner')}
          </Link>
        </div>
      </Container>
    </section>
  );
}
