import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects, getProjectBySlug } from '@/lib/data';
import { ProjectDetailContent } from './project-detail-content';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: 'Projet non trouvé',
    };
  }

  return {
    title: project.title,
    description: `${project.client} — ${project.context}`,
    openGraph: {
      title: `${project.title} | DMBK Studio`,
      description: `${project.client} — ${project.context}`,
      images: [{ url: project.thumbnail }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailContent project={project} />;
}
