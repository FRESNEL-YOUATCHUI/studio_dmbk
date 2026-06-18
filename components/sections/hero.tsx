'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/cursor';
import { staggerContainer, fadeIn, slideUp } from '@/lib/animations';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Creative workspace"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/70 to-brand-black/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pt-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={slideUp} className="mb-6">
            <span className="inline-block px-4 py-2 bg-brand-gold/20 text-brand-gold text-sm font-medium rounded-full border border-brand-gold/30">
              Studio créatif africain premium
            </span>
          </motion.div>

          <motion.h1
            variants={slideUp}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display text-brand-white leading-tight mb-6"
          >
            Nous créons des marques{' '}
            <span className="text-brand-gold">et expériences digitales</span>{' '}
            qui marquent les esprits.
          </motion.h1>

          <motion.p
            variants={slideUp}
            className="text-lg md:text-xl text-brand-gray max-w-2xl mb-10 leading-relaxed"
          >
            Design graphique, identité visuelle, community management et création de sites web pour entreprises, startups et entrepreneurs.
          </motion.p>

          <motion.div
            variants={slideUp}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button href="/portfolio" variant="secondary" size="lg">
              Voir nos réalisations
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button href="/devis" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-black">
              Obtenir un devis
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center text-brand-gray"
        >
          <span className="text-sm mb-2">Scroll</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-12 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-12 w-48 h-48 bg-brand-gold/5 rounded-full blur-2xl" />
    </section>
  );
}
