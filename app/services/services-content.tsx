'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/lib/data';

export function ServicesPageContent({ services }: { services: Service[] }) {
  return <main className="bg-[#fff8ef] text-[#171717]">
    <section className="pt-40 pb-24 px-6 border-b border-black/15">
      <div className="container mx-auto grid lg:grid-cols-2 gap-8 items-end">
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}><p className="eyebrow mb-5">Expertises</p><h1 className="text-[clamp(3.5rem,8vw,7.5rem)] leading-[.88] tracking-[-.055em]">Des solutions<br/>bien pensées.</h1></motion.div>
        <p className="max-w-md text-base leading-relaxed lg:justify-self-end text-black/65">Des accompagnements construits autour de vos objectifs. Chaque offre est modulable et mène vers une page complète.</p>
      </div>
    </section>
    <section className="px-6">
      <div className="container mx-auto">{services.map((service,index)=><motion.article key={service.slug} initial={{opacity:0,y:45}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-12%'}} className="group grid lg:grid-cols-[90px_1fr_1.15fr] gap-6 lg:gap-12 py-12 md:py-16 border-b border-black/20 items-center">
        <span className="text-xs tracking-[.2em] self-start pt-2">0{index+1}</span>
        <div><p className="text-xs uppercase tracking-[.16em] text-black/50 mb-4">{service.delivery}</p><h2 className="text-4xl md:text-6xl tracking-[-.04em] leading-none">{service.title}</h2><p className="max-w-md mt-5 text-sm md:text-base leading-relaxed text-black/60">{service.shortDescription}</p><Link href={`/services/${service.slug}`} className="inline-flex items-center gap-3 mt-7 text-sm font-semibold border-b border-black pb-1">Voir le service <ArrowUpRight size={17}/></Link></div>
        <Link href={`/services/${service.slug}`} className="relative block aspect-[16/9] overflow-hidden rounded-[4px]" aria-label={service.title}><Image src={service.coverImage} alt={service.title} fill sizes="(max-width:1024px) 100vw, 55vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"/><span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"/></Link>
      </motion.article>)}</div>
    </section>
    <section className="py-28 px-6"><div className="container mx-auto text-center"><p className="text-sm uppercase tracking-[.18em]">Un besoin particulier ?</p><Link href="/devis" className="inline-flex mt-6 text-3xl md:text-5xl border-b border-black">Parlons de votre projet</Link></div></section>
  </main>;
}
