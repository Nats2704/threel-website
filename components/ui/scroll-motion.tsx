'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

/**
 * Gerak yang terikat posisi scroll (bukan sekali muncul seperti Reveal): elemen bergeser naik
 * pelan selama melintasi layar, sehingga halaman terasa berlapis saat di-scroll.
 */
export function ScrollDrift({
  children,
  className,
  range = [40, -40],
}: {
  children: React.ReactNode;
  className?: string;
  /** Geser vertikal (px) saat elemen masuk dari bawah layar -> saat keluar di atas layar. */
  range?: [number, number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : range);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Elemen selebar layar yang "membuka": mulai sedikit mengecil dengan sudut membulat,
 * lalu melebar penuh ke tepi layar saat di-scroll mendekati tengah.
 */
export function ScrollZoom({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.3'] });
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.9, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [36, 0]);

  return (
    <motion.div ref={ref} style={{ scale, borderRadius: radius }} className={className}>
      {children}
    </motion.div>
  );
}
