'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ArrowRight, Building2, Check, ChevronUp, Cross, FileText, ListChecks, Users, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { partnerTypes, type PartnerType } from '@/lib/content';
import { useLang } from '@/lib/i18n';

const EASE = [0.22, 1, 0.36, 1] as const;

const ICONS = { building: Building2, medical: Cross, users: Users };
const BADGE = { building: 'bg-brand text-white', medical: 'bg-forest text-white', users: 'bg-gold-deep text-forest' };

function Card({ type }: { type: PartnerType }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const Icon = ICONS[type.icon];
  const panelId = `mitra-${type.id}-detail`;
  const apply = (
    <Link
      href={`/bermitra?jenis=${type.id}#form`}
      className="flex min-h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-forest px-6 py-3 text-center text-[15px] font-bold leading-snug text-white shadow-[0_12px_24px_-14px_rgba(11,59,46,0.8)] transition hover:bg-brand"
    >
      {/* Label panjang (mis. versi Inggris) boleh turun baris tanpa menempel ke tepi tombol. */}
      <span>
        {t('Ajukan sebagai', 'Apply as')} {t(type.title)}
      </span>
      <ArrowRight className="size-4 shrink-0" aria-hidden />
    </Link>
  );

  return (
    <article
      aria-labelledby={`mitra-${type.id}-title`}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen(false)}
      className="relative h-[600px] overflow-hidden rounded-[30px] bg-white shadow-[0_24px_50px_-30px_rgba(11,59,46,0.55)]"
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-[64%]"
        animate={{ scale: open ? 1.08 : 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <Image src={type.photo} alt="" fill sizes="(min-width: 1024px) 380px, 100vw" className="object-cover" />
      </motion.div>
      {type.credit ? (
        <span className="absolute right-4 top-3 z-[1] text-[10px] text-white/85 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
          {type.credit}
        </span>
      ) : null}
      {/* Foto memudar ke putih agar teks di bawahnya terbaca. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_22%,rgba(255,255,255,0.72)_46%,#fff_62%)]" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:p-7">
        <div className="flex items-center gap-2.5">
          <h3 id={`mitra-${type.id}-title`} className="text-[26px] font-extrabold leading-tight tracking-tight text-forest">
            {t(type.title)}
          </h3>
          <span className={cn('flex size-7 shrink-0 items-center justify-center rounded-full', BADGE[type.icon])}>
            <Icon className="size-4" aria-hidden />
          </span>
        </div>
        <p className="text-[15px] leading-relaxed text-muted">{t(type.desc)}</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
          <span className="flex items-center gap-2">
            <ListChecks className="size-[18px] text-forest" aria-hidden />
            <span className="font-bold text-forest">{type.forms.length}</span> {t('bentuk kerja sama', 'ways to partner')}
          </span>
          <span className="flex items-center gap-2">
            <FileText className="size-[18px] text-forest" aria-hidden />
            {t('Laporan terbuka', 'Open reporting')}
          </span>
        </div>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(true)}
          className="flex w-fit items-center gap-1.5 text-sm font-bold text-brand hover:text-forest"
        >
          {t('Lihat bentuk kerja sama', 'See how we partner')}
          <ChevronUp className="size-4" aria-hidden />
        </button>
        {apply}
      </div>

      {/* Panel detail yang naik dari bawah saat kartu diarahkan kursor atau diketuk. */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="detail"
            id={panelId}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="absolute inset-x-0 bottom-0 top-[6%] flex flex-col gap-4 rounded-t-[28px] bg-white p-6 shadow-[0_-18px_40px_-24px_rgba(11,59,46,0.45)] sm:p-7"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className={cn('flex size-8 shrink-0 items-center justify-center rounded-full', BADGE[type.icon])}>
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="text-lg font-extrabold leading-tight text-forest">{t(type.title)}</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('Tutup detail', 'Close details')}
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-muted transition hover:text-forest"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
            <p className="text-[15px] leading-[1.7] text-ink">{t(type.detail)}</p>
            <div className="flex flex-col gap-2.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-brand">
                {t('Bentuk kerja sama', 'Ways to collaborate')}
              </span>
              <ul className="flex flex-col gap-2">
                {type.forms.map((f, i) => (
                  <motion.li
                    key={f.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.18 + i * 0.07, ease: EASE }}
                    className="flex items-center gap-3 rounded-xl bg-mint px-3.5 py-2.5 text-[15px] font-semibold text-forest"
                  >
                    <Check className="size-4 shrink-0 text-brand" aria-hidden />
                    {t(f)}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="mt-auto">{apply}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}

/** Kartu jenis mitra bergaya kartu profil: foto penuh, info di bawah, detail naik saat dibuka. */
export function PartnerTypeCards() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {partnerTypes.map((type) => (
          <Card key={type.id} type={type} />
        ))}
      </div>
    </MotionConfig>
  );
}
