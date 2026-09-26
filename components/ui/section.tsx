import Link from 'next/link';
import { ArrowRight, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}

export function Eyebrow({ children, tone = 'brand' }: { children: React.ReactNode; tone?: 'brand' | 'gold' | 'muted' }) {
  const color = { brand: 'text-brand', gold: 'text-gold', muted: 'text-muted' }[tone];
  return <span className={cn('font-mono text-xs font-semibold uppercase tracking-[0.1em]', color)}>{children}</span>;
}

/** Judul section: eyebrow + H2 di kiri, paragraf pendukung di kanan (desktop). */
export function SectionHeading({
  eyebrow,
  title,
  aside,
  id,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  aside?: React.ReactNode;
  id?: string;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
      <div className="flex max-w-[640px] flex-col gap-3.5">
        <Eyebrow tone={dark ? 'gold' : 'brand'}>{eyebrow}</Eyebrow>
        <h2
          id={id}
          className={cn(
            'text-3xl font-extrabold leading-tight tracking-tight sm:text-[40px]',
            dark ? 'text-white' : 'text-forest',
          )}
        >
          {title}
        </h2>
      </div>
      {aside ? (
        <div className={cn('max-w-[440px] text-base leading-relaxed', dark ? 'text-sage' : 'text-muted')}>{aside}</div>
      ) : null}
    </div>
  );
}

export function ArrowLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn('inline-flex items-center gap-2 text-[15px] font-bold text-brand hover:text-forest', className)}
    >
      {children}
      <ArrowRight className="size-4" aria-hidden />
    </Link>
  );
}

export function PageHeader({
  crumb,
  title,
  lead,
  children,
}: {
  crumb: string;
  title: string;
  lead: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-mint py-14 lg:py-[72px]">
      <Container className="flex flex-col gap-5">
        <nav aria-label="Breadcrumb" className="font-mono text-xs font-semibold tracking-[0.1em] text-muted">
          <Link href="/" className="text-brand hover:text-forest">
            BERANDA
          </Link>{' '}
          / {crumb}
        </nav>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-forest sm:text-[52px]">
          {title}
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-muted">{lead}</p>
        {children}
      </Container>
    </section>
  );
}

/** Kotak pengganti foto lapangan sampai dokumentasi asli tersedia. */
export function PhotoPlaceholder({
  caption,
  tone = 'green',
  size = 'md',
  className,
}: {
  caption: string;
  tone?: 'green' | 'gold';
  size?: 'md' | 'lg';
  className?: string;
}) {
  return (
    <figure
      className={cn(
        'relative m-0 flex min-h-40 items-center justify-center rounded-2xl',
        tone === 'green' ? 'bg-[#DCEBE3] text-[#5E8A74]' : 'bg-[#F4ECD2] text-gold-ink',
        className,
      )}
    >
      <ImageIcon className={size === 'lg' ? 'size-14' : 'size-9'} strokeWidth={1.5} aria-hidden />
      <figcaption className="absolute bottom-3.5 left-3.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink sm:text-[13px]">
        {caption}
      </figcaption>
    </figure>
  );
}
