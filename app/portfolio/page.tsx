import { Metadata } from 'next';
import { PortfolioPageContent } from './portfolio-content';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Découvrez nos projets : branding, social media, création de sites web et design UI/UX. Un portfolio qui illustre notre expertise créative.',
};

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
