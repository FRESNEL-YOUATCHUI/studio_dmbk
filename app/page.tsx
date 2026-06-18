import { Hero } from '@/components/sections/hero';
import { ServicesPreview } from '@/components/sections/services-preview';
import { PortfolioPreview } from '@/components/sections/portfolio-preview';
import { WhyChooseUs } from '@/components/sections/why-us';
import { CTASection } from '@/components/sections/cta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <PortfolioPreview />
      <WhyChooseUs />
      <CTASection variant="dark" />
    </>
  );
}
