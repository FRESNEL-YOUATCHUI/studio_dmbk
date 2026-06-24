import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSiteContent } from '@/lib/content-store';
import { ProjectDetailContent } from './project-detail-content';

interface PageProps {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const { projects } = await getSiteContent();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { projects } = await getSiteContent();
  const project = projects.find((item) => item.slug === params.slug);

  return project
    ? { title: project.title, description: project.context, openGraph: { images: [project.thumbnail] } }
    : { title: 'Projet non trouvé' };
}

export default async function ProjectPage({ params }: PageProps) {
  const { projects } = await getSiteContent();
  const index = projects.findIndex((item) => item.slug === params.slug);

  if (index < 0) notFound();

  const project = projects[index];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return <ProjectDetailContent project={project} previous={previous} next={next} />;
}
