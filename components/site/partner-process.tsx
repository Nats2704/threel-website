'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { cn } from '@/lib/cn';
import { partnerSteps } from '@/lib/content';
import { useLang } from '@/lib/i18n';
import { Eyebrow } from '@/components/ui/section';

const N = partnerSteps.length;
/** Seberapa banyak tepi atas kartu di belakang yang terlihat saat masih bertumpuk (px). */
const PEEK = 14;

/** Porsi gulir untuk langkah ke-k (1..N-1): 0 sebelum giliran kartu itu, 1 setelah selesai terbuka. */
function segment(p: number, k: number) {
  return Math.min(1, Math.max(0, p * (N - 1) - (k - 1)));
}

function StepCard({
  index,
  progress,
  tops,
  stacked,
}: {
  index: number;
  progress: MotionValue<number>;
  tops: number[];
  stacked: boolean;
}) {
  const { t } = useLang();
  const step = partnerSteps[index];
  const last = index === N - 1;

  // Posisi akhir kartu ada di alur halaman biasa; saat bertumpuk, kartu digeser naik ke posisi
  // kartu pertama (menyisakan PEEK px per kartu), lalu turun bertahap: langkah k menggeser
  // sisa tumpukan (kartu k dst.) satu slot ke bawah, meninggalkan kartu k-1 di tempatnya.
  const y = useTransform(progress, (p) => {
    if (!stacked || tops.length < N) return 0;
    let offset = -tops[index] + index * PEEK;
    for (let k = 1; k <= index; k++) offset += segment(p, k) * (tops[k] - tops[k - 1] - PEEK);
    return offset;
  });
  // Kartu yang masih tertutup kartu lain sedikit mengecil, seperti tumpukan kertas.
  const scale = useTransform(progress, (p) => (!stacked || last ? 1 : 1 - 0.05 * (1 - segment(p, index + 1))));

  return (
    <motion.li
      style={{ y, scale, zIndex: index + 1 }}
      className="relative origin-top overflow-hidden rounded-[24px] border border-line bg-white p-7 shadow-[0_18px_40px_-26px_rgba(11,59,46,0.4)] sm:p-8"
    >
      {/* Cahaya lembut di belakang nomor. */}
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-6 -top-6 size-32 rounded-full blur-2xl',
          last ? 'bg-gold/35' : 'bg-brand-bright/20',
        )}
      />
      <div className="relative flex items-start justify-between gap-6">
        <h3 className="text-xl font-extrabold leading-snug tracking-tight text-forest sm:text-2xl">{t(step.title)}</h3>
        <span className={cn('text-3xl font-extrabold leading-none tracking-tight', last ? 'text-gold-deep' : 'text-brand-bright')}>
          {step.no}
        </span>
      </div>
      <p className="relative mt-4 text-[16px] leading-[1.75] text-ink/85">{t(step.desc)}</p>
    </motion.li>
  );
}

/**
 * Alur kemitraan. Desktop: teks di kiri (menempel saat digulir), kartu langkah terbuka di kanan.
 * HP: kartu awalnya bertumpuk, lalu terbuka ke bawah satu per satu mengikuti gulir.
 */
export function PartnerProcess() {
  const { t } = useLang();
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const [mobile, setMobile] = useState(false);
  const [tops, setTops] = useState<number[]>([]);

  // Tumpukan hanya di layar sempit dan bila pengunjung tidak mematikan animasi.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Posisi akhir tiap kartu di dalam daftar, diukur ulang saat ukuran berubah (mis. ganti bahasa).
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => setTops(Array.from(list.children, (el) => (el as HTMLElement).offsetTop));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, []);

  // Tumpukan terlihat utuh dulu; mulai terbuka saat bagian atasnya melewati 55% tinggi layar.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.55', 'end 1'] });
  const stacked = mobile && !reduced;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
      <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
        <Eyebrow>{t('Alur kemitraan', 'Partnership process')}</Eyebrow>
        <h2 id="alur-mitra-title" className="text-3xl font-extrabold leading-tight tracking-tight text-forest sm:text-[40px]">
          {t('Empat langkah dari', 'Four steps from')}{' '}
          <span className="text-brand-bright">{t('pengajuan ke laporan', 'proposal to report')}</span>.
        </h2>
        <p className="max-w-[480px] text-base leading-relaxed text-muted sm:text-[17px]">
          {t(
            'Kami ingin setiap kemitraan berjalan jelas sejak hari pertama. Dari pesan pertama sampai laporan akhir, kamu selalu tahu apa yang sedang dikerjakan dan apa hasilnya.',
            'We want every partnership to be clear from day one. From your first message to the final report, you always know what is being done and what it achieved.',
          )}
        </p>
      </div>

      <ol ref={listRef} className="relative flex flex-col gap-5 sm:gap-6">
        {partnerSteps.map((s, i) => (
          // Kunci berubah saat ukuran/mode berubah agar transform dibuat ulang dengan nilai terbaru.
          <StepCard key={`${s.no}-${stacked}-${tops.join(',')}`} index={i} progress={scrollYProgress} tops={tops} stacked={stacked} />
        ))}
      </ol>
    </div>
  );
}
