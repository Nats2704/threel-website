import type { Metadata } from 'next';
import { Caveat, Instrument_Serif, Rokkitt } from 'next/font/google';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { LangProvider, T } from '@/lib/i18n';
import './globals.css';

// Slab serif untuk label kecil (eyebrow, penanda, nomor), dipakai lewat kelas `font-mono`.
const label = Rokkitt({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-label',
  display: 'swap',
});
// Tulisan tangan untuk nomor catatan tempel di Konteks Masalah.
const hand = Caveat({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-hand-script',
  display: 'swap',
});
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif-accent',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'ThreeL Community — Look, Learn, Lead', template: '%s — ThreeL Community' },
  description:
    'Organisasi pemuda nirlaba untuk pengentasan kemiskinan melalui pendidikan, teknologi, dan pemberdayaan sosial.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${label.variable} ${serif.variable} ${hand.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <LangProvider>
          <a
            href="#konten"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-forest focus:px-4 focus:py-2 focus:text-white"
          >
            <T id="Lewati ke konten" en="Skip to content" />
          </a>
          <Navbar />
          <main id="konten" className="flex-1">
            {children}
          </main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
