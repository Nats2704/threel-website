'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { newsCategories, type NewsCategory, type NewsItem } from '@/lib/content';

type Filter = 'semua' | NewsCategory;

const tabs: Array<{ key: Filter; label: string }> = [
  { key: 'semua', label: 'Semua' },
  { key: 'artikel', label: 'Artikel' },
  { key: 'rilis', label: 'Rilis Pers' },
  { key: 'arsip', label: 'Arsip Publikasi' },
];

const tagClass: Record<NewsCategory, string> = {
  artikel: 'bg-mint-deep text-forest',
  rilis: 'bg-forest text-white',
  arsip: 'bg-gold-soft text-[#6B4E0E]',
};
const thumbClass: Record<NewsCategory, string> = {
  artikel: 'bg-[#E8EFEA] text-[#5E8A74]',
  rilis: 'bg-[#DCEBE3] text-[#5E8A74]',
  arsip: 'bg-[#F4ECD2] text-gold-ink',
};

export function NewsList({ items }: { items: NewsItem[] }) {
  const [filter, setFilter] = useState<Filter>('semua');
  const shown = filter === 'semua' ? items : items.filter((i) => i.category === filter);
  const count = (key: Filter) => (key === 'semua' ? items.length : items.filter((i) => i.category === key).length);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-xs font-semibold tracking-[0.1em] text-muted" aria-live="polite">
          MENAMPILKAN {shown.length} PUBLIKASI
        </p>
        <div role="group" aria-label="Filter kategori" className="flex flex-wrap gap-2">
          {tabs.map((t) => {
            const active = filter === t.key;
            return (
              <button
                key={t.key}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(t.key)}
                className={cn(
                  'flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-bold transition',
                  active ? 'border-forest bg-forest text-white' : 'border-slate-300 bg-white text-ink hover:border-brand',
                )}
              >
                {t.label}
                <span className="font-mono text-xs opacity-75">{count(t.key)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((it) => (
          <article key={it.slug} className="group relative flex flex-col overflow-hidden rounded-[18px] border border-line bg-white">
            <div className={cn('flex h-44 items-center justify-center', thumbClass[it.category])}>
              <ImageIcon className="size-10" strokeWidth={1.5} aria-hidden />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <div className="flex items-center gap-2.5 text-[13px]">
                <span className={cn('rounded-full px-2.5 py-1 font-bold', tagClass[it.category])}>
                  {newsCategories[it.category].label}
                </span>
                <span className="text-slate-500">{it.date}</span>
              </div>
              <h3 className="text-[19px] font-bold leading-snug text-ink">
                <Link href={`/kabar/${it.slug}`} className="after:absolute after:inset-0 group-hover:text-brand">
                  {it.title}
                </Link>
              </h3>
              <span className="text-[13px] text-muted">{it.program}</span>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-bold text-brand">
                {newsCategories[it.category].cta}
                <ArrowRight className="size-4" aria-hidden />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
