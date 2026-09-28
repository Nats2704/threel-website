import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/cn';
import { T } from '@/lib/i18n';

export function BackToRoles({ className, label }: { className?: string; label?: React.ReactNode }) {
  return (
    <Link href="/daftar" className={cn('inline-flex w-fit items-center gap-2 text-sm font-semibold', className)}>
      <ArrowLeft className="size-4" aria-hidden />
      {label ?? <T id="Kembali ke pilihan peran" en="Back to roles" />}
    </Link>
  );
}
