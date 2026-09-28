'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/lib/cn';

/**
 * Latar ilustrasi yang bergeser saat di-scroll (parallax).
 * Lapisan latar `fixed` dan dipotong oleh clip-path pembungkus, jadi hanya terlihat di area
 * pembungkus dan tidak ikut menutupi bagian lain maupun footer.
 *
 * - `direction`: 'up' = gambar naik pelan (lebih lambat dari konten); 'down' = gambar ikut turun
 *   saat pengunjung menggulir ke bawah.
 * - `tone`: 'soft' = gambar dipudarkan di balik tirai putih tebal; 'vivid' = gambar lebih pudar
 *   (40%) tetapi tirainya tipis, jadi warnanya tetap terasa tanpa menutupi tulisan.
 */
export function ParallaxBackdrop({
  src,
  children,
  direction = 'up',
  tone = 'soft',
}: {
  src: string;
  children: React.ReactNode;
  direction?: 'up' | 'down';
  tone?: 'soft' | 'vivid';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // Gambar 125vh; bergeser paling jauh 16% dari tingginya supaya tepinya tidak pernah terlihat.
  const range = direction === 'up' ? ['0%', '-16%'] : ['-16%', '0%'];
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : range);
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.04, 1.14]);

  return (
    <div ref={ref} className="relative isolate [clip-path:inset(0)]">
      {/* overflow-hidden: gambar yang diperbesar (scale) tidak boleh melebarkan halaman di HP. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white">
        <motion.div style={{ y, scale }} className="absolute inset-x-0 top-0 h-[125vh] origin-top">
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            className={cn('object-cover object-[center_40%]', tone === 'soft' ? 'opacity-60' : 'opacity-40')}
          />
        </motion.div>
        {/* Tirai: lebih pekat di bagian yang biasanya berisi teks, lebih tipis di tepi. */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-b',
            tone === 'soft' ? 'from-white/55 via-white/75 to-white/60' : 'from-white/60 via-white/25 to-white/45',
          )}
        />
      </div>
      {children}
    </div>
  );
}
