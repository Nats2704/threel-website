import type { Metadata } from 'next';
import Link from 'next/link';
import { workflow } from '@/lib/content';
import { Container, PageHeader, SectionHeading } from '@/components/ui/section';
import { WorkflowTimeline } from '@/components/site/workflow-timeline';
import { ProgramCarousel } from '@/components/site/program-carousel';
import { T } from '@/lib/i18n';

export const metadata: Metadata = { title: 'Program' };

export default function ProgramPage() {
  return (
    <>
      <PageHeader
        crumb={<T id="PROGRAM" en="PROGRAMS" />}
        title={<T id="Program kerja ThreeL" en="ThreeL programs" />}
        lead={
          <T
            id="Sembilan program dalam tiga pilar. Setiap program dijalankan dengan alur Look, Learn, Lead dan dilaporkan secara terbuka kepada mitra."
            en="Nine programs across three pillars. Every program follows the Look, Learn, Lead cycle and is reported openly to partners."
          />
        }
        image="/images/program-hero.jpg"
      >
        <nav aria-label="Navigasi halaman" className="flex flex-wrap gap-3 pt-2">
          <Link
            href="#unggulan"
            className="flex h-11 items-center rounded-full border border-mint-line bg-white px-5 text-sm font-bold text-brand hover:border-brand"
          >
            <T id="Program unggulan" en="Featured programs" />
          </Link>
          <Link
            href="#alur"
            className="flex h-11 items-center rounded-full bg-forest px-5 text-sm font-bold text-white hover:bg-brand"
          >
            <T id="Alur kerja program" en="Program workflow" />
          </Link>
        </nav>
      </PageHeader>

      <section id="unggulan" aria-labelledby="pilar-title" className="scroll-mt-20 py-20 lg:py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            id="pilar-title"
            eyebrow={<T id="Program unggulan" en="Featured programs" />}
            title={
              <>
                <T id="Setiap program berawal dari cerita nyata di lapangan." en="Every program begins with a real story in the field." />{' '}
                <span className="font-serif font-normal italic text-brand-bright">
                  <T id="Kelanjutannya bisa kamu tulis bersama kami." en="You can help write what comes next." />
                </span>
              </>
            }
          />
          <ProgramCarousel />
        </Container>
      </section>

      <section id="alur" aria-labelledby="alur-title" className="scroll-mt-20 bg-forest py-20 text-white lg:py-24">
        <Container>
          <SectionHeading
            id="alur-title"
            dark
            eyebrow={<T id="Alur kerja program" en="Program workflow" />}
            title={<T id="Dari data lapangan sampai laporan terbuka." en="From field data to open reporting." />}
            aside={
              <T
                id="Mitra dapat bergabung di tahap mana pun. Setiap program ditutup dengan laporan dampak yang bisa diverifikasi."
                en="Partners can join at any stage. Every program closes with a verifiable impact report."
              />
            }
          />
        </Container>
        <div className="mt-10 lg:mt-16">
          <WorkflowTimeline steps={workflow} />
        </div>
      </section>
    </>
  );
}
