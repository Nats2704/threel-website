import { FileDown } from 'lucide-react';

/**
 * Tautan unduh tanpa kotak (menyatu dengan latar): ikon di kiri, garis bawah muncul saat disorot.
 * Untuk berkas statis di /public/files. `fileName` menjadi nama berkas saat disimpan; `meta` mis. "PDF · 6 MB".
 */
export function DownloadButton({
  href,
  fileName,
  label,
  meta,
}: {
  href: string;
  fileName: string;
  label: React.ReactNode;
  meta?: string;
}) {
  return (
    <a
      href={href}
      download={fileName}
      className="group inline-flex items-center gap-3 rounded-lg py-2 text-forest transition-colors duration-300 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
    >
      <FileDown className="size-6 shrink-0 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={1.8} aria-hidden />
      <span className="flex flex-col items-start leading-tight">
        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 text-[17px] font-semibold transition-[background-size] duration-300 group-hover:bg-[length:100%_1.5px]">
          {label}
        </span>
        {meta ? <span className="text-xs font-medium text-muted">{meta}</span> : null}
      </span>
    </a>
  );
}
