'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Image as ImageIcon, Palette, Users, Monitor } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { services } from '@/lib/data';

const iconMap = {
  Image: ImageIcon,
  Palette: Palette,
  Users: Users,
  Monitor: Monitor,
};

export function ServicesPreview() {
  const previewServices = services.slice(0, 4);
  return (
    <section className="py-24 md:py-32 bg-brand-white">
      <div className="container mx-auto px-6">
        <SectionHeader
          label="Nos Services"
          title="Des solutions créatives pour chaque besoin"
          description="De la création visuelle à la stratégie digitale, nous vous accompagnons à chaque étape de votre développement."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {previewServices.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={service.id}
                variants={staggerItem}
                className="group relative"
              >
                <Link href="/services" className="block">
                  <div className="relative overflow-hidden rounded-lg bg-brand-white border border-gray-100 p-8 h-full transition-all duration-500 hover:border-brand-gold hover:shadow-xl">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-lg bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:bg-brand-gold transition-colors duration-300">
                      {IconComponent && (
                        <IconComponent className="w-7 h-7 text-brand-gold group-hover:text-brand-white transition-colors duration-300" />
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-display font-medium text-brand-black mb-3">
                      {service.title}
                    </h3>
                    <p className="text-brand-gray leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center text-brand-gold font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                      En savoir plus
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>

                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
