'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { projects } from '@/lib/data';

const categoryLabels = {
  branding: 'Branding',
  'social-media': 'Social Media',
  'site-web': 'Site Web',
  'ui-ux': 'UI/UX',
};

export function PortfolioPreview() {
  const featuredProjects = projects.slice(0, 3);
  return (
    <section className="py-24 md:py-32 bg-brand-white">
      <div className="container mx-auto px-6">
        <SectionHeader
          label="Portfolio"
          title="Nos dernières créations"
          description="Découvrez une sélection de nos projets récents qui illustrent notre expertise créative."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={staggerItem}
              className={index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-brand-gold text-sm font-medium uppercase tracking-wider mb-2">
                      {categoryLabels[project.category]}
                    </span>
                    <h3 className="text-white text-2xl lg:text-3xl font-display mb-2">
                      {project.title}
                    </h3>
                    <p className="text-brand-gray text-sm mb-4">
                      {project.client} — {project.year}
                    </p>
                    <div className="flex items-center text-brand-gold font-medium text-sm">
                      Voir le projet
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center text-brand-black font-medium border-b-2 border-brand-gold pb-1 hover:text-brand-gold transition-colors"
          >
            Voir tous nos projets
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
