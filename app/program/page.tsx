import type { Metadata } from 'next';
import Link from 'next/link';
import { pillars, workflow } from '@/lib/content';
import { cn } from '@/lib/cn';
import { Container, PageHeader, SectionHeading } from '@/components/ui/section';
import { WorkflowTimeline } from '@/components/site/workflow-timeline';

export const metadata: Metadata = { title: 'Program' };

export default function ProgramPage() {
  return (
    <>
      <PageHeader
        crumb="PROGRAM"
        title="Program kerja ThreeL"
        lead="Sembilan program dalam tiga pilar. Setiap program dijalankan dengan alur Look, Learn, Lead dan dilaporkan secara terbuka kepada mitra."
        image="/images/program-hero.jpg"
      >
        <nav aria-label="Lompat ke pilar" className="flex flex-wrap gap-3 pt-2">
          {pillars.map((p) => (
            <Link
              key={p.id}
              href={`#${p.id}`}
              className="flex h-11 items-center rounded-full border border-mint-line bg-white px-5 text-sm font-bold text-brand hover:border-brand"
            >
              {p.no} · {p.title}
            </Link>
          ))}
          <Link
            href="#alur"
            className="flex h-11 items-center rounded-full bg-forest px-5 text-sm font-bold text-white hover:bg-brand"
          >
            Alur kerja program
          </Link>
        </nav>
      </PageHeader>

      {pillars.map((p, idx) => (
        <section
          key={p.id}
          id={p.id}
          aria-labelledby={`${p.id}-title`}
          className={cn('scroll-mt-20 py-16 lg:py-20', idx % 2 === 1 && 'bg-surface')}
        >
          <Container className="grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[56px] font-semibold leading-none text-mint-line">{p.no}</span>
              <h2 id={`${p.id}-title`} className="text-[32px] font-extrabold leading-tight tracking-tight text-forest">
                {p.title}
              </h2>
              <p className="text-base leading-relaxed text-muted">{p.longDesc}</p>
              <span
                className={cn(
                  'w-fit rounded-full px-3.5 py-2 text-[13px] font-semibold text-muted',
                  idx % 2 === 1 ? 'bg-white' : 'bg-surface',
                )}
              >
                Menjawab: {p.answers}
              </span>
            </div>
            <div className="grid content-start gap-5 md:grid-cols-2">
              {p.programs.map((prog, i) => {
                const lastOdd = p.programs.length % 2 === 1 && i === p.programs.length - 1;
                return (
                  <article
                    key={prog.name}
                    className={cn(
                      'flex flex-col gap-3 rounded-[20px] p-7',
                      prog.featured ? 'border-[1.5px] border-gold-deep bg-[#FFFCF2]' : 'border border-line bg-white',
                      lastOdd && 'md:col-span-2',
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xl font-extrabold text-forest">{prog.name}</h3>
                      {prog.featured ? (
                        <span className="rounded-full bg-gold-soft px-2.5 py-1 text-xs font-bold text-[#6B4E0E]">
                          Inisiatif mandiri
                        </span>
                      ) : null}
                    </div>
                    <p className="text-[15px] leading-relaxed text-muted">{prog.long}</p>
                    <div
                      className={cn(
                        'mt-auto flex flex-col gap-1 border-t pt-3.5',
                        prog.featured ? 'border-[#EFE3BD]' : 'border-[#EDF2EF]',
                      )}
                    >
                      <span
                        className={cn(
                          'font-mono text-[11px] font-semibold tracking-[0.1em]',
                          prog.featured ? 'text-gold-ink' : 'text-brand',
                        )}
                      >
                        SASARAN
                      </span>
                      <span className="text-sm">{prog.target}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>
      ))}

      <section id="alur" aria-labelledby="alur-title" className="scroll-mt-20 bg-forest py-20 text-white lg:py-24">
        <Container>
          <SectionHeading
            id="alur-title"
            dark
            eyebrow="Alur kerja program"
            title="Dari data lapangan sampai laporan terbuka."
            aside="Mitra dapat bergabung di tahap mana pun. Setiap program ditutup dengan laporan dampak yang bisa diverifikasi."
          />
        </Container>
        <div className="mt-10 lg:mt-16">
          <WorkflowTimeline steps={workflow} />
        </div>
      </section>
    </>
  );
}
