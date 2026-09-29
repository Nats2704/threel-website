'use client';

import Image from 'next/image';
import { GraduationCap } from 'lucide-react';
import { founder } from '@/lib/content';
import { useLang } from '@/lib/i18n';

// Garis kisi tipis yang memudar di ujung, membingkai foto dan kutipan founder.
const hLine = 'pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#CFDAD4] to-transparent';
const vLine = 'pointer-events-none absolute -inset-y-12 w-px bg-gradient-to-b from-transparent via-[#CFDAD4] to-transparent';

export function FounderCard() {
  const { t } = useLang();
  const [before, after] = t(founder.quote).split(founder.highlight);

  return (
    <figure className="relative m-0 py-12">
      <div className="relative mx-auto flex max-w-[860px] flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
        <span aria-hidden className={`${hLine} -top-px -inset-x-16 hidden sm:block`} />
        <span aria-hidden className={`${hLine} -bottom-px -inset-x-16 hidden sm:block`} />

        {/* Foto seluruh badan berdiri tepat di garis bawah kartu, jadi potongan kakinya terlihat disengaja.
            Di HP garisnya tidak ada, jadi tepi bawah foto dipudarkan. */}
        <div
          className={
            founder.photo
              ? 'relative h-[280px] w-[160px] shrink-0 self-center sm:h-[340px] sm:w-[192px] sm:self-end'
              : 'relative size-40 shrink-0 self-center sm:size-44 sm:self-auto'
          }
        >
          <span aria-hidden className={`${vLine} left-0 hidden sm:block`} />
          <span aria-hidden className={`${vLine} right-0 hidden sm:block`} />
          {founder.photo ? (
            <Image
              src={founder.photo}
              alt={`${t('Foto', 'Photo of')} ${founder.name}, ${founder.role}`}
              fill
              sizes="(min-width: 640px) 192px, 160px"
              className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_85%,transparent)] sm:[mask-image:none]"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-[radial-gradient(circle,var(--color-mint-deep)_55%,transparent_100%)]">
              <span className="text-5xl font-extrabold text-brand">{founder.name.replace(/[[\]]/g, '').charAt(0) || 'F'}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5 text-center sm:py-6 sm:pr-4 sm:text-left">
          <blockquote className="text-lg leading-snug text-muted sm:text-[22px]">
            &ldquo;{before}
            {after !== undefined ? <strong className="font-extrabold text-forest">{founder.highlight}</strong> : null}
            {after}&rdquo;
          </blockquote>
          <figcaption className="flex flex-col items-center gap-1 sm:items-start">
            <span className="text-base font-extrabold text-forest">{founder.name}</span>
            <span className="text-sm text-muted">{founder.role}</span>
            {founder.campus ? (
              <span className="mt-1.5 inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-white/70 px-3 py-1 text-sm font-semibold text-forest backdrop-blur">
                <GraduationCap className="size-4 text-gold-ink" strokeWidth={2} aria-hidden />
                {founder.campus}
              </span>
            ) : null}
          </figcaption>
        </div>
      </div>
    </figure>
  );
}
