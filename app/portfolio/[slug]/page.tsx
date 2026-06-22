import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSiteContent } from '@/lib/content-store';
import { ProjectDetailContent } from './project-detail-content';
interface PageProps { params: { slug: string } }
export const dynamic = 'force-dynamic';
export async function generateMetadata({params}:PageProps):Promise<Metadata>{const {projects}=await getSiteContent();const p=projects.find(x=>x.slug===params.slug);return p?{title:p.title,description:p.context,openGraph:{images:[p.thumbnail]}}:{title:'Projet non trouvé'}}
export default async function ProjectPage({params}:PageProps){const {projects}=await getSiteContent();const index=projects.findIndex(x=>x.slug===params.slug);if(index<0)notFound();const project=projects[index];const previous=projects[(index-1+projects.length)%projects.length];const next=projects[(index+1)%projects.length];return <ProjectDetailContent project={project} previous={previous} next={next}/>}
