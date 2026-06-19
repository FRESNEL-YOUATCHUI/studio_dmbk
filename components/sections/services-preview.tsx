'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/data';

export function ServicesPreview() {
  return <section className="py-24 px-6 bg-[#fff8ef]">
    <div className="container mx-auto"><p className="eyebrow">Services</p><h2 className="mega-title !text-[clamp(3rem,7vw,7rem)] max-w-5xl">On donne du <span>relief</span> à vos idées.</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">{services.map((service, i) => <motion.div key={service.slug} whileHover={{ y: -10 }} className="group rounded-[30px] border-2 border-black bg-white overflow-hidden shadow-[7px_7px_0_#171717]">
        <Link href={`/services/${service.slug}`} className="block h-full"><div className="relative aspect-square overflow-hidden"><Image src={service.coverImage} alt={service.title} fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-700"/><span className="absolute top-4 left-4 bg-[#ffd447] border-2 border-black rounded-full px-3 py-1 font-bold">0{i+1}</span></div><div className="p-6"><h3 className="text-2xl font-black">{service.title}</h3><p className="mt-3 text-sm leading-relaxed">{service.shortDescription}</p><span className="mt-5 inline-flex items-center gap-2 font-bold">Découvrir <ArrowUpRight size={18}/></span></div></Link>
      </motion.div>)}</div>
    </div>
  </section>;
}
