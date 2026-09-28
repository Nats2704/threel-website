'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { featuredPrograms } from '@/lib/content';
import { useLang } from '@/lib/i18n';

const EASE = [0.22, 1, 0.36, 1] as const;

// Lima program ditampilkan dua kali agar lingkaran terlihat penuh; salinan kedua hanya dekorasi.
const P = featuredPrograms.length;
const N = P * 2;
const STEP = 360 / N;

/** Kecepatan putar otomatis, dalam kartu per detik (satu kartu kira-kira tiap 5 detik). */
const AUTO_SPEED = 0.2;
/** Geseran lebih kecil dari ini dianggap ketukan, bukan seret. */
const TAP_SLOP = 6;

/** Jarak kartu ke depan dalam satuan kartu, dibungkus ke rentang [-N/2, N/2). */
function wrap(p: number) {
  return ((((p + N / 2) % N) + N) % N) - N / 2;
}

/**
 * Kecepatan putar mendekati kecepatan tujuan secara eksponensial: cepat di awal, lembut di
 * akhir, dan hasilnya sama di layar 60 Hz maupun 120 Hz karena memakai `dt`. Melambat
 * (dilepas dari lemparan atau dijeda) dibuat lebih panjang daripada mulai berputar lagi.
 */
function easeVelocity(current: number, target: number, dt: number): number {
  const slowing = Math.abs(target) < Math.abs(current);
  const k = slowing ? 1.8 : 1.2;
  return current + (target - current) * (1 - Math.exp(-dt * k));
}

export function ProgramCarousel() {
  const { t } = useLang();
  const [active, setActive] = useState<number | null>(null);
  const [hover, setHover] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const shadeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const offset = useRef(0);
  const velocity = useRef(AUTO_SPEED);
  const snapTo = useRef<number | null>(null);
  const drag = useRef<{ x: number; last: number; t: number; moved: boolean; v: number } | null>(null);
  const paused = useRef(false);
  // Klik yang menyusul seretan tidak boleh membuka program.
  const justDragged = useRef(false);

  paused.current = hover || active !== null;

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let prev = performance.now();

    const render = () => {
      const ring = ringRef.current;
      if (ring) ring.style.transform = `translateZ(calc(var(--r) * -1)) rotateX(-13deg) rotateY(${(-offset.current * STEP).toFixed(3)}deg)`;
      for (let i = 0; i < N; i++) {
        // 1 = menghadap ke depan, -1 = di belakang lingkaran.
        const facing = Math.cos(((i - offset.current) * STEP * Math.PI) / 180);
        const shade = shadeRefs.current[i];
        if (shade) shade.style.opacity = (((1 - facing) / 2) * 0.82).toFixed(3);
        const label = labelRefs.current[i];
        if (label) label.style.opacity = Math.max(0, (facing - 0.55) / 0.45).toFixed(3);
      }
    };

    const tick = (now: number) => {
      // Batasi dt supaya lingkaran tidak melompat setelah tab disembunyikan lalu dibuka lagi.
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;

      if (snapTo.current !== null) {
        // Kartu terpilih berputar ke depan, melambat saat mendekat.
        const gap = wrap(snapTo.current - offset.current);
        offset.current += gap * (1 - Math.exp(-dt * 6));
        if (Math.abs(gap) < 0.001) snapTo.current = null;
        velocity.current = 0;
      } else if (!drag.current) {
        const target = paused.current || reduce.matches ? 0 : AUTO_SPEED;
        velocity.current = easeVelocity(velocity.current, target, dt);
        offset.current += velocity.current * dt;
      }
      offset.current = ((offset.current % N) + N) % N;
      render();
      raf = requestAnimationFrame(tick);
    };

    render();
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /** Putar kartu program ke depan, memilih salinan yang paling dekat supaya putarannya pendek. */
  const bringToFront = (program: number) => {
    const a = wrap(program - offset.current);
    const b = wrap(program + P - offset.current);
    snapTo.current = Math.abs(a) <= Math.abs(b) ? program : program + P;
  };

  const select = (program: number | null) => {
    setActive(program);
    if (program !== null) bringToFront(program);
  };

  const cardWidth = () => stageRef.current?.querySelector<HTMLElement>('[data-card]')?.offsetWidth ?? 160;

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    drag.current = { x: e.clientX, last: e.clientX, t: performance.now(), moved: false, v: 0 };
    justDragged.current = false;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    if (!d.moved && Math.abs(e.clientX - d.x) > TAP_SLOP) {
      d.moved = true;
      snapTo.current = null;
      stageRef.current?.setPointerCapture(e.pointerId);
    }
    if (!d.moved) return;
    const now = performance.now();
    // Satu lebar kartu diseret = satu kartu berputar, dibagi 1.3 agar terasa sedikit berat.
    const step = -(e.clientX - d.last) / (cardWidth() * 1.3);
    offset.current += step;
    const dt = Math.max((now - d.t) / 1000, 0.001);
    d.v = d.v * 0.6 + (step / dt) * 0.4;
    d.last = e.clientX;
    d.t = now;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    justDragged.current = true;
    stageRef.current?.releasePointerCapture(e.pointerId);
    // Lemparan dibatasi supaya lingkaran tidak berputar liar.
    velocity.current = Math.max(-2.5, Math.min(2.5, d.v));
  };

  const prog = active !== null ? featuredPrograms[active] : null;
  const step = (dir: 1 | -1) => active !== null && select((active + dir + P) % P);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
      {/* Lingkaran foto */}
      <div
        ref={stageRef}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
        onPointerLeave={() => setHover(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative mx-auto aspect-[1/0.8] w-full max-w-[600px] cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing [--cw:clamp(84px,22vw,150px)] [--r:calc(var(--cw)*1.9)] [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)] [perspective:1100px]"
      >
        {/* Bayangan lantai supaya lingkaran terasa berpijak. */}
        <span
          aria-hidden
          className="absolute bottom-[9%] left-1/2 h-[12%] w-[72%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(11,59,46,0.16),transparent)]"
        />
        <div ref={ringRef} className="absolute inset-0 [transform-style:preserve-3d]">
          {Array.from({ length: N }, (_, i) => {
            const program = i % P;
            const item = featuredPrograms[program];
            const ghost = i >= P;
            const selected = active === program;
            return (
              <button
                key={i}
                data-card
                type="button"
                tabIndex={ghost ? -1 : 0}
                aria-hidden={ghost || undefined}
                aria-pressed={ghost ? undefined : selected}
                aria-label={ghost ? undefined : item.name}
                onClick={() => !justDragged.current && select(selected ? null : program)}
                style={{ transform: `translate(-50%, -50%) rotateY(${i * STEP}deg) translateZ(var(--r))` }}
                className={cn(
                  'absolute left-1/2 top-[55%] aspect-[4/5] w-[var(--cw)] overflow-hidden rounded-[18px] bg-mint-deep text-left shadow-[0_24px_40px_-26px_rgba(11,59,46,0.7)] outline-offset-4 transition-shadow duration-500',
                  selected && 'shadow-[0_0_0_3px_var(--color-gold),0_24px_40px_-20px_rgba(11,59,46,0.7)]',
                )}
              >
                <Image
                  src={item.photo}
                  alt=""
                  fill
                  sizes="150px"
                  className="pointer-events-none object-cover"
                  draggable={false}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />
                <span
                  ref={(el) => {
                    labelRefs.current[i] = el;
                  }}
                  className="absolute inset-x-0 bottom-0 p-3 text-[13px] font-bold leading-tight text-white sm:text-sm"
                >
                  {item.name}
                </span>
                {/* Kartu di belakang lingkaran memudar ke warna latar halaman. */}
                <span
                  ref={(el) => {
                    shadeRefs.current[i] = el;
                  }}
                  className="absolute inset-0 bg-white"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Narasi */}
      <div className="relative lg:min-h-[500px]">
        <AnimatePresence mode="wait" initial={false}>
          {prog ? (
            <motion.div
              key={prog.slug}
              id="program-detail"
              aria-live="polite"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="flex flex-col gap-6"
            >
              <button
                type="button"
                onClick={() => select(null)}
                className="group flex w-fit items-center gap-2 text-sm font-semibold text-muted transition hover:text-brand"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
                {t('Semua program', 'All programs')}
              </button>

              <div className="flex flex-col gap-3">
                <h3 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-forest sm:text-[44px]">
                  {prog.name}
                </h3>
                <p className="font-serif text-2xl italic leading-snug text-brand-bright">{t(prog.tagline)}</p>
              </div>

              <div className="flex flex-col gap-4">
                {prog.story.map((para, i) => (
                  <p key={i} className="text-[16px] leading-[1.75] text-ink">
                    {t(para)}
                  </p>
                ))}
              </div>

              <div className="grid gap-1 border-y border-line py-4 sm:grid-cols-[150px_1fr] sm:gap-6">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-gold-ink sm:pt-1">
                  {t('Sasaran program', 'Who it serves')}
                </span>
                <span className="text-[16px] font-semibold leading-relaxed text-forest">{t(prog.target)}</span>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href="/daftar"
                  className="flex h-12 items-center gap-2 rounded-full bg-forest px-6 text-sm font-bold text-white transition hover:bg-brand"
                >
                  {t('Ikut jadi relawan', 'Volunteer with us')}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link
                  href="/bermitra"
                  className="group flex items-center gap-1.5 text-sm font-bold text-brand underline-offset-4 hover:underline"
                >
                  {t('Dukung program ini', 'Support this program')}
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label={t('Program sebelumnya', 'Previous program')}
                    className="flex size-10 items-center justify-center rounded-full border border-line text-forest transition hover:border-brand hover:text-brand"
                  >
                    <ArrowLeft className="size-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label={t('Program berikutnya', 'Next program')}
                    className="flex size-10 items-center justify-center rounded-full border border-line text-forest transition hover:border-brand hover:text-brand"
                  >
                    <ArrowRight className="size-4" aria-hidden />
                  </button>
                  <span className="pl-2 font-mono text-xs font-semibold tracking-[0.1em] text-muted">
                    {String(active! + 1).padStart(2, '0')} / {String(P).padStart(2, '0')}
                  </span>
                </div>
                {prog.credit ? <span className="text-right text-[11px] text-slate-400">{prog.credit}</span> : null}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="index"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="flex flex-col gap-6"
            >
              <p className="max-w-[460px] text-[17px] leading-[1.75] text-muted">
                {t(
                  'Ada remaja yang butuh ruang aman untuk bercerita, pasien yang menunggu kantong darah, dan anak-anak yang belum pernah punya buku sendiri. Dari sanalah program kami bermula.',
                  'There are teenagers who need a safe place to talk, patients waiting for a blood bag, and children who have never owned a book. That is where our programs begin.',
                )}
              </p>
              <ul className="flex flex-col border-t border-line">
                {featuredPrograms.map((item, i) => (
                  <li key={item.slug} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => select(i)}
                      onPointerEnter={(e) => e.pointerType === 'mouse' && bringToFront(i)}
                      onFocus={() => bringToFront(i)}
                      className="group flex w-full items-center gap-5 py-4 text-left"
                    >
                      <span className="font-mono text-xs font-semibold text-slate-400 transition-colors group-hover:text-gold-deep">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex flex-1 flex-col gap-0.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5">
                        <span className="text-lg font-bold text-forest transition-colors group-hover:text-brand">{item.name}</span>
                        <span className="text-sm text-muted">{t(item.tagline)}</span>
                      </span>
                      <ArrowRight
                        className="size-5 -translate-x-2 text-brand opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        aria-hidden
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
