import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { impactMetrics, lookLearnLead, pillars, stats, type Stat } from '@/lib/content';
import { cn } from '@/lib/cn';
import { ArrowLink, Container, Eyebrow, PhotoPlaceholder, SectionHeading } from '@/components/ui/section';
import { PillarIcon } from '@/components/ui/pillar-icon';

export default function HomePage() {
  return (
    <>
      <Hero />
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
    <section aria-labelledby="hero-title" className="py-14 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-20">
        <div className="flex flex-col gap-7">
          <div className="flex w-fit flex-wrap items-center gap-x-2.5 gap-y-1 rounded-2xl border border-mint-line bg-mint px-4 py-2 font-mono text-[13px] font-semibold text-forest sm:rounded-full">
            <span className="size-2 rounded-full bg-gold-deep" aria-hidden />
            <span>#GenerateGreatProblemSolver</span>
            <span className="hidden text-slate-400 sm:inline">|</span>
            <span>Look, Learn, Lead</span>
          </div>
          <h1
            id="hero-title"
            className="text-4xl font-extrabold leading-[1.06] tracking-[-0.035em] text-forest sm:text-5xl lg:text-[58px]"
          >
            Memberdayakan pemuda untuk{' '}
            <span className="[box-decoration-break:clone] shadow-[inset_0_-14px_0_var(--color-gold-soft)]">
              mengentaskan kemiskinan
            </span>{' '}
            lewat pendidikan dan teknologi.
          </h1>
          <p className="text-lg leading-relaxed text-muted sm:text-xl">
            Menjembatani potensi pemuda dengan aksi nyata bagi masyarakat prasejahtera, dari ruang kelas dan posko donor
            darah hingga kebun kota.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
            <Link
              href="#pilar"
              className="inline-flex h-[54px] items-center justify-center gap-2.5 rounded-full bg-forest px-7 font-bold text-white transition hover:bg-brand"
            >
              Kenali Program Kami
              <ArrowDown className="size-[18px]" aria-hidden />
            </Link>
            <ArrowLink href="/bermitra" className="justify-center text-base">
              Ajukan kemitraan
            </ArrowLink>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-muted">
            <span className="font-mono text-xs tracking-[0.08em] text-slate-500">FOKUS</span>
            {['Pendidikan', 'Teknologi', 'Kesehatan', 'Lingkungan'].map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-3xl bg-forest p-8 text-white">
          <div className="flex items-center justify-between pb-3">
            <Eyebrow tone="gold">Cara kami bergerak</Eyebrow>
            <span className="font-mono text-xs text-sage-muted">3 TAHAP</span>
          </div>
          <ol className="flex flex-col">
            {lookLearnLead.map((s) => (
              <li key={s.no} className="flex gap-4 border-t border-white/12 py-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/8 font-mono text-[15px] font-semibold text-gold">
                  {s.no}
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[22px] font-extrabold">{s.title}</span>
                  <span className="text-[15px] leading-relaxed text-sage">{s.desc}</span>
                </div>
              </li>
            ))}
          </ol>
          <p className="rounded-2xl bg-gold px-4 py-4 text-sm font-semibold leading-relaxed text-forest">
            Satu siklus, satu tujuan: pemuda yang tumbuh menjadi <strong>great problem solver</strong>.
          </p>
        </div>
      </Container>
    </section>
  );
}

function StatBar({ bar }: { bar: Stat['bar'] }) {
  if (bar.kind === 'segments') {
    return (
      <div role="img" aria-label={`${bar.filled} dari ${bar.total}`} className="flex h-2 gap-1.5">
        {Array.from({ length: bar.total }, (_, i) => (
          <div key={i} className={cn('flex-1 rounded-full', i < bar.filled ? 'bg-brand' : 'bg-mint-deep')} />
        ))}
      </div>
    );
  }
  return (
    <div role="img" aria-label={`${bar.pct} persen`} className="flex h-2 rounded-full bg-mint-deep">
      <div
        className={cn('rounded-full', bar.color === 'brand' ? 'bg-brand' : 'bg-gold-deep')}
        style={{ width: `${bar.pct}%` }}
      />
    </div>
  );
}

function ProblemContext() {
  return (
    <section aria-labelledby="konteks-title" className="bg-surface py-20 lg:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          id="konteks-title"
          eyebrow="Konteks masalah"
          title="Tiga masalah yang tidak bisa menunggu generasi berikutnya."
          aside="Setiap program ThreeL berangkat dari data. Angka di bawah ini menjadi titik awal kami menentukan di mana pemuda paling dibutuhkan."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((s) => (
            <article key={s.label} className="flex flex-col gap-4 rounded-[20px] border border-line bg-white p-8">
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
            </article>
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
        <div className="grid gap-6 lg:grid-cols-3">
          {pillars.map((p) => (
            <article key={p.id} className="flex flex-col overflow-hidden rounded-[20px] border border-line bg-white">
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
            </article>
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
        <div className="flex flex-col gap-5">
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
        </div>

        <div className="flex flex-col gap-5">
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
        </div>
      </Container>
    </section>
  );
}

function Impact() {
  return (
    <section aria-labelledby="dampak-title" className="py-20 lg:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          id="dampak-title"
          eyebrow="Dampak & dokumentasi"
          title="Dampak yang bisa dihitung, cerita yang bisa dilihat."
          aside="Angka dampak diperbarui setiap akhir semester dan dapat diverifikasi melalui laporan kegiatan untuk mitra."
        />
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {impactMetrics.map((m) => (
            <div
              key={m.label}
              className={cn('flex flex-col gap-2 border-t-[3px] pt-5', m.accent ? 'border-gold-deep' : 'border-brand')}
            >
              <span className="text-3xl font-extrabold tracking-tight text-forest sm:text-5xl">{m.value}</span>
              <span className="text-[15px] font-semibold">{m.label}</span>
              <span className="font-mono text-xs text-slate-500">{m.note}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-[22px] font-extrabold text-forest">Dokumentasi lapangan</h3>
            <ArrowLink href="/kabar">Lihat semua di Kabar</ArrowLink>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-[220px_220px]">
            <PhotoPlaceholder
              caption="ThreeL Mengajar · [lokasi, tanggal]"
              size="lg"
              className="col-span-2 min-h-60 lg:row-span-2"
            />
            <PhotoPlaceholder caption="ThreeL Blood · [lokasi]" />
            <PhotoPlaceholder caption="ThreeL Berakar · [lokasi]" tone="gold" />
            <PhotoPlaceholder caption="ThreeL Berbagi · [lokasi]" tone="gold" />
            <PhotoPlaceholder caption="ThreeL Berkelana · [lokasi]" />
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
        <div className="flex flex-col gap-3.5 rounded-3xl bg-forest p-8 text-white sm:p-10">
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
        </div>
        <div className="flex flex-col gap-3.5 rounded-3xl border border-mint-line bg-white p-8 sm:p-10">
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
        </div>
      </Container>
    </section>
  );
}
