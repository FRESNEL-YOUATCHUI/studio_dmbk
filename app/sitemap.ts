import { MetadataRoute } from 'next';
import { projects, services } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dmbkstudio.com';

  const routes = [
    '',
    '/services',
    '/portfolio',
    '/apropos',
    '/contact',
    '/devis',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const detailRoutes = [
    ...projects.map(({ slug }) => `/portfolio/${slug}`),
    ...services.map(({ slug }) => `/services/${slug}`),
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...detailRoutes];
}
