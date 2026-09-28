'use client';

import { useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { pillars } from '@/lib/content';
import { useLang } from '@/lib/i18n';
import { PillarIcon } from '@/components/ui/pillar-icon';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Tiga kartu pilar berisi daftar program. Menekan satu program membuka penjelasan lengkap
 * dan sasarannya; program lain yang sedang terbuka otomatis tertutup.
 */
export function ProgramPillars() {
  const { t } = useLang();
  // Program unggulan terbuka sejak awal supaya pengunjung langsung tahu kartunya bisa dibuka.
  const [open, setOpen] = useState<string | null>('ThreeL Mengajar');

  return (
    <MotionConfig reducedMotion="user">
      <div className="grid items-start gap-6 lg:grid-cols-3">
        {pillars.map((p) => (
          <article
            key={p.id}
            id={p.id}
            aria-labelledby={`${p.id}-title`}
            className="scroll-mt-28 overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_18px_40px_-32px_rgba(11,59,46,0.45)]"
          >
            <div className="flex flex-col gap-4 bg-mint px-7 pb-6 pt-7">
              <div className="flex items-center justify-between">
                <PillarIcon icon={p.icon} />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-brand">
                  {t('Pilar', 'Pillar')} {p.no}
                </span>
              </div>
              <h3 id={`${p.id}-title`} className="text-2xl font-extrabold leading-tight text-forest">
                {t(p.title)}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted">{t(p.longDesc)}</p>
              <p className="w-fit rounded-full bg-white px-3.5 py-2 text-[13px] text-muted">
                {t('Menjawab', 'Addresses')} <span className="font-semibold text-forest">{t(p.answers)}</span>
              </p>
            </div>

            <ul className="flex flex-col px-3 py-2">
              {p.programs.map((prog) => {
                const on = open === prog.name;
                const panelId = `program-${prog.name.toLowerCase().replace(/\s+/g, '-')}`;
                return (
                  <li key={prog.name} className="border-b border-[#EDF2EF] last:border-0">
                    <button
                      type="button"
                      aria-expanded={on}
                      aria-controls={panelId}
                      onClick={() => setOpen(on ? null : prog.name)}
                      className={cn(
                        'flex w-full items-start gap-3 rounded-2xl px-4 py-4 text-left transition-colors duration-300',
                        on ? 'bg-surface' : 'hover:bg-surface/70',
                      )}
                    >
                      <span className="flex flex-1 flex-col gap-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-base font-bold text-ink">{prog.name}</span>
                          {prog.featured ? (
                            <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[11px] font-bold text-[#6B4E0E]">
                              {t('Inisiatif mandiri', 'Self-funded')}
                            </span>
                          ) : null}
                        </span>
                        {/* Ringkasan hanya tampil saat tertutup; saat terbuka digantikan penjelasan lengkap. */}
                        {on ? null : <span className="text-sm leading-relaxed text-muted">{t(prog.short)}</span>}
                      </span>
                      <motion.span
                        initial={false}
                        animate={{ rotate: on ? 180 : 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className={cn(
                          'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full transition-colors',
                          on ? 'bg-brand text-white' : 'bg-mint text-brand',
                        )}
                        aria-hidden
                      >
                        <ChevronDown className="size-4" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {on ? (
                        <motion.div
                          key="panel"
                          id={panelId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-4 px-4 pb-5 pt-1">
                            <p className="text-[15px] leading-relaxed text-ink">{t(prog.long)}</p>
                            <div
                              className={cn(
                                'flex flex-col gap-1 rounded-xl border-l-[3px] px-4 py-3',
                                prog.featured ? 'border-gold-deep bg-[#FFFCF2]' : 'border-brand bg-mint',
                              )}
                            >
                              <span
                                className={cn(
                                  'font-mono text-[11px] font-semibold uppercase tracking-[0.1em]',
                                  prog.featured ? 'text-gold-ink' : 'text-brand',
                                )}
                              >
                                {t('Sasaran', 'Who it serves')}
                              </span>
                              <span className="text-sm leading-relaxed text-forest">{t(prog.target)}</span>
                            </div>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </MotionConfig>
  );
}
