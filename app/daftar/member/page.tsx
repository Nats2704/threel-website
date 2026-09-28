import type { Metadata } from 'next';
import { MemberForm } from '@/components/forms/member-form';
import { recruitment } from '@/lib/recruitment';
import { LangLock } from '@/lib/i18n';

export const metadata: Metadata = { title: 'Join as a ThreeLearnian' };

export default function DaftarMemberPage() {
  // Formulir pendaftaran selalu berbahasa Inggris, apa pun bahasa situs yang dipilih.
  return (
    <LangLock lang="en">
      <MemberForm status={recruitment.member} />
    </LangLock>
  );
}
