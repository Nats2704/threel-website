import Image from 'next/image';

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <Image
      src="/logo.png"
      alt="Logo ThreeL Community"
      width={size}
      height={size}
      className="shrink-0 object-contain"
      priority
    />
  );
}
