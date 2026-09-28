'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { cLevels } from '@/lib/content';
import type { RecruitmentStatus } from '@/lib/recruitment';
import { countWords } from '@/lib/validation';
import { useForm } from '@/hooks/use-form';
import { Container } from '@/components/ui/section';
import { StatusBadge } from '@/components/ui/status-badge';
import { BackToRoles } from './back-link';
import { ConsentCheckbox, ErrorSummary, FileField, SelectField, TextAreaField, TextField } from './fields';
import { SelectionSteps } from './selection-steps';

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

function SectionCard({ no, title, desc, children }: { no: string; title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-[#DCE3DF] bg-white p-6 sm:p-9">
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="mb-7 flex w-full items-start gap-4 border-b border-[#DCE3DF] p-0 pb-5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded border border-forest font-mono text-[13px] font-semibold text-forest">
            {no}
          </span>
          <span className="flex flex-col gap-1 pt-0.5">
            <span className="text-xl font-extrabold leading-tight text-forest">{title}</span>
            <span className="text-sm font-normal leading-relaxed text-muted">{desc}</span>
          </span>
        </legend>
        <div className="flex flex-col gap-6">{children}</div>
      </fieldset>
    </div>
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
    posisi: { required: true, requiredMsg: 'Please choose the position you are applying for.' },
    cv: { file: { required: true, types: ['pdf'], maxMB: 5 } },
    portofolio: { required: true, url: true },
    esai1: essay,
    esai2: essay,
    komitmen: { checked: true, checkedMsg: 'Please tick to confirm a commitment of at least 15–20 hours per week.' },
  }));
  const { values: v, set, errors: err } = form;
  const scope = cLevels.find((c) => c.value === v.posisi)?.scope.en;
  const tone = 'formal' as const;

  return (
    <div className="bg-[#F4F6F5]">
      <section className="border-t-[3px] border-gold-deep bg-forest py-12 text-white lg:py-14">
        <Container className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-3xl flex-col gap-4">
            <BackToRoles className="text-sage hover:text-white" />
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-semibold tracking-[0.16em] text-gold">
                BOARD OF DIRECTOR APPLICATION
              </span>
              <StatusBadge status={status} />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Lead ThreeL’s strategic direction.</h1>
            <p className="text-[17px] leading-relaxed text-sage">
              {waitlist
                ? 'BoD recruitment is currently closed. Fill in this form to join the waitlist, and we will contact you when the next batch opens.'
                : 'We are looking for executive leaders ready to set the direction of a division, build a team, and take responsibility for program impact.'}
            </p>
          </div>
        </Container>
      </section>

      <Container className="grid items-start gap-10 py-12 lg:grid-cols-[320px_minmax(0,1fr)] lg:py-14">
        <aside className="flex flex-col gap-5 lg:sticky lg:top-28">
          <SelectionSteps className="rounded-md border-[#DCE3DF]" />
        </aside>

        {form.sent ? (
          <div role="status" className="flex flex-col items-start gap-4 rounded-md border border-[#DCE3DF] border-t-4 border-t-gold-deep bg-white p-8 sm:p-14">
            <span className="flex size-14 items-center justify-center rounded-md bg-forest text-gold">
              <Check className="size-7" strokeWidth={2.6} aria-hidden />
            </span>
            <h2 className="text-[30px] font-extrabold text-forest">
              {waitlist ? 'You are on the BoD waitlist' : 'BoD application received'}
            </h2>
            <p className="text-base leading-relaxed text-muted">
              Thank you, {v.nama}. The ThreeL HR team will contact you at {v.email} and on WhatsApp about the next stage.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/" className="flex h-12 items-center rounded-md bg-forest px-6 font-bold text-white hover:bg-brand">
                Back to home
              </Link>
              <button type="button" onClick={form.reset} className="h-12 rounded-md border border-forest bg-white px-6 font-bold text-forest">
                Fill in a new form
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={form.submit} noValidate className="flex flex-col gap-6">
            <SectionCard no="01" title="Personal & professional details" desc="We use these contacts throughout the selection process.">
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField tone={tone} id="nama" label="Full name" required value={v.nama} onChange={(x) => set('nama', x)} error={err.nama} autoComplete="name" />
                <TextField tone={tone} id="email" type="email" label="Email" required value={v.email} onChange={(x) => set('email', x)} error={err.email} autoComplete="email" placeholder="name@domain.com" />
                <TextField tone={tone} id="wa" type="tel" label="WhatsApp number" required value={v.wa} onChange={(x) => set('wa', x)} error={err.wa} autoComplete="tel" placeholder="0812 3456 7890" />
                <TextField tone={tone} id="linkedin" type="url" label="LinkedIn profile link" required value={v.linkedin} onChange={(x) => set('linkedin', x)} error={err.linkedin} placeholder="https://www.linkedin.com/in/yourname" />
              </div>
            </SectionCard>

            <SectionCard no="02" title="Position" desc="Choose one C-Level position.">
              <SelectField
                tone={tone}
                id="posisi"
                label="Position"
                required
                value={v.posisi}
                onChange={(x) => set('posisi', x)}
                error={err.posisi}
                placeholder="Choose a position"
                options={cLevels.map((c) => ({ value: c.value, label: `${c.title} (${c.code})` }))}
              />
              {scope ? (
                <p className="rounded border-l-[3px] border-gold-deep bg-surface px-5 py-4 text-sm leading-relaxed">
                  <strong>Role scope.</strong> {scope}
                </p>
              ) : null}
            </SectionCard>

            <SectionCard no="03" title="Supporting documents" desc="Your CV must be a PDF of 5 MB or smaller.">
              <FileField tone={tone} id="cv" label="Latest CV / resume" required file={v.cv} onChange={(f) => set('cv', f)} error={err.cv} accept=".pdf,application/pdf" note="PDF, up to 5 MB" />
              <TextField
                tone={tone}
                id="portofolio"
                type="url"
                label="Leadership portfolio link"
                required
                value={v.portofolio}
                onChange={(x) => set('portofolio', x)}
                error={err.portofolio}
                placeholder="https://drive.google.com/…"
                hint="Your organizational track record, projects you have led, or awards. Make sure the link is publicly accessible."
              />
            </SectionCard>

            <SectionCard
              no="04"
              title="Vision & solutions"
              desc={waitlist ? 'Optional while on the waitlist. You can complete them when the batch opens.' : 'Required, at least 100 words each.'}
            >
              <TextAreaField
                tone={tone}
                id="esai1"
                label="Your strategic plan for your division in the first 6 months"
                required={!waitlist}
                hint="Describe your priorities, measurable targets, and first steps for the position you chose."
                value={v.esai1}
                onChange={(x) => set('esai1', x)}
                error={err.esai1}
                wordCount={countWords(v.esai1)}
              />
              <TextAreaField
                tone={tone}
                id="esai2"
                label="How do you apply the Solutioner and Synergy values when your team faces a problem?"
                required={!waitlist}
                hint="Tell us about one real situation, including the problem, your role, and the result."
                value={v.esai2}
                onChange={(x) => set('esai2', x)}
                error={err.esai2}
                wordCount={countWords(v.esai2)}
              />
            </SectionCard>

            <SectionCard no="05" title="Time commitment" desc="The BoD role requires regular involvement every week.">
              <ConsentCheckbox tone={tone} id="komitmen" checked={v.komitmen} onChange={(x) => set('komitmen', x)} error={err.komitmen}>
                I am willing to commit <strong>at least 15–20 hours per week</strong> to this role throughout my term.
              </ConsentCheckbox>
            </SectionCard>

            <div className="flex flex-col-reverse gap-4 py-2 sm:flex-row sm:items-center sm:justify-between">
              <ErrorSummary count={form.errorCount} />
              <button
                type="submit"
                disabled={form.submitting}
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded bg-forest px-6 font-bold text-white transition hover:bg-brand disabled:opacity-60 sm:ml-auto"
              >
                {waitlist ? 'Submit' : 'Submit application'}
                <ArrowRight className="size-[18px]" aria-hidden />
              </button>
            </div>
          </form>
        )}
      </Container>
    </div>
  );
}
