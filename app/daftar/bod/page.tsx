import type { Metadata } from 'next';
import { recruitment } from '@/lib/recruitment';
import { LangLock } from '@/lib/i18n';
import { BodForm } from '@/components/forms/bod-form';

export const metadata: Metadata = { title: 'Board of Director Application' };

export default function DaftarBodPage() {
  // Formulir pendaftaran selalu berbahasa Inggris, apa pun bahasa situs yang dipilih.
  return (
    <LangLock lang="en">
      <BodForm status={recruitment.bod} />
    </LangLock>
  );
}
