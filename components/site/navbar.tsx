'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Handshake,
  HelpCircle,
  LayoutGrid,
  Menu,
  Newspaper,
  Sprout,
  X,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { useLang, type Bi } from '@/lib/i18n';
import { LangSwitch, LangToggle } from './lang-switch';
import { LogoWordmark } from './logo';

const links: { href: string; label: Bi; icon: LucideIcon }[] = [
  { href: '/tentang', label: { id: 'Tentang Kami', en: 'About Us' }, icon: Sprout },
  { href: '/program', label: { id: 'Program', en: 'Programs' }, icon: LayoutGrid },
  { href: '/bermitra', label: { id: 'Bermitra', en: 'Partner' }, icon: Handshake },
  { href: '/kabar', label: { id: 'Kabar & Dokumentasi', en: 'News & Stories' }, icon: Newspaper },
  { href: '/faq', label: { id: 'FAQ', en: 'FAQ' }, icon: HelpCircle },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const { lang, t } = useLang();
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

  // Posisi lampu diukur langsung dari tautan tujuan. Hanya sumbu x dan lebar yang
  // dianimasikan, jadi lampu selalu bergeser mendatar, tidak ikut terpengaruh scroll.
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [box, setBox] = useState<{ x: number; width: number } | null>(null);
  const [placed, setPlaced] = useState(false);

  useLayoutEffect(() => {
    const measure = () => {
      const el = lamp ? linkRefs.current[lamp] : null;
      if (el) setBox({ x: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (navRef.current) ro.observe(navRef.current);
    return () => ro.disconnect();
    // Ukur ulang saat bahasa berganti, karena lebar label ikut berubah.
  }, [lamp, lang]);

  // Kemunculan pertama langsung di tempat, tanpa meluncur dari kiri.
  useEffect(() => {
    if (box && !placed) requestAnimationFrame(() => setPlaced(true));
  }, [box, placed]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-20 lg:px-8">
          <Link
            href="/"
            aria-label={t('ThreeL Community, kembali ke beranda', 'ThreeL Community, back to home')}
            className="flex items-center"
          >
            {/* Logo lengkap cukup ramping (±107px di HP), jadi tombol bahasa, Daftar, dan menu tetap muat. */}
            <LogoWordmark priority className="h-10 lg:h-12" />
          </Link>

          <nav
            ref={navRef}
            aria-label={t('Navigasi utama', 'Main navigation')}
            className="relative hidden h-full items-center gap-2 lg:flex"
          >
            {/* Satu lampu untuk semua tautan, bergeser mendatar ke tautan yang dipilih */}
            {box ? (
              <motion.span
                aria-hidden
                initial={false}
                animate={{ x: box.x, width: box.width, opacity: lamp ? 1 : 0 }}
                transition={
                  placed
                    ? {
                        x: { duration: 0.55, ease: EASE },
                        width: { duration: 0.55, ease: EASE },
                        opacity: { duration: 0.25 },
                      }
                    : { duration: 0 }
                }
                className="pointer-events-none absolute left-0 top-0 bottom-3"
              >
                {/* Kap lampu, selebar pangkal berkas cahaya */}
                <span className="absolute left-[28%] right-[28%] top-0 h-1 rounded-b-full bg-forest" />
                {/* Berkas cahaya yang melebar ke bawah */}
                <span className="absolute inset-x-0 top-1 bottom-0 bg-gradient-to-b from-brand/20 via-brand/[0.07] to-transparent [clip-path:polygon(28%_0,72%_0,100%_100%,0_100%)]" />
                {/* Pantulan cahaya di bawah tulisan */}
                <span className="absolute inset-x-[12%] bottom-0 h-3 rounded-full bg-brand/15 blur-md" />
              </motion.span>
            ) : null}
            {links.map((l) => {
              const lit = lamp === l.href;
              return (
                <Link
                  key={l.href}
                  ref={(el) => {
                    linkRefs.current[l.href] = el;
                  }}
                  href={l.href}
                  onClick={() => setLamp(l.href)}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                  className={cn(
                    'relative flex h-full items-center px-3 text-[15px] font-semibold xl:px-4 transition-colors duration-300',
                    lit ? 'text-forest' : 'text-slate-600 hover:text-brand',
                  )}
                >
                  <span className="relative whitespace-nowrap">{t(l.label)}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <LangSwitch className="hidden lg:flex" />
            <LangToggle className="lg:hidden" />
            <Link
              href="/daftar"
              className="flex h-11 items-center gap-2 rounded-full bg-brand px-4 text-[15px] sm:px-5 font-bold text-white shadow-[0_0_0_4px_var(--color-mint-deep)] transition hover:bg-forest"
            >
              {t('Daftar', 'Join')}
              <ArrowRight className="hidden size-4 sm:block" aria-hidden />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? t('Tutup menu', 'Close menu') : t('Buka menu', 'Open menu')}
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
              aria-label={t('Navigasi mobile', 'Mobile navigation')}
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
                        <span className="flex-1">{t(l.label)}</span>
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
