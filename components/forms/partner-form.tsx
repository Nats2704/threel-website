'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import { pillars } from '@/lib/content';
import { useForm } from '@/hooks/use-form';
import { ErrorSummary, SelectField, TextAreaField, TextField } from './fields';

type PartnerValues = {
  institusi: string;
  jenis: string;
  pic: string;
  jabatan: string;
  email: string;
  wa: string;
  bentuk: string[];
  pilar: string;
  pesan: string;
};

const initial: PartnerValues = {
  institusi: '',
  jenis: '',
  pic: '',
  jabatan: '',
  email: '',
  wa: '',
  bentuk: [],
  pilar: '',
  pesan: '',
};

const jenisOptions = [
  { value: 'csr', label: 'Korporasi / CSR' },
  { value: 'medis', label: 'Instansi medis (PMI / RS)' },
  { value: 'kampus', label: 'Kampus' },
  { value: 'komunitas', label: 'Komunitas / organisasi' },
  { value: 'pemerintah', label: 'Instansi pemerintah' },
  { value: 'lainnya', label: 'Lainnya' },
];

const bentukOptions = [
  { value: 'dana', label: 'Pendanaan program / CSR' },
  { value: 'kolaborasi', label: 'Kolaborasi program' },
  { value: 'studi', label: 'Studi banding' },
  { value: 'kesehatan', label: 'Donor darah dan kesehatan' },
  { value: 'lainnya', label: 'Lainnya' },
];

export function PartnerForm() {
  const params = useSearchParams();
  const form = useForm(initial, () => ({
    institusi: { required: true },
    jenis: { required: true, requiredMsg: 'Pilih jenis institusi.' },
    pic: { required: true },
    email: { required: true, email: true },
    wa: { required: true, phone: true },
    bentuk: { required: true, requiredMsg: 'Pilih minimal satu bentuk kerja sama.' },
    pesan: { required: true },
  }));
  const { values: v, set, errors: err } = form;

  // Tombol "Ajukan sebagai …" di kartu jenis mitra mengisi pilihan jenis institusi.
  const jenisParam = params.get('jenis');
  useEffect(() => {
    if (jenisParam && jenisOptions.some((o) => o.value === jenisParam)) set('jenis', jenisParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jenisParam]);

  if (form.sent) {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-3xl border border-mint-line bg-mint p-8 sm:p-12">
        <CheckCircle2 className="size-14 text-brand" aria-hidden />
        <h3 className="text-[28px] font-extrabold text-forest">Pengajuan kemitraan terkirim</h3>
        <p className="text-base leading-relaxed text-muted">
          Terima kasih, {v.institusi}. Tim kemitraan ThreeL akan menghubungi {v.pic} melalui {v.email} untuk menjadwalkan
          diskusi kebutuhan.
        </p>
        <button
          type="button"
          onClick={form.reset}
          className="h-12 rounded-full border-2 border-brand bg-white px-6 font-bold text-brand hover:bg-mint"
        >
          Kirim pengajuan lain
        </button>
      </div>
    );
  }

  const toggleBentuk = (value: string) =>
    set('bentuk', v.bentuk.includes(value) ? v.bentuk.filter((x) => x !== value) : [...v.bentuk, value]);

  return (
    <form onSubmit={form.submit} noValidate className="flex flex-col gap-6 rounded-3xl border border-line bg-white p-6 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="institusi" label="Nama institusi" required value={v.institusi} onChange={(x) => set('institusi', x)} error={err.institusi} autoComplete="organization" placeholder="PT Contoh Sejahtera" />
        <SelectField id="jenis" label="Jenis institusi" required value={v.jenis} onChange={(x) => set('jenis', x)} error={err.jenis} options={jenisOptions} placeholder="Pilih jenis institusi" />
        <TextField id="pic" label="Nama penanggung jawab (PIC)" required value={v.pic} onChange={(x) => set('pic', x)} error={err.pic} autoComplete="name" />
        <TextField id="jabatan" label="Jabatan PIC" value={v.jabatan} onChange={(x) => set('jabatan', x)} autoComplete="organization-title" />
        <TextField id="email" type="email" label="Email kantor" required value={v.email} onChange={(x) => set('email', x)} error={err.email} autoComplete="email" placeholder="nama@institusi.co.id" />
        <TextField id="wa" type="tel" label="Nomor WhatsApp" required value={v.wa} onChange={(x) => set('wa', x)} error={err.wa} autoComplete="tel" placeholder="0812 3456 7890" />
      </div>

      <fieldset id="bentuk" tabIndex={-1} className="flex flex-col gap-3 focus:outline-none">
        <legend className="mb-3 text-sm font-semibold">
          Bentuk kerja sama <span className="text-danger">*</span>
        </legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {bentukOptions.map((o) => {
            const checked = v.bentuk.includes(o.value);
            return (
              <label
                key={o.value}
                className={cn(
                  'flex min-h-12 cursor-pointer items-center gap-3 rounded-[10px] border-[1.5px] px-4 text-[15px] font-semibold transition focus-within:ring-4 focus-within:ring-brand/15',
                  checked ? 'border-brand bg-mint' : 'border-slate-300 bg-white',
                )}
              >
                <input type="checkbox" checked={checked} onChange={() => toggleBentuk(o.value)} className="size-[18px] accent-brand" />
                {o.label}
              </label>
            );
          })}
        </div>
        {err.bentuk ? <p className="text-[13px] text-danger">{err.bentuk}</p> : null}
      </fieldset>

      <SelectField
        id="pilar"
        label="Pilar yang diminati"
        value={v.pilar}
        onChange={(x) => set('pilar', x)}
        options={pillars.map((p) => ({ value: p.id, label: p.title }))}
        placeholder="Belum ditentukan"
      />
      <TextAreaField
        id="pesan"
        label="Ringkasan rencana kerja sama"
        required
        value={v.pesan}
        onChange={(x) => set('pesan', x)}
        error={err.pesan}
        placeholder="Tujuan, perkiraan waktu, dan skala kerja sama yang dibayangkan."
      />

      <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <ErrorSummary count={form.errorCount} />
        <button
          type="submit"
          disabled={form.submitting}
          className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-brand px-7 font-bold text-white transition hover:bg-forest disabled:opacity-60 sm:ml-auto"
        >
          Kirim pengajuan
          <ArrowRight className="size-[18px]" aria-hidden />
        </button>
      </div>
    </form>
  );
}
