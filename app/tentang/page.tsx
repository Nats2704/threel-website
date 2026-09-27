import type { Metadata } from 'next';
import Image from 'next/image';
import { Container, PageHeader, SectionHeading } from '@/components/ui/section';
import { Reveal } from '@/components/ui/reveal';
import { ChiefCarousel } from '@/components/site/chief-carousel';
import { FounderCard } from '@/components/site/founder-card';
import { ValueMarquee } from '@/components/site/value-marquee';
import { VisionCard } from '@/components/site/vision-card';
import { MissionOrbit } from '@/components/site/mission-orbit';
import { ParallaxBackdrop } from '@/components/ui/parallax-backdrop';
import { ScrollDrift, ScrollZoom } from '@/components/ui/scroll-motion';

export const metadata: Metadata = { title: 'Tentang Kami' };

export default function TentangPage() {
  return (
    <ParallaxBackdrop src="/images/latar-tentang.webp">
      <PageHeader
        crumb="TENTANG KAMI"
        className="bg-mint/55"
        title="Tumbuh dari keresahan, bergerak untuk solusi."
        lead="Kami melihat masalah dari dekat, belajar bersama, lalu memimpin aksi yang berdampak bagi masyarakat prasejahtera."
        aside={
          // Margin negatif di desktop membuat maskot hampir menyentuh batas atas dan bawah header.
          <ScrollDrift range={[-20, 70]} className="mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:-my-12 lg:max-w-none">
            <Image
              src="/images/maskot-tentang-bingung.webp"
              alt="Maskot pohon ThreeL berpose berpikir dengan tanda tanya di sampingnya."
              width={878}
              height={1328}
              priority
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 300px, 260px"
              className="mx-auto h-auto w-full drop-shadow-[0_24px_30px_rgba(11,59,46,0.18)] lg:h-[540px] lg:w-auto"
            />
          </ScrollDrift>
        }
      />

      <section aria-label="Visi dan misi" className="pb-20 lg:pb-24">
        {/* Pita visi menempel langsung di bawah header dan membentang penuh kiri-kanan. */}
        <ScrollZoom className="overflow-hidden">
          <VisionCard />
        </ScrollZoom>
        <Container className="mt-16 lg:mt-20">
          <div className="flex flex-col gap-8">
            <Reveal>
              <ScrollDrift range={[24, -24]}>
                <SectionHeading
                  eyebrow="Misi"
                  title="Empat langkah menuju visi itu."
                />
              </ScrollDrift>
            </Reveal>
            <Reveal delay={100}>
              <MissionOrbit />
            </Reveal>
          </div>
        </Container>
      </section>

      <section aria-labelledby="nilai-title" className="bg-surface/60 py-20 lg:py-24">
        <Container className="flex flex-col gap-12">
          <Reveal>
            <ScrollDrift range={[24, -24]}>
              <SectionHeading
                id="nilai-title"
                eyebrow="Core values"
                title="Enam nilai yang kami pegang di setiap aksi."
                aside="Nilai ini menjadi dasar rekrutmen, evaluasi kinerja, dan cara kami mengambil keputusan bersama."
              />
            </ScrollDrift>
          </Reveal>
        </Container>
        {/* Di luar Container agar pita membentang penuh dari tepi kiri ke kanan layar. */}
        <Reveal delay={100} className="mt-12">
          <ValueMarquee />
        </Reveal>
      </section>

      <section aria-labelledby="struktur-title" className="py-20 lg:py-24">
        <Container className="flex flex-col gap-12">
          <Reveal>
            <ScrollDrift range={[24, -24]}>
              <SectionHeading
                id="struktur-title"
                eyebrow="Struktur organisasi"
                title="Dipimpin pemuda, dikelola secara profesional."
              />
            </ScrollDrift>
          </Reveal>
          <Reveal delay={100}>
            <ScrollDrift range={[40, -40]}>
              <ChiefCarousel />
            </ScrollDrift>
          </Reveal>
          <Reveal delay={100} className="mt-4 lg:mt-8">
            <ScrollDrift range={[60, -30]}>
              <FounderCard />
            </ScrollDrift>
          </Reveal>
        </Container>
      </section>
    </ParallaxBackdrop>
  );
}
