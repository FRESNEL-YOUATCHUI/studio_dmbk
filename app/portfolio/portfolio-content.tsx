'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { slideUp, staggerContainer, staggerItem } from '@/lib/animations';
import { projects, categories } from '@/lib/data';
import { cn } from '@/lib/utils';

const categoryLabels: Record<string, string> = {
  branding: 'Branding',
  'social-media': 'Social Media',
  'site-web': 'Site Web',
  'ui-ux': 'UI/UX',
};

export function PortfolioPageContent() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

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
              Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-brand-black mb-6">
              Nos{' '}
              <span className="text-brand-gold">réalisations</span>
            </h1>
            <p className="text-lg text-brand-gray leading-relaxed max-w-2xl mx-auto">
              Découvrez une sélection de projets qui illustrent notre expertise et notre créativité au service de nos clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8 bg-brand-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={cn(
                  'px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300',
                  activeFilter === category.id
                    ? 'bg-brand-black text-brand-white'
                    : 'bg-transparent text-brand-gray border border-gray-200 hover:border-brand-gold hover:text-brand-black'
                )}
              >
                {category.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-12 pb-24 bg-brand-white">
        <div className="container mx-auto px-6">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''}
                >
                  <Link href={`/portfolio/${project.slug}`} className="block group">
                    <div className="relative overflow-hidden rounded-lg aspect-[4/3] lg:aspect-auto lg:h-full">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/30 to-transparent" />

                      {/* Content */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-end transition-all duration-500 group-hover:from-brand-black/90">
                        <span className="text-brand-gold text-xs font-medium uppercase tracking-wider mb-2">
                          {categoryLabels[project.category]}
                        </span>
                        <h3 className="text-white text-xl md:text-2xl font-display mb-2">
                          {project.title}
                        </h3>
                        <p className="text-brand-gray text-sm mb-4">
                          {project.client} — {project.year}
                        </p>
                        <div className="flex items-center text-brand-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                          Voir le projet
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-brand-gray text-lg">
                Aucun projet dans cette catégorie pour le moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-brand-gold">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display text-brand-black mb-6">
              Prêt à lancer votre projet ?
            </h2>
            <p className="text-brand-black/70 max-w-xl mx-auto mb-8">
              Discutons de votre vision et créons ensemble quelque chose d&apos;exceptionnel.
            </p>
            <Link
              href="/devis"
              className="inline-flex items-center px-8 py-4 bg-brand-black text-brand-white font-medium rounded-sm hover:bg-brand-gray transition-colors duration-300"
            >
              Obtenir un devis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
