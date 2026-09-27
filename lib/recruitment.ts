/**
 * Status rekrutmen: satu sumber kebenaran untuk halaman /daftar dan formulirnya.
 * 'open'     = Open Batch
 * 'waitlist' = Closed / Masuk Daftar Tunggu
 * Nanti bisa diganti dengan nilai dari backend/CMS.
 */
export type RecruitmentStatus = 'open' | 'waitlist';

export const recruitment: Record<'bod' | 'associate' | 'member', RecruitmentStatus> = {
  bod: 'open',
  associate: 'waitlist',
  member: 'waitlist',
};

export const statusMeta: Record<
  RecruitmentStatus,
  { label: string; note: string; badge: string; dot: string; text: string }
> = {
  open: {
    label: 'Open Batch',
    note: 'Pendaftaran batch ini sedang dibuka.',
    badge: 'bg-green-100 text-green-900',
    dot: 'bg-green-600',
    text: 'text-green-900',
  },
  waitlist: {
    label: 'Closed',
    note: 'Batch ditutup. Pendaftar masuk daftar tunggu batch berikutnya.',
    badge: 'bg-amber-100 text-amber-900',
    dot: 'bg-amber-600',
    text: 'text-amber-900',
  },
};
