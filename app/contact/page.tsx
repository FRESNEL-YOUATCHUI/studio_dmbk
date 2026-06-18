import { Metadata } from 'next';
import { ContactPageContent } from './contact-content';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez DMBK Studio : téléphone, WhatsApp, email. Nous sommes basés à Dakar et Abidjan. Discutons de votre projet.',
};

export default function ContactPage() {
  return <ContactPageContent />;
}
