import { Container } from '@/components/ui/section';
import { TopoBackground } from '@/components/ui/topo-background';
import { T } from '@/lib/i18n';

/** Pita visi selebar layar: teks di tengah di atas peta topografi hijau yang bergerak pelan. */
export function VisionCard() {
  return (
    <div className="relative isolate overflow-hidden bg-forest text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        <TopoBackground className="absolute inset-0 size-full" />
        {/* Kisi tipis seperti kertas peta. */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(143,211,182,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(143,211,182,0.07)_1px,transparent_1px)] bg-[size:48px_48px]" />
        {/* Vignet: tengah sedikit lebih gelap agar teks menonjol, tepi dibiarkan menampilkan kontur. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,59,46,0.8)_0%,rgba(11,59,46,0.35)_55%,transparent_80%)]" />
      </div>

      <Container className="py-20 lg:py-28">
        <div className="mx-auto flex max-w-[760px] flex-col items-center gap-7 text-center">
          <span className="font-mono text-xs font-semibold tracking-[0.3em] text-[#8FD3B6]">
            <T id="VISI" en="VISION" />
          </span>

          <p className="text-2xl font-bold leading-snug tracking-tight sm:text-[30px]">
            <T id="Menjadi wadah pemuda yang melahirkan" en="To be a home for young people that raises" />
            <span className="relative mx-auto my-3 block w-fit">
              <span className="block -skew-x-6 bg-gradient-to-r from-[#B7E4C7] via-[#5FBF94] to-[#8FD3B6] bg-clip-text pr-1 text-[26px] font-extrabold italic leading-tight tracking-tight text-transparent sm:text-[38px] lg:text-[46px]">
                #ShapingChangemakers
              </span>
              {/* Sapuan kuas di bawah frasa kunci, tergambar saat kartu muncul. */}
              <svg aria-hidden viewBox="0 0 300 16" preserveAspectRatio="none" className="brush absolute -bottom-2 left-0 h-3.5 w-full">
                <defs>
                  <linearGradient id="brush-grad" x1="0" x2="1">
                    <stop offset="0" stopColor="#5FBF94" />
                    <stop offset="1" stopColor="#B7E4C7" />
                  </linearGradient>
                </defs>
                <path d="M3 11C80 5 190 3 297 6" pathLength={1} stroke="url(#brush-grad)" strokeWidth="6" strokeLinecap="round" fill="none" />
              </svg>
            </span>
            <T
              id="bagi Indonesia yang bebas dari kemiskinan, melalui pendidikan, teknologi, dan pemberdayaan sosial."
              en="for a poverty-free Indonesia, through education, technology, and social empowerment."
            />
          </p>
        </div>
      </Container>
    </div>
  );
}
