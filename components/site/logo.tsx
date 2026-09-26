export function LogoMark({ size = 40, tone = 'brand' }: { size?: number; tone?: 'brand' | 'bright' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className="shrink-0">
      <rect width="40" height="40" rx="11" fill={tone === 'brand' ? '#0F6B4F' : '#12805C'} />
      <path d="M11 10v20h19" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M16.5 10v14.5H30"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.7"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M22 10v9h8" fill="none" stroke="#F2C94C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
