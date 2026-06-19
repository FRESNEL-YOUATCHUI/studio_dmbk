import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, services } from '@/lib/data';
import { ServiceDetailContent } from './service-detail-content';

interface Props { params: { slug: string } }
export const generateStaticParams = () => services.map(({ slug }) => ({ slug }));
export function generateMetadata({ params }: Props): Metadata {
  const service = getServiceBySlug(params.slug);
  return service ? { title: service.title, description: service.shortDescription, openGraph: { images: [service.coverImage] } } : { title: 'Service introuvable' };
}
export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();
  return <ServiceDetailContent service={service} />;
}
