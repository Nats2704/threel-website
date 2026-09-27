import Link from 'next/link';
import { ArrowDown, ArrowRight, BookOpen, Eye, Flag } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { impactMetrics, lookLearnLead, pillars, stats, type Stat } from '@/lib/content';
import { cn } from '@/lib/cn';
import { ArrowLink, Container, Eyebrow, PhotoPlaceholder, SectionHeading } from '@/components/ui/section';
import { PillarIcon } from '@/components/ui/pillar-icon';
import { HeroPlanet } from '@/components/site/hero-planet';

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowWeMove />
      <ProblemContext />
      <Pillars />
      <MengajarSpotlight />
      <Impact />
      <JoinCta />
    </>
  );
}

function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex flex-col overflow-hidden bg-[radial-gradient(110%_85%_at_78%_30%,#eef7f2_0%,#ffffff_60%)] lg:min-h-[calc(100dvh-5rem)]"
    >
      <Container className="pointer-events-none relative z-10 flex flex-1 flex-col pb-8 pt-14 lg:pb-10 lg:pt-20">
        <div className="pointer-events-auto my-auto flex flex-col gap-7 lg:max-w-[min(600px,44vw)]">
          <p className="rise font-mono text-xs font-semibold uppercase tracking-[0.28em] text-brand">
            #ShapingChangemakers · Look, Learn, Lead
          </p>
          <h1
            id="hero-title"
            className="text-[38px] font-extrabold leading-[1.04] tracking-[-0.04em] text-forest sm:text-[52px] lg:text-[42px] xl:text-[50px]"
          >
            <span className="rise block" style={{ '--d': '80ms' } as React.CSSProperties}>
              Memberdayakan pemuda, mengentaskan kemiskinan
            </span>
            <span
              className="rise mt-1 block font-serif text-[44px] font-normal italic leading-[1.02] tracking-[-0.01em] text-brand-bright sm:text-[60px] lg:text-[50px] xl:text-[58px]"
              style={{ '--d': '200ms' } as React.CSSProperties}
            >
              lewat pendidikan &amp; teknologi.
            </span>
          </h1>
          <p
            className="rise max-w-[460px] text-lg leading-relaxed text-muted sm:text-xl"
            style={{ '--d': '320ms' } as React.CSSProperties}
          >
            Menjembatani potensi pemuda dengan aksi nyata bagi masyarakat prasejahtera, dari ruang kelas dan posko donor
            darah hingga kebun kota.
          </p>
          <div
            className="rise flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7"
            style={{ '--d': '440ms' } as React.CSSProperties}
          >
            <Link
              href="#pilar"
              className="inline-flex h-[54px] items-center justify-center gap-2.5 rounded-full bg-forest px-7 font-bold text-white shadow-[0_10px_30px_-12px_rgba(11,59,46,0.6)] transition hover:bg-brand"
            >
              Kenali Program Kami
              <ArrowDown className="size-[18px]" aria-hidden />
            </Link>
            <ArrowLink href="/bermitra" className="justify-center text-base">
              Ajukan kemitraan
            </ArrowLink>
          </div>
        </div>

        <div
          className="rise pointer-events-auto mt-12 flex flex-col gap-3 lg:mt-10"
          style={{ '--d': '560ms' } as React.CSSProperties}
        >
          <span className="h-px w-8 bg-slate-400" aria-hidden />
          <p className="font-mono text-[11px] font-semibold uppercase leading-[1.9] tracking-[0.22em] text-slate-500">
            Fokus: Pendidikan · Teknologi
            <br />
            Kesehatan · Lingkungan
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

function StageCard({ stage, hidden }: { stage: (typeof lookLearnLead)[number]; hidden?: boolean }) {
  const Icon = stageIcons[stage.title as keyof typeof stageIcons];
  return (
    <li
      aria-hidden={hidden || undefined}
      className="flex w-[300px] shrink-0 flex-col rounded-3xl border border-white/10 bg-white/[0.035] sm:w-[480px]"
    >
      <div className="flex flex-1 flex-col gap-6 p-7 sm:p-9">
        <div className="flex items-center gap-4">
          {/* Tempat logo tiap tahap; ganti ikon ini dengan <Image> saat logonya sudah siap. */}
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gold text-forest sm:size-16">
            <Icon className="size-7 sm:size-8" strokeWidth={2} aria-hidden />
          </span>
          <span className="text-4xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl">{stage.title}</span>
        </div>
        <p className="text-lg leading-snug text-white/90 sm:text-[22px]">{stage.detail}</p>
      </div>
      <div className="flex items-stretch border-t border-white/10 text-sm">
        <div className="flex flex-1 flex-col gap-0.5 px-7 py-4 sm:px-9">
          <span className="font-mono text-xs font-semibold tracking-[0.14em] text-gold">TAHAP {stage.no}</span>
          <span className="text-sage-muted">dari 3 tahap</span>
        </div>
        <span className="flex items-center border-l border-white/10 px-6 text-right text-sage sm:px-7">{stage.tag}</span>
      </div>
    </li>
  );
}

function HowWeMove() {
  // Dua paruh identik (masing-masing 2x tiga kartu) supaya geseran -50% berulang tanpa celah di layar lebar.
  const half = [...lookLearnLead, ...lookLearnLead];
  return (
    <section aria-labelledby="gerak-title" className="overflow-hidden bg-forest py-20 lg:py-24">
      <Container>
        <Reveal>
          <h2 id="gerak-title" className="text-3xl font-extrabold leading-tight tracking-tight sm:text-[44px]">
            <span className="block text-white">Cara kami bergerak</span>
            <span className="block text-sage-muted">Satu siklus, satu tujuan.</span>
          </h2>
        </Reveal>
      </Container>
      <Reveal delay={150} className="marquee-mask mt-12 lg:mt-14">
        <ul className="marquee-track flex w-max gap-6 px-3">
          {half.map((s, i) => (
            <StageCard key={`a${i}`} stage={s} hidden={i >= lookLearnLead.length} />
          ))}
          {half.map((s, i) => (
            <StageCard key={`b${i}`} stage={s} hidden />
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

function StatBar({ bar }: { bar: Stat['bar'] }) {
  if (bar.kind === 'segments') {
    return (
      <div role="img" aria-label={`${bar.filled} dari ${bar.total}`} className="grow-x flex h-2 gap-1.5">
        {Array.from({ length: bar.total }, (_, i) => (
          <div key={i} className={cn('flex-1 rounded-full', i < bar.filled ? 'bg-brand' : 'bg-mint-deep')} />
        ))}
      </div>
    );
  }
  return (
    <div role="img" aria-label={`${bar.pct} persen`} className="flex h-2 rounded-full bg-mint-deep">
      <div
        className={cn('grow-x rounded-full', bar.color === 'brand' ? 'bg-brand' : 'bg-gold-deep')}
        style={{ width: `${bar.pct}%` }}
      />
    </div>
  );
}

function ProblemContext() {
  return (
    <section aria-labelledby="konteks-title" className="bg-surface py-20 lg:py-24">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            id="konteks-title"
            eyebrow="Konteks masalah"
            title="Tiga masalah yang tidak bisa menunggu generasi berikutnya."
            aside="Setiap program ThreeL berangkat dari data. Angka di bawah ini menjadi titik awal kami menentukan di mana pemuda paling dibutuhkan."
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal
              as="article"
              key={s.label}
              delay={i * 120}
              className="flex flex-col gap-4 rounded-[20px] border border-line bg-white p-8 transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(11,59,46,0.35)]"
            >
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-muted">{s.label}</span>
              <span className="text-[56px] font-extrabold leading-none tracking-[-0.04em] text-forest sm:text-[64px]">
                {s.value}
              </span>
              <p className="text-lg font-bold leading-snug">{s.statement}</p>
              <StatBar bar={s.bar} />
              <p className="text-[15px] leading-relaxed text-muted">{s.body}</p>
              <div className="mt-auto flex flex-col gap-3 border-t border-[#E2E8E4] pt-4">
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-muted">{s.extraLabel}</span>
                  <span className="font-bold text-gold-ink">[isi data &amp; sumber]</span>
                </div>
                <ArrowLink href={s.href} className="text-sm">
                  Respons: {s.response}
                </ArrowLink>
                <span className="font-mono text-xs text-slate-500">{s.source}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Pillars() {
  return (
    <section id="pilar" aria-labelledby="pilar-title" className="scroll-mt-20 py-20 lg:py-24">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            id="pilar-title"
            eyebrow="Pilar program kerja"
            title="Sembilan program, tiga pilar, satu arah gerak."
            aside={
              <div className="flex flex-col gap-3.5">
                <p>Program dikelompokkan agar mitra dan relawan mudah menemukan tempat untuk berkontribusi.</p>
                <ArrowLink href="/program">Lihat detail program</ArrowLink>
              </div>
            }
          />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal
              as="article"
              key={p.id}
              delay={i * 120}
              className="flex flex-col overflow-hidden rounded-[20px] border border-line bg-white transition-[box-shadow,translate] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(11,59,46,0.35)]"
            >
              <div className="flex flex-col gap-4 bg-mint px-7 pb-6 pt-7">
                <div className="flex items-center justify-between">
                  <PillarIcon icon={p.icon} />
                  <Eyebrow>
                    Pilar {p.no} · {p.programs.length} program
                  </Eyebrow>
                </div>
                <h3 className="text-2xl font-extrabold leading-tight text-forest">{p.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{p.desc}</p>
              </div>
              <ul className="flex flex-1 flex-col px-7 pb-5 pt-2">
                {p.programs.map((prog) => (
                  <li key={prog.name} className="flex flex-col gap-1 border-b border-[#EDF2EF] py-4 last:border-0">
                    <span className="text-base font-bold">{prog.name}</span>
                    <span className="text-sm leading-relaxed text-muted">{prog.short}</span>
                  </li>
                ))}
              </ul>
              <div className="px-7 pb-7">
                <ArrowLink href={`/program#${p.id}`} className="text-sm">
                  Detail pilar {p.no}
                </ArrowLink>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FlowArrow({ vertical = false }: { vertical?: boolean }) {
  return vertical ? (
    <ArrowDown className="size-6 text-gold" aria-hidden />
  ) : (
    <svg className="h-5 w-full" viewBox="0 0 120 20" preserveAspectRatio="none" aria-hidden="true">
      <path d="M2 10h110" stroke="#F2C94C" strokeWidth="2" strokeDasharray="4 4" fill="none" />
      <path d="M108 4l8 6-8 6" stroke="#F2C94C" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MengajarSpotlight() {
  const paid = [
    { title: 'Kelas Persiapan PTN', sub: 'UTBK dan seleksi mandiri' },
    { title: 'Materi TPB ITB', sub: 'Tahap Persiapan Bersama' },
  ];
  const figures = [
    { value: '[00]', label: 'Kelas berbayar per semester' },
    { value: '[00]', label: 'Kursi bimbel gratis tersedia' },
    { value: '[1 : N]', label: 'Rasio kursi berbayar : gratis' },
  ];
  return (
    <section aria-labelledby="mengajar-title" className="bg-forest py-20 text-white lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[440px_minmax(0,1fr)] lg:gap-16">
        <Reveal className="flex flex-col gap-5">
          <Eyebrow tone="gold">Sorotan inisiatif mandiri</Eyebrow>
          <h2 id="mengajar-title" className="text-3xl font-extrabold leading-tight tracking-tight sm:text-[40px]">
            ThreeL Mengajar: kelas berbayar yang membiayai kelas gratis.
          </h2>
          <p className="text-base leading-[1.7] text-sage">
            Kelas persiapan PTN dan pendampingan materi TPB ITB dibuka berbayar. Pendapatannya langsung membiayai
            bimbingan belajar gratis bagi siswa prasejahtera, sehingga program tidak bergantung penuh pada donasi.
          </p>
          <Link
            href="/program#pendidikan"
            className="inline-flex h-[50px] w-fit items-center gap-2 rounded-full bg-gold px-6 text-[15px] font-bold text-forest transition hover:bg-gold-soft"
          >
            Pelajari model subsidi silang
            <ArrowRight className="size-[18px]" aria-hidden />
          </Link>
        </Reveal>

        <Reveal delay={180} className="flex flex-col gap-5">
          <div
            role="img"
            aria-label="Diagram: kelas persiapan PTN dan materi TPB ITB berbayar menghasilkan dana subsidi untuk bimbel gratis siswa prasejahtera"
            className="flex flex-col items-stretch gap-4 rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-8 lg:flex-row lg:items-center lg:gap-0"
          >
            <div className="grid gap-3.5 sm:grid-cols-2 lg:w-[236px] lg:shrink-0 lg:grid-cols-1">
              {paid.map((c) => (
                <div key={c.title} className="flex flex-col gap-1.5 rounded-2xl bg-white p-5 text-ink">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.1em] text-gold-ink">BERBAYAR</span>
                  <span className="text-[17px] font-extrabold">{c.title}</span>
                  <span className="text-[13px] text-muted">{c.sub}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center gap-2.5 lg:flex-1 lg:px-3">
              <div className="w-full lg:hidden flex justify-center">
                <FlowArrow vertical />
              </div>
              <div className="hidden w-full lg:block">
                <FlowArrow />
              </div>
              <span className="rounded-full border-[1.5px] border-dashed border-gold px-4 py-2.5 text-center font-mono text-xs font-semibold tracking-[0.08em] text-gold">
                DANA SUBSIDI SILANG
              </span>
              <div className="w-full lg:hidden flex justify-center">
                <FlowArrow vertical />
              </div>
              <div className="hidden w-full lg:block">
                <FlowArrow />
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl bg-gold p-6 text-forest lg:w-[220px] lg:shrink-0">
              <span className="font-mono text-[11px] font-semibold tracking-[0.1em]">GRATIS</span>
              <span className="text-[22px] font-extrabold leading-tight">Bimbel gratis</span>
              <span className="text-sm leading-relaxed">untuk siswa dari keluarga prasejahtera</span>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {figures.map((f) => (
              <div key={f.label} className="flex flex-col gap-1.5 rounded-2xl border border-white/15 px-6 py-5">
                <span className="text-[30px] font-extrabold text-gold">{f.value}</span>
                <span className="text-sm text-sage">{f.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Impact() {
  return (
    <section aria-labelledby="dampak-title" className="py-20 lg:py-24">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            id="dampak-title"
            eyebrow="Dampak & dokumentasi"
            title="Dampak yang bisa dihitung, cerita yang bisa dilihat."
            aside="Angka dampak diperbarui setiap akhir semester dan dapat diverifikasi melalui laporan kegiatan untuk mitra."
          />
        </Reveal>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {impactMetrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 100}>
              <div
                className={cn(
                  'flex flex-col gap-2 border-t-[3px] pt-5',
                  m.accent ? 'border-gold-deep' : 'border-brand',
                )}
              >
                <span className="text-3xl font-extrabold tracking-tight text-forest sm:text-5xl">{m.value}</span>
                <span className="text-[15px] font-semibold">{m.label}</span>
                <span className="font-mono text-xs text-slate-500">{m.note}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="flex flex-col gap-5 pt-2">
          <Reveal className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-[22px] font-extrabold text-forest">Dokumentasi lapangan</h3>
            <ArrowLink href="/kabar">Lihat semua di Kabar</ArrowLink>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-[220px_220px]">
            <Reveal className="col-span-2 lg:row-span-2">
              <PhotoPlaceholder caption="ThreeL Mengajar · [lokasi, tanggal]" size="lg" className="h-full min-h-60" />
            </Reveal>
            <Reveal delay={90}>
              <PhotoPlaceholder caption="ThreeL Blood · [lokasi]" className="h-full" />
            </Reveal>
            <Reveal delay={180}>
              <PhotoPlaceholder caption="ThreeL Berakar · [lokasi]" tone="gold" className="h-full" />
            </Reveal>
            <Reveal delay={270}>
              <PhotoPlaceholder caption="ThreeL Berbagi · [lokasi]" tone="gold" className="h-full" />
            </Reveal>
            <Reveal delay={360}>
              <PhotoPlaceholder caption="ThreeL Berkelana · [lokasi]" className="h-full" />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function JoinCta() {
  return (
    <section aria-label="Ajakan bergabung dan bermitra" className="bg-mint py-16 lg:py-20">
      <Container className="grid gap-6 md:grid-cols-2">
        <Reveal className="flex flex-col gap-3.5 rounded-3xl bg-forest p-8 text-white sm:p-10">
          <h2 className="text-[28px] font-extrabold tracking-tight sm:text-[30px]">Jadi bagian dari ThreeL</h2>
          <p className="text-base leading-relaxed text-sage">
            Pilih peranmu: Board of Director, Associate, atau relawan ThreeLearnian.
          </p>
          <Link
            href="/daftar"
            className="mt-2.5 inline-flex h-[50px] w-fit items-center gap-2 rounded-full bg-gold px-6 text-[15px] font-bold text-forest transition hover:bg-gold-soft"
          >
            Daftar sekarang
            <ArrowRight className="size-[18px]" aria-hidden />
          </Link>
        </Reveal>
        <Reveal delay={140} className="flex flex-col gap-3.5 rounded-3xl border border-mint-line bg-white p-8 sm:p-10">
          <h2 className="text-[28px] font-extrabold tracking-tight text-forest sm:text-[30px]">Bermitra dengan ThreeL</h2>
          <p className="text-base leading-relaxed text-muted">
            Untuk korporasi (CSR), instansi medis, kampus, dan komunitas yang ingin berdampak bersama.
          </p>
          <Link
            href="/bermitra"
            className="mt-2.5 inline-flex h-[50px] w-fit items-center gap-2 rounded-full border-2 border-brand px-6 text-[15px] font-bold text-brand transition hover:bg-mint"
          >
            Ajukan kerja sama
            <ArrowRight className="size-[18px]" aria-hidden />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
