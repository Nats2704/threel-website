'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { BookOpen, Eye, FileText, Flag, Gauge, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useLang } from '@/lib/i18n';
import { Container } from '@/components/ui/section';
import { RoadCar } from './road-car';
import type { workflow } from '@/lib/content';

type Step = (typeof workflow)[number];

// Ikon per nomor tahap, urut sesuai workflow.
const icons: Record<string, LucideIcon> = { '01': Eye, '02': BookOpen, '03': Flag, '04': Gauge, '05': FileText };
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Satu baris roadmap: jalur di tengah, tahap bergantian di atas dan di bawahnya.
 * Grid 3 baris (1fr, jalur, 1fr) dibagi ke tiap <li> lewat subgrid, jadi semua tangkai bertemu jalur di garis yang sama.
 */
function Roadmap({
  steps,
  compact = false,
  active,
  onActive,
  road,
}: {
  steps: readonly Step[];
  compact?: boolean;
  active: number | null;
  onActive?: (i: number | null) => void;
  /** Isi tambahan di atas jalur, mis. mobil yang melaju. */
  road?: React.ReactNode;
}) {
  return (
    <div className={cn('relative', compact && 'w-max pl-4 pr-20')}>
      {/* Jalur: pita lembut dengan garis putus-putus yang mengalir */}
      <div aria-hidden className="absolute inset-x-0 top-1/2 h-10 -translate-y-1/2 rounded-full bg-white/[0.07]">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="dash-flow absolute inset-x-5 top-1/2 h-0.5 origin-left -translate-y-1/2"
        />
      </div>

      <ol
        className={cn(
          'relative grid grid-rows-[1fr_auto_1fr]',
          compact ? 'auto-cols-[196px] grid-flow-col' : 'grid-cols-5',
        )}
      >
        {steps.map((s, i) => (
          <Stage key={s.no} step={s} index={i} up={i % 2 === 0} compact={compact} lit={active === i} onActive={onActive} />
        ))}
      </ol>

      {/* Lapisan jalan di atas titik-titik tahap, supaya mobil terlihat melintasinya */}
      {road ? <div className="pointer-events-none absolute inset-x-0 top-1/2 h-10 -translate-y-1/2">{road}</div> : null}
    </div>
  );
}

function Stage({
  step,
  index,
  up,
  compact,
  lit,
  onActive,
}: {
  step: Step;
  index: number;
  up: boolean;
  compact: boolean;
  lit: boolean;
  onActive?: (i: number | null) => void;
}) {
  const { t } = useLang();
  const Icon = icons[step.no] ?? Flag;
  const tone = step.gold
    ? { fill: 'bg-gold', ring: 'border-gold', text: 'text-gold', stem: 'bg-gold/70', glow: 'shadow-[0_0_0_8px_rgba(242,201,76,0.14)]' }
    : { fill: 'bg-white', ring: 'border-white', text: 'text-sage-muted', stem: 'bg-white/50', glow: 'shadow-[0_0_0_8px_rgba(255,255,255,0.12)]' };

  // Desktop: muncul berurutan kiri ke kanan. HP: tiap tahap muncul saat masuk layar, jadi cukup jeda kecil.
  const base = compact ? 0.05 : 0.35 + index * 0.16;
  const pop = (d: number) => ({
    hidden: { opacity: 0, scale: 0.4 },
    show: { opacity: 1, scale: 1, transition: { delay: base + d, type: 'spring' as const, visualDuration: 0.45, bounce: 0.35 } },
  });
  const grow = {
    hidden: { scaleY: 0 },
    show: { scaleY: 1, transition: { delay: base, duration: 0.35, ease: EASE } },
  };
  const rise = {
    hidden: { opacity: 0, y: up ? 14 : -14, filter: 'blur(6px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { delay: base + 0.22, duration: 0.5, ease: EASE } },
  };

  const stem = (
    <motion.span
      variants={grow}
      className={cn('ml-[15px] block w-0.5', compact ? 'h-6' : 'h-8', up ? 'origin-bottom' : 'origin-top', tone.stem)}
    />
  );
  const iconRow = (
    <div className="flex items-center">
      <motion.span
        variants={pop(0.1)}
        className={cn('flex size-8 shrink-0 items-center justify-center rounded-full border-2 bg-forest', tone.ring)}
      >
        <span className={cn('size-2.5 rounded-full', tone.fill)} />
      </motion.span>
      <motion.span variants={grow} className={cn('h-0.5 w-4 origin-left', tone.stem)} />
      <motion.span
        variants={pop(0.16)}
        className={cn(
          'relative flex shrink-0 items-center justify-center rounded-full text-forest transition-shadow duration-300',
          compact ? 'size-14' : 'size-[72px]',
          tone.fill,
          lit && tone.glow,
        )}
      >
        <Icon className={compact ? 'size-6' : 'size-8'} strokeWidth={1.8} aria-hidden />
        {/* Kilap melengkung di tepi lingkaran */}
        <span aria-hidden className="absolute inset-1.5 rotate-[-25deg] rounded-full border-2 border-transparent border-b-white/45" />
      </motion.span>
    </div>
  );
  const card = (
    <motion.div
      variants={rise}
      className={cn(
        'rounded-2xl border p-4 transition-colors duration-300',
        compact ? 'w-[224px]' : 'w-[244px] p-5',
        lit ? 'border-white/25 bg-white/[0.11]' : 'border-white/12 bg-white/[0.06]',
      )}
    >
      <span className={cn('flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.14em]', tone.text)}>
        <span className="rounded border border-current px-1 py-px text-[10px] tracking-normal opacity-80">{step.no}</span>
        {t(step.tag)}
      </span>
      <h3 className={cn('mt-1.5 font-extrabold leading-snug text-white', compact ? 'text-base' : 'text-[17px]')}>
        {t(step.title)}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-sage">{t(step.desc)}</p>
    </motion.div>
  );

  return (
    <motion.li
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="row-span-3 grid grid-rows-subgrid"
    >
      <motion.div
        onHoverStart={() => onActive?.(index)}
        onHoverEnd={() => onActive?.(null)}
        animate={{ scale: lit ? 1.05 : 1 }}
        transition={{ type: 'spring', visualDuration: 0.35, bounce: 0.2 }}
        className={cn(
          'flex flex-col items-start',
          up ? 'row-start-1 origin-bottom-left self-end' : 'row-start-3 origin-top-left self-start',
        )}
      >
        {up ? (
          <>
            <div className="mb-3">{card}</div>
            {iconRow}
            {stem}
          </>
        ) : (
          <>
            {stem}
            {iconRow}
            <div className="mt-3">{card}</div>
          </>
        )}
      </motion.div>

      {/* Titik di jalur, disambung setengah tangkai ke arah tahapnya */}
      <div aria-hidden className="relative row-start-2 h-10">
        <motion.span
          variants={grow}
          className={cn('absolute left-[15px] h-5 w-0.5', up ? 'top-0 origin-bottom' : 'bottom-0 origin-top', tone.stem)}
        />
        <motion.span
          variants={pop(0)}
          className={cn('absolute left-[10px] top-1/2 size-3 -translate-y-1/2 rounded-full', tone.fill, lit && 'ring-4 ring-white/15')}
        />
      </div>
    </motion.li>
  );
}

/** HP: timeline ditahan di layar dan digeser ke kanan seiring halaman di-scroll ke bawah. */
function PinnedRoadmap({ steps }: { steps: readonly Step[] }) {
  const outer = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [active, setActive] = useState<number | null>(0);

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const measure = () => setDist(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 32, mass: 0.4 });
  const x = useTransform(progress, (p) => -p * dist);
  const bar = useTransform(progress, [0, 1], ['0%', '100%']);
  useMotionValueEvent(progress, 'change', (p) => setActive(Math.round(p * (steps.length - 1))));

  return (
    // Tinggi ekstra = jarak geser horizontal, jadi 1px scroll vertikal = 1px geser horizontal.
    <div ref={outer} style={{ height: `calc(100svh + ${dist}px)` }}>
      <div className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col justify-center gap-8 overflow-hidden">
        <motion.div ref={row} style={{ x }} className="w-max">
          <Roadmap steps={steps} compact active={active} road={<RoadCar width={64} progress={progress} />} />
        </motion.div>
        <div className="mx-4 flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-gold">
            {String((active ?? 0) + 1).padStart(2, '0')}
          </span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.div style={{ width: bar }} className="h-full rounded-full bg-gold" />
          </div>
          <span className="font-mono text-xs font-semibold text-sage-muted">{String(steps.length).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
}

export function WorkflowTimeline({ steps }: { steps: readonly Step[] }) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <Container className="hidden lg:block">
        <Roadmap steps={steps} active={hovered} onActive={setHovered} road={<RoadCar width={84} />} />
      </Container>
      <div className="lg:hidden">
        {reduced ? (
          // Tanpa animasi scroll: cukup geser manual.
          <div className="overflow-x-auto pb-4">
            <Roadmap steps={steps} compact active={null} road={<RoadCar width={64} />} />
          </div>
        ) : (
          <PinnedRoadmap steps={steps} />
        )}
      </div>
    </>
  );
}
