'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { divisionGroups, divisions } from '@/lib/content';
import { cn } from '@/lib/cn';
import type { RecruitmentStatus } from '@/lib/recruitment';
import { countWords } from '@/lib/validation';
import { useForm } from '@/hooks/use-form';
import { Container } from '@/components/ui/section';
import { StatusBadge } from '@/components/ui/status-badge';
import { BackToRoles } from './back-link';
import { ConsentCheckbox, ErrorSummary, FileField, SelectField, TextAreaField, TextField } from './fields';
import { SelectionSteps, selectionSteps } from './selection-steps';

// Associate tidak melalui Mini Presentation; tahap lainnya sama dengan BOD.
const associateSteps = selectionSteps.filter((s) => s.en !== 'Mini Presentation');

type AssociateValues = {
  nama: string;
  email: string;
  wa: string;
  instansi: string;
  medsos: string;
  divisi1: string;
  divisi2: string;
  posisi: string;
  bersediaStaf: boolean;
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
  posisi: '',
  bersediaStaf: false,
  cv: null,
  portofolio: '',
  kasus: '',
  komitmen: false,
};

const sections: Array<{ no: string; label: string; keys: Array<keyof AssociateValues> }> = [
  { no: '01', label: 'Details', keys: ['nama', 'email', 'wa', 'instansi', 'medsos'] },
  { no: '02', label: 'Division', keys: ['divisi1', 'divisi2', 'posisi'] },
  { no: '03', label: 'Documents', keys: ['cv', 'portofolio'] },
  { no: '04', label: 'Case study', keys: ['kasus'] },
  { no: '05', label: 'Commitment', keys: ['komitmen'] },
];

const posisiOptions = [
  { value: 'manager', title: 'Manager', sub: 'Leads the division team and programs' },
  { value: 'staf', title: 'Staff', sub: 'Carries out the division’s technical work' },
];

const divisionOptions = divisions.map((d) => ({ value: d.value, label: d.label, group: divisionGroups[d.group] }));

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
    divisi1: { required: true, requiredMsg: 'Please choose your first choice division.' },
    divisi2: {
      required: true,
      requiredMsg: 'Please choose your second choice division.',
      differentFrom: 'divisi1',
      differentMsg: 'Your second choice must be different from your first choice.',
    },
    posisi: { required: true, requiredMsg: 'Please choose the position you are applying for.' },
    cv: { file: { required: true, types: ['pdf'], maxMB: 5 } },
    portofolio: { required: true, url: true },
    kasus: waitlist ? {} : { required: true, minWords: 80 },
    komitmen: { checked: true, checkedMsg: 'Please tick to confirm you are available 8–12 hours per week.' },
  }));
  const { values: v, set, errors: err, allErrors } = form;

  const main = divisions.find((d) => d.value === v.divisi1);
  const backup = divisions.find((d) => d.value === v.divisi2);

  // Progres dihitung ulang setiap render, jadi langsung berubah saat isian diubah.
  // Bagian selesai bila setiap isiannya sudah diisi dan valid (isian opsional pun harus terisi).
  const isSectionDone = (keys: Array<keyof AssociateValues>) =>
    keys.every((k) => v[k] !== initial[k] && !allErrors[k]);
  const progress = sections.map((s) => ({ ...s, done: isSectionDone(s.keys) }));
  const pct = Math.round((progress.filter((s) => s.done).length / progress.length) * 100);

  return (
    <div>
      <section className="border-b border-line py-10 lg:py-12">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-3.5">
            <BackToRoles className="text-brand hover:text-forest" />
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-semibold tracking-[0.12em] text-brand">
                ASSOCIATE APPLICATION
              </span>
              <StatusBadge status={status} />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-forest sm:text-[44px]">Contribute with your expertise.</h1>
            <p className="text-[17px] leading-relaxed text-muted">
              {waitlist
                ? 'Associate recruitment is currently closed. Complete the form to join the waitlist. The case study can be filled in later.'
                : 'Choose your first and second choice divisions, attach your portfolio, and answer one field case study.'}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3.5 rounded-2xl bg-mint p-6 lg:w-[400px]">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-bold text-forest">Form progress</span>
              <span className="text-[22px] font-extrabold text-brand">{pct}%</span>
            </div>
            <div
              role="progressbar"
              aria-label="Form progress"
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
                {waitlist ? 'You are on the Associate waitlist' : 'Associate application received'}
              </h2>
              <p className="text-base leading-relaxed text-muted">
                Thank you, {v.nama}. Your first choice is {main?.label}. The HR team will contact you at {v.email}.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/" className="flex h-12 items-center rounded-xl bg-brand px-6 font-bold text-white hover:bg-forest">
                  Back to home
                </Link>
                <button type="button" onClick={form.reset} className="h-12 rounded-xl border-[1.5px] border-brand bg-white px-6 font-bold text-brand">
                  Fill in a new form
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={form.submit} noValidate className="flex flex-col gap-5">
              <SectionCard no="01" title="Personal details">
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField id="nama" label="Full name" required value={v.nama} onChange={(x) => set('nama', x)} error={err.nama} autoComplete="name" />
                  <TextField id="email" type="email" label="Email" required value={v.email} onChange={(x) => set('email', x)} error={err.email} autoComplete="email" placeholder="name@domain.com" />
                  <TextField id="wa" type="tel" label="WhatsApp number" required value={v.wa} onChange={(x) => set('wa', x)} error={err.wa} autoComplete="tel" placeholder="0812 3456 7890" />
                  <TextField id="instansi" label="University / institution" required value={v.instansi} onChange={(x) => set('instansi', x)} error={err.instansi} autoComplete="organization" placeholder="Bandung Institute of Technology" />
                  <TextField id="medsos" label="Social media account" required className="sm:col-span-2" value={v.medsos} onChange={(x) => set('medsos', x)} error={err.medsos} placeholder="Instagram @username or profile link" />
                </div>
              </SectionCard>

              <SectionCard no="02" title="Division & position">
                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectField id="divisi1" label="First choice" required value={v.divisi1} onChange={(x) => set('divisi1', x)} error={err.divisi1} options={divisionOptions} placeholder="Choose a division" />
                  <SelectField id="divisi2" label="Second choice" required value={v.divisi2} onChange={(x) => set('divisi2', x)} error={err.divisi2} options={divisionOptions} placeholder="Choose a division" />
                </div>
                <fieldset id="posisi" tabIndex={-1} className="flex flex-col gap-3 focus:outline-none">
                  <legend className="mb-2 text-sm font-semibold text-ink">
                    Position<span className="text-danger"> *</span>
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {posisiOptions.map((o) => {
                      const checked = v.posisi === o.value;
                      return (
                        <label
                          key={o.value}
                          className={cn(
                            'relative flex cursor-pointer flex-col gap-1 rounded-xl border-[1.5px] px-5 py-4 transition focus-within:ring-4 focus-within:ring-brand/20',
                            checked ? 'border-brand bg-mint' : err.posisi ? 'border-danger bg-white' : 'border-slate-300 bg-white hover:border-brand',
                          )}
                        >
                          <input
                            type="radio"
                            name="posisi"
                            value={o.value}
                            checked={checked}
                            onChange={() => {
                              set('posisi', o.value);
                              if (o.value === 'staf') set('bersediaStaf', false);
                            }}
                            className="absolute size-px opacity-0"
                          />
                          <span className="text-[15px] font-extrabold text-forest">{o.title}</span>
                          <span className="text-[13px] text-muted">{o.sub}</span>
                        </label>
                      );
                    })}
                  </div>
                  {err.posisi ? <p className="text-[13px] text-danger">{err.posisi}</p> : null}
                </fieldset>
                {v.posisi === 'manager' ? (
                  <ConsentCheckbox id="bersediaStaf" checked={v.bersediaStaf} onChange={(x) => set('bersediaStaf', x)}>
                    I am willing to be placed as <strong>Staff</strong> if I am not yet considered a fit for the Manager position.
                  </ConsentCheckbox>
                ) : null}
              </SectionCard>

              <SectionCard no="03" title="Documents & portfolio">
                <FileField id="cv" label="CV" required file={v.cv} onChange={(f) => set('cv', f)} error={err.cv} accept=".pdf,application/pdf" note="PDF, up to 5 MB" />
                <TextField
                  id="portofolio"
                  type="url"
                  label="Technical portfolio link"
                  required
                  value={v.portofolio}
                  onChange={(x) => set('portofolio', x)}
                  error={err.portofolio}
                  placeholder="https://"
                  hint={`Google Drive, GitHub, Behance, or a writing archive. ${main?.porto.en ?? ''}`.trim()}
                />
              </SectionCard>

              <SectionCard no="04" title="Operational case study">
                <div className="flex flex-col gap-2 rounded-xl bg-mint px-5 py-5">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.12em] text-brand">SCENARIO</span>
                  <p className="text-[15px] leading-relaxed">
                    Two hours before ThreeL Berbagi starts, 40% of volunteers cancel and the distribution site has to move
                    because of heavy rain. You are the field coordinator. What steps do you take?
                  </p>
                </div>
                <TextAreaField
                  id="kasus"
                  label="Your answer"
                  required={!waitlist}
                  hint={
                    waitlist
                      ? 'Optional while on the waitlist.'
                      : 'Write out the order of your actions, who you would contact, and how you would make sure beneficiaries are still served. At least 80 words.'
                  }
                  value={v.kasus}
                  onChange={(x) => set('kasus', x)}
                  error={err.kasus}
                  placeholder="Step 1…"
                  wordCount={countWords(v.kasus)}
                />
              </SectionCard>

              <SectionCard no="05" title="Availability">
                <ConsentCheckbox id="komitmen" checked={v.komitmen} onChange={(x) => set('komitmen', x)} error={err.komitmen}>
                  I can commit <strong>8–12 hours per week</strong> to division work.
                </ConsentCheckbox>
              </SectionCard>

              <div className="flex flex-col-reverse gap-4 py-2 sm:flex-row sm:items-center sm:justify-between">
                <ErrorSummary count={form.errorCount} />
                <button
                  type="submit"
                  disabled={form.submitting}
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-brand px-7 font-bold text-white transition hover:bg-forest disabled:opacity-60 sm:ml-auto"
                >
                  {waitlist ? 'Submit' : 'Submit application'}
                  <ArrowRight className="size-[18px]" aria-hidden />
                </button>
              </div>
            </form>
          )}

          {/* Kolom kanan membentang setinggi formulir supaya kartu profil bisa menempel saat digulir. */}
          <div className="flex flex-col gap-5 lg:self-stretch">
            <SelectionSteps steps={associateSteps} className="rounded-2xl border-line" />
            <aside aria-label="Your skills profile" className="flex flex-col gap-4 rounded-2xl bg-forest p-7 text-white lg:sticky lg:top-28">
              <span className="font-mono text-[11px] font-semibold tracking-[0.12em] text-gold">YOUR SKILLS PROFILE</span>
              <div className="flex flex-col gap-1">
                <span className="text-[13px] text-sage-muted">First choice</span>
                <span className="text-lg font-extrabold">{main?.label ?? 'Not chosen yet'}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(main?.skills.map((s) => s.en) ?? ['Choose a division to see its skills']).map((s) => (
                  <span key={s} className="rounded-lg bg-white/10 px-2.5 py-1.5 text-[13px] font-semibold">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-1 border-t border-white/15 pt-3.5">
                <span className="text-[13px] text-sage-muted">Second choice</span>
                <span className="text-[15px] font-bold">{backup?.label ?? 'Not chosen yet'}</span>
              </div>
              <div className="flex flex-col gap-1 border-t border-white/15 pt-3.5">
                <span className="text-[13px] text-sage-muted">Position</span>
                <span className="text-[15px] font-bold">
                  {posisiOptions.find((o) => o.value === v.posisi)?.title ?? 'Not chosen yet'}
                  {v.posisi === 'manager' && v.bersediaStaf ? ' (open to Staff)' : ''}
                </span>
              </div>
              <p className="rounded-xl bg-gold/12 px-4 py-3.5 text-[13px] leading-relaxed text-gold-soft">
                {main?.porto.en ?? 'A portfolio relevant to your chosen division speeds up the selection process.'}
              </p>
            </aside>
          </div>
        </Container>
      </div>
    </div>
  );
}
