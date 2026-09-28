'use client';

import { ArrowRight, Check, Clock, HeartHandshake } from 'lucide-react';
import { cn } from '@/lib/cn';
import { contact } from '@/lib/content';
import type { RecruitmentStatus } from '@/lib/recruitment';
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
  { value: 'pelajar', label: 'High school' },
  { value: 'mahasiswa', label: 'University' },
  { value: 'profesional', label: 'Professional' },
  { value: 'umum', label: 'General' },
];

const minatOptions = [
  { value: 'edukasi', title: 'Education & Teaching', sub: 'ThreeL Mengajar and literacy' },
  { value: 'sosial', title: 'Social & Medical Action', sub: 'Blood drives and community service' },
  { value: 'lingkungan', title: 'Environment & Urban Farming', sub: 'ThreeL Berakar' },
];

const prefOptions = [
  { value: 'daring', title: 'Online only', sub: 'Content, research, or online mentoring' },
  { value: 'lapangan', title: 'Ready for fieldwork', sub: 'Weekends, following the action schedule' },
];

const perks = [
  { icon: Check, text: 'Selection process through FGD only', gold: false },
  { icon: Clock, text: 'Join actions whenever you can', gold: false },
  { icon: HeartHandshake, text: 'Meet people who share your drive', gold: true },
];

export function MemberForm({ status }: { status: RecruitmentStatus }) {
  const waitlist = status === 'waitlist';
  const form = useForm(initial, () => ({
    nama: { required: true },
    usia: { required: true, min: 14, max: 70, rangeMsg: 'Volunteers must be between 14 and 70 years old.' },
    email: { required: true, email: true },
    wa: { required: true, phone: true },
    kota: { required: true },
    status: { required: true, requiredMsg: 'Please choose your current status.' },
    minat: { required: true, requiredMsg: 'Please choose at least one area of interest.' },
    pref: { required: true, requiredMsg: 'Please choose how you would like to take part.' },
  }));
  const { values: v, set, errors: err } = form;
  const tone = 'friendly' as const;

  const toggleMinat = (value: string) =>
    set('minat', v.minat.includes(value) ? v.minat.filter((x) => x !== value) : [...v.minat, value]);

  return (
    <Container className="grid items-start gap-10 py-12 lg:grid-cols-[440px_minmax(0,1fr)] lg:gap-12 lg:py-16">
      <div className="flex flex-col gap-6 rounded-[32px] bg-mint p-8 sm:p-11 lg:sticky lg:top-28">
        <BackToRoles label="All roles" className="text-brand hover:text-forest" />
        <StatusBadge status={status} className="w-fit" />
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-forest sm:text-[44px]">
          Hi, future ThreeLearnian!
        </h1>
        <p className="text-[17px] leading-relaxed text-muted">
          {waitlist
            ? 'Volunteer registration is currently closed. Fill in this form to join the waitlist, and we will contact you when registration reopens.'
            : 'One page, about three minutes. Once registered, you will receive news about upcoming actions that match your interests.'}
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
          <h2 className="text-[32px] font-extrabold">
            {waitlist ? `Thank you, ${v.nama}!` : `Welcome, ${v.nama}!`}
          </h2>
          <p className="text-base leading-relaxed text-sage">
            {waitlist
              ? `You are on the volunteer waitlist. We will message you on WhatsApp at ${v.wa} when registration opens.`
              : `You are officially a ThreeLearnian. News about upcoming actions in ${v.kota} will be sent to WhatsApp ${v.wa}.`}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center rounded-full bg-gold px-6 font-bold text-forest hover:bg-gold-soft"
            >
              Follow @{contact.instagram}
            </a>
            <button type="button" onClick={form.reset} className="h-12 rounded-full border-[1.5px] border-white/50 px-6 font-bold text-white hover:border-white">
              Register a friend
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={form.submit} noValidate className="flex flex-col gap-7 rounded-[32px] border border-line bg-white p-6 sm:p-10">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField tone={tone} id="nama" label="Full name" className="sm:col-span-2" value={v.nama} onChange={(x) => set('nama', x)} error={err.nama} autoComplete="name" />
            <TextField tone={tone} id="usia" type="number" inputMode="numeric" label="Age" value={v.usia} onChange={(x) => set('usia', x)} error={err.usia} />
            <TextField tone={tone} id="kota" label="City" value={v.kota} onChange={(x) => set('kota', x)} error={err.kota} autoComplete="address-level2" placeholder="Bandung" />
            <TextField tone={tone} id="email" type="email" label="Email" value={v.email} onChange={(x) => set('email', x)} error={err.email} autoComplete="email" placeholder="name@domain.com" />
            <TextField tone={tone} id="wa" type="tel" label="WhatsApp number" value={v.wa} onChange={(x) => set('wa', x)} error={err.wa} autoComplete="tel" placeholder="0812 3456 7890" />
          </div>

          <fieldset id="status" tabIndex={-1} className="flex flex-col gap-3 focus:outline-none">
            <legend className="mb-3 text-base font-extrabold text-forest">Your current status</legend>
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
              Areas of interest <span className="text-[13px] font-semibold text-muted">(choose one or more)</span>
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
            <legend className="mb-3 text-base font-extrabold text-forest">How you would like to take part</legend>
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
              {waitlist ? 'Submit' : 'Join now'}
              <ArrowRight className="size-[18px]" aria-hidden />
            </button>
          </div>
        </form>
      )}
    </Container>
  );
}
