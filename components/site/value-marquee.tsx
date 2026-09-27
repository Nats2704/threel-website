import Image from 'next/image';
import { Handshake, Infinity as InfinityIcon, Lightbulb, Smile, Sunrise, Users, type LucideIcon } from 'lucide-react';
import { coreValues } from '@/lib/content';

// Ikon pengganti foto, urut sesuai coreValues.
const icons: LucideIcon[] = [Sunrise, Lightbulb, Smile, Handshake, Users, InfinityIcon];

/**
 * Pita kartu core values yang berjalan sendiri ke kiri (tidak bisa digeser).
 * Hover/fokus pada kartu menghentikan pita, mewarnai foto, dan memunculkan penjelasan.
 */
export function ValueMarquee() {
  return (
    <div className="value-marquee overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_3%,#000_97%,transparent)]">
      {/* Dua salinan identik; jarak antarkartu memakai pr-6 agar geser -50% menyambung mulus. */}
      <ul className="value-track flex w-max">
        {[0, 1].map((copy) =>
          coreValues.map((v, i) => (
            <li key={`${copy}-${v.title}`} aria-hidden={copy === 1 || undefined} className="pr-6">
              <ValueCard value={v} index={i} focusable={copy === 0} />
            </li>
          )),
        )}
      </ul>
    </div>
  );
}

function ValueCard({
  value,
  index,
  focusable,
}: {
  value: (typeof coreValues)[number];
  index: number;
  focusable: boolean;
}) {
  const Icon = icons[index % icons.length];
  const no = String(index + 1).padStart(2, '0');

  return (
    <article
      tabIndex={focusable ? 0 : -1}
      className="value-card group relative h-[380px] w-[272px] overflow-hidden rounded-[24px] bg-forest shadow-[0_18px_40px_-24px_rgba(11,59,46,0.5)] outline-none sm:w-[296px]"
    >
      {value.photo ? (
        <Image
          src={value.photo}
          alt=""
          fill
          sizes="296px"
          className="value-photo object-cover"
        />
      ) : (
        <div className="value-photo absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-bright via-brand to-forest">
          <Icon className="size-28 text-white/85" strokeWidth={1.25} aria-hidden />
        </div>
      )}

      <span className="value-badge absolute left-4 top-4 rounded-full bg-gold px-3 py-1 font-mono text-xs font-bold text-forest">
        {no}
      </span>

      <div className="absolute inset-x-3 bottom-3 rounded-[18px] border border-white/40 bg-white/75 px-4 py-3.5 backdrop-blur-md">
        <h3 className="text-lg font-extrabold leading-tight text-forest">{value.title}</h3>
        <div className="value-desc">
          <p className="overflow-hidden text-[14px] leading-relaxed text-ink">
            <span className="block pt-2">{value.desc}</span>
          </p>
        </div>
      </div>
    </article>
  );
}
