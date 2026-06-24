import { Metadata } from 'next';
import { ServicesPageContent } from './services-content';
import { getSiteContent } from '@/lib/content-store';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Découvrez nos services : design graphique, identité visuelle, community management et création de sites web. Des solutions créatives pour votre entreprise.',
};

export const revalidate = 60;
export default async function ServicesPage() {
  const { services } = await getSiteContent();
  return <ServicesPageContent services={services} />;
}
