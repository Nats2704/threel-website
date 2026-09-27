'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Handshake,
  LayoutGrid,
  Menu,
  Newspaper,
  Sprout,
  X,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { LogoMark } from './logo';

const links: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/tentang', label: 'Tentang Kami', icon: Sprout },
  { href: '/program', label: 'Program', icon: LayoutGrid },
  { href: '/bermitra', label: 'Bermitra', icon: Handshake },
  { href: '/kabar', label: 'Kabar & Dokumentasi', icon: Newspaper },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Tutup menu mobile setiap kali pindah halaman.
  useEffect(() => setOpen(false), [pathname]);

  // Tombol Esc juga menutup menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  // Lampu pindah seketika saat diklik, tanpa menunggu halaman baru selesai dimuat.
  const [lamp, setLamp] = useState<string | null>(null);
  useEffect(() => setLamp(links.find((l) => isActive(l.href))?.href ?? null), [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-4 sm:px-6 lg:h-20 lg:px-8">
          <Link
            href="/"
            aria-label="ThreeL Community, kembali ke beranda"
            className="flex items-center gap-3 text-forest"
          >
            <LogoMark size={52} />
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-extrabold tracking-tight">ThreeL</span>
              <span className="text-[11px] font-bold tracking-[0.16em] text-muted">COMMUNITY</span>
            </span>
          </Link>

          <nav aria-label="Navigasi utama" className="hidden h-full items-center gap-2 lg:flex">
            {links.map((l) => {
              const lit = lamp === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setLamp(l.href)}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                  className={cn(
                    'relative flex h-full items-center px-4 text-[15px] font-semibold transition-colors duration-300',
                    lit ? 'text-forest' : 'text-slate-600 hover:text-brand',
                  )}
                >
                  {lit ? (
                    <motion.span
                      layoutId="nav-lamp"
                      aria-hidden
                      transition={{
                        type: 'spring',
                        visualDuration: 0.5,
                        bounce: 0.18,
                      }}
                      className="pointer-events-none absolute inset-x-0 top-0 bottom-3 flex justify-center"
                    >
                      {/* Kap lampu */}
                      <span className="absolute top-0 h-1 w-12 rounded-b-full bg-forest" />
                      {/* Berkas cahaya yang melebar ke bawah */}
                      <span className="absolute top-1 h-full w-[88%] bg-gradient-to-b from-brand/20 via-brand/[0.07] to-transparent [clip-path:polygon(28%_0,72%_0,100%_100%,0_100%)]" />
                      {/* Pantulan cahaya di bawah tulisan */}
                      <span className="absolute bottom-0 h-3 w-3/4 rounded-full bg-brand/15 blur-md" />
                    </motion.span>
                  ) : null}
                  <span className="relative">{l.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/daftar"
              className="flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-[15px] font-bold text-white shadow-[0_0_0_4px_var(--color-mint-deep)] transition hover:bg-forest"
            >
              Daftar
              <ArrowRight className="hidden size-4 sm:block" aria-hidden />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
              className={cn(
                'relative flex size-11 items-center justify-center rounded-xl border text-forest transition-colors duration-300 lg:hidden',
                open ? 'border-mint-line bg-mint' : 'border-line',
              )}
            >
              {/* Ikon hamburger dan silang berputar sambil bertukar */}
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                  key={open ? 'x' : 'menu'}
                  initial={{ rotate: open ? -90 : 90, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: open ? 90 : -90, scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="flex"
                >
                  {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.nav
              key="menu"
              id="menu-mobile"
              aria-label="Navigasi mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: 'auto',
                opacity: 1,
                transition: {
                  height: { duration: 0.4, ease: EASE },
                  opacity: { duration: 0.2 },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 0.3, ease: EASE, delay: 0.05 },
                  opacity: { duration: 0.2, delay: 0.1 },
                },
              }}
              className="overflow-hidden border-t border-line bg-white lg:hidden"
            >
              <motion.ul
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  show: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
                  },
                  hidden: {
                    transition: { staggerChildren: 0.03, staggerDirection: -1 },
                  },
                }}
                className="flex flex-col gap-1 px-4 pb-6 pt-3"
              >
                {links.map((l) => {
                  const active = isActive(l.href);
                  const Icon = l.icon;
                  return (
                    <motion.li
                      key={l.href}
                      variants={{
                        hidden: { opacity: 0, x: -14, filter: 'blur(4px)' },
                        show: {
                          opacity: 1,
                          x: 0,
                          filter: 'blur(0px)',
                          transition: { duration: 0.35, ease: EASE },
                        },
                      }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'group flex h-14 items-center gap-3.5 rounded-2xl px-3 text-base font-semibold transition-colors active:scale-[0.98]',
                          active ? 'bg-mint text-brand' : 'text-ink hover:bg-surface',
                        )}
                      >
                        <span
                          className={cn(
                            'flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors',
                            active ? 'bg-brand text-white' : 'bg-mint text-brand group-hover:bg-mint-deep',
                          )}
                        >
                          <Icon className="size-[18px]" aria-hidden />
                        </span>
                        <span className="flex-1">{l.label}</span>
                        <ChevronRight
                          className={cn(
                            'size-4 transition-transform group-hover:translate-x-0.5',
                            active ? 'text-brand' : 'text-slate-400',
                          )}
                          aria-hidden
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>

      {/* Latar redup di bawah header; ketuk untuk menutup menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="scrim"
            aria-hidden
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-forest/25 backdrop-blur-[2px] lg:hidden"
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
