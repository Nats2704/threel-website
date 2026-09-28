'use client';

import Image from 'next/image';
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

        <div className="relative size-44 shrink-0 self-center sm:size-48 sm:self-auto">
          <span aria-hidden className={`${vLine} left-0 hidden sm:block`} />
          <span aria-hidden className={`${vLine} right-0 hidden sm:block`} />
          {founder.photo ? (
            <Image
              src={founder.photo}
              alt={`${t('Foto', 'Photo of')} ${founder.name}, ${founder.role}`}
              fill
              sizes="192px"
              className="object-cover [mask-image:radial-gradient(circle,black_60%,transparent_100%)]"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-[radial-gradient(circle,var(--color-mint-deep)_55%,transparent_100%)]">
              <span className="text-5xl font-extrabold text-brand">{founder.name.replace(/[[\]]/g, '').charAt(0) || 'F'}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5 text-center sm:py-6 sm:pr-4 sm:text-left">
          <blockquote className="text-xl leading-snug text-muted sm:text-[26px]">
            &ldquo;{before}
            {after !== undefined ? <strong className="font-extrabold text-forest">{founder.highlight}</strong> : null}
            {after}&rdquo;
          </blockquote>
          <figcaption className="flex flex-col gap-1">
            <span className="text-base font-extrabold text-forest">{founder.name}</span>
            <span className="text-sm text-muted">{founder.role}</span>
          </figcaption>
        </div>
      </div>
    </figure>
  );
}
