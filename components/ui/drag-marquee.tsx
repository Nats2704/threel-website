'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/cn';

/**
 * Pita kartu yang berjalan sendiri dan bisa digeser (mouse/sentuh).
 * Anak-anaknya harus berupa dua paruh identik agar posisi bisa dibungkus tanpa sambungan.
 * Setelah dilepas, lemparan geser melambat lalu menyatu kembali ke kecepatan otomatis.
 */
export function DragMarquee({
  children,
  speed = 48,
  className,
}: {
  children: React.ReactNode;
  /** Kecepatan otomatis dalam px per detik. */
  speed?: number;
  className?: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const x = useMotionValue(0);
  const reduced = useReducedMotion();
  const s = useRef({ period: 0, vel: -speed, dragging: false, hover: false, lastX: 0, lastT: 0 });

  // Jarak satu paruh: dari kartu pertama ke kartu pertama paruh kedua (termasuk celah).
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      const items = el.children;
      const mid = items[items.length / 2] as HTMLElement | undefined;
      s.current.period = mid ? mid.offsetLeft - (items[0] as HTMLElement).offsetLeft : 0;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const wrap = (v: number) => {
    const p = s.current.period;
    return p ? ((v % p) - p) % p : v;
  };

  useAnimationFrame((_, dt) => {
    const st = s.current;
    if (st.dragging || !st.period) return;
    const target = reduced ? 0 : st.hover ? -speed * 0.3 : -speed;
    // Kecepatan mendekati target secara eksponensial: lemparan cepat meluruh halus, bukan berhenti mendadak.
    st.vel += (target - st.vel) * (1 - Math.exp(-dt / 450));
    x.set(wrap(x.get() + (st.vel * dt) / 1000));
  });

  const onPointerDown = (e: React.PointerEvent) => {
    const st = s.current;
    st.dragging = true;
    st.lastX = e.clientX;
    st.lastT = e.timeStamp;
    st.vel = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const st = s.current;
    if (!st.dragging) return;
    const dx = e.clientX - st.lastX;
    const dt = Math.max(e.timeStamp - st.lastT, 1);
    x.set(wrap(x.get() + dx));
    // Rata-rata bergerak supaya satu event yang tersendat tidak menghasilkan lemparan liar.
    st.vel = st.vel * 0.6 + ((dx / dt) * 1000) * 0.4;
    st.lastX = e.clientX;
    st.lastT = e.timeStamp;
  };
  const onPointerUp = () => {
    s.current.dragging = false;
  };

  return (
    <motion.ul
      ref={track}
      style={{ x }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerEnter={() => (s.current.hover = true)}
      onPointerLeave={() => (s.current.hover = false)}
      className={cn('flex w-max cursor-grab touch-pan-y select-none active:cursor-grabbing', className)}
    >
      {children}
    </motion.ul>
  );
}
