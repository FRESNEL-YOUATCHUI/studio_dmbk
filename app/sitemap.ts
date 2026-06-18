import { MetadataRoute } from 'next';

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

  // Add portfolio project pages
  const projectRoutes = [
    '/portfolio/afrostyle-branding',
    '/portfolio/techstart-website',
    '/portfolio/savannah-social',
    '/portfolio/zenith-app',
    '/portfolio/ngonie-branding',
    '/portfolio/bantou-events',
    '/portfolio/moringa-social',
    '/portfolio/ecobank-dashboard',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...projectRoutes];
}
