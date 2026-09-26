import type { Metadata } from 'next';
import { recruitment } from '@/lib/recruitment';
import { BodForm } from '@/components/forms/bod-form';

export const metadata: Metadata = { title: 'Pendaftaran Board of Director' };

export default function DaftarBodPage() {
  return <BodForm status={recruitment.bod} />;
}
