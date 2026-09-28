import type { Metadata } from 'next';
import { Container, PageHeader, SectionHeading } from '@/components/ui/section';
import { Reveal } from '@/components/ui/reveal';
import { ChiefCarousel } from '@/components/site/chief-carousel';
import { FounderCard } from '@/components/site/founder-card';
import { ValueMarquee } from '@/components/site/value-marquee';
import { VisionCard } from '@/components/site/vision-card';
import { MissionOrbit } from '@/components/site/mission-orbit';
import { ParallaxBackdrop } from '@/components/ui/parallax-backdrop';
import { ScrollDrift, ScrollZoom } from '@/components/ui/scroll-motion';
import { T } from '@/lib/i18n';
import { LocalizedImage } from '@/components/ui/localized-image';

export const metadata: Metadata = { title: 'Tentang Kami' };

export default function TentangPage() {
  return (
    <ParallaxBackdrop src="/images/latar-tentang.webp">
      <PageHeader
        crumb={<T id="TENTANG KAMI" en="ABOUT US" />}
        className="bg-mint/55"
        title={<T id="Tumbuh dari keresahan, bergerak untuk solusi." en="Born from concern, moving toward solutions." />}
        lead={
          <T
            id="Kami melihat masalah dari dekat, belajar bersama, lalu memimpin aksi yang berdampak bagi masyarakat prasejahtera."
            en="We look at problems up close, learn together, and then lead action that makes a difference for low-income communities."
          />
        }
        aside={
          // Margin negatif di desktop membuat maskot hampir menyentuh batas atas dan bawah header.
          <ScrollDrift range={[-20, 70]} className="mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:-my-12 lg:max-w-none">
            <LocalizedImage
              src="/images/maskot-tentang-bingung.webp"
              alt={{
                id: 'Maskot pohon ThreeL berpose berpikir dengan tanda tanya di sampingnya.',
                en: 'The ThreeL tree mascot in a thinking pose with a question mark beside it.',
              }}
              width={878}
              height={1328}
              priority
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 300px, 260px"
              className="mx-auto h-auto w-full drop-shadow-[0_24px_30px_rgba(11,59,46,0.18)] lg:h-[540px] lg:w-auto"
            />
          </ScrollDrift>
        }
      />

      {/* overflow-x-clip: ikon orbit yang berputar tidak boleh membuat halaman bisa digeser ke samping di HP. */}
      <section aria-labelledby="misi-title" className="overflow-x-clip pb-20 lg:pb-24">
        {/* Pita visi menempel langsung di bawah header dan membentang penuh kiri-kanan. */}
        <ScrollZoom className="overflow-hidden">
          <VisionCard />
        </ScrollZoom>
        <Container className="mt-16 lg:mt-20">
          <div className="flex flex-col gap-8">
            <Reveal>
              <ScrollDrift range={[24, -24]}>
                <SectionHeading
                  id="misi-title"
                  eyebrow={<T id="Misi" en="Mission" />}
                  title={<T id="Empat langkah menuju visi itu." en="Four steps toward that vision." />}
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
                title={<T id="Enam nilai yang kami pegang di setiap aksi." en="Six values we hold in every action." />}
                aside={
                  <T
                    id="Nilai ini menjadi dasar rekrutmen, evaluasi kinerja, dan cara kami mengambil keputusan bersama."
                    en="These values guide our recruitment, performance reviews, and how we make decisions together."
                  />
                }
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
                eyebrow={<T id="Struktur organisasi" en="Organization structure" />}
                title={<T id="Dipimpin pemuda, dikelola secara profesional." en="Led by young people, run professionally." />}
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
