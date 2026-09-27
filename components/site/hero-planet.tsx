'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import type { PlanetControls } from '@/components/ui/planet-scene';
import { GLOBE_CENTER_X } from '@/components/ui/planet-layout';

const PlanetScene = dynamic(() => import('@/components/ui/planet-scene'), { ssr: false });

export function HeroPlanet() {
  const wrap = useRef<HTMLDivElement>(null);
  const controls = useRef<PlanetControls>({
    paused: false,
    reduced: false,
    dragging: false,
    dragDx: 0,
    dragDy: 0,
    lastInteraction: 0,
  });
  const last = useRef<{ x: number; y: number } | null>(null);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => (controls.current.reduced = mq.matches);
    sync();
    mq.addEventListener('change', sync);
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => {
      mq.removeEventListener('change', sync);
      io.disconnect();
    };
  }, []);

  const endDrag = () => {
    controls.current.dragging = false;
    controls.current.lastInteraction = performance.now();
    last.current = null;
  };

  return (
    <div ref={wrap} className="absolute inset-0">
      <div
        aria-hidden
        className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          last.current = { x: e.clientX, y: e.clientY };
          controls.current.dragging = true;
        }}
        onPointerMove={(e) => {
          if (!last.current) return;
          controls.current.dragDx += e.clientX - last.current.x;
          controls.current.dragDy += e.clientY - last.current.y;
          last.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <PlanetScene controls={controls} active={active} />
      </div>

      <button
        type="button"
        onClick={() => {
          const next = !paused;
          controls.current.paused = next;
          setPaused(next);
        }}
        aria-pressed={paused}
        style={{ '--globe-x': `${GLOBE_CENTER_X * 100}%` } as React.CSSProperties}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 lg:left-[var(--globe-x)] items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 font-mono text-[11px] font-semibold tracking-[0.08em] text-forest backdrop-blur transition hover:bg-white"
      >
        {paused ? <Play className="size-3" aria-hidden /> : <Pause className="size-3" aria-hidden />}
        {paused ? 'LANJUTKAN' : 'JEDA & SAPA'}
      </button>
    </div>
  );
}
