import { cn } from '@/lib/cn';
import { T, type Bi } from '@/lib/i18n';

export const selectionSteps: Bi[] = [
  { id: 'Seleksi Berkas', en: 'Document Screening' },
  { id: 'Focus Group Discussion', en: 'Focus Group Discussion' },
  { id: 'Wawancara', en: 'Interview' },
  { id: 'Mini Presentation', en: 'Mini Presentation' },
  { id: 'Onboarding', en: 'Onboarding' },
];

/** Penanda alur seleksi statis, bukan pelacak status. */
export function SelectionSteps({ steps = selectionSteps, className }: { steps?: Bi[]; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-4 border bg-white p-7', className)}>
      <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-brand">
        <T id="TAHAPAN SELEKSI" en="SELECTION STAGES" />
      </span>
      <ol className="flex flex-col">
        {steps.map((s, i) => (
          <li key={s.id} className="relative flex gap-4 pb-6 last:pb-0">
            {i < steps.length - 1 ? (
              <span className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-mint-line" aria-hidden />
            ) : null}
            <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-brand bg-mint font-mono text-[11px] font-semibold text-brand">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="pt-1 text-[15px] font-semibold text-forest">
              <T v={s} />
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
