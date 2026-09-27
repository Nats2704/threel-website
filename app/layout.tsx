import type { Metadata } from 'next';
import { IBM_Plex_Mono, Instrument_Serif, Plus_Jakarta_Sans } from 'next/font/google';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' });
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-plex-mono',
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
    <html lang="id" className={`${jakarta.variable} ${plexMono.variable} ${serif.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-forest focus:px-4 focus:py-2 focus:text-white"
        >
          Lewati ke konten
        </a>
        <Navbar />
        <main id="konten" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
