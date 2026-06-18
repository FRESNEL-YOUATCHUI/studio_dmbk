'use client';

import { motion } from 'framer-motion';
import { Zap, Award, Users, Settings } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { staggerContainer, staggerItem } from '@/lib/animations';

const reasons = [
  {
    icon: Zap,
    title: 'Livraison rapide',
    description: 'Des délais respectés et une réactivité qui vous permet d\'avancer rapidement.',
  },
  {
    icon: Award,
    title: 'Design professionnel',
    description: 'Un niveau de qualité qui répond aux standards internationaux.',
  },
  {
    icon: Users,
    title: 'Accompagnement personnalisé',
    description: 'Un interlocuteur dédié qui comprend vos enjeux et vos objectifs.',
  },
  {
    icon: Settings,
    title: 'Solutions sur mesure',
    description: 'Chaque projet est unique, nous adaptons notre approche à vos besoins.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32 bg-brand-black text-brand-white">
      <div className="container mx-auto px-6">
        <SectionHeader
          label="Pourquoi nous choisir"
          title="Un partenaire créatif à votre écoute"
          description="Nous combinons expertise technique et vision créative pour vous offrir le meilleur."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              variants={staggerItem}
              className="group text-center lg:text-left"
            >
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mb-6 mx-auto lg:mx-0 group-hover:bg-brand-gold/20 transition-colors duration-300">
                <reason.icon className="w-8 h-8 text-brand-gold" />
              </div>
              <h3 className="text-xl font-display font-medium text-brand-white mb-3">
                {reason.title}
              </h3>
              <p className="text-brand-gray leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
