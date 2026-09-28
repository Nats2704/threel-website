import Link from 'next/link';
import { T } from '@/lib/i18n';

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-32 text-center">
      <span className="font-mono text-sm font-semibold tracking-widest text-brand">404</span>
      <h1 className="text-4xl font-extrabold tracking-tight text-forest">
        <T id="Halaman tidak ditemukan" en="Page not found" />
      </h1>
      <p className="text-lg text-muted">
        <T
          id="Tautan yang kamu buka mungkin salah ketik atau sudah dipindahkan."
          en="The link you opened may have a typo or the page may have moved."
        />
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex h-12 items-center rounded-full bg-brand px-6 font-bold text-white hover:bg-forest"
      >
        <T id="Kembali ke beranda" en="Back to home" />
      </Link>
    </section>
  );
}
