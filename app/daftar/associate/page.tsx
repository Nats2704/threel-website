import type { Metadata } from 'next';
import { recruitment } from '@/lib/recruitment';
import { LangLock } from '@/lib/i18n';
import { AssociateForm } from '@/components/forms/associate-form';

export const metadata: Metadata = { title: 'Associate Application' };

export default function DaftarAssociatePage() {
  // Formulir pendaftaran selalu berbahasa Inggris, apa pun bahasa situs yang dipilih.
  return (
    <LangLock lang="en">
      <AssociateForm status={recruitment.associate} />
    </LangLock>
  );
}
