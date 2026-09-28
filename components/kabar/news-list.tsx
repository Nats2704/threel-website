'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/cn';
import { newsCategories, type NewsCategory, type NewsItem } from '@/lib/content';
import { useLang, type Bi } from '@/lib/i18n';

type Filter = 'semua' | NewsCategory;

const EASE = [0.22, 1, 0.36, 1] as const;

const options: Array<{ key: Filter; label: Bi }> = [
  { key: 'semua', label: { id: 'Semua', en: 'All' } },
  { key: 'berita', label: newsCategories.berita.label },
  { key: 'artikel', label: newsCategories.artikel.label },
  { key: 'rilis', label: newsCategories.rilis.label },
  { key: 'arsip', label: newsCategories.arsip.label },
];

const tagClass: Record<NewsCategory, string> = {
  berita: 'bg-brand text-white',
  artikel: 'bg-mint-deep text-forest',
  rilis: 'bg-forest text-white',
  arsip: 'bg-gold-soft text-[#6B4E0E]',
};

/** Satu tombol "Kategori" yang membuka daftar pilihan (menu), menggantikan deretan tombol filter. */
function CategoryMenu({
  value,
  onChange,
  count,
}: {
  value: Filter;
  onChange: (f: Filter) => void;
  count: (f: Filter) => number;
}) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const items = useRef<(HTMLButtonElement | null)[]>([]);
  const current = options.find((o) => o.key === value)!;

  // Tutup saat klik di luar menu.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    // Fokus ke pilihan yang sedang aktif supaya panah atas/bawah langsung bisa dipakai.
    requestAnimationFrame(() => items.current[options.findIndex((o) => o.key === value)]?.focus());
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open, value]);

  const onMenuKey = (e: React.KeyboardEvent) => {
    const i = items.current.findIndex((el) => el === document.activeElement);
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      trigger.current?.focus();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const next = (i + (e.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length;
      items.current[next]?.focus();
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  };

  const pick = (f: Filter) => {
    onChange(f);
    setOpen(false);
    trigger.current?.focus();
  };

  return (
    <div ref={root} className="relative">
      <button
        ref={trigger}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="kabar-kategori"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex h-11 items-center gap-2.5 rounded-full border bg-white px-4 text-sm font-bold text-ink transition',
          open ? 'border-forest' : 'border-slate-300 hover:border-brand',
        )}
      >
        <SlidersHorizontal className="size-4 text-brand" aria-hidden />
        <span className="text-muted">{t('Kategori:', 'Category:')}</span>
        {t(current.label)}
        <span className="font-mono text-xs text-muted">{count(value)}</span>
        <ChevronDown className={cn('size-4 transition-transform duration-300', open && 'rotate-180')} aria-hidden />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="kabar-kategori"
            role="menu"
            aria-label={t('Pilih kategori', 'Choose a category')}
            onKeyDown={onMenuKey}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: EASE }}
            className="absolute left-0 top-full z-30 mt-2 w-64 origin-top-left rounded-2xl border border-line bg-white p-1.5 shadow-[0_24px_50px_-20px_rgba(11,59,46,0.45)] md:left-auto md:right-0 md:origin-top-right"
          >
            {options.map((o, i) => {
              const on = o.key === value;
              return (
                <button
                  key={o.key}
                  ref={(el) => {
                    items.current[i] = el;
                  }}
                  type="button"
                  role="menuitemradio"
                  aria-checked={on}
                  onClick={() => pick(o.key)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold outline-none transition-colors',
                    on ? 'bg-mint text-forest' : 'text-ink hover:bg-surface focus-visible:bg-surface',
                  )}
                >
                  <Check className={cn('size-4 shrink-0 text-brand', !on && 'invisible')} aria-hidden />
                  <span className="flex-1">{t(o.label)}</span>
                  <span className="font-mono text-xs text-muted">{count(o.key)}</span>
                </button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** Satu baris kabar: nomor di kiri, judul + keterangan, dan foto artikel yang diburamkan sebagai latar. */
function NewsRow({ item, index }: { item: NewsItem; index: number }) {
  const { t } = useLang();
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <article className="group relative isolate flex items-stretch overflow-hidden rounded-2xl border border-line bg-white shadow-[0_10px_30px_-24px_rgba(11,59,46,0.5)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-22px_rgba(11,59,46,0.55)]">
        {/* Foto artikel sebagai latar: diburamkan, lalu ditutup tirai putih yang paling pekat di area teks. */}
        <Image
          src={item.cover}
          alt=""
          fill
          sizes="(min-width: 1024px) 1100px, 100vw"
          className="-z-20 scale-110 object-cover blur-[3px] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.16]"
        />
        <span
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.9)_55%,rgba(255,255,255,0.55)_100%)] sm:bg-[linear-gradient(90deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.9)_48%,rgba(255,255,255,0.35)_100%)]"
        />

        <span className="flex w-14 shrink-0 flex-col items-center justify-center gap-0.5 border-r border-line/80 sm:w-20">
          <span className="text-xl font-bold text-forest/70 sm:text-2xl">{String(index + 1).padStart(2, '0')}</span>
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5 px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
            <span className={cn('rounded-full px-2.5 py-0.5 font-bold', tagClass[item.category])}>
              {t(newsCategories[item.category].label)}
            </span>
            <span className="text-slate-500">{t(item.date)}</span>
          </div>
          <h3 className="line-clamp-2 text-base font-bold leading-snug text-ink sm:text-lg">
            <Link href={`/kabar/${item.slug}`} className="after:absolute after:inset-0 group-hover:text-brand">
              {t(item.title)}
            </Link>
          </h3>
          <span className="text-[13px] text-muted">{t(item.program)}</span>
        </div>

        <span className="flex shrink-0 items-center pr-4 sm:pr-6" aria-hidden>
          <span className="flex size-9 items-center justify-center rounded-full bg-white/90 text-brand shadow-sm transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight className="size-4" />
          </span>
        </span>

        {item.coverCredit ? (
          <span className="absolute bottom-1.5 right-2.5 rounded bg-black/45 px-1.5 py-0.5 text-[9px] text-white backdrop-blur-sm">
            {item.coverCredit}
          </span>
        ) : null}
      </article>
    </motion.li>
  );
}

export function NewsList({ items }: { items: NewsItem[] }) {
  const { t } = useLang();
  const [filter, setFilter] = useState<Filter>('semua');
  const shown = filter === 'semua' ? items : items.filter((i) => i.category === filter);
  const count = (key: Filter) => (key === 'semua' ? items.length : items.filter((i) => i.category === key).length);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs font-semibold tracking-[0.1em] text-muted" aria-live="polite">
          {t(`MENAMPILKAN ${shown.length} PUBLIKASI`, `SHOWING ${shown.length} ${shown.length === 1 ? 'PUBLICATION' : 'PUBLICATIONS'}`)}
        </p>
        <CategoryMenu value={filter} onChange={setFilter} count={count} />
      </div>

      <ol className="flex flex-col gap-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((it, i) => (
            <NewsRow key={it.slug} item={it} index={i} />
          ))}
        </AnimatePresence>
      </ol>
      {shown.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line px-6 py-10 text-center text-sm text-muted">
          {t('Belum ada publikasi di kategori ini.', 'No publications in this category yet.')}
        </p>
      ) : null}
    </div>
  );
}
