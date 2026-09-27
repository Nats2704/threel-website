'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'motion/react';

// Proporsi gambar mobil (viewBox) dan jari-jari roda di dalamnya.
const VB_W = 882;
const VB_H = 500;
const WHEEL_R = 108;
const SPEED = 110; // px per detik untuk mode jalan sendiri (desktop)

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * Mobil yang melaju di atas jalur roadmap.
 * - Tanpa `progress`: jalan sendiri kiri → kanan tanpa henti, lalu muncul lagi dari kiri.
 * - Dengan `progress` (0–1): posisinya mengikuti scroll, jadi mobil hanya bergerak saat halaman digulir.
 * Semua gerak turunan (putaran roda, goyangan, anggukan) dihitung dari "odometer" jarak tempuh,
 * sehingga saat mobil berhenti, roda dan badannya ikut diam.
 */
export function RoadCar({ width, progress }: { width: number; progress?: MotionValue<number> }) {
  const layer = useRef<HTMLDivElement>(null);
  const layerW = useRef(0);
  const reduced = useReducedMotion();
  // Mulai sedikit masuk dari kiri supaya mobil langsung terlihat.
  const odo = useMotionValue(width + 24);

  useEffect(() => {
    const el = layer.current;
    if (!el) return;
    const measure = () => (layerW.current = el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Mode scroll: jarak tempuh = progres × panjang jalan.
  useEffect(() => {
    if (!progress) return;
    const sync = (p: number) => odo.set(p * Math.max(0, layerW.current - width));
    sync(progress.get());
    return progress.on('change', sync);
  }, [progress, odo, width]);

  // Mode jalan sendiri.
  useAnimationFrame((_, dt) => {
    if (progress || reduced || !layerW.current) return;
    odo.set(odo.get() + (SPEED * Math.min(dt, 64)) / 1000);
  });

  const x = useTransform(odo, (o) => {
    if (progress) return o;
    const loop = layerW.current + width;
    return loop > width ? (((o % loop) + loop) % loop) - width : o;
  });

  // Roda berputar sesuai jarak: sudut = jarak / jari-jari.
  const wheelPx = (WHEEL_R / VB_W) * width;
  const wheel = useTransform(odo, (o) => (o / wheelPx) * (180 / Math.PI));

  // Guncangan jalan kecil yang hanya terjadi saat mobil bergerak.
  const bob = useTransform(odo, (o) => Math.sin(o / 23) * 0.7 + Math.sin(o / 8.5) * 0.3);

  // Anggukan badan: saat mempercepat, hidung sedikit terangkat; saat melambat, sedikit menukik.
  const vel = useVelocity(odo);
  const lagged = useSpring(vel, { stiffness: 60, damping: 14 });
  const pitch = useTransform(() => clamp((lagged.get() - vel.get()) / 260, -4, 4));

  const height = (VB_H / VB_W) * width;

  return (
    <div
      ref={layer}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-1.5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]"
      style={{ height: height + 12 }}
    >
      <motion.div className="absolute bottom-0 left-0" style={{ x, width, height }}>
        {/* Bayangan di aspal */}
        <span className="absolute -bottom-0.5 left-[6%] h-2 w-[88%] rounded-full bg-black/35 blur-[3px]" />
        <motion.div className="relative size-full" style={{ y: bob, rotate: pitch, originX: 0.45, originY: 1 }}>
          <CarSvg wheel={wheel} />
        </motion.div>
      </motion.div>
    </div>
  );
}

function Wheel({ cx, rotate }: { cx: number; rotate: MotionValue<number> }) {
  return (
    <motion.g style={{ rotate }}>
      <circle cx={cx} cy={604} r={WHEEL_R} fill="#000" />
      {/* Garis ban tipis supaya putaran roda terlihat */}
      {[0, 90, 180, 270].map((a) => (
        <rect key={a} x={cx - 3} y={604 - 96} width={6} height={30} rx={3} fill="#2b2b2b" transform={`rotate(${a} ${cx} 604)`} />
      ))}
      <circle cx={cx} cy={604} r={38} fill="#C1D72E" />
      <circle cx={cx + 20} cy={604} r={7} fill="#9DB224" />
    </motion.g>
  );
}

function CarSvg({ wheel }: { wheel: MotionValue<number> }) {
  return (
    <svg viewBox={`18 218 ${VB_W} ${VB_H}`} className="block size-full overflow-visible">
      <rect x={20} y={595} width={876} height={45} rx={22} fill="#00B2B1" />
      <path
        d="M45 600 C45 520 80 440 165 425 C200 300 320 222 445 222 C590 222 690 320 718 418 C820 430 880 490 880 600 L880 630 L45 630 Z"
        fill="#E61937"
      />
      <path d="M212 422 C240 330 330 262 435 258 L435 422 Z" fill="#fff" />
      <path d="M458 258 C560 262 630 330 662 422 L458 422 Z" fill="#fff" />
      <rect x={215} y={443} width={58} height={22} rx={11} fill="#0056A7" />
      <rect x={458} y={443} width={60} height={22} rx={11} fill="#0056A7" />
      <circle cx={815} cy={522} r={30} fill="#F8901D" />
      <Wheel cx={220} rotate={wheel} />
      <Wheel cx={671} rotate={wheel} />
    </svg>
  );
}
