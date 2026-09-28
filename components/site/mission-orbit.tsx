'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ArrowRight, Cpu, GraduationCap, Sprout, Users, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { missions } from '@/lib/content';
import { useLang } from '@/lib/i18n';
import { ScrollDrift } from '@/components/ui/scroll-motion';

// Ikon misi, urut sesuai missions. Ikon menumpang di cincin pada sudut 45°, 135°, 225°, 315°
// dan ikut berputar; titik kecil mengisi sela di 0°, 90°, 180°, 270°.
const icons: LucideIcon[] = [GraduationCap, Cpu, Sprout, Users];
const ICON_DEG = [225, 315, 135, 45];

const R = 190; // jari-jari cincin (ruang SVG 440x440)
const R_PCT = (R / 440) * 100; // jari-jari dalam persen lebar kotak, untuk menaruh ikon HTML
const DOTS = 4;
const ease = [0.22, 1, 0.36, 1] as const;

export function MissionOrbit() {
  const [active, setActive] = useState<number | null>(null);
  const toggle = (i: number) => setActive((a) => (a === i ? null : i));

  return (
    <MotionConfig reducedMotion="user">
      {/* Desktop: kartu 2x2 di kiri, cincin di kanan */}
      <div className="hidden items-center gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_440px] xl:gap-16">
        <MissionCards active={active} toggle={toggle} />
        <ScrollDrift range={[50, -50]}>
          <OrbitRing active={active} toggle={toggle} className="w-full" />
        </ScrollDrift>
      </div>

      {/* HP: cincin di atas, daftar di bawah */}
      <div className="flex flex-col gap-10 lg:hidden">
        <OrbitRing active={active} toggle={toggle} className="mx-auto w-[300px] sm:w-[340px]" />
        <MissionList active={active} toggle={toggle} />
      </div>
    </MotionConfig>
  );
}

type Props = { active: number | null; toggle: (i: number) => void };

/** Cincin bergradasi dengan ikon misi yang ikut berputar, dan logo ThreeL di tengah. Putaran berhenti saat kursor di atasnya. */
function OrbitRing({ active, toggle, className }: Props & { className?: string }) {
  const { t } = useLang();
  // Id unik: cincin dirender dua kali (desktop & HP), id gradien kembar bisa merujuk ke salinan yang tersembunyi.
  const gradId = `orbit-line-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <div className={cn('orbit relative aspect-square', className)}>
      <svg viewBox="0 0 440 440" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#CFE3D8" />
            <stop offset="0.5" stopColor="#5FBF94" />
            <stop offset="1" stopColor="#F2C94C" />
          </linearGradient>
        </defs>
        <circle cx="220" cy="220" r={R} fill="none" stroke={`url(#${gradId})`} strokeWidth="1.5" />
        <g className="orbit-spin">
          {Array.from({ length: DOTS }, (_, i) => {
            const a = (i / DOTS) * Math.PI * 2;
            return <circle key={i} cx={220 + R * Math.cos(a)} cy={220 + R * Math.sin(a)} r="4.5" fill="#5FBF94" />;
          })}
        </g>
      </svg>

      {/* Ukuran dalam persen agar cincin bisa dipakai di HP (kecil) maupun desktop (besar). */}
      <div
        className="orbit-pulse absolute inset-0 m-auto size-[55%] rounded-full bg-[radial-gradient(circle,rgba(242,201,76,0.28),rgba(95,191,148,0.18)_55%,transparent_72%)]"
        aria-hidden
      />
      <div className="absolute inset-0 m-auto flex size-[39%] items-center justify-center rounded-full border border-mint-line bg-white shadow-[0_20px_40px_-20px_rgba(11,59,46,0.35)]">
        {/* Logo sudah terpotong rapat, jadi cukup atur tingginya; lebar mengikuti rasio 355:480. */}
        <Image src="/images/logo-threel-mark.webp" alt={t('Logo ThreeL', 'ThreeL logo')} width={355} height={480} className="h-[62%] w-auto" />
      </div>

      {/* Lapisan ikon berputar bersama titik di SVG; tiap ikon berputar balik agar tetap tegak. */}
      <div className="orbit-spin-layer absolute inset-0">
        {missions.map((m, i) => {
          const Icon = icons[i];
          const on = active === i;
          const rad = (ICON_DEG[i] * Math.PI) / 180;
          return (
            <span
              key={m.label.id}
              className="absolute size-[17%] -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${50 + R_PCT * Math.cos(rad)}%`, top: `${50 + R_PCT * Math.sin(rad)}%` }}
            >
              <span className="orbit-counter block size-full">
                <motion.button
                  type="button"
                  aria-label={t(m.label)}
                  aria-pressed={on}
                  onClick={() => toggle(i)}
                  initial={false}
                  animate={{ scale: on ? 1.12 : 1 }}
                  whileHover={{ scale: on ? 1.12 : 1.06 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className={cn(
                    'flex size-full items-center justify-center rounded-full border-2 shadow-[0_12px_28px_-12px_rgba(11,59,46,0.5)] transition-colors duration-300',
                    on ? 'border-gold bg-gold text-forest' : 'border-mint-line bg-white text-brand hover:border-brand',
                  )}
                >
                  <Icon className="size-[46%]" strokeWidth={1.8} aria-hidden />
                </motion.button>
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/** Desktop: empat kartu foto; yang dipilih menggelap dan menampilkan penjelasan. */
function MissionCards({ active, toggle }: Props) {
  const { t } = useLang();
  return (
    <ul className="grid grid-cols-2 gap-5">
      {missions.map((m, i) => {
        const on = active === i;
        return (
          <li key={m.label.id}>
            <motion.button
              type="button"
              aria-expanded={on}
              onClick={() => toggle(i)}
              whileTap={{ scale: 0.98 }}
              initial={false}
              animate={{ opacity: active !== null && !on ? 0.6 : 1 }}
              className={cn(
                'group relative block h-[230px] w-full overflow-hidden rounded-[24px] text-left shadow-[0_18px_40px_-20px_rgba(11,59,46,0.55)] outline-none ring-offset-2 transition-shadow duration-300 focus-visible:ring-4 focus-visible:ring-brand/40',
                on && 'ring-[3px] ring-gold',
              )}
            >
              <Image src={m.image} alt="" fill sizes="(min-width: 1280px) 330px, 280px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              {/* Tirai gelap: tipis saat diam, menebal saat penjelasan muncul agar teks terbaca. */}
              <span className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/35 to-transparent" />
              <motion.span
                initial={false}
                animate={{ opacity: on ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 block bg-forest/55"
              />

              <span className="absolute inset-x-0 bottom-0 flex flex-col p-4">
                <span className="text-lg font-extrabold leading-snug text-white">{t(m.label)}</span>
                <AnimatePresence initial={false}>
                  {on ? (
                    <motion.span
                      key="text"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="block overflow-hidden text-[14px] leading-relaxed text-white/90"
                    >
                      <span className="block pt-3">{t(m.text)}</span>
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </span>
            </motion.button>
          </li>
        );
      })}
    </ul>
  );
}

/** HP: daftar bernomor selebar layar dengan foto sebagai latar; baris yang ditekan melebar memperlihatkan foto. */
function MissionList({ active, toggle }: Props) {
  const { t } = useLang();
  return (
    <ul className="-mx-4 sm:-mx-6">
      {missions.map((m, i) => {
        const on = active === i;
        return (
          <li key={m.label.id} className="border-b border-white/15 first:border-t">
            <button type="button" aria-expanded={on} onClick={() => toggle(i)} className="relative block w-full overflow-hidden text-left">
              <Image src={m.image} alt="" fill sizes="100vw" className="object-cover" />
              <motion.span
                initial={false}
                animate={{ opacity: on ? 0.45 : 0.82 }}
                transition={{ duration: 0.5, ease }}
                className="absolute inset-0 block bg-forest"
              />
              <motion.span
                initial={false}
                animate={{ paddingTop: on ? 112 : 26, paddingBottom: on ? 28 : 26 }}
                transition={{ duration: 0.55, ease }}
                className="relative flex flex-col gap-3 px-4 sm:px-6"
              >
                <span className="flex items-center gap-4">
                  <span className="w-6 shrink-0 font-mono text-xs font-semibold text-white/60">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex-1 text-[22px] font-extrabold uppercase leading-tight tracking-tight text-white sm:text-3xl">
                    {t(m.label)}
                  </span>
                  <motion.span
                    initial={false}
                    animate={{ rotate: on ? -45 : 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                    className={cn(
                      'flex size-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300',
                      on ? 'border-white bg-white text-forest' : 'border-white/40 text-white',
                    )}
                    aria-hidden
                  >
                    <ArrowRight className="size-[18px]" />
                  </motion.span>
                </span>
                <AnimatePresence initial={false}>
                  {on ? (
                    <motion.span
                      key="text"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                      className="block overflow-hidden pl-10 pr-14 text-[15px] leading-relaxed text-white/90"
                    >
                      {t(m.text)}
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </motion.span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
