import { Hero } from '@/components/sections/hero';
import { ServicesPreview } from '@/components/sections/services-preview';
import { PortfolioPreview } from '@/components/sections/portfolio-preview';
import { WhyChooseUs } from '@/components/sections/why-us';
import { CTASection } from '@/components/sections/cta';
import { WhatsAppButton } from '@/components/ui/whatsapp-button';
import { getSiteContent } from '@/lib/content-store';

export const revalidate = 60;
export default async function HomePage() {
  const { projects, services } = await getSiteContent();
  return (
    <>
      <Hero />
      <ServicesPreview services={services} />
      <PortfolioPreview projects={projects} />
      <WhyChooseUs />
      <CTASection variant="dark" />
      <WhatsAppButton />
    </>
  );
}
