import type { SVGProps } from 'react';

/** Ikon Instagram garis (lucide tidak lagi menyediakan ikon merek). */
export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" />
    </svg>
  );
}

/**
 * Ikon dari gambar PNG transparan, diwarnai lewat CSS mask supaya mengikuti warna teks
 * (`currentColor`) seperti ikon lucide.
 */
function maskIcon(src: string) {
  function MaskIcon({ className }: { className?: string }) {
    const mask = `url(${src}) center / 88% no-repeat`;
    return (
      <span
        aria-hidden
        className={`inline-block shrink-0 bg-current ${className ?? ''}`}
        style={{ mask, WebkitMask: mask }}
      />
    );
  }
  return MaskIcon;
}

/** Board of Director: roda gigi berbintang di atas tiga orang. */
export const LeadershipIcon = maskIcon('/images/ikon/bod.png');

/** Associate: empat tangan saling menggenggam. */
export const TeamHandsIcon = maskIcon('/images/ikon/associate.png');
