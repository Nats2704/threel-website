import type { Metadata } from 'next';
import { recruitment } from '@/lib/recruitment';
import { AssociateForm } from '@/components/forms/associate-form';

export const metadata: Metadata = { title: 'Pendaftaran Associate' };

export default function DaftarAssociatePage() {
  return <AssociateForm status={recruitment.associate} />;
}
