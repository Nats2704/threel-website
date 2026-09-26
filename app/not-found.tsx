import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-32 text-center">
      <span className="font-mono text-sm font-semibold tracking-widest text-brand">404</span>
      <h1 className="text-4xl font-extrabold tracking-tight text-forest">Halaman tidak ditemukan</h1>
      <p className="text-lg text-muted">Tautan yang kamu buka mungkin salah ketik atau sudah dipindahkan.</p>
      <Link
        href="/"
        className="mt-2 inline-flex h-12 items-center rounded-full bg-brand px-6 font-bold text-white hover:bg-forest"
      >
        Kembali ke beranda
      </Link>
    </section>
  );
}
