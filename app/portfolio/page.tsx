import { Metadata } from 'next';
import { PortfolioPageContent } from './portfolio-content';
import { getSiteContent } from '@/lib/content-store';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Découvrez nos projets : branding, social media, création de sites web et design UI/UX. Un portfolio qui illustre notre expertise créative.',
};

export const revalidate = 60;
export default async function PortfolioPage() {
  const { projects } = await getSiteContent();
  return <PortfolioPageContent projects={projects} />;
}
