import { cn } from '@/lib/cn';
import { statusMeta, type RecruitmentStatus } from '@/lib/recruitment';
import { T } from '@/lib/i18n';

export function StatusBadge({
  status,
  size = 'md',
  className,
}: {
  status: RecruitmentStatus | 'rolling';
  size?: 'sm' | 'md';
  className?: string;
}) {
  const meta =
    status === 'rolling'
      ? { label: <T id="Selalu dibuka" en="Always open" />, badge: 'bg-green-100 text-green-900', dot: 'bg-green-600' }
      : statusMeta[status];
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-2 rounded-full font-bold',
        size === 'sm' ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs',
        meta.badge,
        className,
      )}
    >
      <span className={cn('size-2 rounded-full', meta.dot)} aria-hidden />
      {meta.label}
    </span>
  );
}
