'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import { pillars } from '@/lib/content';
import { useLang, type Bi } from '@/lib/i18n';
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

const jenisOptions: Array<{ value: string; label: Bi }> = [
  { value: 'csr', label: { id: 'Korporasi / CSR', en: 'Company / CSR' } },
  { value: 'medis', label: { id: 'Instansi medis (PMI / RS)', en: 'Medical institution (PMI / hospital)' } },
  { value: 'kampus', label: { id: 'Kampus', en: 'University' } },
  { value: 'komunitas', label: { id: 'Komunitas / organisasi', en: 'Community / organization' } },
  { value: 'pemerintah', label: { id: 'Instansi pemerintah', en: 'Government agency' } },
  { value: 'lainnya', label: { id: 'Lainnya', en: 'Other' } },
];

const bentukOptions: Array<{ value: string; label: Bi }> = [
  { value: 'dana', label: { id: 'Pendanaan program / CSR', en: 'Program funding / CSR' } },
  { value: 'kolaborasi', label: { id: 'Kolaborasi program', en: 'Program collaboration' } },
  { value: 'studi', label: { id: 'Studi banding', en: 'Benchmarking visit' } },
  { value: 'kesehatan', label: { id: 'Donor darah dan kesehatan', en: 'Blood drives and health' } },
  { value: 'lainnya', label: { id: 'Lainnya', en: 'Other' } },
];

export function PartnerForm() {
  const params = useSearchParams();
  const { t } = useLang();
  const form = useForm(initial, () => ({
    institusi: { required: true },
    jenis: { required: true, requiredMsg: t('Pilih jenis institusi.', 'Please choose an institution type.') },
    pic: { required: true },
    email: { required: true, email: true },
    wa: { required: true, phone: true },
    bentuk: { required: true, requiredMsg: t('Pilih minimal satu bentuk kerja sama.', 'Please choose at least one way to collaborate.') },
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
        <h3 className="text-[28px] font-extrabold text-forest">{t('Pengajuan kemitraan terkirim', 'Partnership proposal sent')}</h3>
        <p className="text-base leading-relaxed text-muted">
          {t(
            `Terima kasih, ${v.institusi}. Tim kemitraan ThreeL akan menghubungi ${v.pic} melalui ${v.email} untuk menjadwalkan diskusi kebutuhan.`,
            `Thank you, ${v.institusi}. The ThreeL partnerships team will contact ${v.pic} at ${v.email} to schedule a needs discussion.`,
          )}
        </p>
        <button
          type="button"
          onClick={form.reset}
          className="h-12 rounded-full border-2 border-brand bg-white px-6 font-bold text-brand hover:bg-mint"
        >
          {t('Kirim pengajuan lain', 'Send another proposal')}
        </button>
      </div>
    );
  }

  const toggleBentuk = (value: string) =>
    set('bentuk', v.bentuk.includes(value) ? v.bentuk.filter((x) => x !== value) : [...v.bentuk, value]);

  return (
    <form onSubmit={form.submit} noValidate className="flex flex-col gap-6 rounded-3xl border border-line bg-white p-6 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="institusi" label={t('Nama institusi', 'Institution name')} required value={v.institusi} onChange={(x) => set('institusi', x)} error={err.institusi} autoComplete="organization" placeholder={t('PT Contoh Sejahtera', 'Example Company Ltd.')} />
        <SelectField id="jenis" label={t('Jenis institusi', 'Institution type')} required value={v.jenis} onChange={(x) => set('jenis', x)} error={err.jenis} options={jenisOptions.map((o) => ({ value: o.value, label: t(o.label) }))} placeholder={t('Pilih jenis institusi', 'Choose institution type')} />
        <TextField id="pic" label={t('Nama penanggung jawab (PIC)', 'Person in charge (PIC)')} required value={v.pic} onChange={(x) => set('pic', x)} error={err.pic} autoComplete="name" />
        <TextField id="jabatan" label={t('Jabatan PIC', 'PIC job title')} value={v.jabatan} onChange={(x) => set('jabatan', x)} autoComplete="organization-title" />
        <TextField id="email" type="email" label={t('Email kantor', 'Work email')} required value={v.email} onChange={(x) => set('email', x)} error={err.email} autoComplete="email" placeholder={t('nama@institusi.co.id', 'name@institution.com')} />
        <TextField id="wa" type="tel" label={t('Nomor WhatsApp', 'WhatsApp number')} required value={v.wa} onChange={(x) => set('wa', x)} error={err.wa} autoComplete="tel" placeholder="0812 3456 7890" />
      </div>

      <fieldset id="bentuk" tabIndex={-1} className="flex flex-col gap-3 focus:outline-none">
        <legend className="mb-3 text-sm font-semibold">
          {t('Bentuk kerja sama', 'Ways to collaborate')} <span className="text-danger">*</span>
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
                {t(o.label)}
              </label>
            );
          })}
        </div>
        {err.bentuk ? <p className="text-[13px] text-danger">{err.bentuk}</p> : null}
      </fieldset>

      <SelectField
        id="pilar"
        label={t('Pilar yang diminati', 'Pillar of interest')}
        value={v.pilar}
        onChange={(x) => set('pilar', x)}
        options={pillars.map((p) => ({ value: p.id, label: t(p.title) }))}
        placeholder={t('Belum ditentukan', 'Not decided yet')}
      />
      <TextAreaField
        id="pesan"
        label={t('Ringkasan rencana kerja sama', 'Collaboration plan summary')}
        required
        value={v.pesan}
        onChange={(x) => set('pesan', x)}
        error={err.pesan}
        placeholder={t(
          'Tujuan, perkiraan waktu, dan skala kerja sama yang dibayangkan.',
          'The goals, expected timing, and scale of the collaboration you have in mind.',
        )}
      />

      <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <ErrorSummary count={form.errorCount} />
        <button
          type="submit"
          disabled={form.submitting}
          className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-brand px-7 font-bold text-white transition hover:bg-forest disabled:opacity-60 sm:ml-auto"
        >
          {t('Kirim pengajuan', 'Send proposal')}
          <ArrowRight className="size-[18px]" aria-hidden />
        </button>
      </div>
    </form>
  );
}
