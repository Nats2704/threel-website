'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { LogoMark } from './logo';

const links = [
  { href: '/tentang', label: 'Tentang Kami' },
  { href: '/program', label: 'Program' },
  { href: '/bermitra', label: 'Bermitra' },
  { href: '/kabar', label: 'Kabar & Dokumentasi' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Tutup menu mobile setiap kali pindah halaman.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" aria-label="ThreeL Community, kembali ke beranda" className="flex items-center gap-3 text-forest">
          <LogoMark size={52} />
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-tight">ThreeL</span>
            <span className="text-[11px] font-bold tracking-[0.16em] text-muted">COMMUNITY</span>
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden h-full items-center gap-9 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? 'page' : undefined}
              className={cn(
                'flex h-full items-center border-b-[3px] pt-[3px] text-[15px] font-semibold transition-colors',
                isActive(l.href)
                  ? 'border-brand text-brand'
                  : 'border-transparent text-slate-700 hover:text-brand',
              )}
            >
              {l.label}
            </Link>
          ))}
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
            className="flex size-11 items-center justify-center rounded-xl border border-line text-forest lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="menu-mobile" aria-label="Navigasi mobile" className="border-t border-line bg-white px-4 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                  className={cn(
                    'flex h-12 items-center border-b border-line text-base font-semibold',
                    isActive(l.href) ? 'text-brand' : 'text-ink',
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
