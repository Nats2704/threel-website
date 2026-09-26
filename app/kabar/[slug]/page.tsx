import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { news, newsCategories } from '@/lib/content';
import { Container, PhotoPlaceholder } from '@/components/ui/section';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  return { title: item ? item.title : 'Kabar' };
}

export default async function KabarDetailPage({ params }: Params) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) notFound();

  const others = news.filter((n) => n.slug !== slug).slice(0, 3);

  return (
    <article className="py-12 lg:py-16">
      <Container className="flex max-w-3xl flex-col gap-6">
        <Link href="/kabar" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand hover:text-forest">
          <ArrowLeft className="size-4" aria-hidden />
          Kembali ke Kabar
        </Link>
        <div className="flex flex-wrap items-center gap-3 text-[13px]">
          <span className="rounded-full bg-forest px-3 py-1 font-bold text-white">{newsCategories[item.category].label}</span>
          <span className="font-mono text-slate-500">{item.date}</span>
          <span className="text-muted">· {item.program}</span>
        </div>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-forest sm:text-[42px]">{item.title}</h1>
        <p className="text-lg leading-relaxed text-muted">{item.excerpt}</p>
        <PhotoPlaceholder caption={`${item.program} · [lokasi, tanggal]`} size="lg" className="min-h-72" />
        <div className="flex flex-col gap-4 text-[17px] leading-[1.8] text-ink">
          <p>[Paragraf pembuka: apa kegiatannya, kapan, di mana, dan siapa yang terlibat.]</p>
          <p>[Paragraf inti: jalannya kegiatan, angka capaian, dan kutipan dari penerima manfaat atau mitra.]</p>
          <p>[Paragraf penutup: tindak lanjut dan ajakan untuk bergabung atau bermitra.]</p>
        </div>
      </Container>

      <Container className="mt-16 flex flex-col gap-5 border-t border-line pt-10">
        <h2 className="text-xl font-extrabold text-forest">Kabar lainnya</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/kabar/${o.slug}`}
                className="flex h-full flex-col gap-2 rounded-2xl border border-line p-5 transition hover:border-brand"
              >
                <span className="text-xs font-bold text-brand">{newsCategories[o.category].label}</span>
                <span className="font-bold leading-snug">{o.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </article>
  );
}
