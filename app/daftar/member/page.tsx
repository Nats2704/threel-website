import type { Metadata } from 'next';
import { MemberForm } from '@/components/forms/member-form';
import { recruitment } from '@/lib/recruitment';

export const metadata: Metadata = { title: 'Gabung ThreeLearnian' };

export default function DaftarMemberPage() {
  return <MemberForm status={recruitment.member} />;
}
