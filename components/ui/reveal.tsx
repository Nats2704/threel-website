'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

type State = 'static' | 'waiting' | 'in';

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'article' | 'li';
}) {
  const ref = useRef<HTMLElement>(null);
  // Mulai 'static' agar konten tetap terlihat tanpa JavaScript dan elemen di atas lipatan tidak berkedip.
  const [state, setState] = useState<State>('static');

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    setState('waiting');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState('in');
        io.disconnect();
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn(state !== 'static' && 'reveal', state === 'in' && 'is-in', className)}
      style={delay ? ({ '--d': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
