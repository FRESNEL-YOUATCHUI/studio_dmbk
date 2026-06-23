'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/components/ui/brand-logo';

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

const footerIcons = [
  '/assets/footer-icons/delivery.png',
  '/assets/footer-icons/design.png',
  '/assets/footer-icons/support.png',
  '/assets/footer-icons/solutions.png',
];

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="relative overflow-hidden bg-[#fff6ca] text-[#1a132d] border-t border-[#1a132d]/10">
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        {footerIcons.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={220}
            height={220}
            className="absolute object-contain"
            style={{
              left: `${8 + index * 24}%`,
              top: index % 2 ? '46%' : '10%',
              transform: `rotate(${index % 2 ? -10 : 8}deg)`,
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5" aria-label="ID Craft — Accueil">
              <BrandLogo size="footer" />
            </Link>
            <p className="text-[#1a132d]/70 leading-relaxed mb-6">
              Studio créatif freelance avec une équipe d’accompagnement jeune pour vos identités,
              contenus et expériences digitales.
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#eb593b] text-white flex items-center justify-center hover:bg-[#00b4d8] transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#eb593b] mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#1a132d]/70 hover:text-[#eb593b] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#eb593b] mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#1a132d]/70 hover:text-[#eb593b] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#eb593b] mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-[#00b4d8]" />
                <a href="tel:+221777017004" className="text-[#1a132d]/70 hover:text-[#eb593b]">
                  +221 77 701 70 04
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-[#00b4d8]" />
                <a href="mailto:jjob86213@gmail.com" className="text-[#1a132d]/70 hover:text-[#eb593b]">
                  jjob86213@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#00b4d8] mt-1" />
                <span className="text-[#1a132d]/70">Partout dans le monde</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#1a132d]/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[#1a132d]/65 text-sm">
            &copy; {currentYear} ID Craft. Tous droits réservés.
          </p>
          <div className="flex space-x-6 text-sm text-[#1a132d]/65">
            <Link href="#" className="hover:text-[#eb593b] transition-colors">
              Mentions légales
            </Link>
            <Link href="#" className="hover:text-[#eb593b] transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
