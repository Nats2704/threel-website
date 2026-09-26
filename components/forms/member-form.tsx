'use client';

import { ArrowRight, Check, Clock, HeartHandshake } from 'lucide-react';
import { cn } from '@/lib/cn';
import { contact } from '@/lib/content';
import { useForm } from '@/hooks/use-form';
import { Container } from '@/components/ui/section';
import { StatusBadge } from '@/components/ui/status-badge';
import { BackToRoles } from './back-link';
import { ErrorSummary, TextField } from './fields';

type MemberValues = {
  nama: string;
  usia: string;
  email: string;
  wa: string;
  kota: string;
  status: string;
  minat: string[];
  pref: string;
};

const initial: MemberValues = { nama: '', usia: '', email: '', wa: '', kota: '', status: '', minat: [], pref: '' };

const statusOptions = [
  { value: 'pelajar', label: 'Pelajar SMA' },
  { value: 'mahasiswa', label: 'Mahasiswa' },
  { value: 'profesional', label: 'Profesional' },
  { value: 'umum', label: 'Umum' },
];

const minatOptions = [
  { value: 'edukasi', title: 'Edukasi & Pengajaran', sub: 'ThreeL Mengajar dan literasi' },
  { value: 'sosial', title: 'Aksi Sosial & Medis', sub: 'Donor darah dan bakti sosial' },
  { value: 'lingkungan', title: 'Lingkungan & Pertanian Kota', sub: 'ThreeL Berakar' },
];

const prefOptions = [
  { value: 'daring', title: 'Daring saja', sub: 'Konten, riset, atau pendampingan online' },
  { value: 'lapangan', title: 'Siap terjun lapangan', sub: 'Akhir pekan, mengikuti jadwal aksi' },
];

const perks = [
  { icon: Check, text: 'Tanpa CV dan tanpa esai', gold: false },
  { icon: Clock, text: 'Ikut aksi saat kamu sempat', gold: false },
  { icon: HeartHandshake, text: 'Bertemu teman seperjuangan', gold: true },
];

export function MemberForm() {
  const form = useForm(initial, () => ({
    nama: { required: true },
    usia: { required: true, min: 14, max: 70, rangeMsg: 'Usia relawan antara 14 dan 70 tahun.' },
    email: { required: true, email: true },
    wa: { required: true, phone: true },
    kota: { required: true },
    status: { required: true, requiredMsg: 'Pilih status kamu.' },
    minat: { required: true, requiredMsg: 'Pilih minimal satu minat aksi.' },
    pref: { required: true, requiredMsg: 'Pilih preferensi keterlibatan.' },
  }));
  const { values: v, set, errors: err } = form;
  const tone = 'friendly' as const;

  const toggleMinat = (value: string) =>
    set('minat', v.minat.includes(value) ? v.minat.filter((x) => x !== value) : [...v.minat, value]);

  return (
    <Container className="grid items-start gap-10 py-12 lg:grid-cols-[440px_minmax(0,1fr)] lg:gap-12 lg:py-16">
      <div className="flex flex-col gap-6 rounded-[32px] bg-mint p-8 sm:p-11 lg:sticky lg:top-28">
        <BackToRoles label="Pilihan peran" className="text-brand hover:text-forest" />
        <StatusBadge status="rolling" className="w-fit" />
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-forest sm:text-[44px]">
          Hai, calon ThreeLearnian!
        </h1>
        <p className="text-[17px] leading-relaxed text-muted">
          Satu halaman, sekitar tiga menit. Setelah terdaftar, kamu akan menerima info aksi terdekat sesuai minatmu.
        </p>
        <ul className="flex flex-col gap-4">
          {perks.map(({ icon: Icon, text, gold }) => (
            <li key={text} className="flex items-center gap-3.5">
              <span
                className={cn(
                  'flex size-11 shrink-0 items-center justify-center rounded-full',
                  gold ? 'bg-gold text-forest' : 'bg-white text-brand',
                )}
              >
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="text-[15px] font-semibold">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {form.sent ? (
        <div role="status" className="flex flex-col items-start gap-4 rounded-[32px] bg-forest p-8 text-white sm:p-12">
          <span className="flex size-16 items-center justify-center rounded-full bg-gold text-forest">
            <Check className="size-8" strokeWidth={2.6} aria-hidden />
          </span>
          <h2 className="text-[32px] font-extrabold">Selamat datang, {v.nama}!</h2>
          <p className="text-base leading-relaxed text-sage">
            Kamu resmi jadi ThreeLearnian. Info aksi terdekat di {v.kota} akan dikirim ke WhatsApp {v.wa}.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center rounded-full bg-gold px-6 font-bold text-forest hover:bg-gold-soft"
            >
              Ikuti @{contact.instagram}
            </a>
            <button type="button" onClick={form.reset} className="h-12 rounded-full border-[1.5px] border-white/50 px-6 font-bold text-white hover:border-white">
              Daftarkan teman
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={form.submit} noValidate className="flex flex-col gap-7 rounded-[32px] border border-line bg-white p-6 sm:p-10">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField tone={tone} id="nama" label="Nama lengkap" className="sm:col-span-2" value={v.nama} onChange={(x) => set('nama', x)} error={err.nama} autoComplete="name" />
            <TextField tone={tone} id="usia" type="number" inputMode="numeric" label="Usia" value={v.usia} onChange={(x) => set('usia', x)} error={err.usia} />
            <TextField tone={tone} id="kota" label="Kota / domisili" value={v.kota} onChange={(x) => set('kota', x)} error={err.kota} autoComplete="address-level2" placeholder="Bandung" />
            <TextField tone={tone} id="email" type="email" label="Email" value={v.email} onChange={(x) => set('email', x)} error={err.email} autoComplete="email" placeholder="nama@domain.com" />
            <TextField tone={tone} id="wa" type="tel" label="Nomor WhatsApp" value={v.wa} onChange={(x) => set('wa', x)} error={err.wa} autoComplete="tel" placeholder="0812 3456 7890" />
          </div>

          <fieldset id="status" tabIndex={-1} className="flex flex-col gap-3 focus:outline-none">
            <legend className="mb-3 text-base font-extrabold text-forest">Status kamu saat ini</legend>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {statusOptions.map((o) => {
                const checked = v.status === o.value;
                return (
                  <label
                    key={o.value}
                    className={cn(
                      'relative flex h-12 cursor-pointer items-center justify-center rounded-full border-[1.5px] text-sm font-bold transition focus-within:ring-4 focus-within:ring-brand/20',
                      checked ? 'border-forest bg-forest text-white' : 'border-slate-300 bg-white text-ink hover:border-brand',
                    )}
                  >
                    <input type="radio" name="status" value={o.value} checked={checked} onChange={() => set('status', o.value)} className="absolute size-px opacity-0" />
                    {o.label}
                  </label>
                );
              })}
            </div>
            {err.status ? <p className="text-[13px] text-danger">{err.status}</p> : null}
          </fieldset>

          <fieldset id="minat" tabIndex={-1} className="flex flex-col gap-2.5 focus:outline-none">
            <legend className="mb-3 text-base font-extrabold text-forest">
              Minat aksi lapangan <span className="text-[13px] font-semibold text-muted">(boleh lebih dari satu)</span>
            </legend>
            {minatOptions.map((o) => {
              const checked = v.minat.includes(o.value);
              return (
                <label
                  key={o.value}
                  className={cn(
                    'flex cursor-pointer items-center gap-4 rounded-[20px] border-[1.5px] px-5 py-4 transition focus-within:ring-4 focus-within:ring-brand/20',
                    checked ? 'border-brand bg-mint' : 'border-line bg-white hover:border-brand',
                  )}
                >
                  <input type="checkbox" checked={checked} onChange={() => toggleMinat(o.value)} className="size-5 shrink-0 accent-brand" />
                  <span className="flex flex-col gap-0.5">
                    <span className="text-[15px] font-bold">{o.title}</span>
                    <span className="text-[13px] text-muted">{o.sub}</span>
                  </span>
                </label>
              );
            })}
            {err.minat ? <p className="text-[13px] text-danger">{err.minat}</p> : null}
          </fieldset>

          <fieldset id="pref" tabIndex={-1} className="flex flex-col gap-3 focus:outline-none">
            <legend className="mb-3 text-base font-extrabold text-forest">Preferensi keterlibatan</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {prefOptions.map((o) => {
                const checked = v.pref === o.value;
                return (
                  <label
                    key={o.value}
                    className={cn(
                      'relative flex cursor-pointer flex-col gap-1 rounded-[20px] border-[1.5px] px-5 py-4 transition focus-within:ring-4 focus-within:ring-brand/20',
                      checked ? 'border-gold-deep bg-[#FFF8E1]' : 'border-line bg-white hover:border-brand',
                    )}
                  >
                    <input type="radio" name="pref" value={o.value} checked={checked} onChange={() => set('pref', o.value)} className="absolute size-px opacity-0" />
                    <span className={cn('text-[15px] font-extrabold', checked ? 'text-[#6B4E0E]' : 'text-forest')}>{o.title}</span>
                    <span className="text-[13px] text-muted">{o.sub}</span>
                  </label>
                );
              })}
            </div>
            {err.pref ? <p className="text-[13px] text-danger">{err.pref}</p> : null}
          </fieldset>

          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ErrorSummary count={form.errorCount} />
            <button
              type="submit"
              disabled={form.submitting}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-forest px-8 font-extrabold text-white transition hover:bg-brand disabled:opacity-60 sm:ml-auto"
            >
              Gabung sekarang
              <ArrowRight className="size-[18px]" aria-hidden />
            </button>
          </div>
        </form>
      )}
    </Container>
  );
}
