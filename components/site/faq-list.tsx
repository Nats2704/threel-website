'use client';

import { useId, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { faqs } from '@/lib/content';
import { useLang } from '@/lib/i18n';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Daftar tanya-jawab bergaya akordeon: satu jawaban terbuka pada satu waktu. */
export function FaqList() {
  const { t } = useLang();
  const base = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <ul className="border-t border-line">
        {faqs.map((f, i) => {
          const on = open === i;
          const panelId = `${base}-a${i}`;
          const buttonId = `${base}-q${i}`;
          return (
            <li key={f.q.id} className="border-b border-line">
              <h2>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={on}
                  aria-controls={panelId}
                  onClick={() => setOpen(on ? null : i)}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span
                    className={cn(
                      'text-lg font-bold leading-snug text-ink underline-offset-4 transition-colors sm:text-xl',
                      on ? 'text-forest underline decoration-brand/40' : 'group-hover:text-brand',
                    )}
                  >
                    {t(f.q)}
                  </span>
                  <motion.span
                    initial={false}
                    animate={{ rotate: on ? 180 : 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className={cn('shrink-0', on ? 'text-brand' : 'text-slate-500')}
                    aria-hidden
                  >
                    <ChevronDown className="size-5" />
                  </motion.span>
                </button>
              </h2>
              <AnimatePresence initial={false}>
                {on ? (
                  <motion.div
                    key="answer"
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-3xl pb-6 text-base leading-relaxed text-muted sm:text-[17px]">{t(f.a)}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </MotionConfig>
  );
}
