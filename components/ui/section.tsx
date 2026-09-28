import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { T } from '@/lib/i18n';

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
  eyebrow: React.ReactNode;
  title: React.ReactNode;
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
  image,
  aside,
  className,
  children,
}: {
  crumb: React.ReactNode;
  title: React.ReactNode;
  lead: React.ReactNode;
  /** Foto latar dekoratif; di desktop mengisi sisi kanan, di HP menjadi tekstur tipis di balik teks. */
  image?: string;
  /** Konten kolom kanan di desktop (mis. ilustrasi); di HP turun ke bawah teks. */
  aside?: React.ReactNode;
  /** Mis. latar tembus pandang saat halaman punya latar sendiri. */
  className?: string;
  children?: React.ReactNode;
}) {
  const text = (
    <>
      <nav aria-label="Breadcrumb" className="font-mono text-xs font-semibold tracking-[0.1em] text-muted">
        <Link href="/" className="text-brand hover:text-forest">
          <T id="BERANDA" en="HOME" />
        </Link>{' '}
        / {crumb}
      </nav>
      <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-forest sm:text-[52px]">
        {title}
      </h1>
      <p className="max-w-3xl text-lg leading-relaxed text-muted">{lead}</p>
      {children}
    </>
  );

  return (
    <section className={cn('relative isolate overflow-hidden bg-mint py-14 lg:py-[72px]', className)}>
      {image ? (
        <div aria-hidden className="absolute inset-0 -z-10 lg:left-[36%]">
          <Image src={image} alt="" fill priority sizes="(min-width: 1024px) 64vw, 100vw" className="object-cover object-[center_35%]" />
          {/* HP: tirai mint rata supaya teks selebar layar tetap terbaca. */}
          <div className="absolute inset-0 bg-gradient-to-b from-mint/90 via-mint/85 to-mint/95 lg:hidden" />
          {/* Desktop: foto memudar ke mint di sisi teks, tampil jelas di kanan. */}
          <div className="absolute inset-0 hidden bg-gradient-to-r from-mint from-5% via-mint/75 via-40% to-mint/0 lg:block" />
          <div className="absolute inset-x-0 bottom-0 hidden h-20 bg-gradient-to-t from-mint/60 to-transparent lg:block" />
        </div>
      ) : null}
      {aside ? (
        <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
          <div className="flex flex-col gap-5">{text}</div>
          {aside}
        </Container>
      ) : (
        <Container className="flex flex-col gap-5">{text}</Container>
      )}
    </section>
  );
}

/** Kotak pengganti foto lapangan sampai dokumentasi asli tersedia. */
export function PhotoPlaceholder({
  caption,
  tone = 'green',
  size = 'md',
  src,
  credit,
  className,
}: {
  caption: React.ReactNode;
  tone?: 'green' | 'gold';
  size?: 'md' | 'lg';
  /** Foto kegiatan; bila kosong, tampil ikon penanda tempat foto. */
  src?: string;
  /** Kredit foto yang wajib tampil (mis. lisensi CC BY). */
  credit?: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        'relative m-0 flex min-h-40 items-center justify-center overflow-hidden rounded-2xl',
        tone === 'green' ? 'bg-[#DCEBE3] text-[#5E8A74]' : 'bg-[#F4ECD2] text-gold-ink',
        className,
      )}
    >
      {src ? (
        <Image src={src} alt="" fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover" />
      ) : (
        <ImageIcon className={size === 'lg' ? 'size-14' : 'size-9'} strokeWidth={1.5} aria-hidden />
      )}
      {credit ? (
        <span className="absolute right-3 top-2.5 text-[10px] rounded bg-black/45 px-1.5 py-0.5 text-white backdrop-blur-sm">
          {credit}
        </span>
      ) : null}
      <figcaption className="absolute bottom-3.5 left-3.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink sm:text-[13px]">
        {caption}
      </figcaption>
    </figure>
  );
}
