'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@/lib/animations';
import { Project, getAdjacentProjects } from '@/lib/data';
import { Button } from '@/components/ui/cursor';

interface ProjectDetailContentProps {
  project: Project;
}

const categoryLabels: Record<string, string> = {
  branding: 'Branding',
  'social-media': 'Social Media',
  'site-web': 'Site Web',
  'ui-ux': 'UI/UX',
};

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const { previous, next } = getAdjacentProjects(project.slug);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-brand-white">
        <div className="container mx-auto px-6">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center text-brand-gray hover:text-brand-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au portfolio
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.span
              variants={staggerItem}
              className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold text-sm font-medium rounded-full mb-6"
            >
              {categoryLabels[project.category]}
            </motion.span>
            <motion.h1
              variants={staggerItem}
              className="text-4xl md:text-5xl lg:text-6xl font-display text-brand-black mb-4"
            >
              {project.title}
            </motion.h1>
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap items-center gap-4 md:gap-8 text-brand-gray"
            >
              <span>{project.client}</span>
              <span className="hidden md:inline">•</span>
              <span>{project.year}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Image */}
      <section className="pb-16 bg-brand-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative aspect-[16/9] overflow-hidden rounded-lg"
          >
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 md:py-24 bg-brand-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Left Column - Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="lg:col-span-1 space-y-8"
            >
              <motion.div variants={staggerItem}>
                <h3 className="text-sm font-medium uppercase tracking-wider text-brand-gray mb-3">
                  Client
                </h3>
                <p className="text-lg text-brand-black">{project.client}</p>
              </motion.div>
              <motion.div variants={staggerItem}>
                <h3 className="text-sm font-medium uppercase tracking-wider text-brand-gray mb-3">
                  Année
                </h3>
                <p className="text-lg text-brand-black">{project.year}</p>
              </motion.div>
              <motion.div variants={staggerItem}>
                <h3 className="text-sm font-medium uppercase tracking-wider text-brand-gray mb-3">
                  Catégorie
                </h3>
                <p className="text-lg text-brand-black">
                  {categoryLabels[project.category]}
                </p>
              </motion.div>
              <motion.div variants={staggerItem}>
                <h3 className="text-sm font-medium uppercase tracking-wider text-brand-gray mb-3">
                  Services
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-brand-black/5 text-brand-gray text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
              <motion.div variants={staggerItem}>
                <Button href="/devis" variant="secondary" size="md">
                  Démarrer un projet similaire
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="lg:col-span-2 space-y-12"
            >
              <motion.div variants={staggerItem}>
                <h3 className="text-sm font-medium uppercase tracking-wider text-brand-gold mb-4">
                  Contexte
                </h3>
                <p className="text-lg text-brand-gray leading-relaxed">
                  {project.context}
                </p>
              </motion.div>

              <motion.div variants={staggerItem}>
                <h3 className="text-sm font-medium uppercase tracking-wider text-brand-gold mb-4">
                  Objectif
                </h3>
                <p className="text-lg text-brand-gray leading-relaxed">
                  {project.mission}
                </p>
              </motion.div>

              <motion.div variants={staggerItem}>
                <h3 className="text-sm font-medium uppercase tracking-wider text-brand-gold mb-4">
                  Processus
                </h3>
                <p className="text-lg text-brand-gray leading-relaxed">
                  Recherche, exploration créative, prototypage puis déploiement : chaque étape a été validée avec le client pour garder une direction claire.
                </p>
              </motion.div>

              <motion.div variants={staggerItem}>
                <h3 className="text-sm font-medium uppercase tracking-wider text-brand-gold mb-4">
                  Solution
                </h3>
                <p className="text-lg text-brand-gray leading-relaxed">
                  {project.solution}
                </p>
              </motion.div>

              <motion.div variants={staggerItem}>
                <h3 className="text-sm font-medium uppercase tracking-wider text-brand-gold mb-4">
                  Résultats
                </h3>
                <ul className="space-y-3">
                  {project.results.map((result) => (
                    <li
                      key={result}
                      className="flex items-center space-x-3 text-brand-gray"
                    >
                      <div className="w-2 h-2 rounded-full bg-brand-gold" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24 bg-brand-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display text-brand-white">
              Galerie
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.images.slice(1).map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-[4/3] overflow-hidden rounded-lg"
              >
                <Image
                  src={image}
                  alt={`${project.title} - Image ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Previous / Next projects */}
      {previous && next && (
        <section className="py-24 md:py-32 bg-brand-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-display text-brand-black">
                Continuer à explorer
              </h2>
              <Link
                href="/portfolio"
                className="text-brand-gold font-medium flex items-center"
              >
                Voir tous
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {[previous, next].map((related, index) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/portfolio/${related.slug}`}
                    className="block group"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={related.thumbnail}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-brand-gold text-sm font-medium mb-2 block">
                          {categoryLabels[related.category]}
                        </span>
                        <h3 className="text-white text-xl font-display">
                          {index === 0 ? '← ' : ''}{related.title}{index === 1 ? ' →' : ''}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
