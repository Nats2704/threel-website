import { cn } from '@/lib/cn';
import { statusMeta, type RecruitmentStatus } from '@/lib/recruitment';

export function StatusBadge({ status, className }: { status: RecruitmentStatus | 'rolling'; className?: string }) {
  const meta =
    status === 'rolling'
      ? { label: 'Selalu dibuka', badge: 'bg-green-100 text-green-900', dot: 'bg-green-600' }
      : statusMeta[status];
  return (
    <span className={cn('inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold', meta.badge, className)}>
      <span className={cn('size-2 rounded-full', meta.dot)} aria-hidden />
      {meta.label}
    </span>
  );
}
