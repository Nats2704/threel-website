'use client';

import { useId, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, type PanInfo } from 'motion/react';
import { ArrowLeft, ArrowRight, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/cn';
import { cLevels } from '@/lib/content';
import { useLang } from '@/lib/i18n';

// Posisi sosok di panggung menurut jaraknya dari yang aktif: 0 = depan, ±1 = di kiri/kanan belakang,
// lebih jauh = menunggu di luar pandangan. Sengaja tanpa CSS `filter`: di atas latar parallax yang
// `fixed`, Chrome menggambar kotak putih bertepi tegas di sekeliling elemen ber-filter.
// Efek blur dikerjakan di dalam SVG (lihat ChiefFigure).
function stagePose(rel: number) {
  const side = Math.sign(rel);
  const d = Math.min(Math.abs(rel), 2);
  return [
    { x: '0%', scale: 1, opacity: 1, zIndex: 3 },
    { x: `${side * 48}%`, scale: 0.8, opacity: 0.8, zIndex: 2 },
    { x: `${side * 80}%`, scale: 0.68, opacity: 0, zIndex: 1 },
  ][d];
}

// Pegas lembut: bergerak luwes, sedikit memantul, lalu diam tanpa hentakan.
const spring = { type: 'spring', stiffness: 120, damping: 20, mass: 0.9 } as const;
const ease = [0.22, 1, 0.36, 1] as const;

export function ChiefCarousel() {
  const { t } = useLang();
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
        aria-label={t('Jajaran C-Level ThreeL', 'ThreeL C-Level team')}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') go(-1);
          if (e.key === 'ArrowRight') go(1);
        }}
        className="grid items-center gap-6 sm:gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-24 lg:[&>div:last-child]:pl-20 xl:[&>div:last-child]:pl-28"
      >
        <div className="relative mx-auto h-[380px] w-full max-w-[340px] overflow-x-clip lg:overflow-x-visible sm:h-[500px] lg:h-[560px] lg:max-w-none">
          {/* Bayangan lantai tipis agar sosok depan tidak terlihat melayang. */}
          <span
            aria-hidden
            className="absolute -bottom-3 left-1/2 h-10 w-[70%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(11,59,46,0.22),transparent)]"
          />
          {cLevels.map((c, i) => {
            const offset = (i - active + n) % n;
            // Jarak bertanda: 1 = berikutnya (kanan), -1 = sebelumnya (kiri).
            const rel = offset <= n / 2 ? offset : offset - n;
            return (
              <div key={c.code} className="pointer-events-none absolute inset-0 flex justify-center">
                <motion.div
                  aria-hidden={rel !== 0}
                  initial={false}
                  animate={stagePose(rel)}
                  transition={spring}
                  style={{ transformOrigin: '50% 100%' }}
                  // Hanya sosok depan yang bisa ditarik; setelah dilepas ia kembali ke tengah.
                  drag={rel === 0 ? 'x' : false}
                  dragSnapToOrigin
                  dragElastic={0.7}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={onSwipe}
                  className={cn(
                    'relative aspect-[1/2] h-full',
                    rel === 0 && 'pointer-events-auto cursor-grab touch-pan-y active:cursor-grabbing',
                  )}
                >
                  <ChiefFigure chief={c} front={rel === 0} />
                </motion.div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-8">
          {/* Area teks juga bisa digeser di HP; pan-y menjaga scroll vertikal halaman tetap normal. */}
          <motion.div onPanEnd={onSwipe} aria-live="polite" className="min-h-[250px] touch-pan-y sm:min-h-[240px]">
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
                {/* Di HP nama, jabatan, dan kampus rata tengah di bawah foto; di desktop rata kiri. */}
                <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
                  <h3 className="text-[28px] font-extrabold leading-tight text-forest sm:text-[32px]">{chief.name}</h3>
                  <p className="text-base text-muted">{chief.title}</p>
                  {chief.campus ? (
                    <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-white/70 px-3 py-1 text-sm font-semibold text-forest backdrop-blur">
                      <GraduationCap className="size-4 text-gold-ink" strokeWidth={2} aria-hidden />
                      {chief.campus}
                    </span>
                  ) : null}
                </div>
                <blockquote className="mt-5 text-lg leading-relaxed text-ink sm:text-xl">
                  {`“${t(chief.quote)}”`.split(' ').map((word, i) => (
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
            <NavButton label={t('Pimpinan sebelumnya', 'Previous leader')} onClick={() => go(-1)} dir={-1} />
            <span className="h-5 w-px bg-line" aria-hidden />
            <NavButton label={t('Pimpinan berikutnya', 'Next leader')} onClick={() => go(1)} dir={1} />
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

/**
 * Sosok seluruh badan (foto PNG transparan atau siluet) digambar di SVG: satu lapis tajam dan satu lapis
 * blur (feGaussianBlur) yang saling berganti. Blur di dalam SVG ikut tergambar bersama sosoknya,
 * jadi tepinya menyatu mulus dengan latar tanpa kotak. Tepi bawah dipudarkan dengan mask.
 */
function ChiefFigure({ chief, front }: { chief: (typeof cLevels)[number]; front: boolean }) {
  const { t } = useLang();
  const uid = useId().replace(/:/g, '');
  // Tinggi selalu 200 (penuh viewBox); lebar menyesuaikan rasio asli foto, dipusatkan.
  // Dengan begitu pose yang lebih lebar (mis. tangan di pinggang) tidak tampil lebih pendek
  // daripada pose yang lebih ramping (tangan terlipat) — tingginya sama-sama penuh dari kepala ke bawah.
  const aspect = chief.photoAspect ?? 0.5;
  const w = 200 * aspect;
  const body = chief.photo ? (
    <image href={chief.photo} x={50 - w / 2} y="0" width={w} height="200" preserveAspectRatio="xMidYMid meet" />
  ) : (
    <SilhouetteShape />
  );
  const fade = 'transition-opacity duration-500 ease-out';

  return (
    <svg
      viewBox="0 0 100 200"
      preserveAspectRatio="xMidYMax meet"
      className="absolute inset-0 size-full select-none overflow-visible"
      role={chief.photo ? 'img' : undefined}
      aria-label={chief.photo ? `${t('Foto', 'Photo of')} ${chief.name}, ${chief.title}` : undefined}
      aria-hidden={chief.photo ? undefined : true}
    >
      <defs>
        <filter id={`${uid}-blur`} x="-25%" y="-15%" width="150%" height="130%">
          <feGaussianBlur stdDeviation="2.4" />
          <feColorMatrix type="saturate" values="0.6" />
        </filter>
        <linearGradient id={`${uid}-grad`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="200">
          <stop offset="0.86" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`${uid}-fade`} maskUnits="userSpaceOnUse" x="-40" y="-40" width="180" height="280">
          <rect x="-40" y="-40" width="180" height="280" fill={`url(#${uid}-grad)`} />
        </mask>
      </defs>
      <g mask={`url(#${uid}-fade)`}>
        <g filter={`url(#${uid}-blur)`} className={fade} style={{ opacity: front ? 0 : 1 }}>
          {body}
        </g>
        <g className={fade} style={{ opacity: front ? 1 : 0 }}>
          {body}
        </g>
      </g>
    </svg>
  );
}

// Siluet berdiri sebagai pengganti sampai foto asli (PNG tanpa latar) tersedia.
function SilhouetteShape() {
  return (
    <>
      <circle cx="50" cy="30" r="17" fill="#0b3b2e" fillOpacity="0.45" />
      <path d="M12 200V90c0-24 17-40 38-40s38 16 38 40v110z" fill="#0b3b2e" fillOpacity="0.55" />
      <path d="M50 52l-10 0 10 34 10-34z" fill="#ffffff" fillOpacity="0.85" />
      <path d="M50 56l-3 6 3 22 3-22z" fill="#f2c94c" />
    </>
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
