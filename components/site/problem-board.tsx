'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Pin, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { problems, type Problem, type ProblemTone } from '@/lib/content';
import { useLang } from '@/lib/i18n';
import { Reveal } from '@/components/ui/reveal';

const EASE = [0.22, 1, 0.36, 1] as const;

const TONE: Record<ProblemTone, { pin: string; panel: string; accent: string }> = {
  brand: { pin: 'text-brand', panel: 'border-mint-line bg-mint', accent: 'text-brand' },
  gold: { pin: 'text-gold-deep', panel: 'border-[#F3E2AE] bg-[#FFF8E5]', accent: 'text-gold-ink' },
  rose: { pin: 'text-[#C24A3F]', panel: 'border-[#F4D6D1] bg-[#FDF1EF]', accent: 'text-[#B0433A]' },
};

// Kemiringan tiap catatan, seperti kertas yang ditempel tangan.
const TILT = [-5, 4, -3];
// Kemiringan foto polaroid, berlawanan arah dengan catatannya supaya terlihat ditempel terpisah.
const PHOTO_TILT = [9, -7, 7];

/** Garis putus-putus yang menyambungkan catatan, hanya di layar lebar. */
function Connector({ className, d }: { className: string; d: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className={cn('pointer-events-none absolute hidden lg:block', className)}>
      <path d={d} fill="none" stroke="#B8C6BF" strokeWidth="2" strokeDasharray="7 7" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Menebalkan bagian teks yang diapit **dua bintang**. */
function Emphasis({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split('**').map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className={cn('font-extrabold', className)}>
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

function PinHead({ tone, className }: { tone: ProblemTone; className?: string }) {
  return (
    <Pin
      aria-hidden
      className={cn('size-7 rotate-[18deg] fill-current drop-shadow-[0_3px_2px_rgba(0,0,0,0.18)]', TONE[tone].pin, className)}
    />
  );
}

function Note({ p, index, onOpen }: { p: Problem; index: number; onOpen: (el: HTMLButtonElement) => void }) {
  const { t } = useLang();
  const tone = TONE[p.tone];
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={(e) => onOpen(e.currentTarget)}
      style={{ '--tilt': `${TILT[index]}deg` } as React.CSSProperties}
      className="group relative block w-full rotate-[calc(var(--tilt)*0.5)] rounded-[30px] bg-white p-3.5 pt-12 text-left shadow-[0_22px_40px_-22px_rgba(11,59,46,0.45)] transition-[rotate,translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:rotate-0 hover:shadow-[0_30px_50px_-22px_rgba(11,59,46,0.5)] sm:p-4 sm:pt-14 lg:rotate-[var(--tilt)]"
    >
      <PinHead
        tone={p.tone}
        className="absolute left-1/2 top-3.5 -translate-x-1/2 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:rotate-0 sm:top-4"
      />
      {/* Foto polaroid yang ditempel menimpa sudut kanan atas catatan. */}
      <span
        aria-hidden
        style={{ rotate: `${PHOTO_TILT[index]}deg` }}
        className="absolute -right-3 -top-6 z-10 w-[32%] max-w-[132px] bg-white p-1.5 pb-5 shadow-[0_14px_26px_-12px_rgba(11,59,46,0.55)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:scale-[1.03] sm:-right-6 sm:-top-8 sm:p-2 sm:pb-7"
      >
        <span className="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 -rotate-3 bg-[#F4EFD9]/80 shadow-[0_1px_2px_rgba(0,0,0,0.12)]" />
        <span className="relative block aspect-[4/5] overflow-hidden bg-mint-deep">
          <Image src={p.photo} alt="" fill sizes="132px" className="object-cover" />
        </span>
      </span>
      <span className={cn('flex flex-col gap-3 rounded-[22px] border p-6 sm:p-7', tone.panel)}>
        {/* Ruang kanan dikosongkan untuk foto yang menimpa. */}
        <span className={cn('flex flex-col gap-0.5 pr-[30%] font-hand font-bold leading-none sm:pr-[28%]', tone.accent)}>
          <span className="text-5xl sm:text-6xl">{p.no}</span>
          <span className="text-[28px] leading-[1.05] sm:text-[32px]">{t(p.label)}</span>
        </span>
        <span className="pt-2 text-[44px] font-extrabold leading-none tracking-[-0.04em] text-forest sm:text-[52px]">
          {t(p.value)}
        </span>
        <span className="text-base leading-relaxed text-ink">{t(p.statement)}</span>
        <span className={cn('flex items-center gap-1.5 pt-1 text-sm font-bold', tone.accent)}>
          {t('Baca selengkapnya', 'Read the full story')}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </span>
      </span>
    </button>
  );
}

function Detail({ p, onClose }: { p: Problem; onClose: () => void }) {
  const { t } = useLang();
  const tone = TONE[p.tone];
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-forest/35 p-3 backdrop-blur-[3px] sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="problem-detail-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 40, rotate: -3, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, rotate: -2, scale: 0.97 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative max-h-[88dvh] w-full max-w-[780px] overflow-y-auto overscroll-contain rounded-[30px] bg-white p-3.5 pt-14 shadow-[0_40px_80px_-30px_rgba(11,59,46,0.6)] sm:p-5 sm:pt-16"
      >
        <PinHead tone={p.tone} className="absolute left-1/2 top-4 -translate-x-1/2 sm:top-5" />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t('Tutup', 'Close')}
          className="absolute right-4 top-3.5 flex size-10 items-center justify-center rounded-full text-muted transition hover:bg-surface hover:text-forest sm:right-5 sm:top-4"
        >
          <X className="size-5" aria-hidden />
        </button>

        <div className={cn('flex flex-col gap-6 rounded-[22px] border p-6 sm:p-9', tone.panel)}>
          <div className={cn('flex flex-wrap items-baseline gap-x-4 gap-y-1 font-hand font-bold leading-none', tone.accent)}>
            <span className="text-6xl">{p.no}</span>
            <span className="text-[34px] sm:text-[40px]">{t(p.label)}</span>
          </div>

          <h3 id="problem-detail-title" className="flex flex-col gap-2">
            <span className="text-[52px] font-extrabold leading-none tracking-[-0.04em] text-forest sm:text-[64px]">
              {t(p.value)}
            </span>
            <span className="text-lg font-bold leading-snug text-forest sm:text-xl">{t(p.statement)}</span>
          </h3>

          <p className="text-[16px] leading-[1.75] text-ink">{t(p.intro)}</p>

          <ul className="flex flex-col gap-3.5">
            {p.points.map((point) => (
              <li key={point.id} className="flex gap-3.5 text-[16px] leading-[1.7] text-ink">
                <span aria-hidden className={cn('mt-[0.7em] size-2 shrink-0 rounded-full bg-current', tone.accent)} />
                <span>
                  <Emphasis text={t(point)} className={tone.accent} />
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2 border-t border-black/10 pt-5">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
              {t('Sumber data', 'Data sources')}
            </span>
            <ul className="flex flex-col gap-1.5">
              {p.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-1.5 text-sm text-ink underline-offset-4 hover:text-brand hover:underline"
                  >
                    {s.label}
                    <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-muted group-hover:text-brand" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Tiga masalah sebagai catatan tempel di kertas bergaris, disusun zig-zag dan disambung
 * garis putus-putus. Mengetuk satu catatan membuka versi besarnya berisi cerita, angka
 * pendukung, dan sumber data.
 */
export function ProblemBoard() {
  const [open, setOpen] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    // Kembalikan fokus ke catatan yang tadi diketuk.
    requestAnimationFrame(() => trigger.current?.focus());
  }, []);

  return (
    <>
      <ol className="grid gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-x-[12%] lg:gap-y-0 lg:pb-8">
        {problems.map((p, i) => (
          <li
            key={p.no}
            className={cn(
              'relative',
              // HP: catatan bergantian menepi kiri-kanan agar tetap terasa zig-zag.
              i % 2 === 0 ? 'mr-4 sm:mr-24 lg:mr-0' : 'ml-4 sm:ml-24 lg:ml-0',
              i === 1 && 'lg:mt-48',
              i === 2 && 'lg:-mt-24',
            )}
          >
            {i === 0 ? <Connector className="left-[96%] top-[48%] h-[200px] w-[38%]" d="M0,0 C45,0 72,38 100,100" /> : null}
            {i === 1 ? <Connector className="right-[97%] top-[80%] h-[170px] w-[36%]" d="M100,0 C60,18 25,45 12,100" /> : null}
            <Reveal delay={i * 120}>
              <Note
                p={p}
                index={i}
                onOpen={(el) => {
                  trigger.current = el;
                  setOpen(i);
                }}
              />
            </Reveal>
          </li>
        ))}
      </ol>

      <AnimatePresence>{open !== null ? <Detail key={open} p={problems[open]} onClose={close} /> : null}</AnimatePresence>
    </>
  );
}
