import type { Metadata } from 'next';
import { recruitment } from '@/lib/recruitment';
import { Container, Eyebrow } from '@/components/ui/section';
import { RoleDeck } from '@/components/site/role-deck';
import { CrowdCanvas } from '@/components/ui/crowd-canvas';
import { DownloadButton } from '@/components/ui/download-button';
import { T } from '@/lib/i18n';

export const metadata: Metadata = { title: 'Daftar' };


export default function DaftarPage() {
  const bod = recruitment.bod;
  const assoc = recruitment.associate;
  const member = recruitment.member;

  return (
    <>
      <section className="py-14 text-center lg:pb-12 lg:pt-[72px]">
        <Container className="flex flex-col items-center gap-4">
          <Eyebrow>
            <T id="Pendaftaran anggota" en="Membership" />
          </Eyebrow>
          <h1 className="text-4xl font-extrabold tracking-tight text-forest sm:text-[52px]">
            <T id="Pilih peranmu di ThreeL." en="Choose your role at ThreeL." />
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            <T
              id="Tiga jalur dengan komitmen dan proses seleksi yang berbeda. Pilih yang paling sesuai dengan waktu dan pengalamanmu."
              en="Three paths with different commitments and selection processes. Pick the one that best fits your time and experience."
            />
          </p>
        </Container>
      </section>

      <section className="overflow-x-clip pb-16">
        <Container>
          <RoleDeck bod={bod} associate={assoc} member={member} />
          <div className="mt-10 flex justify-center">
            <DownloadButton
              href="/files/threel-booklet-rekrutmen.pdf"
              fileName="Booklet Recruitment ShapingChangemakers.pdf"
              label={<T id="Unduh Booklet Rekrutmen" en="Download Recruitment Booklet" />}
              meta="PDF · 4 MB"
            />
          </div>
        </Container>
      </section>

      {/* Kerumunan yang berjalan melintas: semua orang punya tempat di ThreeL. */}
      <section aria-labelledby="kerumunan-title" className="relative h-[440px] overflow-hidden bg-white sm:h-[520px] lg:h-[620px]">
        <Container className="relative z-10 flex flex-col items-center gap-3 pt-6 text-center">
          <Eyebrow>
            <T id="Semua bisa ambil bagian" en="Everyone has a place" />
          </Eyebrow>
          <h2 id="kerumunan-title" className="max-w-2xl text-2xl font-extrabold leading-tight tracking-tight text-forest sm:text-4xl">
            <T id="Siapa pun kamu, ada tempat untukmu di ThreeL." en="Whoever you are, there is a place for you at ThreeL." />
          </h2>
          <span aria-hidden className="h-14 w-px bg-gradient-to-b from-mint-line to-forest" />
        </Container>
        <div className="absolute inset-x-0 bottom-0 h-[74%]">
          <CrowdCanvas src="/images/open-peeps.png" rows={15} cols={7} peepHeight={0.7} />
        </div>
      </section>
    </>
  );
}
