import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSiteContent } from '@/lib/content-store';
import { ServiceDetailContent } from './service-detail-content';
interface Props { params: { slug: string } }
export const dynamic = 'force-dynamic';
export async function generateMetadata({params}:Props):Promise<Metadata>{const {services}=await getSiteContent();const s=services.find(x=>x.slug===params.slug);return s?{title:s.title,description:s.shortDescription,openGraph:{images:[s.coverImage]}}:{title:'Service introuvable'}}
export default async function ServicePage({params}:Props){const {services}=await getSiteContent();const service=services.find(x=>x.slug===params.slug);if(!service)notFound();return <ServiceDetailContent service={service}/>}
