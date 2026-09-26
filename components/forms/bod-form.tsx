'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { cLevels } from '@/lib/content';
import { statusMeta, type RecruitmentStatus } from '@/lib/recruitment';
import { countWords } from '@/lib/validation';
import { useForm } from '@/hooks/use-form';
import { Container } from '@/components/ui/section';
import { StatusBadge } from '@/components/ui/status-badge';
import { BackToRoles } from './back-link';
import { ConsentCheckbox, ErrorSummary, FileField, SelectField, TextAreaField, TextField } from './fields';

type BodValues = {
  nama: string;
  email: string;
  wa: string;
  linkedin: string;
  posisi: string;
  cv: File | null;
  portofolio: string;
  esai1: string;
  esai2: string;
  komitmen: boolean;
};

const initial: BodValues = {
  nama: '',
  email: '',
  wa: '',
  linkedin: '',
  posisi: '',
  cv: null,
  portofolio: '',
  esai1: '',
  esai2: '',
  komitmen: false,
};

const steps = [
  'Seleksi berkas dan esai',
  'Wawancara dengan Founder dan CEO',
  'Presentasi rencana strategis divisi',
  'Pengumuman dan onboarding',
];

function SectionCard({ no, title, desc, children }: { no: string; title: string; desc: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-6 rounded-md border border-[#DCE3DF] bg-white p-6 sm:p-9">
      <legend className="float-left flex w-full items-start gap-4 p-0">
        <span className="flex size-9 shrink-0 items-center justify-center rounded border border-forest font-mono text-[13px] font-semibold text-forest">
          {no}
        </span>
        <span className="flex flex-col gap-1">
          <span className="text-xl font-extrabold text-forest">{title}</span>
          <span className="text-sm font-normal text-muted">{desc}</span>
        </span>
      </legend>
      {children}
    </fieldset>
  );
}

export function BodForm({ status }: { status: RecruitmentStatus }) {
  const waitlist = status === 'waitlist';
  const essay = waitlist ? {} : { required: true, minWords: 100 };
  const form = useForm(initial, () => ({
    nama: { required: true },
    email: { required: true, email: true },
    wa: { required: true, phone: true },
    linkedin: { required: true, url: true, host: 'linkedin.com' },
    posisi: { required: true, requiredMsg: 'Pilih posisi yang kamu lamar.' },
    cv: { file: { required: true, types: ['pdf'], maxMB: 5 } },
    portofolio: { required: true, url: true },
    esai1: essay,
    esai2: essay,
    komitmen: { checked: true, checkedMsg: 'Centang untuk mengonfirmasi komitmen minimal 15–20 jam per minggu.' },
  }));
  const { values: v, set, errors: err } = form;
  const scope = cLevels.find((c) => c.value === v.posisi)?.scope;
  const tone = 'formal' as const;

  return (
    <div className="bg-[#F4F6F5]">
      <section className="border-t-[3px] border-gold-deep bg-forest py-12 text-white lg:py-14">
        <Container className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-3xl flex-col gap-4">
            <BackToRoles className="text-sage hover:text-white" />
            <span className="font-mono text-xs font-semibold tracking-[0.16em] text-gold">
              BOARD OF DIRECTOR · C-LEVEL EXECUTIVE
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Pimpin arah strategis ThreeL.</h1>
            <p className="text-[17px] leading-relaxed text-sage">
              {waitlist
                ? 'Batch rekrutmen BOD sedang ditutup. Isi formulir ini untuk masuk daftar tunggu; kami menghubungimu saat batch berikutnya dibuka.'
                : 'Kami mencari pimpinan eksekutif yang siap memegang arah divisi, membangun tim, dan bertanggung jawab atas dampak program.'}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3.5 rounded-md border border-white/20 p-6 lg:w-[340px]">
            <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-sage-muted">STATUS REKRUTMEN</span>
            <StatusBadge status={status} className="w-fit" />
            <span className="text-sm leading-relaxed text-sage">{statusMeta[status].note}</span>
            <div className="flex justify-between border-t border-white/15 pt-3 text-sm">
              <span className="text-sage-muted">Komitmen</span>
              <span className="font-bold">15–20 jam/minggu</span>
            </div>
          </div>
        </Container>
      </section>

      <Container className="grid items-start gap-10 py-12 lg:grid-cols-[320px_minmax(0,1fr)] lg:py-14">
        <aside className="flex flex-col gap-5 lg:sticky lg:top-28">
          <div className="flex flex-col gap-4 rounded-md border border-[#DCE3DF] bg-white p-7">
            <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-brand">TAHAPAN SELEKSI</span>
            <ol className="flex flex-col gap-3.5 text-sm leading-relaxed">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="font-mono font-semibold text-gold-ink">0{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col gap-3.5 rounded-md border border-[#DCE3DF] bg-white p-7 text-sm">
            <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-brand">SIAPKAN SEBELUM MENGISI</span>
            <span>CV terbaru (PDF, maks. 5 MB)</span>
            <span>Profil LinkedIn aktif</span>
            <span>Tautan portofolio kepemimpinan</span>
            <span>Dua esai, masing-masing min. 100 kata</span>
          </div>
        </aside>

        {form.sent ? (
          <div role="status" className="flex flex-col items-start gap-4 rounded-md border border-[#DCE3DF] border-t-4 border-t-gold-deep bg-white p-8 sm:p-14">
            <span className="flex size-14 items-center justify-center rounded-md bg-forest text-gold">
              <Check className="size-7" strokeWidth={2.6} aria-hidden />
            </span>
            <h2 className="text-[30px] font-extrabold text-forest">
              {waitlist ? 'Kamu masuk daftar tunggu BOD' : 'Lamaran BOD diterima'}
            </h2>
            <p className="text-base leading-relaxed text-muted">
              Terima kasih, {v.nama}. Tim HR ThreeL akan menghubungimu melalui {v.email} dan WhatsApp untuk tahap berikutnya.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/" className="flex h-12 items-center rounded-md bg-forest px-6 font-bold text-white hover:bg-brand">
                Kembali ke beranda
              </Link>
              <button type="button" onClick={form.reset} className="h-12 rounded-md border border-forest bg-white px-6 font-bold text-forest">
                Isi formulir baru
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={form.submit} noValidate className="flex flex-col gap-6">
            <SectionCard no="01" title="Data diri & profesional" desc="Kami memakai kontak ini untuk seluruh proses seleksi.">
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField tone={tone} id="nama" label="Nama lengkap" required value={v.nama} onChange={(x) => set('nama', x)} error={err.nama} autoComplete="name" />
                <TextField tone={tone} id="email" type="email" label="Email" required value={v.email} onChange={(x) => set('email', x)} error={err.email} autoComplete="email" placeholder="nama@domain.com" />
                <TextField tone={tone} id="wa" type="tel" label="Nomor WhatsApp" required value={v.wa} onChange={(x) => set('wa', x)} error={err.wa} autoComplete="tel" placeholder="0812 3456 7890" />
                <TextField tone={tone} id="linkedin" type="url" label="Tautan profil LinkedIn" required value={v.linkedin} onChange={(x) => set('linkedin', x)} error={err.linkedin} placeholder="https://www.linkedin.com/in/namamu" />
              </div>
            </SectionCard>

            <SectionCard no="02" title="Posisi yang dilamar" desc="Pilih satu posisi C-Level.">
              <SelectField
                tone={tone}
                id="posisi"
                label="Posisi"
                required
                value={v.posisi}
                onChange={(x) => set('posisi', x)}
                error={err.posisi}
                placeholder="Pilih posisi"
                options={cLevels.map((c) => ({ value: c.value, label: `${c.title} (${c.code})` }))}
              />
              {scope ? (
                <p className="rounded border-l-[3px] border-gold-deep bg-surface px-5 py-4 text-sm leading-relaxed">
                  <strong>Lingkup peran:</strong> {scope}
                </p>
              ) : null}
            </SectionCard>

            <SectionCard no="03" title="Dokumen pendukung" desc="CV wajib dalam format PDF, maksimal 5 MB.">
              <FileField tone={tone} id="cv" label="CV / Resume terbaru" required file={v.cv} onChange={(f) => set('cv', f)} error={err.cv} accept=".pdf,application/pdf" note="PDF, maksimal 5 MB" />
              <TextField
                tone={tone}
                id="portofolio"
                type="url"
                label="Tautan portofolio kepemimpinan"
                required
                value={v.portofolio}
                onChange={(x) => set('portofolio', x)}
                error={err.portofolio}
                placeholder="https://drive.google.com/…"
                hint="Rekam jejak organisasi, proyek yang dipimpin, atau penghargaan. Pastikan akses tautan terbuka."
              />
            </SectionCard>

            <SectionCard
              no="04"
              title="Uji visi & solusi"
              desc={waitlist ? 'Opsional selama daftar tunggu. Kamu bisa melengkapinya saat batch dibuka.' : 'Wajib, masing-masing minimal 100 kata.'}
            >
              <TextAreaField
                tone={tone}
                id="esai1"
                label="Rencana strategis divisimu dalam 6 bulan pertama"
                required={!waitlist}
                hint="Uraikan prioritas, target terukur, dan langkah awal untuk posisi yang kamu pilih."
                value={v.esai1}
                onChange={(x) => set('esai1', x)}
                error={err.esai1}
                wordCount={countWords(v.esai1)}
              />
              <TextAreaField
                tone={tone}
                id="esai2"
                label="Bagaimana kamu menerapkan nilai Solutioner dan Synergy saat tim menghadapi masalah?"
                required={!waitlist}
                hint="Ceritakan satu situasi nyata: masalahnya, peranmu, dan hasilnya."
                value={v.esai2}
                onChange={(x) => set('esai2', x)}
                error={err.esai2}
                wordCount={countWords(v.esai2)}
              />
            </SectionCard>

            <SectionCard no="05" title="Konfirmasi komitmen waktu" desc="Peran BOD menuntut keterlibatan rutin setiap minggu.">
              <ConsentCheckbox tone={tone} id="komitmen" checked={v.komitmen} onChange={(x) => set('komitmen', x)} error={err.komitmen}>
                Saya bersedia meluangkan <strong>minimal 15–20 jam per minggu</strong> untuk menjalankan peran ini selama masa
                jabatan.
              </ConsentCheckbox>
            </SectionCard>

            <div className="flex flex-col gap-4 rounded-md bg-forest px-6 py-6 text-white sm:flex-row sm:items-center sm:justify-between sm:px-9">
              {form.errorCount > 0 ? (
                <ErrorSummary count={form.errorCount} className="text-rose-300" />
              ) : (
                <span className="text-sm text-sage">Data hanya digunakan untuk proses rekrutmen ThreeL.</span>
              )}
              <button
                type="submit"
                disabled={form.submitting}
                className="inline-flex h-[52px] shrink-0 items-center justify-center gap-2 rounded bg-gold px-7 font-extrabold text-forest transition hover:bg-gold-soft disabled:opacity-60"
              >
                {waitlist ? 'Masuk daftar tunggu' : 'Kirim lamaran'}
                <ArrowRight className="size-[18px]" aria-hidden />
              </button>
            </div>
          </form>
        )}
      </Container>
    </div>
  );
}
