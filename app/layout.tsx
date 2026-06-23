import './globals.css';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

import { SmoothScroll } from '@/components/layout/smooth-scroll';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dmbkstudio.com'),
  title: {
    default: 'ID Craft | Studio Créatif Africain',
    template: '%s | ID Craft',
  },
  description: 'Studio créatif africain spécialisé en design graphique, branding, community management et création de sites web. Identités visuelles et expériences digitales premium.',
  keywords: [
    'design graphique',
    'branding',
    'identité visuelle',
    'community management',
    'création site web',
    'studio créatif',
    'agence design',
    'Afrique',
    'international',
    'freelance',
  ],
  authors: [{ name: 'ID Craft' }],
  creator: 'ID Craft',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://dmbkstudio.com',
    siteName: 'ID Craft',
    title: 'ID Craft | Studio Créatif Africain',
    description: 'Studio créatif africain spécialisé en design graphique, branding, community management et création de sites web.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ID Craft - Votre identité faite sur mesure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ID Craft | Studio Créatif Africain',
    description: 'Studio créatif africain spécialisé en design graphique, branding, community management et création de sites web.',
    images: ['/og-image.jpg'],
    creator: '@dmbkstudio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={outfit.variable}>
      <body className="font-sans antialiased">
        <SmoothScroll />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
