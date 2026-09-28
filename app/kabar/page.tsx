import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { news, newsCategories } from '@/lib/content';
import { Container, PageHeader, PhotoPlaceholder } from '@/components/ui/section';
import { NewsList } from '@/components/kabar/news-list';
import { FluidBackdrop } from '@/components/ui/fluid-particles';
import { T } from '@/lib/i18n';

export const metadata: Metadata = { title: 'Kabar & Dokumentasi' };

export default function KabarPage() {
  const featured = news.find((n) => n.featured) ?? news[0];
  const rest = news.filter((n) => n.slug !== featured.slug);

  return (
    <>
      {/* Latar partikel mengalir untuk kepala halaman, sorotan, dan daftar kabar. */}
      <FluidBackdrop>
      <PageHeader
        className="bg-transparent!"
        crumb={<T id="KABAR & DOKUMENTASI" en="NEWS & STORIES" />}
        title={<T id="Kabar & Dokumentasi" en="News & Stories" />}
        lead={
          <T
            id="Artikel, rilis pers kegiatan lapangan, dan arsip publikasi resmi ThreeL Community."
            en="Articles, press releases from our field activities, and ThreeL Community’s official publication archive."
          />
        }
      />

      <section className="pt-14">
        <Container>
          <article className="grid overflow-hidden rounded-3xl border border-line bg-white shadow-[0_24px_50px_-34px_rgba(11,59,46,0.45)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <PhotoPlaceholder
              caption={<T v={featured.program} />}
              src={featured.cover}
              credit={featured.coverCredit}
              size="lg"
              className="min-h-64 rounded-none lg:min-h-[360px]"
            />
            <div className="flex flex-col justify-center gap-4 p-8 sm:p-12">
              <div className="flex flex-wrap items-center gap-3 text-[13px]">
                <span className="rounded-full bg-forest px-3 py-1 font-bold text-white">
                  <T v={newsCategories[featured.category].label} />
                </span>
                <span className="font-semibold text-brand">
                  <T id="Terbaru" en="Latest" />
                </span>
                <span className="text-slate-500">
                  <T v={featured.date} />
                </span>
              </div>
              <h2 className="text-2xl font-extrabold leading-snug tracking-tight text-forest sm:text-[32px]">
                <T v={featured.title} />
              </h2>
              <p className="text-base leading-relaxed text-muted">
                <T v={featured.excerpt} />
              </p>
              <Link
                href={`/kabar/${featured.slug}`}
                className="inline-flex w-fit items-center gap-2 text-[15px] font-bold text-brand hover:text-forest"
              >
                <T id="Baca rilis lengkap" en="Read the full release" />
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </article>
        </Container>
      </section>

      <section className="py-14 lg:pb-24">
        <Container>
          <NewsList items={rest} />
        </Container>
      </section>

      </FluidBackdrop>
    </>
  );
}
