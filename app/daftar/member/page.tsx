import type { Metadata } from 'next';
import { MemberForm } from '@/components/forms/member-form';

export const metadata: Metadata = { title: 'Gabung ThreeLearnian' };

export default function DaftarMemberPage() {
  return <MemberForm />;
}
