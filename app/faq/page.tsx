import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { contact } from '@/lib/content';
import { Container } from '@/components/ui/section';
import { InstagramIcon } from '@/components/ui/icons';
import { DownloadButton } from '@/components/ui/download-button';
import { FaqList } from '@/components/site/faq-list';
import { T } from '@/lib/i18n';

export const metadata: Metadata = { title: 'FAQ' };

export default function FaqPage() {
  return (
    <>
      <section className="bg-[radial-gradient(80%_70%_at_50%_0%,#e3f1ea_0%,#ffffff_70%)] pb-12 pt-16 lg:pb-16 lg:pt-20">
        <Container className="flex flex-col items-center gap-4 text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-brand">FAQ</span>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-forest sm:text-[56px]">
            <T id="Pertanyaan yang sering diajukan" en="Frequently asked questions" />
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            <T
              id="Jawaban singkat seputar ThreeL, cara bergabung, proses seleksi, dan kemitraan."
              en="Short answers about ThreeL, how to join, the selection process, and partnerships."
            />
          </p>
          <div className="mt-4">
            <DownloadButton
              href="/files/threel-about-us.pdf"
              fileName="About Us - ThreeL Community.pdf"
              label={<T id="Unduh Profil ThreeL" en="Download ThreeL Profile" />}
              meta="PDF · 6 MB"
            />
          </div>
        </Container>
      </section>

      <section aria-label="FAQ" className="pb-20 lg:pb-24">
        <Container className="max-w-4xl">
          <FaqList />

          <div className="mt-12 flex flex-col items-start gap-4 rounded-3xl bg-mint p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-extrabold text-forest">
                <T id="Belum menemukan jawabannya?" en="Still have a question?" />
              </h2>
              <p className="text-[15px] text-muted">
                <T id="Tim kami siap membantu lewat email atau Instagram." en="Our team is happy to help by email or on Instagram." />
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-5 text-[15px] font-bold text-white transition hover:bg-forest"
              >
                <Mail className="size-[18px]" aria-hidden />
                Email
              </a>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-mint-line bg-white px-5 text-[15px] font-bold text-forest transition hover:border-brand"
              >
                <InstagramIcon className="size-[18px]" />@{contact.instagram}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
