'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { divisions } from '@/lib/content';
import { cn } from '@/lib/cn';
import type { RecruitmentStatus } from '@/lib/recruitment';
import { countWords } from '@/lib/validation';
import { useForm } from '@/hooks/use-form';
import { Container } from '@/components/ui/section';
import { StatusBadge } from '@/components/ui/status-badge';
import { BackToRoles } from './back-link';
import { ConsentCheckbox, ErrorSummary, FileField, SelectField, TextAreaField, TextField } from './fields';

type AssociateValues = {
  nama: string;
  email: string;
  wa: string;
  instansi: string;
  medsos: string;
  divisi1: string;
  divisi2: string;
  cv: File | null;
  portofolio: string;
  kasus: string;
  komitmen: boolean;
};

const initial: AssociateValues = {
  nama: '',
  email: '',
  wa: '',
  instansi: '',
  medsos: '',
  divisi1: '',
  divisi2: '',
  cv: null,
  portofolio: '',
  kasus: '',
  komitmen: false,
};

const sections: Array<{ no: string; label: string; keys: Array<keyof AssociateValues> }> = [
  { no: '01', label: 'Data diri', keys: ['nama', 'email', 'wa', 'instansi', 'medsos'] },
  { no: '02', label: 'Divisi', keys: ['divisi1', 'divisi2'] },
  { no: '03', label: 'Dokumen', keys: ['cv', 'portofolio'] },
  { no: '04', label: 'Studi kasus', keys: ['kasus'] },
  { no: '05', label: 'Komitmen', keys: ['komitmen'] },
];

const divisionOptions = divisions.map((d) => ({ value: d.value, label: `Divisi ${d.label}` }));

function SectionCard({ no, title, children }: { no: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="mb-6 flex w-full items-center gap-3 border-b border-line p-0 pb-4">
          <span className="rounded-lg bg-brand px-2.5 py-1 font-mono text-xs font-semibold text-white">{no}</span>
          <span className="text-[19px] font-extrabold leading-tight text-forest">{title}</span>
        </legend>
        <div className="flex flex-col gap-5">{children}</div>
      </fieldset>
    </div>
  );
}

export function AssociateForm({ status }: { status: RecruitmentStatus }) {
  const waitlist = status === 'waitlist';
  const form = useForm(initial, () => ({
    nama: { required: true },
    email: { required: true, email: true },
    wa: { required: true, phone: true },
    instansi: { required: true },
    medsos: { required: true },
    divisi1: { required: true, requiredMsg: 'Pilih divisi utama.' },
    divisi2: {
      required: true,
      requiredMsg: 'Pilih divisi cadangan.',
      differentFrom: 'divisi1',
      differentMsg: 'Pilihan cadangan harus berbeda dari pilihan utama.',
    },
    cv: { file: { required: true, types: ['pdf'], maxMB: 5 } },
    portofolio: { required: true, url: true },
    kasus: waitlist ? {} : { required: true, minWords: 80 },
    komitmen: { checked: true, checkedMsg: 'Centang untuk mengonfirmasi ketersediaan 8–12 jam per minggu.' },
  }));
  const { values: v, set, errors: err, allErrors } = form;

  const main = divisions.find((d) => d.value === v.divisi1);
  const backup = divisions.find((d) => d.value === v.divisi2);

  // Progres: bagian dianggap selesai bila sudah disentuh dan semua isiannya valid.
  const progress = sections.map((s) => ({
    ...s,
    done: s.keys.some((k) => v[k] !== initial[k]) && s.keys.every((k) => !allErrors[k]),
  }));
  const pct = Math.round((progress.filter((s) => s.done).length / progress.length) * 100);

  return (
    <div>
      <section className="border-b border-line py-10 lg:py-12">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-3.5">
            <BackToRoles className="text-brand hover:text-forest" />
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-semibold tracking-[0.12em] text-brand">
                ASSOCIATE · MANAGER &amp; STAFF DIVISI
              </span>
              <StatusBadge status={status} />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-forest sm:text-[44px]">Kontribusi sesuai keahlianmu.</h1>
            <p className="text-[17px] leading-relaxed text-muted">
              {waitlist
                ? 'Batch Associate sedang ditutup. Lengkapi formulir untuk masuk daftar tunggu; studi kasus boleh diisi nanti.'
                : 'Pilih divisi utama dan cadangan, lampirkan portofolio, lalu jawab satu studi kasus lapangan.'}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3.5 rounded-2xl bg-mint p-6 lg:w-[400px]">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-bold text-forest">Kelengkapan formulir</span>
              <span className="text-[22px] font-extrabold text-brand">{pct}%</span>
            </div>
            <div
              role="progressbar"
              aria-label="Kelengkapan formulir"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
              className="flex h-2 rounded-full bg-white"
            >
              <div className="rounded-full bg-brand transition-all" style={{ width: `${pct}%` }} />
            </div>
            <ol className="flex justify-between">
              {progress.map((s) => (
                <li key={s.no} className="flex w-16 flex-col items-center gap-1.5">
                  <span
                    className={cn(
                      'flex size-7 items-center justify-center rounded-full border-[1.5px] font-mono text-[11px] font-semibold',
                      s.done ? 'border-brand bg-brand text-white' : 'border-slate-300 bg-white text-muted',
                    )}
                  >
                    {s.done ? <Check className="size-3.5" strokeWidth={3} aria-hidden /> : s.no}
                  </span>
                  <span className="text-center text-[11px] font-semibold text-muted">{s.label}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <div className="bg-surface">
        <Container className="grid items-start gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_360px]">
          {form.sent ? (
            <div role="status" className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-white p-8 sm:p-12">
              <span className="flex size-14 items-center justify-center rounded-[14px] bg-brand text-white">
                <Check className="size-7" strokeWidth={2.6} aria-hidden />
              </span>
              <h2 className="text-[28px] font-extrabold text-forest">
                {waitlist ? 'Kamu masuk daftar tunggu Associate' : 'Lamaran Associate diterima'}
              </h2>
              <p className="text-base leading-relaxed text-muted">
                Terima kasih, {v.nama}. Pilihan utamamu: Divisi {main?.label}. Tim HR akan menghubungimu melalui {v.email}.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/" className="flex h-12 items-center rounded-xl bg-brand px-6 font-bold text-white hover:bg-forest">
                  Kembali ke beranda
                </Link>
                <button type="button" onClick={form.reset} className="h-12 rounded-xl border-[1.5px] border-brand bg-white px-6 font-bold text-brand">
                  Isi formulir baru
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={form.submit} noValidate className="flex flex-col gap-5">
              <SectionCard no="01" title="Data diri">
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField id="nama" label="Nama lengkap" required value={v.nama} onChange={(x) => set('nama', x)} error={err.nama} autoComplete="name" />
                  <TextField id="email" type="email" label="Email" required value={v.email} onChange={(x) => set('email', x)} error={err.email} autoComplete="email" placeholder="nama@domain.com" />
                  <TextField id="wa" type="tel" label="Nomor WhatsApp" required value={v.wa} onChange={(x) => set('wa', x)} error={err.wa} autoComplete="tel" placeholder="0812 3456 7890" />
                  <TextField id="instansi" label="Asal kampus / instansi" required value={v.instansi} onChange={(x) => set('instansi', x)} error={err.instansi} autoComplete="organization" placeholder="Institut Teknologi Bandung" />
                  <TextField id="medsos" label="Akun media sosial" required className="sm:col-span-2" value={v.medsos} onChange={(x) => set('medsos', x)} error={err.medsos} placeholder="@username Instagram atau tautan profil" />
                </div>
              </SectionCard>

              <SectionCard no="02" title="Pilihan divisi">
                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectField id="divisi1" label="Pilihan utama" required value={v.divisi1} onChange={(x) => set('divisi1', x)} error={err.divisi1} options={divisionOptions} placeholder="Pilih divisi" />
                  <SelectField id="divisi2" label="Pilihan cadangan" required value={v.divisi2} onChange={(x) => set('divisi2', x)} error={err.divisi2} options={divisionOptions} placeholder="Pilih divisi" />
                </div>
              </SectionCard>

              <SectionCard no="03" title="Dokumen & portofolio">
                <FileField id="cv" label="CV" required file={v.cv} onChange={(f) => set('cv', f)} error={err.cv} accept=".pdf,application/pdf" note="PDF, maksimal 5 MB" />
                <TextField
                  id="portofolio"
                  type="url"
                  label="Tautan portofolio teknis"
                  required
                  value={v.portofolio}
                  onChange={(x) => set('portofolio', x)}
                  error={err.portofolio}
                  placeholder="https://"
                  hint={`Google Drive, GitHub, Behance, atau arsip tulisan. ${main?.porto ?? ''}`.trim()}
                />
              </SectionCard>

              <SectionCard no="04" title="Studi kasus operasional">
                <div className="flex flex-col gap-2 rounded-xl bg-mint px-5 py-5">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.12em] text-brand">SKENARIO</span>
                  <p className="text-[15px] leading-relaxed">
                    Dua jam sebelum ThreeL Berbagi dimulai, 40% relawan membatalkan kehadiran dan lokasi distribusi harus
                    pindah karena hujan deras. Kamu koordinator lapangan. Apa langkah mitigasimu?
                  </p>
                </div>
                <TextAreaField
                  id="kasus"
                  label="Jawabanmu"
                  required={!waitlist}
                  hint={
                    waitlist
                      ? 'Opsional selama daftar tunggu.'
                      : 'Tuliskan urutan tindakan, siapa yang kamu hubungi, dan cara memastikan penerima manfaat tetap terlayani. Minimal 80 kata.'
                  }
                  value={v.kasus}
                  onChange={(x) => set('kasus', x)}
                  error={err.kasus}
                  placeholder="Langkah 1: …"
                  wordCount={countWords(v.kasus)}
                />
              </SectionCard>

              <SectionCard no="05" title="Ketersediaan waktu">
                <ConsentCheckbox id="komitmen" checked={v.komitmen} onChange={(x) => set('komitmen', x)} error={err.komitmen}>
                  Saya dapat meluangkan <strong>8–12 jam per minggu</strong> untuk tugas divisi.
                </ConsentCheckbox>
              </SectionCard>

              <div className="flex flex-col-reverse gap-4 py-2 sm:flex-row sm:items-center sm:justify-between">
                <ErrorSummary count={form.errorCount} />
                <button
                  type="submit"
                  disabled={form.submitting}
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-brand px-7 font-bold text-white transition hover:bg-forest disabled:opacity-60 sm:ml-auto"
                >
                  {waitlist ? 'Masuk daftar tunggu' : 'Kirim lamaran'}
                  <ArrowRight className="size-[18px]" aria-hidden />
                </button>
              </div>
            </form>
          )}

          <aside aria-label="Ringkasan profil keahlian" className="flex flex-col gap-4 rounded-2xl bg-forest p-7 text-white lg:sticky lg:top-28">
            <span className="font-mono text-[11px] font-semibold tracking-[0.12em] text-gold">PROFIL KEAHLIANMU</span>
            <div className="flex flex-col gap-1">
              <span className="text-[13px] text-sage-muted">Pilihan utama</span>
              <span className="text-lg font-extrabold">{main ? `Divisi ${main.label}` : 'Belum dipilih'}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(main?.skills ?? ['Pilih divisi untuk melihat keahlian']).map((s) => (
                <span key={s} className="rounded-lg bg-white/10 px-2.5 py-1.5 text-[13px] font-semibold">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-1 border-t border-white/15 pt-3.5">
              <span className="text-[13px] text-sage-muted">Pilihan cadangan</span>
              <span className="text-[15px] font-bold">{backup ? `Divisi ${backup.label}` : 'Belum dipilih'}</span>
            </div>
            <p className="rounded-xl bg-gold/12 px-4 py-3.5 text-[13px] leading-relaxed text-gold-soft">
              {main?.porto ?? 'Portofolio yang relevan dengan divisi pilihan mempercepat proses seleksi.'}
            </p>
          </aside>
        </Container>
      </div>
    </div>
  );
}
