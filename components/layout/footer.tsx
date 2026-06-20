'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  navigation: [
    { href: '/', label: 'Accueil' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/apropos', label: 'À propos' },
    { href: '/contact', label: 'Contact' },
  ],
  services: [
    { href: '/services/pack-visuel', label: 'Pack Visuel' },
    { href: '/services/identite-visuelle', label: 'Identité Visuelle' },
    { href: '/services/community-management', label: 'Community Management' },
    { href: '/services/site-web', label: 'Site Web' },
  ],
  social: [
    { href: 'https://instagram.com', label: 'Instagram', icon: Instagram },
    { href: 'https://facebook.com', label: 'Facebook', icon: Facebook },
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: Linkedin },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-brand-white">
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-display font-semibold tracking-tight">
                DMBK<span className="text-brand-gold">.</span>
              </span>
            </Link>
            <p className="text-brand-gray leading-relaxed mb-6">
              Studio créatif africain spécialisé en design graphique, branding et création de sites web.
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-brand-white mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-gray hover:text-brand-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-brand-white mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-gray hover:text-brand-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-brand-white mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-brand-gold" />
                <span className="text-brand-gray">+221 77 123 45 67</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-brand-gold" />
                <a
                  href="mailto:contact@dmbkstudio.com"
                  className="text-brand-gray hover:text-brand-gold transition-colors"
                >
                  contact@dmbkstudio.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-brand-gold mt-1" />
                <span className="text-brand-gray">
                  Dakar, Sénégal<br />
                  Abidjan, Côte d&apos;Ivoire
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-brand-gray text-sm">
            &copy; {currentYear} DMBK Studio. Tous droits réservés.
          </p>
          <div className="flex space-x-6 text-sm text-brand-gray">
            <Link href="#" className="hover:text-brand-gold transition-colors">
              Mentions légales
            </Link>
            <Link href="#" className="hover:text-brand-gold transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
