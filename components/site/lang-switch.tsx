'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useLang, type Lang } from '@/lib/i18n';

const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: 'id', label: 'ID', name: 'Bahasa Indonesia' },
  { code: 'en', label: 'EN', name: 'English' },
];

/** Desktop: pil dua pilihan dengan penanda yang bergeser ke bahasa aktif. */
export function LangSwitch({ className }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  return (
    <div
      role="group"
      aria-label={t('Pilih bahasa', 'Choose language')}
      className={cn('relative flex h-11 items-center rounded-full border border-line bg-white p-1', className)}
    >
      <Globe className="mx-2 hidden size-4 text-muted xl:block" aria-hidden />
      <div className="relative grid grid-cols-2">
        {/* Penanda bergeser dengan transform CSS biasa, jadi tidak terpengaruh header yang sticky. */}
        <span
          aria-hidden
          className={cn(
            'absolute inset-y-0 left-0 w-1/2 rounded-full bg-forest transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
            lang === 'en' && 'translate-x-full',
          )}
        />
        {LANGS.map((l) => (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            aria-pressed={lang === l.code}
            aria-label={l.name}
            onClick={() => setLang(l.code)}
            className={cn(
              'relative h-9 w-10 rounded-full font-mono text-xs font-semibold tracking-[0.08em] transition-colors duration-300',
              lang === l.code ? 'text-white' : 'text-slate-600 hover:text-brand',
            )}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** HP: satu tombol seukuran tombol menu; ketuk untuk berpindah bahasa. */
export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  const next = lang === 'id' ? LANGS[1] : LANGS[0];
  return (
    <button
      type="button"
      onClick={() => setLang(next.code)}
      aria-label={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
      className={cn(
        'relative flex size-11 items-center justify-center overflow-hidden rounded-xl border border-line text-forest transition-colors active:bg-mint',
        className,
      )}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={lang}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-[13px] font-semibold tracking-[0.06em]"
        >
          {lang.toUpperCase()}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
