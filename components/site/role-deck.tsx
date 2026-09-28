'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  FileText,
  HeartHandshake,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { divisionGroups } from '@/lib/content';
import type { RecruitmentStatus } from '@/lib/recruitment';
import { LeadershipIcon, TeamHandsIcon } from '@/components/ui/icons';
import { StatusBadge } from '@/components/ui/status-badge';

type RoleId = 'bod' | 'associate' | 'member';

type Role = {
  id: RoleId;
  no: string;
  tag: string;
  status: RecruitmentStatus | 'rolling';
  icon: LucideIcon | typeof LeadershipIcon | typeof TeamHandsIcon;
  title: string;
  subtitle: string;
  desc: string;
  chips?: string[];
  facts: { icon: LucideIcon; text: string }[];
  href: string;
  cta: string;
  theme: {
    surface: string;
    title: string;
    accent: string;
    muted: string;
    iconBox: string;
    divider: string;
    chip: string;
    button: string;
    close: string;
  };
};

const waitlistCta = (s: RecruitmentStatus, open: string) => (s === 'waitlist' ? 'Join the waitlist' : open);

function buildRoles(bod: RecruitmentStatus, associate: RecruitmentStatus, member: RecruitmentStatus): Role[] {
  return [
    {
      id: 'bod',
      no: '01',
      tag: 'C-Level',
      status: bod,
      icon: LeadershipIcon,
      title: 'Board of Director',
      subtitle: 'Strategic Executive Leadership',
      desc: 'The highest leadership body, responsible for strategic direction, key decision making, and oversight of all operations so the organization stays aligned with the impact, vision, and mission it aims to achieve.',
      facts: [
        { icon: Users, text: '5 positions (CMO, CHRO, CFO, COO, CIDO)' },
        { icon: Clock, text: 'At least 15–20 hours per week' },
        { icon: FileText, text: 'CV, leadership portfolio, and 2 essays' },
      ],
      href: '/daftar/bod',
      cta: waitlistCta(bod, 'Apply as BoD'),
      theme: {
        surface: 'bg-forest border-white/10',
        title: 'text-white',
        accent: 'text-gold',
        muted: 'text-sage',
        iconBox: 'bg-gold text-forest',
        divider: 'border-white/15',
        chip: 'bg-white/10 text-white',
        button: 'bg-gold text-forest hover:bg-gold-soft',
        close: 'text-sage hover:bg-white/10 hover:text-white',
      },
    },
    {
      id: 'associate',
      no: '02',
      tag: 'Division',
      status: associate,
      icon: TeamHandsIcon,
      title: 'Associate',
      subtitle: 'Division Managers & Staff',
      desc: 'For program executors and technical managers who want to contribute through their expertise.',
      chips: Object.keys(divisionGroups),
      facts: [
        { icon: Clock, text: '8–12 hours per week' },
        { icon: FileText, text: 'CV, technical portfolio, and a case study' },
      ],
      href: '/daftar/associate',
      cta: waitlistCta(associate, 'Apply as Associate'),
      theme: {
        surface: 'bg-white border-line',
        title: 'text-forest',
        accent: 'text-brand',
        muted: 'text-muted',
        iconBox: 'bg-brand text-white',
        divider: 'border-line',
        chip: 'bg-mint text-forest',
        button: 'bg-brand text-white hover:bg-forest',
        close: 'text-muted hover:bg-mint hover:text-forest',
      },
    },
    {
      id: 'member',
      no: '03',
      tag: 'Volunteer',
      status: member,
      icon: HeartHandshake,
      title: 'Member / Volunteer',
      subtitle: 'ThreeLearnian',
      desc: 'Join social action whenever you can, from teaching and blood drives to urban farming.',
      facts: [
        { icon: Clock, text: 'Flexible time, per activity' },
        { icon: Check, text: 'Selection process through FGD only' },
      ],
      href: '/daftar/member',
      cta: waitlistCta(member, 'Join as a ThreeLearnian'),
      theme: {
        surface: 'bg-mint border-mint-line',
        title: 'text-forest',
        accent: 'text-brand',
        muted: 'text-muted',
        iconBox: 'bg-gold text-forest',
        divider: 'border-mint-line',
        chip: 'bg-white text-forest',
        button: 'bg-forest text-white hover:bg-brand',
        close: 'text-muted hover:bg-white hover:text-forest',
      },
    },
  ];
}

// Posisi tiap slot di rak: bergeser serong ke kanan-bawah seperti tumpukan kartu.
const SLOT = ['', 'ml-8 mt-14 sm:ml-14 sm:mt-[72px]', 'ml-16 mt-28 sm:ml-28 sm:mt-36'];
const CARD_SIZE = 'h-[164px] w-[290px] sm:h-[184px] sm:w-[400px]';
const RADIUS = 28;
const SKEW = -8;
const EASE = [0.22, 1, 0.36, 1] as const;
// Isi kartu di rak memudar masuk setelah kartu selesai kembali ke tempatnya.
const settleIn = { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.2, duration: 0.35, ease: EASE } };

/** Nomor opsi dalam lencana kecil, diikuti nama jalurnya. */
function OptionTag({ role, className }: { role: Role; className?: string }) {
  return (
    <span className={cn('flex items-center gap-2 whitespace-nowrap font-mono font-semibold uppercase tracking-[0.12em]', role.theme.accent, className)}>
      <span className="rounded-md border border-current px-1.5 py-0.5 tracking-normal">{role.no}</span>
      {role.tag}
    </span>
  );
}

function RackCard({
  role,
  front,
  animateIn,
  onOpen,
  buttonRef,
}: {
  role: Role;
  front: boolean;
  animateIn: boolean;
  onOpen: () => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
}) {
  const t = role.theme;
  const Icon = role.icon;
  const fade = animateIn ? settleIn : {};
  return (
    <motion.button
      ref={buttonRef}
      type="button"
      layoutId={`role-${role.id}`}
      onClick={onOpen}
      aria-expanded={false}
      aria-controls="role-stage"
      initial={animateIn ? { skewY: 0 } : false}
      animate={{ skewY: SKEW }}
      whileHover={{ y: -16 }}
      whileFocus={{ y: -16 }}
      style={{ borderRadius: RADIUS }}
      className={cn(
        'group flex cursor-pointer flex-col justify-between border p-5 text-left shadow-[0_20px_40px_-28px_rgba(11,59,46,0.55)] transition-[filter] duration-500 [grid-area:stack] sm:p-6',
        CARD_SIZE,
        t.surface,
        !front && 'saturate-[.35] hover:saturate-100 focus-visible:saturate-100',
      )}
    >
      <motion.div layout="position" {...fade} className="flex w-full items-center justify-between gap-3">
        <OptionTag role={role} className="text-[11px]" />
        <StatusBadge status={role.status} size="sm" />
      </motion.div>
      <motion.div layout="position" {...fade} className="flex items-center gap-3">
        <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-xl sm:size-12', t.iconBox)}>
          <Icon className="size-5 sm:size-6" aria-hidden />
        </span>
        <span className={cn('text-xl font-extrabold tracking-tight sm:text-2xl', t.title)}>{role.title}</span>
      </motion.div>
      <motion.div layout="position" {...fade} className="flex w-full items-center justify-between gap-3 text-sm sm:text-[15px]">
        <span className={t.muted}>{role.subtitle}</span>
        <span className={cn('flex items-center gap-1 font-bold', t.accent)}>
          Open
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </motion.div>
    </motion.button>
  );
}

function OpenCard({ role, onClose, ref }: { role: Role; onClose: () => void; ref?: React.Ref<HTMLElement> }) {
  const t = role.theme;
  const Icon = role.icon;
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => heading.current?.focus({ preventScroll: true }), []);

  // Detail muncul bertahap setelah kartu mendarat, dan hilang cepat sebelum kartu kembali ke rak.
  const reveal = (i: number) => ({
    initial: { opacity: 0, y: 12, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { delay: 0.22 + i * 0.06, duration: 0.45, ease: EASE } },
    exit: { opacity: 0, y: 6, filter: 'blur(4px)', transition: { duration: 0.15, ease: EASE } },
  });

  return (
    <motion.article
      ref={ref}
      layoutId={`role-${role.id}`}
      initial={{ skewY: SKEW }}
      animate={{ skewY: 0 }}
      exit={{ skewY: SKEW, opacity: 0, transition: { opacity: { delay: 0.1, duration: 0.3, ease: EASE } } }}
      style={{ borderRadius: RADIUS }}
      className={cn(
        'relative z-10 flex w-full flex-col gap-5 border p-7 shadow-[0_40px_80px_-40px_rgba(11,59,46,0.55)] sm:p-9',
        t.surface,
      )}
    >
      <motion.div layout="position" {...reveal(-2)} className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-3">
          <OptionTag role={role} className="text-xs" />
          <div className="flex items-center gap-2">
            <StatusBadge status={role.status} />
            <button
              type="button"
              onClick={onClose}
              aria-label={`Return the ${role.title} card to the rack`}
              className={cn('flex size-9 items-center justify-center rounded-full transition', t.close)}
            >
              <X className="size-[18px]" aria-hidden />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className={cn('flex size-14 shrink-0 items-center justify-center rounded-2xl', t.iconBox)}>
            <Icon className="size-7" aria-hidden />
          </span>
          <div className="flex flex-col gap-0.5">
            <h2 ref={heading} tabIndex={-1} className={cn('text-[28px] font-extrabold tracking-tight outline-none', t.title)}>
              {role.title}
            </h2>
            <span className={cn('text-[15px]', t.muted)}>{role.subtitle}</span>
          </div>
        </div>
      </motion.div>

      <motion.p {...reveal(0)} className={cn('text-[15px] leading-relaxed', t.muted)}>
        {role.desc}
      </motion.p>
      {role.chips ? (
        <motion.div {...reveal(1)} className="flex flex-wrap gap-2">
          {role.chips.map((c) => (
            <span key={c} className={cn('rounded-lg px-2.5 py-1 text-xs font-semibold', t.chip)}>
              {c}
            </span>
          ))}
        </motion.div>
      ) : null}
      <motion.ul {...reveal(2)} className={cn('flex flex-col gap-3 border-t pt-4 text-sm', t.divider, t.title)}>
        {role.facts.map((f) => (
          <li key={f.text} className="flex gap-2.5">
            <f.icon className={cn('size-[18px] shrink-0', t.accent)} aria-hidden />
            {f.text}
          </li>
        ))}
      </motion.ul>
      <motion.div {...reveal(3)}>
        <Link
          href={role.href}
          className={cn('mt-2 flex h-[52px] items-center justify-center gap-2 rounded-full font-bold transition', t.button)}
        >
          {role.cta}
          <ArrowRight className="size-[18px]" aria-hidden />
        </Link>
      </motion.div>
    </motion.article>
  );
}

export function RoleDeck({
  bod,
  associate,
  member,
}: {
  bod: RecruitmentStatus;
  associate: RecruitmentStatus;
  member: RecruitmentStatus;
}) {
  const roles = buildRoles(bod, associate, member);
  const [openId, setOpenId] = useState<RoleId | null>(null);
  const mounted = useRef(false);
  const stage = useRef<HTMLDivElement>(null);
  const buttons = useRef<Partial<Record<RoleId, HTMLButtonElement | null>>>({});
  const returning = useRef<RoleId | null>(null);

  useEffect(() => {
    mounted.current = true;
  }, []);

  useEffect(() => {
    // Kembalikan fokus ke kartu di rak setelah kartu ditutup.
    if (openId === null && returning.current) buttons.current[returning.current]?.focus({ preventScroll: true });
  }, [openId]);

  const open = (id: RoleId) => {
    returning.current = null;
    setOpenId(id);
    if (window.innerWidth < 1024) {
      requestAnimationFrame(() => stage.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
    }
  };
  const close = () => {
    returning.current = openId;
    setOpenId(null);
  };

  const openRole = roles.find((r) => r.id === openId);
  const closed = roles.filter((r) => r.id !== openId);
  const frontId = closed[closed.length - 1]?.id;

  return (
    <MotionConfig reducedMotion="user" transition={{ type: 'spring', visualDuration: 0.6, bounce: 0.12 }}>
      <LayoutGroup>
        <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-center">
          <motion.div layout="position" className="flex flex-col items-center gap-8">
            <div aria-label="Role cards" role="group" className="grid place-items-start pb-6 pt-10 [grid-template-areas:'stack']">
              {roles.map((role, i) =>
                role.id === openId ? (
                  // Penahan ruang tak terlihat supaya tinggi rak tidak berubah saat kartu diambil.
                  <div key={`slot-${role.id}`} aria-hidden className={cn('invisible [grid-area:stack]', CARD_SIZE, SLOT[i])} />
                ) : (
                  <div key={`wrap-${role.id}`} style={{ zIndex: i + 1 }} className={cn('[grid-area:stack]', SLOT[i])}>
                    <RackCard
                      role={role}
                      front={role.id === frontId}
                      animateIn={mounted.current}
                      onOpen={() => open(role.id)}
                      buttonRef={(el) => {
                        buttons.current[role.id] = el;
                      }}
                    />
                  </div>
                ),
              )}
            </div>
          </motion.div>

          <div
            ref={stage}
            id="role-stage"
            aria-live="polite"
            className={cn(
              'relative grid w-full scroll-mt-24 place-items-center',
              openRole ? 'mt-12 max-w-[520px] lg:ml-16 lg:mt-0 lg:w-[520px]' : 'lg:w-0',
            )}
          >
            <AnimatePresence mode="popLayout">
              {openRole ? <OpenCard key={openRole.id} role={openRole} onClose={close} /> : null}
            </AnimatePresence>
          </div>
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}
