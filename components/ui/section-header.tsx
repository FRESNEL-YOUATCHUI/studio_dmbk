'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeIn, slideUp } from '@/lib/animations';

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={slideUp}
      className={cn(
        'mb-12 md:mb-16',
        centered && 'text-center',
        className
      )}
    >
      {label && (
        <motion.span
          variants={fadeIn}
          className="inline-block text-sm font-medium tracking-wider text-brand-gold uppercase mb-4"
        >
          {label}
        </motion.span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-brand-black mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-brand-gray max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
