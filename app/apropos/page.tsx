import { Metadata } from 'next';
import { AboutPageContent } from './about-content';

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Découvrez ID Craft : notre histoire, notre mission et nos valeurs. Un studio créatif africain passionné par l\'excellence du design.',
};

export default function AboutPage() {
  return <AboutPageContent />;
}
