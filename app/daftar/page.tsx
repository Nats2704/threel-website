import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Clock, FileText, Flag, HeartHandshake, Layers } from 'lucide-react';
import { recruitment, statusMeta } from '@/lib/recruitment';
import { divisions } from '@/lib/content';
import { cn } from '@/lib/cn';
import { Container, Eyebrow } from '@/components/ui/section';
import { StatusBadge } from '@/components/ui/status-badge';

export const metadata: Metadata = { title: 'Daftar' };

export default function DaftarPage() {
  const bod = recruitment.bod;
  const assoc = recruitment.associate;
  const cta = (s: typeof bod, open: string) => (s === 'waitlist' ? 'Masuk daftar tunggu' : open);

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

      <section aria-label="Pilihan peran" className="pb-16">
        <Container className="grid gap-6 lg:grid-cols-3">
          {/* Opsi 1: BOD — formal & prestisius */}
          <article className="flex flex-col gap-5 rounded-lg border-t-4 border-gold-deep bg-forest p-8 text-white sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs font-semibold tracking-[0.14em] text-gold">OPSI 01 · C-LEVEL</span>
              <StatusBadge status={bod} />
            </div>
            <span className="flex size-[52px] items-center justify-center rounded-md border border-gold/60 text-gold">
              <Flag className="size-[26px]" aria-hidden />
            </span>
            <div className="flex flex-col gap-1.5">
              <h2 className="text-[28px] font-extrabold tracking-tight">Board of Director</h2>
              <span className="text-[15px] text-sage">Pimpinan eksekutif strategis</span>
            </div>
            <p className="text-[15px] leading-relaxed text-sage">
              Untuk pemimpin yang siap memegang arah divisi, membangun tim, dan bertanggung jawab atas dampak program.
            </p>
            <ul className="flex flex-col gap-3 border-t border-white/15 pt-4 text-sm">
              <li className="flex gap-2.5">
                <span className="w-[18px] text-center font-bold text-gold">6</span>Posisi: CMO, CHRO, CFO, COO, CIDO, CTO
              </li>
              <li className="flex gap-2.5">
                <Clock className="size-[18px] shrink-0 text-gold" aria-hidden />
                Minimal 15–20 jam per minggu
              </li>
              <li className="flex gap-2.5">
                <FileText className="size-[18px] shrink-0 text-gold" aria-hidden />
                CV, portofolio kepemimpinan, 2 esai
              </li>
            </ul>
            <Link
              href="/daftar/bod"
              className="mt-auto flex h-[52px] items-center justify-center gap-2 rounded-md bg-gold font-extrabold tracking-wide text-forest transition hover:bg-gold-soft"
            >
              {cta(bod, 'Lamar sebagai BOD')}
              <ArrowRight className="size-[18px]" aria-hidden />
            </Link>
          </article>

          {/* Opsi 2: Associate — fungsional & berbasis keahlian */}
          <article className="flex flex-col gap-5 rounded-2xl border-[1.5px] border-brand bg-white p-8 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs font-semibold tracking-[0.14em] text-brand">OPSI 02 · DIVISI</span>
              <StatusBadge status={assoc} />
            </div>
            <span className="flex size-[52px] items-center justify-center rounded-[14px] bg-brand text-white">
              <Layers className="size-[26px]" aria-hidden />
            </span>
            <div className="flex flex-col gap-1.5">
              <h2 className="text-[28px] font-extrabold tracking-tight text-forest">Associate</h2>
              <span className="text-[15px] text-muted">Manager &amp; Staff Divisi</span>
            </div>
            <p className="text-[15px] leading-relaxed text-muted">
              Untuk pelaksana program dan manajer teknis yang ingin berkontribusi sesuai keahlian.
            </p>
            <div className="flex flex-wrap gap-2">
              {divisions.map((d) => (
                <span key={d.value} className="rounded-lg bg-mint px-2.5 py-1 text-xs font-semibold text-forest">
                  {d.label}
                </span>
              ))}
            </div>
            <ul className="flex flex-col gap-3 border-t border-[#EDF2EF] pt-4 text-sm">
              <li className="flex gap-2.5">
                <Clock className="size-[18px] shrink-0 text-brand" aria-hidden />
                8–12 jam per minggu
              </li>
              <li className="flex gap-2.5">
                <FileText className="size-[18px] shrink-0 text-brand" aria-hidden />
                CV, portofolio teknis, studi kasus
              </li>
            </ul>
            <Link
              href="/daftar/associate"
              className="mt-auto flex h-[52px] items-center justify-center gap-2 rounded-xl bg-brand font-bold text-white transition hover:bg-forest"
            >
              {cta(assoc, 'Lamar sebagai Associate')}
              <ArrowRight className="size-[18px]" aria-hidden />
            </Link>
          </article>

          {/* Opsi 3: Member — kasual & ramah */}
          <article className="flex flex-col gap-5 rounded-[28px] bg-mint p-8 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs font-semibold tracking-[0.14em] text-brand">OPSI 03 · RELAWAN</span>
              <StatusBadge status="rolling" />
            </div>
            <span className="flex size-[52px] items-center justify-center rounded-full bg-gold text-forest">
              <HeartHandshake className="size-[26px]" aria-hidden />
            </span>
            <div className="flex flex-col gap-1.5">
              <h2 className="text-[28px] font-extrabold tracking-tight text-forest">Member / Relawan</h2>
              <span className="text-[15px] text-muted">ThreeLearnian</span>
            </div>
            <p className="text-[15px] leading-relaxed text-muted">
              Ikut aksi sosial kapan pun kamu bisa: mengajar, donor darah, atau berkebun di kota.
            </p>
            <ul className="flex flex-col gap-3 border-t border-mint-line pt-4 text-sm">
              <li className="flex gap-2.5">
                <Clock className="size-[18px] shrink-0 text-brand" aria-hidden />
                Waktu fleksibel, per kegiatan
              </li>
              <li className="flex gap-2.5">
                <Check className="size-[18px] shrink-0 text-brand" aria-hidden />
                Tanpa CV, tanpa esai, satu halaman
              </li>
            </ul>
            <Link
              href="/daftar/member"
              className="mt-auto flex h-[52px] items-center justify-center gap-2 rounded-full bg-forest font-bold text-white transition hover:bg-brand"
            >
              Gabung jadi ThreeLearnian
              <ArrowRight className="size-[18px]" aria-hidden />
            </Link>
          </article>
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
