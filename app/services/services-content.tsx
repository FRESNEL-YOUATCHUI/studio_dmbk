'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { services } from '@/lib/data';

export function ServicesPageContent() {
  return (
    <>
      <section className="creative-hero pt-36 pb-20 px-6 overflow-hidden">
        <div className="container mx-auto relative z-10">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">Ce que nous faisons</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }} className="mega-title max-w-5xl">
            Des idées qui prennent <span>forme.</span>
          </motion.h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed">Chaque offre est une base modulable. Les contenus ci-dessous viennent d’un seul fichier de données : ajoutez un service, sa page existe automatiquement.</p>
        </div>
        <div className="shape shape-a" /><div className="shape shape-b" />
      </section>

      <section className="py-20 px-6 bg-[#fff8ef]">
        <div className="container mx-auto grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.article key={service.slug} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ delay: (index % 2) * .08 }} whileHover={{ y: -8, rotateX: 1.5, rotateY: index % 2 ? -1.5 : 1.5 }} className="service-card-premium group">
              <Link href={`/services/${service.slug}`} className="block h-full" aria-label={`Découvrir ${service.title}`}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] border-2 border-black">
                  <Image src={service.coverImage} alt={service.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-[#ffd447] border-2 border-black px-4 py-2 text-sm font-bold">0{index + 1}</span>
                </div>
                <div className="p-2 pt-6 flex gap-6 justify-between items-end">
                  <div><div className="flex items-center gap-2 text-sm font-semibold mb-3"><Clock size={16} />{service.delivery}</div><h2 className="text-3xl md:text-4xl font-black tracking-tight group-hover:text-[#ff5d2e] transition-colors">{service.title}</h2><p className="mt-3 text-base leading-relaxed max-w-xl">{service.shortDescription}</p></div>
                  <span className="shrink-0 w-14 h-14 rounded-full border-2 border-black bg-black text-white grid place-items-center transition-transform group-hover:rotate-45"><ArrowUpRight /></span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
