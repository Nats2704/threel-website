'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

/**
 * Latar ilustrasi untuk satu halaman yang bergeser lebih lambat dari konten saat di-scroll (parallax).
 * Lapisan latar `fixed` dan dipotong oleh clip-path pembungkus, jadi tidak ikut menutupi footer.
 * Tirai putih di atas foto menjaga teks tetap terbaca.
 */
export function ParallaxBackdrop({ src, children }: { src: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '-16%']);
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.04, 1.14]);

  return (
    <div ref={ref} className="relative isolate [clip-path:inset(0)]">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-white">
        <motion.div style={{ y, scale }} className="absolute inset-x-0 top-0 h-[125vh] origin-top">
          <Image src={src} alt="" fill sizes="100vw" className="object-cover object-[center_40%] opacity-60" />
        </motion.div>
        {/* Tirai: lebih pekat di tengah layar (tempat teks) dan sedikit lebih tipis di tepi atas-bawah. */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/75 to-white/60" />
      </div>
      {children}
    </div>
  );
}
