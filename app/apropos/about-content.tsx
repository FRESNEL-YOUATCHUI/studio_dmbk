'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Target, Eye, Heart } from 'lucide-react';
import { slideUp, staggerContainer, staggerItem } from '@/lib/animations';
import { Button } from '@/components/ui/cursor';

const values = [
  {
    icon: Sparkles,
    title: 'Créativité',
    description: 'Nous repoussons les limites de l\'imagination pour créer des expériences uniques et mémorables.',
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'Chaque projet est traité avec le plus haut niveau de qualité et d\'attention aux détails.',
  },
  {
    icon: Eye,
    title: 'Simplicité',
    description: 'Nous croyons que les solutions les plus élégantes sont souvent les plus simples.',
  },
  {
    icon: Heart,
    title: 'Impact',
    description: 'Nous visons des résultats concrets qui transforment positivement votre entreprise.',
  },
];

const stats = [
  { value: '150+', label: 'Projets réalisés' },
  { value: '50+', label: 'Clients satisfaits' },
  { value: '5', label: 'Années d\'expérience' },
  { value: '3', label: 'Pays' },
];

const timeline = [
  {
    year: '2019',
    title: 'Création de ID Craft',
    description: 'Naissance du studio avec une vision : créer des designs africains de niveau international.',
  },
  {
    year: '2020',
    title: 'Expansion digitale',
    description: 'Développement de notre expertise en community management et création de sites web.',
  },
  {
    year: '2022',
    title: 'International',
    description: 'Ouverture de notre bureau à Abidjan et premiers clients internationaux.',
  },
  {
    year: '2024',
    title: 'Reconnaissance',
    description: 'Prix de l\'innovation digitale africaine et plus de 100 projets réalisés.',
  },
];

const team = [
  {
    name: 'Moussa Diallo',
    role: 'Directeur Créatif',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Aminata Koné',
    role: 'Lead Designer',
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Ibrahim Sow',
    role: 'Développeur Senior',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Fatou Ndiaye',
    role: 'Community Manager',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export function AboutPageContent() {
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });

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
              À propos
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-brand-black mb-6">
              Derrière chaque projet{' '}
              <span className="text-brand-gold">se cache une stratégie</span>
            </h1>
            <p className="text-lg text-brand-gray leading-relaxed max-w-2xl mx-auto">
              Plus qu&apos;un studio créatif, nous sommes votre partenaire stratégique pour construire une marque forte et une présence digitale impactante.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-brand-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideUp}
              className="relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Notre équipe"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-brand-gold/20 rounded-lg -z-10" />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span
                variants={staggerItem}
                className="text-brand-gold text-sm font-medium uppercase tracking-wider mb-4 block"
              >
                Notre histoire
              </motion.span>
              <motion.h2
                variants={staggerItem}
                className="text-3xl md:text-4xl font-display text-brand-black mb-6"
              >
                Une passion africaine pour le design d&apos;excellence
              </motion.h2>
              <motion.p
                variants={staggerItem}
                className="text-brand-gray leading-relaxed mb-6"
              >
                Fondé en 2019, ID Craft est né d&apos;une conviction : les entreprises africaines méritent des designs à la hauteur de leurs ambitions. Nous avons entrepris de créer un studio qui allie la richesse culturelle africaine aux standards internationaux de créativité.
              </motion.p>
              <motion.p
                variants={staggerItem}
                className="text-brand-gray leading-relaxed"
              >
                Aujourd&apos;hui, nous accompagnons des startups, PME et grandes entreprises dans leur transformation digitale, avec comme fil conducteur notre engagement pour l&apos;excellence et l&apos;innovation.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-brand-black text-brand-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 lg:p-12 border border-white/10 rounded-lg"
            >
              <span className="text-brand-gold text-sm font-medium uppercase tracking-wider mb-4 block">
                Notre mission
              </span>
              <h3 className="text-2xl font-display text-brand-white mb-4">
                Créer des expériences qui transforment
              </h3>
              <p className="text-brand-gray leading-relaxed">
                Nous aiding les entreprises à développer leur image et leur croissance à travers des identités visuelles, des contenus digitaux et des expériences web qui captivent et convertissent.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 lg:p-12 border border-white/10 rounded-lg"
            >
              <span className="text-brand-gold text-sm font-medium uppercase tracking-wider mb-4 block">
                Notre vision
              </span>
              <h3 className="text-2xl font-display text-brand-white mb-4">
                Le studio créatif de référence en Afrique
              </h3>
              <p className="text-brand-gray leading-relaxed">
                Devenir le partenaire créatif incontournable des entreprises africaines qui veulent rayonner sur la scène internationale avec une image de marque premium.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-brand-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
            className="text-center mb-16"
          >
            <span className="text-brand-gold text-sm font-medium uppercase tracking-wider mb-4 block">
              Nos valeurs
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-brand-black">
              Ce qui nous anime au quotidien
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={staggerItem}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mb-6 mx-auto">
                  <value.icon className="w-8 h-8 text-brand-gold" />
                </div>
                <h3 className="text-xl font-display font-medium text-brand-black mb-3">
                  {value.title}
                </h3>
                <p className="text-brand-gray leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-brand-gold">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate={isStatsInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="text-center"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isStatsInView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="text-4xl md:text-5xl font-display font-semibold text-brand-black block"
                >
                  {stat.value}
                </motion.span>
                <span className="text-brand-black/70 text-sm uppercase tracking-wider">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32 bg-brand-black text-brand-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-brand-gold text-sm font-medium uppercase tracking-wider mb-4 block">
              L&apos;équipe
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-brand-white">
              Des experts passionnés
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={staggerItem}
                className="group text-center"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/20 transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-medium text-brand-white">
                  {member.name}
                </h3>
                <p className="text-brand-gray text-sm">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-brand-gold">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display text-brand-black mb-6">
              Prêt à travailler ensemble ?
            </h2>
            <p className="text-brand-black/70 max-w-xl mx-auto mb-8">
              Discutons de votre projet et découvrez comment nous pouvons vous aider à atteindre vos objectifs.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Nous contacter
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
