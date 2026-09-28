'use client';

import { useState } from 'react';
import { Check, Send } from 'lucide-react';
import { contact } from '@/lib/content';
import { useLang } from '@/lib/i18n';

/**
 * Formulir kabar terbaru. Situs statis belum punya layanan newsletter, jadi alamat email
 * dikirim lewat aplikasi email pengunjung ke kotak masuk ThreeL.
 */
export function NewsletterForm() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get('email');
    const subject = encodeURIComponent('Berlangganan kabar ThreeL');
    const body = encodeURIComponent(`Halo ThreeL, saya ingin menerima kabar terbaru di alamat ini: ${email}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      {/* gap-2: jarak tetap antara kotak teks dan tombol, supaya email panjang yang terpotong
          di tepi input tidak pernah terlihat menabrak/bersembunyi di balik tombol. */}
      <div className="flex h-[60px] w-full max-w-[360px] items-center gap-2 rounded-xl border border-line bg-white pl-4 pr-1.5 transition focus-within:border-brand">
        <label htmlFor="footer-email" className="sr-only">
          {t('Alamat email', 'Email address')}
        </label>
        <input
          id="footer-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t('Masukkan email kamu', 'Enter your email')}
          className="min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-slate-400"
        />
        <button
          type="submit"
          aria-label={t('Kirim', 'Subscribe')}
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest text-white transition hover:bg-brand"
        >
          {sent ? <Check className="size-5" aria-hidden /> : <Send className="size-5 -translate-x-px translate-y-px" aria-hidden />}
        </button>
      </div>
      <p aria-live="polite" className="min-h-5 text-[13px] text-brand">
        {sent ? t('Terima kasih! Lanjutkan kirim dari aplikasi email kamu.', 'Thank you! Finish sending from your email app.') : null}
      </p>
    </form>
  );
}
