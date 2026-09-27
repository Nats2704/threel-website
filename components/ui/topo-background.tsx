'use client';

import { useEffect, useRef } from 'react';

/**
 * Latar topografi beranimasi: garis kontur ditarik dari "peta ketinggian" halus yang pelan-pelan
 * bergeser, jadi bukit-bukitnya terlihat mengalir. Digambar di <canvas> dengan marching squares.
 * Berhenti saat tidak terlihat di layar; hanya satu bingkai diam bila pengguna memilih kurangi gerakan.
 */

const CELL = 8; // ukuran sel grid sampel (px CSS); makin kecil makin halus tapi makin berat
const STEP = 0.3; // jarak antar-garis kontur pada skala ketinggian
const FPS = 30;

// Peta ketinggian: jumlah gelombang sinus berarah berbeda -> gundukan organik tanpa pustaka noise.
const waves = [
  { dx: 0.9, dy: 0.45, k: 0.0085, s: 0.09, a: 1 },
  { dx: -0.35, dy: 0.95, k: 0.0102, s: -0.07, a: 0.8 },
  { dx: 0.7, dy: -0.7, k: 0.0131, s: 0.11, a: 0.55 },
  { dx: -0.95, dy: -0.25, k: 0.0074, s: 0.05, a: 0.9 },
  { dx: 0.2, dy: 0.98, k: 0.0166, s: -0.13, a: 0.35 },
];
function height(x: number, y: number, t: number) {
  let v = 0;
  for (const w of waves) v += w.a * Math.sin((x * w.dx + y * w.dy) * w.k + t * w.s + w.a * 3);
  // Suku perkalian membuat bentuk tidak terlalu seperti gelombang lurus.
  return v + 0.6 * Math.sin(x * 0.0061 + t * 0.06) * Math.cos(y * 0.0083 - t * 0.05);
}

export function TopoBackground({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let field = new Float32Array(0);
    let raf = 0;
    let last = 0;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CELL) + 1;
      rows = Math.ceil(h / CELL) + 1;
      field = new Float32Array(cols * rows);
    };

    const draw = (t: number) => {
      for (let j = 0; j < rows; j++)
        for (let i = 0; i < cols; i++) field[j * cols + i] = height(i * CELL, j * CELL, t);

      ctx.clearRect(0, 0, w, h);
      ctx.lineJoin = 'round';

      for (let n = -12; n <= 12; n++) {
        const lvl = n * STEP;
        const major = n % 4 === 0; // setiap garis ke-4 lebih tegas, seperti garis indeks peta
        ctx.beginPath();
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const a = field[j * cols + i];
            const b = field[j * cols + i + 1];
            const c = field[(j + 1) * cols + i + 1];
            const d = field[(j + 1) * cols + i];
            const idx = (a > lvl ? 8 : 0) | (b > lvl ? 4 : 0) | (c > lvl ? 2 : 0) | (d > lvl ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            const x = i * CELL;
            const y = j * CELL;
            // Titik potong di tiap sisi sel, diinterpolasi linear agar garis mulus.
            const top = () => [x + CELL * ((lvl - a) / (b - a)), y] as const;
            const right = () => [x + CELL, y + CELL * ((lvl - b) / (c - b))] as const;
            const bottom = () => [x + CELL * ((lvl - d) / (c - d)), y + CELL] as const;
            const left = () => [x, y + CELL * ((lvl - a) / (d - a))] as const;
            const seg = (p: readonly [number, number], q: readonly [number, number]) => {
              ctx.moveTo(p[0], p[1]);
              ctx.lineTo(q[0], q[1]);
            };
            switch (idx) {
              case 1: case 14: seg(left(), bottom()); break;
              case 2: case 13: seg(bottom(), right()); break;
              case 3: case 12: seg(left(), right()); break;
              case 4: case 11: seg(top(), right()); break;
              case 6: case 9: seg(top(), bottom()); break;
              case 7: case 8: seg(left(), top()); break;
              case 5: seg(left(), top()); seg(bottom(), right()); break;
              case 10: seg(top(), right()); seg(left(), bottom()); break;
            }
          }
        }
        ctx.strokeStyle = major ? 'rgba(143, 211, 182, 0.55)' : 'rgba(95, 191, 148, 0.28)';
        ctx.lineWidth = major ? 1.3 : 0.8;
        ctx.stroke();
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || now - last < 1000 / FPS) return;
      last = now;
      draw((now - start) / 1000);
    };

    resize();
    draw(0);
    const ro = new ResizeObserver(() => {
      resize();
      draw((performance.now() - start) / 1000);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    if (!reduced) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
