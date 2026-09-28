'use client';

import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';

/**
 * Kerumunan orang yang berjalan melintas di atas kanvas.
 *
 * Diadaptasi dari Skiper 39 (Skiper UI, https://skiper-ui.com) karya @gurvinder-singh02,
 * yang terinspirasi dari https://codepen.io/zadvorsky/pen/xxwbBQV. Ilustrasi: Open Peeps
 * (https://www.openpeeps.com/, CC0). Lisensi versi gratis Skiper UI mewajibkan atribusi ini.
 *
 * Perubahan dari versi asli: ukuran tokoh menyesuaikan tinggi wadah (bukan ukuran asli sprite),
 * ukuran kanvas mengikuti wadah lewat ResizeObserver, tidak menggambar saat di luar layar,
 * dan menampilkan satu bingkai diam bila pengunjung mematikan animasi.
 */

type Peep = {
  rect: [number, number, number, number];
  width: number;
  height: number;
  x: number;
  y: number;
  anchorY: number;
  scaleX: number;
  walk: gsap.core.Timeline | null;
};

const randomRange = (min: number, max: number) => min + Math.random() * (max - min);
const randomIndex = <T,>(array: T[]) => randomRange(0, array.length) | 0;
const removeAt = <T,>(array: T[], i: number) => array.splice(i, 1)[0];

export function CrowdCanvas({
  src,
  rows = 15,
  cols = 7,
  peepHeight = 0.62,
  className,
}: {
  /** Sprite sheet berisi tokoh yang disusun rapi dalam kisi. */
  src: string;
  /** Jumlah tokoh per baris di sprite sheet. */
  rows?: number;
  /** Jumlah baris di sprite sheet. */
  cols?: number;
  /** Tinggi tokoh relatif terhadap tinggi kanvas. */
  peepHeight?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const img = new Image();
    const stage = { width: 0, height: 0 };
    const allPeeps: Peep[] = [];
    const available: Peep[] = [];
    const crowd: Peep[] = [];
    let visible = true;
    let ready = false;

    const resetPeep = (peep: Peep) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      // Sebagian besar tokoh berjalan di depan; sedikit yang agak ke belakang.
      const offsetY = peep.height * 0.3 - peep.height * 0.75 * gsap.parseEase('power2.in')(Math.random());
      const startY = stage.height - peep.height + offsetY;
      const startX = direction === 1 ? -peep.width : stage.width + peep.width;
      const endX = direction === 1 ? stage.width : 0;
      peep.scaleX = direction;
      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;
      return { startY, endX };
    };

    const walk = (peep: Peep, { startY, endX }: { startY: number; endX: number }) => {
      const xDuration = 10;
      const yDuration = 0.25;
      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.5, 1.5));
      tl.to(peep, { duration: xDuration, x: endX, ease: 'none' }, 0);
      tl.to(peep, { duration: yDuration, repeat: xDuration / yDuration, yoyo: true, y: startY - peep.height * 0.03 }, 0);
      return tl;
    };

    const addPeep = (): Peep => {
      const peep = removeAt(available, randomIndex(available));
      peep.walk = walk(peep, resetPeep(peep)).eventCallback('onComplete', () => {
        removeAt(crowd, crowd.indexOf(peep));
        available.push(peep);
        addPeep();
      });
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      return peep;
    };

    const render = () => {
      if (!visible || !ready) return;
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      for (const peep of crowd) {
        ctx.save();
        ctx.translate(peep.x, peep.y);
        ctx.scale(peep.scaleX, 1);
        // Saat dicerminkan (berjalan ke kiri) gambar memanjang ke kiri dari x, jadi tokoh keluar
        // layar tepat saat x mencapai 0.
        ctx.drawImage(img, ...peep.rect, 0, 0, peep.width, peep.height);
        ctx.restore();
      }
      ctx.restore();
    };

    const resize = () => {
      if (!ready) return;
      const dpr = window.devicePixelRatio || 1;
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * dpr;
      canvas.height = stage.height * dpr;

      const scale = (stage.height * peepHeight) / allPeeps[0].rect[3];
      for (const peep of allPeeps) {
        peep.walk?.kill();
        peep.walk = null;
        peep.width = peep.rect[2] * scale;
        peep.height = peep.rect[3] * scale;
      }
      crowd.length = 0;
      available.length = 0;
      // Kepadatan mengikuti lebar: penuh di layar lebar (>= 1200px), lebih renggang di HP.
      const count = Math.max(12, Math.round(allPeeps.length * Math.min(1, stage.width / 1200)));
      const pool = [...allPeeps];
      while (available.length < count) available.push(removeAt(pool, randomIndex(pool)));
      while (available.length) addPeep().walk!.progress(Math.random());
      if (reduce) crowd.forEach((p) => p.walk!.pause());
      render();
    };

    img.onload = () => {
      const w = img.naturalWidth / rows;
      const h = img.naturalHeight / cols;
      for (let i = 0; i < rows * cols; i++) {
        allPeeps.push({
          rect: [(i % rows) * w, ((i / rows) | 0) * h, w, h],
          width: w,
          height: h,
          x: 0,
          y: 0,
          anchorY: 0,
          scaleX: 1,
          walk: null,
        });
      }
      ready = true;
      resize();
      if (!reduce) gsap.ticker.add(render);
    };
    img.src = src;

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    // Hemat baterai: berhenti menggambar saat kanvas tidak terlihat.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    return () => {
      ro.disconnect();
      io.disconnect();
      gsap.ticker.remove(render);
      allPeeps.forEach((p) => p.walk?.kill());
      img.onload = null;
    };
  }, [src, rows, cols, peepHeight]);

  return <canvas ref={canvasRef} aria-hidden className={cn('block h-full w-full', className)} />;
}
