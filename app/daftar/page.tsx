import type { Metadata } from 'next';
import { recruitment, statusMeta } from '@/lib/recruitment';
import { cn } from '@/lib/cn';
import { Container, Eyebrow } from '@/components/ui/section';
import { RoleDeck } from '@/components/site/role-deck';

export const metadata: Metadata = { title: 'Daftar' };

export default function DaftarPage() {
  const bod = recruitment.bod;
  const assoc = recruitment.associate;

  return (
    <>
      <section className="py-14 text-center lg:pb-12 lg:pt-[72px]">
        <Container className="flex flex-col items-center gap-4">
          <Eyebrow>Pendaftaran · Look, Learn, Lead</Eyebrow>
          <h1 className="text-4xl font-extrabold tracking-tight text-forest sm:text-[52px]">Pilih peranmu di ThreeL.</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            Tiga jalur dengan komitmen dan proses seleksi yang berbeda. Pilih yang paling sesuai dengan waktu dan
            pengalamanmu.
          </p>
        </Container>
      </section>

      <section aria-label="Pilihan peran" className="overflow-x-clip pb-16">
        <Container>
          <RoleDeck bod={bod} associate={assoc} />
        </Container>
      </section>

      <section aria-labelledby="banding-title" className="pb-20 lg:pb-24">
        <Container className="flex flex-col gap-6">
          <h2 id="banding-title" className="text-2xl font-extrabold text-forest">
            Bandingkan peran
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-[15px]">
              <thead>
                <tr className="border-b-2 border-forest text-left">
                  <th scope="col" className="w-52 py-3.5 pr-4 font-mono text-xs tracking-[0.1em] text-muted">
                    ASPEK
                  </th>
                  <th scope="col" className="p-3.5 font-extrabold">Board of Director</th>
                  <th scope="col" className="p-3.5 font-extrabold">Associate</th>
                  <th scope="col" className="p-3.5 font-extrabold">Member / Relawan</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Cocok untuk', 'Pemimpin strategis yang siap memegang divisi', 'Pelaksana dan manajer teknis berbasis keahlian', 'Siapa pun yang ingin ikut aksi sosial'],
                  ['Komitmen waktu', '15–20 jam/minggu', '8–12 jam/minggu', 'Fleksibel, per kegiatan'],
                  ['Berkas seleksi', 'CV, portofolio kepemimpinan, 2 esai', 'CV, portofolio teknis, studi kasus', 'Tidak perlu berkas'],
                ].map(([aspect, ...cells]) => (
                  <tr key={aspect} className="border-b border-[#E2E8E4]">
                    <th scope="row" className="py-4 pr-4 text-left font-semibold text-muted">
                      {aspect}
                    </th>
                    {cells.map((c) => (
                      <td key={c} className="p-4">
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-b border-[#E2E8E4]">
                  <th scope="row" className="py-4 pr-4 text-left font-semibold text-muted">
                    Status pendaftaran
                  </th>
                  <td className={cn('p-4 font-bold', statusMeta[bod].text)}>{statusMeta[bod].label}</td>
                  <td className={cn('p-4 font-bold', statusMeta[assoc].text)}>{statusMeta[assoc].label}</td>
                  <td className="p-4 font-bold text-green-900">Rolling, sepanjang tahun</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </>
  );
}
