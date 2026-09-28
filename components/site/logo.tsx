import Image from 'next/image';
import { cn } from '@/lib/cn';

/** Logo lengkap (lambang + tulisan "ThreeL COMMUNITY"). Atur ukurannya lewat tinggi, mis. `h-11`. */
export function LogoWordmark({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/images/logo-threel-wordmark.webp"
      alt="ThreeL Community"
      width={1415}
      height={528}
      className={cn('w-auto shrink-0 object-contain', className)}
      priority={priority}
    />
  );
}

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <Image
      src="/logo.png"
      alt="Logo ThreeL Community"
      width={size}
      height={size}
      className="shrink-0 object-contain"
      priority
    />
  );
}
