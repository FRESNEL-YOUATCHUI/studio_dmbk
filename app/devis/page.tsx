import { Metadata } from 'next';
import { QuotePageContent } from './devis-content';

export const metadata: Metadata = {
  title: 'Obtenir un devis',
  description: 'Demandez un devis gratuit pour votre projet : design graphique, branding, community management ou création de site web. Réponse sous 24h.',
};

export default function QuotePage() {
  return <QuotePageContent />;
}
