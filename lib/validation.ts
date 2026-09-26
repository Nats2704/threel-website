/**
 * Validasi formulir sisi klien. Saat backend siap, aturan yang sama
 * WAJIB dijalankan ulang di server; validasi klien hanya untuk UX.
 */

export type FileRule = { required?: boolean; types: string[]; maxMB: number };

export type Rule = {
  required?: boolean;
  requiredMsg?: string;
  email?: boolean;
  phone?: boolean;
  url?: boolean;
  host?: string;
  file?: FileRule;
  minWords?: number;
  checked?: boolean;
  checkedMsg?: string;
  min?: number;
  max?: number;
  rangeMsg?: string;
  differentFrom?: string;
  differentMsg?: string;
};

export type Schema<T> = { [K in keyof T]?: Rule };
export type Errors<T> = { [K in keyof T]?: string };

export function countWords(s: string): number {
  const t = s.trim();
  return t ? t.split(/\s+/).length : 0;
}

export function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/.test(v.trim());
}

/**
 * Nomor HP Indonesia. Pengguna mengetik bebas: "0812-3456-7890",
 * "+62 812 3456 7890", "6281234567890". Kembalikan true bila valid.
 */
export function isValidPhoneID(raw: string): boolean {
  // TODO(human): ganti aturan sementara ini dengan validasi nomor HP Indonesia yang sebenarnya.
  const digits = raw.replace(/\D/g, '');
  return digits.length >= 10;
}

export function isValidUrl(v: string, host?: string): boolean {
  const s = v.trim();
  if (!/^https?:\/\/[^\s/.]+\.[^\s]{2,}/i.test(s)) return false;
  if (!host) return true;
  try {
    return new URL(s).hostname.replace(/^www\./, '').includes(host);
  } catch {
    return false;
  }
}

export function formatFileSize(bytes: number): string {
  const kb = bytes / 1024;
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(kb))} KB`;
}

function isFilled(v: unknown): boolean {
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === 'boolean') return v;
  return v != null && String(v).trim() !== '';
}

function checkFile(v: unknown, rule: FileRule): string {
  const isFile = typeof File !== 'undefined' && v instanceof File;
  if (!isFile) return rule.required ? 'Unggah berkas terlebih dahulu.' : '';
  const file = v as File;
  const ext = (file.name.split('.').pop() ?? '').toLowerCase();
  if (!rule.types.includes(ext)) return `Format berkas harus ${rule.types.join(' / ').toUpperCase()}.`;
  if (file.size > rule.maxMB * 1024 * 1024) return `Ukuran berkas maksimal ${rule.maxMB} MB.`;
  return '';
}

export function validate<T extends Record<string, unknown>>(values: T, schema: Schema<T>): Errors<T> {
  const errors: Errors<T> = {};
  (Object.keys(schema) as Array<keyof T>).forEach((key) => {
    const r = schema[key];
    if (!r) return;
    const v = values[key];
    let msg = '';
    if (r.file) {
      msg = checkFile(v, r.file);
    } else if (r.checked) {
      if (v !== true) msg = r.checkedMsg ?? 'Wajib dicentang.';
    } else if (!isFilled(v)) {
      if (r.required) msg = r.requiredMsg ?? 'Wajib diisi.';
    } else {
      const s = String(v);
      if (r.email && !isValidEmail(s)) {
        msg = 'Format email belum benar, contoh: nama@domain.com.';
      } else if (r.phone && !isValidPhoneID(s)) {
        msg = 'Gunakan nomor HP Indonesia, contoh: 0812 3456 7890 atau +62 812 3456 7890.';
      } else if (r.url && !isValidUrl(s, r.host)) {
        msg = r.host
          ? `Gunakan tautan ${r.host} yang lengkap (diawali https://).`
          : 'Masukkan tautan lengkap yang diawali https://.';
      } else if (r.minWords && countWords(s) < r.minWords) {
        msg = `Minimal ${r.minWords} kata (saat ini ${countWords(s)} kata).`;
      } else if (
        (r.min != null || r.max != null) &&
        (Number.isNaN(Number(s)) || (r.min != null && Number(s) < r.min) || (r.max != null && Number(s) > r.max))
      ) {
        msg = r.rangeMsg ?? 'Nilai di luar rentang yang diizinkan.';
      } else if (r.differentFrom && v === values[r.differentFrom as keyof T]) {
        msg = r.differentMsg ?? 'Pilihan harus berbeda.';
      }
    }
    if (msg) errors[key] = msg;
  });
  return errors;
}
