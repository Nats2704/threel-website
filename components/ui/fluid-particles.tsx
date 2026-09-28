'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';

/**
 * Partikel yang mengalir mengikuti medan arus (flow field) yang pelan-pelan berubah, meninggalkan
 * jejak tipis seperti aliran air. Kanvas transparan, jadi bisa diletakkan di atas latar apa pun.
 *
 * - Gerak halus: kecepatan partikel mendekati arah arus secara bertahap (inersia), bukan langsung.
 * - Kursor mendorong partikel di sekitarnya dengan lembut.
 * - Berhenti menggambar saat di luar layar; satu gambar diam bila pengunjung mematikan animasi.
 */

// Warna brand: hijau dominan, sedikit emas sebagai aksen.
const PALETTE = [
  'rgba(15,107,79,0.55)',
  'rgba(18,128,92,0.5)',
  'rgba(15,107,79,0.55)',
  'rgba(167,196,181,0.7)',
  'rgba(212,167,44,0.55)',
];

type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; color: string };

export function FluidParticles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: -9999, y: -9999, active: false };
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let visible = true;
    let raf = 0;
    let prev = performance.now();
    let time = Math.random() * 1000;

    const spawn = (p?: Particle): Particle => {
      const q = p ?? ({} as Particle);
      q.x = Math.random() * width;
      q.y = Math.random() * height;
      q.vx = 0;
      q.vy = 0;
      q.life = 0;
      q.max = 6 + Math.random() * 9;
      q.color = PALETTE[(Math.random() * PALETTE.length) | 0];
      return q;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';
      const count = Math.min(700, Math.max(140, Math.round((width * height) / 4200)));
      particles = Array.from({ length: count }, () => {
        const p = spawn();
        p.life = Math.random() * p.max;
        return p;
      });
    };

    /** Arah arus di titik (x, y) pada waktu t: jumlah gelombang sinus yang bergeser pelan. */
    const flowAngle = (x: number, y: number, t: number) => {
      const u = x / 280;
      const v = y / 280;
      const a = Math.sin(u * 1.3 + t * 0.15) + Math.sin(v * 1.7 - t * 0.12) + Math.sin((u + v) * 0.9 + t * 0.08);
      // Sedikit condong ke kanan supaya aliran terasa punya arah, bukan berputar di tempat.
      return a * Math.PI * 0.55 + 0.25;
    };

    const step = (dt: number) => {
      time += dt;
      // Pudarkan gambar lama sedikit demi sedikit (jejak), tanpa mewarnai latar.
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = `rgba(0,0,0,${1 - Math.pow(1 - 0.075, dt * 60)})`;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = 1.4;

      const speed = 34;
      const ease = 1 - Math.exp(-dt * 2.2);
      for (const p of particles) {
        const angle = flowAngle(p.x, p.y, time);
        let tx = Math.cos(angle) * speed;
        let ty = Math.sin(angle) * speed;
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 150 * 150) {
            const push = (1 - Math.sqrt(d2) / 150) * 120;
            const d = Math.sqrt(d2) || 1;
            tx += (dx / d) * push;
            ty += (dy / d) * push;
          }
        }
        p.vx += (tx - p.vx) * ease;
        p.vy += (ty - p.vy) * ease;

        const x0 = p.x;
        const y0 = p.y;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life += dt;

        // Muncul dan hilang perlahan di awal dan akhir umurnya.
        const fade = Math.min(1, p.life / 1.2, (p.max - p.life) / 1.2);
        if (fade > 0) {
          ctx.globalAlpha = fade;
          ctx.strokeStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
        if (p.life > p.max || p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20) spawn(p);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      // Batasi dt supaya tidak melompat setelah tab disembunyikan.
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      if (visible) step(dt);
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduce) {
      // Satu gambar diam: jalankan simulasi sebentar tanpa ditampilkan bertahap.
      for (let i = 0; i < 240; i++) step(1 / 60);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    // Kanvas fixed selalu 'terlihat'; yang dipantau adalah area bagian halaman yang dibungkusnya.
    io.observe(canvas.closest('[data-fluid-root]') ?? canvas);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={cn('block h-full w-full', className)} />;
}

/**
 * Latar partikel untuk satu bagian halaman: kanvas menempel di layar (fixed) tetapi dipotong
 * oleh pembungkus, jadi hanya terlihat di area bagian-bagian yang dibungkus.
 */
export function FluidBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <div data-fluid-root className="relative isolate [clip-path:inset(0)]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(180deg,#eef6f1_0%,#f7fbf9_45%,#ffffff_100%)]"
      >
        <FluidParticles />
      </div>
      {children}
    </div>
  );
}
