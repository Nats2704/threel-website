import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/cn';

export function BackToRoles({ className, label = 'Kembali ke pilihan peran' }: { className?: string; label?: string }) {
  return (
    <Link href="/daftar" className={cn('inline-flex w-fit items-center gap-2 text-sm font-semibold', className)}>
      <ArrowLeft className="size-4" aria-hidden />
      {label}
    </Link>
  );
}
