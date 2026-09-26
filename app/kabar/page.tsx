import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { contact, news, newsCategories } from '@/lib/content';
import { Container, PageHeader, PhotoPlaceholder } from '@/components/ui/section';
import { InstagramIcon } from '@/components/ui/icons';
import { NewsList } from '@/components/kabar/news-list';

export const metadata: Metadata = { title: 'Kabar & Dokumentasi' };

export default function KabarPage() {
  const featured = news.find((n) => n.featured) ?? news[0];
  const rest = news.filter((n) => n.slug !== featured.slug);

  return (
    <>
      <PageHeader
        crumb="KABAR & DOKUMENTASI"
        title="Kabar & Dokumentasi"
        lead="Artikel, rilis pers kegiatan lapangan, dan arsip publikasi resmi ThreeL Community."
      />

      <section aria-label="Sorotan terbaru" className="pt-14">
        <Container>
          <article className="grid overflow-hidden rounded-3xl border border-line lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <PhotoPlaceholder caption={`${featured.program} · [lokasi]`} size="lg" className="min-h-64 rounded-none lg:min-h-[360px]" />
            <div className="flex flex-col justify-center gap-4 p-8 sm:p-12">
              <div className="flex flex-wrap items-center gap-3 text-[13px]">
                <span className="rounded-full bg-forest px-3 py-1 font-bold text-white">
                  {newsCategories[featured.category].label}
                </span>
                <span className="font-mono text-slate-500">TERBARU · {featured.date}</span>
              </div>
              <h2 className="text-2xl font-extrabold leading-snug tracking-tight text-forest sm:text-[32px]">
                {featured.title}
              </h2>
              <p className="text-base leading-relaxed text-muted">{featured.excerpt}</p>
              <Link
                href={`/kabar/${featured.slug}`}
                className="inline-flex w-fit items-center gap-2 text-[15px] font-bold text-brand hover:text-forest"
              >
                Baca rilis lengkap
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </article>
        </Container>
      </section>

      <section aria-label="Daftar kabar" className="py-14 lg:pb-24">
        <Container>
          <NewsList items={rest} />
        </Container>
      </section>

      <section className="bg-mint py-14">
        <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-[26px] font-extrabold text-forest">Ikuti kabar harian di Instagram</h2>
            <p className="text-base text-muted">
              Dokumentasi lapangan dan pengumuman rekrutmen terbaru ada di @{contact.instagram}.
            </p>
          </div>
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[52px] w-fit items-center gap-2.5 rounded-full bg-forest px-6 font-bold text-white hover:bg-brand"
          >
            <InstagramIcon className="size-[18px]" />
            Buka @{contact.instagram}
          </a>
        </Container>
      </section>
    </>
  );
}
