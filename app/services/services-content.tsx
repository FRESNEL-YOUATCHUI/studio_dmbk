'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Image as ImageIcon, Palette, Users, Monitor, Check } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/cursor';
import { staggerContainer, staggerItem, slideUp } from '@/lib/animations';
import { services } from '@/lib/data';

const iconMap = {
  Image: ImageIcon,
  Palette: Palette,
  Users: Users,
  Monitor: Monitor,
};

export function ServicesPageContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pb-24 bg-brand-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideUp}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold text-sm font-medium rounded-full mb-6">
              Nos Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-brand-black mb-6">
              Des expertises au service de{' '}
              <span className="text-brand-gold">votre succès</span>
            </h1>
            <p className="text-lg text-brand-gray leading-relaxed max-w-2xl mx-auto">
              De la création visuelle à la stratégie digitale, nous vous accompagnons à chaque étape de votre développement avec des solutions sur mesure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-brand-white">
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-20 md:space-y-32"
          >
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon as keyof typeof iconMap];
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  variants={staggerItem}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                    !isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`relative ${!isEven ? 'lg:order-2' : ''}`}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={`https://images.pexels.com/photos/${
                          index === 0
                            ? '5653796/pexels-photo-5653796'
                            : index === 1
                            ? '6311590/pexels-photo-6311590'
                            : index === 2
                            ? '270348/pexels-photo-270348'
                            : '3861969/pexels-photo-3861969'
                        }.jpeg?auto=compress&cs=tinysrgb&w=800`}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/30 to-transparent" />
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-4 -right-4 lg:-bottom-8 lg:-right-8 w-32 h-32 bg-brand-gold/20 rounded-lg -z-10" />
                  </div>

                  {/* Content */}
                  <div className={!isEven ? 'lg:order-1' : ''}>
                    <div className="inline-flex items-center space-x-2 text-brand-gold mb-4">
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                      <span className="text-sm font-medium uppercase tracking-wider">
                        {service.delivery}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-display text-brand-black mb-4">
                      {service.title}
                    </h2>

                    <p className="text-lg text-brand-gray leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start space-x-3">
                          <div className="w-5 h-5 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-brand-gold" />
                          </div>
                          <span className="text-brand-gray">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Price & CTA */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div>
                        <span className="text-sm text-brand-gray block">Tarif</span>
                        <span className="text-2xl font-display font-medium text-brand-black">
                          {service.price}
                        </span>
                      </div>
                      <Button href="/devis" variant="secondary" size="md">
                        Me contacter
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-brand-black">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-brand-white mb-6">
              Besoin d&apos;un accompagnement personnalisé ?
            </h2>
            <p className="text-lg text-brand-gray max-w-2xl mx-auto mb-10">
              Chaque projet est unique. Discutons de vos besoins pour créer une solution sur mesure.
            </p>
            <Button href="/devis" variant="secondary" size="lg">
              Demander un devis gratuit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
