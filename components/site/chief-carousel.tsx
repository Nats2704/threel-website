'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, MotionConfig, motion, type PanInfo } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { cLevels } from '@/lib/content';

// Posisi kartu di tumpukan menurut jaraknya dari kartu aktif (0 = paling depan).
const STACK = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 3, filter: 'saturate(1) brightness(1)' },
  { x: 30, y: -22, rotate: 5, scale: 0.92, opacity: 1, zIndex: 2, filter: 'saturate(0.7) brightness(0.96)' },
  { x: -30, y: -30, rotate: -5, scale: 0.86, opacity: 1, zIndex: 1, filter: 'saturate(0.5) brightness(0.93)' },
];
const HIDDEN = { x: 0, y: -40, rotate: 0, scale: 0.8, opacity: 0, zIndex: 0, filter: 'saturate(0.5) brightness(0.93)' };

// Pegas lembut: bergerak luwes, sedikit memantul, lalu diam tanpa hentakan.
const spring = { type: 'spring', stiffness: 120, damping: 20, mass: 0.9 } as const;
const ease = [0.22, 1, 0.36, 1] as const;

// Warna latar blur di belakang foto, satu set per pimpinan (urut sesuai cLevels).
const palettes = [
  ['#12805c', '#f2c94c', '#bfe3cf'],
  ['#0f6b4f', '#8fd3b6', '#f6dd8f'],
  ['#1d9a6c', '#e9b949', '#d6ece0'],
  ['#0b3b2e', '#5fbf94', '#f2c94c'],
  ['#12805c', '#b7e4c7', '#e6c86e'],
];

export function ChiefCarousel() {
  const [[active, dir], setState] = useState<[number, 1 | -1]>([0, 1]);
  const n = cLevels.length;
  const go = (d: 1 | -1) => setState(([i]) => [(i + d + n) % n, d]);
  const chief = cLevels[active];

  // Geser (swipe) ke kiri = berikutnya, ke kanan = sebelumnya. Jarak cukup jauh ATAU lemparan cepat.
  const onSwipe = (_: unknown, { offset, velocity }: PanInfo) => {
    if (offset.x < -60 || velocity.x < -400) go(1);
    else if (offset.x > 60 || velocity.x > 400) go(-1);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Jajaran C-Level ThreeL"
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') go(-1);
          if (e.key === 'ArrowRight') go(1);
        }}
        className="grid items-center gap-12 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-24"
      >
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[270px] sm:max-w-[320px] lg:max-w-none">
          {cLevels.map((c, i) => {
            const offset = (i - active + n) % n;
            return (
              <motion.div
                key={c.code}
                aria-hidden={offset !== 0}
                initial={false}
                animate={STACK[offset] ?? HIDDEN}
                transition={spring}
                // Hanya kartu depan yang bisa ditarik; setelah dilepas ia meluncur ke posisi barunya di tumpukan.
                drag={offset === 0 ? 'x' : false}
                dragSnapToOrigin
                dragElastic={0.7}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={onSwipe}
                className={cn(
                  'absolute inset-0 overflow-hidden rounded-[28px] bg-mint shadow-[0_28px_56px_-20px_rgba(11,59,46,0.4)]',
                  offset === 0 && 'cursor-grab touch-pan-y active:cursor-grabbing',
                )}
              >
                <ChiefPortrait chief={c} colors={palettes[i % palettes.length]} front={offset === 0} />
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-col gap-8">
          {/* Area teks juga bisa digeser di HP; pan-y menjaga scroll vertikal halaman tetap normal. */}
          <motion.div onPanEnd={onSwipe} aria-live="polite" className="min-h-[240px] touch-pan-y sm:min-h-[230px]">
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.div
                key={chief.code}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 24, filter: 'blur(4px)' }),
                  center: { opacity: 1, x: 0, filter: 'blur(0px)' },
                  exit: (d: number) => ({ opacity: 0, x: d * -24, filter: 'blur(4px)' }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease }}
                className="flex flex-col gap-2"
              >
                <span className="font-mono text-xs font-semibold tracking-[0.14em] text-gold-ink">{chief.code}</span>
                <h3 className="text-[28px] font-extrabold leading-tight text-forest sm:text-[32px]">{chief.name}</h3>
                <p className="text-base text-muted">{chief.title}</p>
                <blockquote className="mt-5 text-lg leading-relaxed text-ink sm:text-xl">
                  {chief.quote.split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.03 }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Tombol hanya di desktop; di HP cukup digeser. */}
          <div className="hidden w-fit items-center rounded-full lg:inline-flex border border-line bg-white/80 p-1 shadow-[0_8px_24px_-12px_rgba(11,59,46,0.25)] backdrop-blur">
            <NavButton label="Pimpinan sebelumnya" onClick={() => go(-1)} dir={-1} />
            <span className="h-5 w-px bg-line" aria-hidden />
            <NavButton label="Pimpinan berikutnya" onClick={() => go(1)} dir={1} />
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

/** Foto berlatar transparan (jas/korporat) di atas latar warna yang di-blur dan bergerak pelan. */
function ChiefPortrait({ chief, colors, front }: { chief: (typeof cLevels)[number]; colors: string[]; front: boolean }) {
  return (
    <>
      <div aria-hidden className="absolute inset-0">
        {colors.map((color, i) => (
          <span
            key={i}
            className={cn('chief-blob absolute size-[70%] rounded-full opacity-80 blur-3xl', ['-left-[15%] -top-[10%]', '-right-[20%] top-[25%]', 'left-[10%] -bottom-[20%]'][i])}
            style={{ background: color, animationDelay: `${i * -4}s` }}
          />
        ))}
        {/* Bayangan lantai tipis agar sosok tidak terlihat melayang. */}
        <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest/25 to-transparent" />
      </div>

      <motion.div
        initial={false}
        animate={front ? { y: 0, scale: 1 } : { y: 18, scale: 0.97 }}
        transition={{ ...spring, delay: front ? 0.08 : 0 }}
        className="absolute inset-0"
      >
        {chief.photo ? (
          <Image
            src={chief.photo}
            alt={`Foto ${chief.name}, ${chief.title}`}
            fill
            sizes="(min-width: 1024px) 360px, 320px"
            className="object-contain object-bottom drop-shadow-[0_20px_30px_rgba(11,59,46,0.35)]"
          />
        ) : (
          <Silhouette />
        )}
      </motion.div>
    </>
  );
}

// Siluet berjas sebagai pengganti sampai foto asli (PNG tanpa latar) tersedia.
function Silhouette() {
  return (
    <svg viewBox="0 0 200 250" className="absolute inset-x-0 bottom-0 mx-auto h-[88%] w-auto" aria-hidden>
      <circle cx="100" cy="78" r="38" fill="#0b3b2e" fillOpacity="0.55" />
      <path d="M22 250c0-58 32-100 78-100s78 42 78 100z" fill="#0b3b2e" fillOpacity="0.7" />
      <path d="M100 152l-20 0 20 60 20-60z" fill="#ffffff" fillOpacity="0.85" />
      <path d="M100 160l-6 10 6 40 6-40z" fill="#f2c94c" />
    </svg>
  );
}

function NavButton({ label, onClick, dir }: { label: string; onClick: () => void; dir: 1 | -1 }) {
  const Icon = dir === 1 ? ArrowRight : ArrowLeft;
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className="group flex size-11 items-center justify-center rounded-full text-forest transition-colors duration-300 hover:bg-mint"
    >
      <Icon
        className={cn(
          'size-[18px] transition-transform duration-300 ease-out',
          dir === 1 ? 'group-hover:translate-x-0.5' : 'group-hover:-translate-x-0.5',
        )}
        strokeWidth={2}
        aria-hidden
      />
    </motion.button>
  );
}
