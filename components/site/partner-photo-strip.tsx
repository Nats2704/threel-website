import Image from 'next/image';
import { cn } from '@/lib/cn';

/** Foto kegiatan sosial untuk hero Bermitra (sumber dan kredit: public/images/mitra/CREDITS.md). */
const photos = [
  'donor-darah',
  'mengajar',
  'bantuan-pangan',
  'kelas-anak',
  'kebun-kota',
  'pemeriksaan-darah',
  'membaca',
  'anak-indonesia',
];

// Kemiringan dan naik-turun tiap kartu, supaya deretan terlihat seperti foto yang ditebar.
const TILT = [-5, 3, -2, 4, -4, 2, -3, 5];
const LIFT = ['translate-y-3', '-translate-y-1', 'translate-y-5', 'translate-y-0', 'translate-y-4', '-translate-y-2', 'translate-y-2', 'translate-y-6'];

/**
 * Deretan foto miring yang berjalan sendiri ke kiri. Murni dekoratif: tidak bisa disentuh,
 * digeser, atau dijeda, dan disembunyikan dari pembaca layar.
 */
export function PartnerPhotoStrip({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('partner-fade pointer-events-none select-none overflow-hidden py-8', className)}>
      {/* Dua salinan identik; jarak antarkartu memakai pr agar geser -50% menyambung mulus. */}
      <ul className="partner-track flex w-max">
        {[0, 1].map((copy) =>
          photos.map((name, i) => (
            <li key={`${copy}-${name}`} className="pr-4 sm:pr-5">
              <div
                className={cn(
                  'partner-card-fade relative h-[250px] w-[190px] overflow-hidden rounded-[22px] bg-mint-deep shadow-[0_24px_40px_-24px_rgba(11,59,46,0.55)] sm:h-[320px] sm:w-[240px] lg:h-[360px] lg:w-[270px]',
                  LIFT[i],
                )}
                style={{ rotate: `${TILT[i]}deg` }}
              >
                <Image
                  src={`/images/mitra/${name}.webp`}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 270px, (min-width: 640px) 240px, 190px"
                  className="object-cover"
                  draggable={false}
                />
                {/* Semburat hijau tipis agar foto dari berbagai sumber terasa satu palet. */}
                <span className="absolute inset-0 bg-gradient-to-t from-forest/35 via-brand/10 to-transparent mix-blend-multiply" />
              </div>
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
