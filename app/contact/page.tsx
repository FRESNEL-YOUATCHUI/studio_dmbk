import { Metadata } from 'next';
import { ContactPageContent } from './contact-content';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez ID Craft : téléphone, WhatsApp et email. Discutons de votre projet.',
};

export default function ContactPage() {
  return <ContactPageContent />;
}
