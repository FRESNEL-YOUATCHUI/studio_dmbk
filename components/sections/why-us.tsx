'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { staggerContainer, staggerItem } from '@/lib/animations';

const reasons = [
  { image: '/assets/footer-icons/delivery.png', title: 'Livraison rapide', description: 'Des délais respectés et une réactivité qui vous permet d’avancer rapidement.' },
  { image: '/assets/footer-icons/design.png', title: 'Design professionnel', description: 'Un niveau de qualité qui répond aux standards internationaux.' },
  { image: '/assets/footer-icons/support.png', title: 'Accompagnement personnalisé', description: 'Un interlocuteur dédié qui comprend vos enjeux et vos objectifs.' },
  { image: '/assets/footer-icons/solutions.png', title: 'Solutions sur mesure', description: 'Chaque projet est unique, nous adaptons notre approche à vos besoins.' },
];

export function WhyChooseUs(){return <section className="py-24 md:py-32 bg-[#1a132d] text-white"><div className="container mx-auto px-6"><SectionHeader label="Pourquoi nous choisir" title="Un partenaire créatif à votre écoute" description="Nous combinons expertise technique et vision créative pour vous offrir le meilleur."/><motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{once:true,margin:'-100px'}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">{reasons.map(reason=><motion.div key={reason.title} variants={staggerItem} className="group text-center lg:text-left"><div className="relative w-24 h-24 mb-6 mx-auto lg:mx-0 transition-transform duration-300 group-hover:-translate-y-1"><Image src={reason.image} alt="" fill unoptimized className="object-contain"/></div><h3 className="text-xl font-medium mb-3">{reason.title}</h3><p className="text-white/60 leading-relaxed">{reason.description}</p></motion.div>)}</motion.div></div></section>}
