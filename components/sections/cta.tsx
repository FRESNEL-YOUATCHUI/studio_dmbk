'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/cursor';
import { slideUp } from '@/lib/animations';

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  variant?: 'light' | 'dark';
}

export function CTASection({
  title = 'Un projet en tête ?',
  description = 'Discutons de votre projet et trouvons ensemble la meilleure solution pour atteindre vos objectifs.',
  buttonText = 'Obtenir un devis',
  buttonHref = '/devis',
  variant = 'light',
}: CTASectionProps) {
  return (
    <section
      className={`py-24 md:py-32 ${
        variant === 'dark' ? 'bg-brand-black' : 'bg-brand-gold'
      }`}
    >
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={slideUp}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-8">
            <MessageSquare className={`w-8 h-8 ${variant === 'dark' ? 'text-brand-gold' : 'text-brand-black'}`} />
          </div>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-6 ${
              variant === 'dark' ? 'text-brand-white' : 'text-brand-black'
            }`}
          >
            {title}
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto mb-10 ${
              variant === 'dark' ? 'text-brand-gray' : 'text-brand-black/80'
            }`}
          >
            {description}
          </p>
          <Button
            href={buttonHref}
            variant={variant === 'dark' ? 'secondary' : 'primary'}
            size="lg"
          >
            {buttonText}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
