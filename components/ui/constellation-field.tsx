'use client';

import { useEffect, useRef } from 'react';

/**
 * Latar kisi titik yang bereaksi pada kursor, dengan palet hijau ThreeL.
 * - Titik di sekitar kursor terdorong menjauh lalu kembali seperti pegas.
 * - Sapuan cepat memicu gelombang kejut yang menjalar keluar.
 * - Titik yang "berenergi" menyala hijau dan saling terhubung membentuk konstelasi.
 * Kanvas mendengarkan gerak kursor pada elemen induknya, jadi tombol di atasnya tetap bisa diklik.
 */

type Node = { hx: number; hy: number; x: number; y: number; vx: number; vy: number; e: number; seed: number };
type Wave = { x: number; y: number; r: number; power: number };

const REST = { r: 159, g: 184, b: 170 }; // titik diam: hijau keabuan
const LIT = { r: 18, g: 128, b: 92 }; // brand-bright
const GOLD = '#E0B43C';
const LINK = 'rgba(15,107,79,'; // garis konstelasi (brand), alpha ditambahkan saat menggambar

export function ConstellationField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let nodes: Node[] = [];
    let cols = 0;
    let rows = 0;
    let gap = 72;
    let w = 0;
    let h = 0;
    const waves: Wave[] = [];
    const pointer = { x: -9999, y: -9999, px: -9999, py: -9999, speed: 0, inside: false, t: 0 };
    let raf = 0;
    let visible = true;

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host!.clientWidth;
      h = host!.clientHeight;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      gap = w < 640 ? 52 : 72;
      cols = Math.ceil(w / gap) + 1;
      rows = Math.ceil(h / gap) + 1;
      const ox = (w - (cols - 1) * gap) / 2;
      const oy = (h - (rows - 1) * gap) / 2;
      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const hx = ox + c * gap;
          const hy = oy + r * gap;
          nodes.push({ hx, hy, x: hx, y: hy, vx: 0, vy: 0, e: 0, seed: Math.random() * Math.PI * 2 });
        }
      }
      if (reduced) draw(0);
    }

    function step(time: number) {
      const radius = gap * 2.4 + Math.min(pointer.speed, 60) * 2.2;
      for (const n of nodes) {
        // Pegas kembali ke posisi asal, dengan redaman.
        n.vx += (n.hx - n.x) * 0.06;
        n.vy += (n.hy - n.y) * 0.06;

        if (pointer.inside) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < radius) {
            const f = (1 - d / radius) ** 2;
            const push = f * (0.6 + pointer.speed * 0.09);
            n.vx += (dx / d) * push;
            n.vy += (dy / d) * push;
            n.e = Math.min(1, n.e + f * (0.12 + pointer.speed * 0.02));
          }
        }

        for (const wv of waves) {
          const d = Math.hypot(n.hx - wv.x, n.hy - wv.y);
          const band = Math.abs(d - wv.r);
          if (band < 26) {
            const f = (1 - band / 26) * wv.power;
            const a = Math.atan2(n.hy - wv.y, n.hx - wv.x);
            n.vx += Math.cos(a) * f * 2.2;
            n.vy += Math.sin(a) * f * 2.2;
            n.e = Math.min(1, n.e + f * 0.35);
          }
        }

        n.vx *= 0.82;
        n.vy *= 0.82;
        n.x += n.vx;
        n.y += n.vy;
        n.e *= 0.965;
        // Denyut halus supaya kisi tetap terasa hidup saat tidak disentuh.
        n.x += Math.sin(time * 0.0006 + n.seed) * 0.05;
      }

      for (let i = waves.length - 1; i >= 0; i--) {
        waves[i].r += 9;
        waves[i].power *= 0.955;
        if (waves[i].power < 0.04 || waves[i].r > Math.max(w, h) * 1.2) waves.splice(i, 1);
      }
      pointer.speed *= 0.9;
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, w, h);

      // Garis kisi tipis antar tetangga kanan dan bawah.
      ctx!.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const n = nodes[r * cols + c];
          const right = c + 1 < cols ? nodes[r * cols + c + 1] : null;
          const down = r + 1 < rows ? nodes[(r + 1) * cols + c] : null;
          for (const m of [right, down]) {
            if (!m) continue;
            const e = Math.max(n.e, m.e);
            ctx!.strokeStyle = e > 0.05 ? `${LINK}${0.06 + e * 0.35})` : 'rgba(15,107,79,0.06)';
            ctx!.beginPath();
            ctx!.moveTo(n.x, n.y);
            ctx!.lineTo(m.x, m.y);
            ctx!.stroke();
          }
        }
      }

      // Garis konstelasi di antara titik yang sedang menyala.
      const lit = nodes.filter((n) => n.e > 0.25);
      const reach = gap * 1.9;
      for (let i = 0; i < lit.length; i++) {
        for (let j = i + 1; j < lit.length; j++) {
          const a = lit[i];
          const b = lit[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < reach) {
            ctx!.strokeStyle = `${LINK}${(1 - d / reach) * Math.min(a.e, b.e) * 0.7})`;
            ctx!.lineWidth = 1.2;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const n of nodes) {
        const e = n.e;
        const size = 1.6 + e * 4.2 + (Math.sin(time * 0.002 + n.seed) + 1) * 0.35;
        if (e > 0.82) {
          ctx!.fillStyle = GOLD;
        } else {
          const r = Math.round(REST.r + (LIT.r - REST.r) * e);
          const g = Math.round(REST.g + (LIT.g - REST.g) * e);
          const b = Math.round(REST.b + (LIT.b - REST.b) * e);
          ctx!.fillStyle = `rgba(${r},${g},${b},${0.55 + e * 0.45})`;
        }
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, size, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Koordinat kisi kecil di dekat kursor, seperti label peta bintang.
      if (pointer.inside && !reduced) {
        const c = Math.max(0, Math.round((pointer.x - nodes[0].hx) / gap));
        const r = Math.max(0, Math.round((pointer.y - nodes[0].hy) / gap));
        const label = `${String.fromCharCode(65 + (c % 26))}${Math.floor(c / 26) || ''}:${String(r).padStart(2, '0')}`;
        ctx!.font = '600 11px ui-monospace, monospace';
        ctx!.fillStyle = 'rgba(15,107,79,0.75)';
        ctx!.fillText(label, pointer.x + 14, pointer.y - 12);
        ctx!.strokeStyle = 'rgba(15,107,79,0.18)';
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.arc(pointer.x, pointer.y, 34, 0, Math.PI * 2);
        ctx!.stroke();
      }
    }

    function loop(time: number) {
      raf = 0;
      if (!visible) return;
      step(time);
      draw(time);
      raf = requestAnimationFrame(loop);
    }

    function onMove(e: PointerEvent) {
      const rect = host!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();
      if (pointer.inside) {
        const dt = Math.max(16, now - pointer.t);
        const speed = (Math.hypot(x - pointer.x, y - pointer.y) / dt) * 16;
        pointer.speed = Math.max(pointer.speed * 0.6, speed);
        // Sapuan cepat melepaskan gelombang kejut (dibatasi supaya tidak menumpuk).
        if (speed > 38 && waves.length < 4) waves.push({ x, y, r: 0, power: Math.min(1, speed / 90) });
      }
      pointer.x = x;
      pointer.y = y;
      pointer.t = now;
      pointer.inside = true;
    }
    function onLeave() {
      pointer.inside = false;
      pointer.speed = 0;
    }

    build();
    const ro = new ResizeObserver(build);
    ro.observe(host);

    if (reduced) {
      return () => ro.disconnect();
    }

    // Animasi hanya berjalan saat bagian ini terlihat di layar.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(loop);
    });
    io.observe(host);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
