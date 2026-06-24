import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSiteContent } from '@/lib/content-store';
import { ServiceDetailContent } from './service-detail-content';

interface Props {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const { services } = await getSiteContent();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { services } = await getSiteContent();
  const service = services.find((item) => item.slug === params.slug);

  return service
    ? { title: service.title, description: service.shortDescription, openGraph: { images: [service.coverImage] } }
    : { title: 'Service introuvable' };
}

export default async function ServicePage({ params }: Props) {
  const { services } = await getSiteContent();
  const service = services.find((item) => item.slug === params.slug);

  if (!service) notFound();

  return <ServiceDetailContent service={service} />;
}
