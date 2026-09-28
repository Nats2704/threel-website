'use client';

import Image, { type ImageProps } from 'next/image';
import { useLang, type Bi } from '@/lib/i18n';

/** next/image dengan teks alternatif dwibahasa, untuk dipakai dari komponen server. */
export function LocalizedImage({ alt, ...props }: Omit<ImageProps, 'alt'> & { alt: Bi }) {
  const { t } = useLang();
  return <Image alt={t(alt)} {...props} />;
}
