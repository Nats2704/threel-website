import type { Metadata } from 'next';
import { cLevels, coreValues, missions } from '@/lib/content';
import { ArrowLink, Container, Eyebrow, PageHeader, SectionHeading } from '@/components/ui/section';

export const metadata: Metadata = { title: 'Tentang Kami' };

const facts = [
  { label: 'Nama resmi', value: 'ThreeL Community (Threel.Comm)' },
  { label: 'Bentuk', value: 'Organisasi pemuda nirlaba' },
  { label: 'Fokus', value: 'Kemiskinan, pendidikan, teknologi, pemberdayaan sosial' },
  { label: 'Didirikan', value: '[tahun berdiri]', placeholder: true },
  { label: 'Legalitas', value: '[nomor akta / SK]', placeholder: true },
];

const connector = 'bg-[#B9D3C5]';

export default function TentangPage() {
  return (
    <>
      <PageHeader
        crumb="TENTANG KAMI"
        title="Tumbuh dari keresahan, bergerak untuk solusi."
        lead="ThreeL berasal dari tiga L: Look, Learn, Lead. Kami melihat masalah dari dekat, belajar bersama, lalu memimpin aksi yang berdampak bagi masyarakat prasejahtera."
      >
        <dl className="mt-4 grid rounded-[20px] border border-mint-line bg-white px-6 py-2 sm:grid-cols-2 lg:max-w-3xl">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col gap-1 border-b border-[#EDF2EF] py-3.5 last:border-0 sm:pr-6">
              <dt className="text-sm text-muted">{f.label}</dt>
              <dd className={f.placeholder ? 'text-sm font-bold text-gold-ink' : 'text-sm font-bold'}>{f.value}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <section aria-label="Visi dan misi" className="py-20 lg:py-24">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-5 rounded-3xl bg-forest p-8 text-white sm:p-12">
            <Eyebrow tone="gold">Visi</Eyebrow>
            <p className="text-2xl font-bold leading-snug tracking-tight sm:text-[28px]">
              Menjadi wadah pemuda yang melahirkan great problem solver bagi Indonesia yang bebas dari kemiskinan, melalui
              pendidikan, teknologi, dan pemberdayaan sosial.
            </p>
            <span className="mt-auto font-mono text-[13px] font-semibold text-sage-muted">
              #GenerateGreatProblemSolver
            </span>
          </div>
          <div className="flex flex-col gap-5 rounded-3xl border border-line bg-white p-8 sm:p-12">
            <Eyebrow>Misi</Eyebrow>
            <ol className="flex flex-col gap-4">
              {missions.map((m, i) => (
                <li key={m} className="flex items-start gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-mint font-mono text-[13px] font-semibold text-brand">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="pt-1.5 text-base leading-relaxed">{m}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section aria-labelledby="nilai-title" className="bg-surface py-20 lg:py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            id="nilai-title"
            eyebrow="Core values"
            title="Enam nilai yang kami pegang di setiap aksi."
            aside="Nilai ini menjadi dasar rekrutmen, evaluasi kinerja, dan cara kami mengambil keputusan bersama."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((v, i) => (
              <div key={v.title} className="flex flex-col gap-2.5 rounded-[20px] border border-line bg-white p-7">
                <span className="font-mono text-[13px] font-semibold text-gold-ink">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-[22px] font-extrabold text-forest">{v.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="struktur-title" className="py-20 lg:py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            id="struktur-title"
            eyebrow="Struktur organisasi"
            title="Dipimpin pemuda, dikelola secara profesional."
            aside="Enam posisi C-Level memimpin divisi masing-masing dan bertanggung jawab langsung kepada CEO."
          />
          <div className="flex flex-col items-center">
            <PersonCard initial="F" role="FOUNDER" name="[Nama Founder]" dark />
            <div className={`h-8 w-0.5 ${connector}`} aria-hidden />
            <PersonCard initial="C" role="CEO · CHIEF EXECUTIVE OFFICER" name="[Nama CEO]" />
            <div className={`h-8 w-0.5 ${connector}`} aria-hidden />
            <div className={`hidden h-0.5 w-[calc(100%-100%/6)] lg:block ${connector}`} aria-hidden />
            <ul className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
              {cLevels.map((c) => (
                <li key={c.code} className="flex flex-col items-center">
                  <div className={`hidden h-6 w-0.5 lg:block ${connector}`} aria-hidden />
                  <div className="flex w-full flex-1 flex-col items-center gap-2 rounded-2xl border border-line bg-white px-4 py-5 text-center">
                    <span className="flex size-11 items-center justify-center rounded-full bg-mint text-sm font-extrabold text-brand">
                      {c.initial}
                    </span>
                    <span className="text-xl font-extrabold text-forest">{c.code}</span>
                    <span className="text-[13px] leading-snug text-muted">{c.title}</span>
                    <span className="text-sm font-semibold text-gold-ink">[Nama]</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex w-full flex-col gap-3 rounded-2xl bg-surface px-6 py-5 text-[15px] text-muted sm:flex-row sm:items-center sm:justify-between">
              <span>
                Setiap C-Level memimpin divisi berisi Associate (Manager &amp; Staff). Relawan ThreeLearnian bergabung
                lintas program.
              </span>
              <ArrowLink href="/daftar" className="shrink-0">
                Lihat peran terbuka
              </ArrowLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function PersonCard({ initial, role, name, dark = false }: { initial: string; role: string; name: string; dark?: boolean }) {
  return (
    <div
      className={`flex w-full max-w-xs items-center gap-4 rounded-2xl px-5 py-4 text-white ${dark ? 'bg-forest' : 'bg-brand'}`}
    >
      <span
        className={`flex size-12 shrink-0 items-center justify-center rounded-full font-extrabold ${
          dark ? 'bg-gold text-forest' : 'bg-white text-brand'
        }`}
      >
        {initial}
      </span>
      <div className="flex flex-col gap-1">
        <span className={`font-mono text-xs font-semibold tracking-[0.1em] ${dark ? 'text-gold' : 'text-mint-deep'}`}>
          {role}
        </span>
        <span className="text-base font-bold">{name}</span>
      </div>
    </div>
  );
}
