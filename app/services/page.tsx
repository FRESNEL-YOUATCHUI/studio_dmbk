import { Metadata } from 'next';
import { ServicesPageContent } from './services-content';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Découvrez nos services : design graphique, identité visuelle, community management et création de sites web. Des solutions créatives pour votre entreprise.',
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
