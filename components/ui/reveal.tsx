'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { slideUp } from '@/lib/animations';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
