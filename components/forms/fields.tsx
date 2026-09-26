'use client';

import { CheckCircle2, Upload } from 'lucide-react';
import { cn } from '@/lib/cn';
import { formatFileSize } from '@/lib/validation';

/** Gaya kontrol per jenis formulir: formal (BOD), default (Associate/Mitra), friendly (Member). */
export type Tone = 'formal' | 'default' | 'friendly';

const radius: Record<Tone, string> = { formal: 'rounded', default: 'rounded-[10px]', friendly: 'rounded-full' };
const areaRadius: Record<Tone, string> = { formal: 'rounded', default: 'rounded-[10px]', friendly: 'rounded-2xl' };

function controlClass(tone: Tone, error?: string, multiline = false) {
  return cn(
    'w-full border bg-white text-[15px] text-ink placeholder:text-slate-500 transition focus:outline-none focus:ring-4 focus:ring-brand/15',
    multiline ? cn(areaRadius[tone], 'min-h-44 px-4 py-3 leading-relaxed') : cn(radius[tone], 'h-12 px-4'),
    error ? 'border-danger' : 'border-slate-300 focus:border-brand',
  );
}

function describedBy(id: string, hint?: string, error?: string) {
  return [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
}

type BaseProps = {
  id: string;
  label: React.ReactNode;
  required?: boolean;
  hint?: string;
  error?: string;
  tone?: Tone;
  className?: string;
};

export function Field({ id, label, required, hint, error, className, children }: BaseProps & { children: React.ReactNode }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="text-[13px] leading-relaxed text-slate-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-[13px] text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  value,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
  inputMode,
  ...base
}: BaseProps & {
  value: string;
  onChange: (v: string) => void;
  type?: 'text' | 'email' | 'tel' | 'url' | 'number';
  placeholder?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}) {
  const { id, hint, error, tone = 'default' } = base;
  return (
    <Field {...base}>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, hint, error)}
        className={controlClass(tone, error)}
      />
    </Field>
  );
}

export function SelectField({
  value,
  onChange,
  options,
  placeholder,
  ...base
}: BaseProps & {
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder: string;
}) {
  const { id, hint, error, tone = 'default' } = base;
  return (
    <Field {...base}>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlClass(tone, error), 'pr-10')}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function TextAreaField({
  value,
  onChange,
  placeholder,
  wordCount,
  ...base
}: BaseProps & { value: string; onChange: (v: string) => void; placeholder?: string; wordCount?: number }) {
  const { id, hint, error, tone = 'default' } = base;
  return (
    <Field {...base}>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={7}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlClass(tone, error, true), 'resize-y')}
      />
      {wordCount != null ? (
        <span className="self-end font-mono text-xs text-slate-500" aria-live="polite">
          {wordCount} kata
        </span>
      ) : null}
    </Field>
  );
}

export function FileField({
  file,
  onChange,
  accept,
  note,
  ...base
}: BaseProps & { file: File | null; onChange: (f: File | null) => void; accept: string; note: string }) {
  const { id, hint, error, tone = 'default' } = base;
  return (
    <Field {...base}>
      <label
        htmlFor={id}
        className={cn(
          'relative flex cursor-pointer items-center gap-4 border-[1.5px] border-dashed bg-[#FAFBFA] px-5 py-5 transition focus-within:ring-4 focus-within:ring-brand/15 hover:border-brand',
          tone === 'formal' ? 'rounded' : 'rounded-xl',
          error ? 'border-danger' : 'border-slate-300',
        )}
      >
        <span
          className={cn(
            'flex size-11 shrink-0 items-center justify-center',
            tone === 'formal' ? 'rounded bg-forest text-gold' : 'rounded-xl bg-mint-deep text-brand',
          )}
        >
          {file ? <CheckCircle2 className="size-5" aria-hidden /> : <Upload className="size-5" aria-hidden />}
        </span>
        <span className="flex min-w-0 flex-col gap-1">
          <span className={cn('truncate text-[15px] font-bold', file ? 'text-brand' : 'text-ink')}>
            {file ? file.name : 'Pilih berkas'}
          </span>
          <span className="text-[13px] text-muted">{file ? `${formatFileSize(file.size)} · klik untuk mengganti` : note}</span>
        </span>
        <input
          id={id}
          name={id}
          type="file"
          accept={accept}
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy(id, hint, error)}
          className="absolute size-px opacity-0"
        />
      </label>
    </Field>
  );
}

export function ConsentCheckbox({
  id,
  checked,
  onChange,
  error,
  tone = 'default',
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  tone?: Tone;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={cn(
          'flex cursor-pointer items-start gap-3.5 border-[1.5px] p-5 transition',
          tone === 'formal' ? 'rounded' : 'rounded-xl',
          error ? 'border-danger' : checked ? 'border-brand bg-mint' : 'border-slate-300 bg-white',
        )}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 accent-brand"
        />
        <span className="text-[15px] leading-relaxed">{children}</span>
      </label>
      {error ? (
        <p id={`${id}-error`} className="text-[13px] text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ErrorSummary({ count, className }: { count: number; className?: string }) {
  if (count === 0) return null;
  return (
    <p role="alert" className={cn('text-sm font-bold text-danger', className)}>
      Masih ada {count} isian yang perlu diperbaiki.
    </p>
  );
}
