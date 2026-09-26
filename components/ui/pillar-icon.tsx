import { BookOpen, HeartPulse, Sprout } from 'lucide-react';
import type { IconKey } from '@/lib/content';
import { cn } from '@/lib/cn';

const icons = { book: BookOpen, heart: HeartPulse, sprout: Sprout };
const tones: Record<IconKey, string> = {
  book: 'bg-brand text-white',
  heart: 'bg-forest text-white',
  sprout: 'bg-gold-deep text-forest',
};

export function PillarIcon({ icon, className }: { icon: IconKey; className?: string }) {
  const Icon = icons[icon];
  return (
    <span className={cn('flex size-12 items-center justify-center rounded-[14px]', tones[icon], className)}>
      <Icon className="size-6" aria-hidden />
    </span>
  );
}
