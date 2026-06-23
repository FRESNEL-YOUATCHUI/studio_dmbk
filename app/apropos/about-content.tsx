'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Eye, Heart, Sparkles, Target, Users } from 'lucide-react';
import { slideUp, staggerContainer, staggerItem } from '@/lib/animations';
import { Button } from '@/components/ui/cursor';

const values = [
  {
    icon: Sparkles,
    title: 'Créativité',
    description: 'Des idées visuelles singulières, pensées pour rendre votre marque reconnaissable.',
  },
  {
    icon: Target,
    title: 'Justesse',
    description: 'Chaque choix graphique sert un objectif clair : expliquer, séduire ou convertir.',
  },
  {
    icon: Eye,
    title: 'Lisibilité',
    description: 'Une direction artistique forte, mais toujours simple à comprendre et à utiliser.',
  },
  {
    icon: Heart,
    title: 'Accompagnement',
    description: 'Un suivi humain, agile et transparent du premier échange jusqu’à la livraison.',
  },
];

const commitments = [
  'Identités pensées sur mesure',
  'Communication claire et régulière',
  'Direction artistique pilotée par un freelance',
  'Renfort créatif jeune selon les besoins',
];

export function AboutPageContent() {
  return (
    <>
      <section className="pt-40 pb-16 md:pb-24 bg-brand-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideUp}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 bg-[#eb593b]/10 text-[#eb593b] text-sm font-medium rounded-sm mb-6">
              À propos
            </span>
            <h1 className="font-dusan text-[#eb593b] text-[clamp(3rem,6vw,5.4rem)] leading-[.95] mb-6">
              Un studio freelance,
              <br />
              avec l’énergie d’une équipe.
            </h1>
            <p className="text-base md:text-lg text-[#1a132d]/65 leading-relaxed max-w-2xl mx-auto">
              Je pilote ID Craft comme un partenaire créatif agile : une direction claire,
              une écoute attentive, et une jeune équipe d’accompagnement mobilisée quand
              le projet demande plus de mains, plus d’idées ou plus de rythme.
            </p>
          </motion.div>
        </div>
      </section>

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
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Accompagnement créatif"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#ffe76d] -z-10" />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span
                variants={staggerItem}
                className="text-[#00b4d8] text-sm font-medium uppercase tracking-wider mb-4 block"
              >
                Notre posture
              </motion.span>
              <motion.h2
                variants={staggerItem}
                className="font-dusan text-[#1a132d] text-4xl md:text-5xl leading-[.98] mb-6"
              >
                Une relation directe, puis les bons talents au bon moment.
              </motion.h2>
              <motion.p variants={staggerItem} className="text-[#1a132d]/65 leading-relaxed mb-6">
                Vous gardez un interlocuteur principal, une vision cohérente et une méthode
                simple. Autour de cette direction, je peux faire intervenir des profils jeunes
                et créatifs pour renforcer la production : design, contenu, web ou animation.
              </motion.p>
              <motion.p variants={staggerItem} className="text-[#1a132d]/65 leading-relaxed">
                L’objectif reste le même : créer une identité faite sur mesure, lisible,
                vivante et adaptée aux dimensions uniques de votre projet.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#1a132d] text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 lg:p-12 border border-white/15 rounded-sm"
            >
              <span className="text-[#ffe76d] text-sm font-medium uppercase tracking-wider mb-4 block">
                Mission
              </span>
              <h3 className="font-dusan text-4xl text-white mb-4">
                Donner une forme juste à vos idées.
              </h3>
              <p className="text-white/70 leading-relaxed">
                Je vous aide à clarifier votre image, à structurer votre communication et à
                créer des supports qui parlent à votre public sans perdre votre singularité.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 lg:p-12 border border-white/15 rounded-sm"
            >
              <span className="text-[#ffe76d] text-sm font-medium uppercase tracking-wider mb-4 block">
                Méthode
              </span>
              <h3 className="font-dusan text-4xl text-white mb-4">
                Simple, créative et bien cadrée.
              </h3>
              <p className="text-white/70 leading-relaxed">
                On avance par étapes : découverte, direction artistique, création, retours,
                livraison. Tout est pensé pour rester fluide, même sur les projets ambitieux.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#ffe76d]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {commitments.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-[#fff6ca] border border-[#1a132d]/10 p-6 rounded-sm"
              >
                <Users className="w-6 h-6 text-[#eb593b] mb-5" />
                <p className="font-medium text-[#1a132d]">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-brand-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
            className="text-center mb-16"
          >
            <span className="text-[#00b4d8] text-sm font-medium uppercase tracking-wider mb-4 block">
              Valeurs
            </span>
            <h2 className="font-dusan text-[#eb593b] text-4xl md:text-5xl">
              Ce qui guide chaque projet.
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value) => (
              <motion.div key={value.title} variants={staggerItem} className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#eb593b]/10 flex items-center justify-center mb-6 mx-auto">
                  <value.icon className="w-8 h-8 text-[#eb593b]" />
                </div>
                <h3 className="font-dusan text-3xl text-[#1a132d] mb-3">{value.title}</h3>
                <p className="text-[#1a132d]/65 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#eb593b]">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-dusan text-4xl md:text-5xl text-white mb-6">
              Prêt à travailler ensemble ?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Discutons de votre projet et voyons comment lui donner une identité claire,
              expressive et mémorable.
            </p>
            <Button href="/contact" variant="primary" size="lg" className="bg-white text-[#eb593b] hover:bg-[#fff6ca]">
              Nous contacter
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
