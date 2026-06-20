'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/data';

export function ServicesPreview(){return <section className="py-24 md:py-32 px-6 bg-[#fff8ef]"><div className="container mx-auto"><div className="grid md:grid-cols-2 gap-8 items-end mb-16"><div><p className="eyebrow mb-4">Services</p><h2 className="text-5xl md:text-7xl tracking-[-.045em] leading-[.95]">Notre expertise,<br/>sans superflu.</h2></div><p className="text-sm leading-relaxed text-black/55 max-w-sm md:justify-self-end">Des offres flexibles pensées pour bâtir une présence claire, cohérente et mémorable.</p></div>
  <div className="border-t border-black/20">{services.map((service,i)=><motion.div key={service.slug} initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="group grid grid-cols-[40px_1fr_auto] md:grid-cols-[70px_1fr_1fr_auto] gap-4 items-center py-7 border-b border-black/20"><span className="text-[10px] tracking-widest">0{i+1}</span><h3 className="text-xl md:text-3xl">{service.title}</h3><p className="hidden md:block text-sm text-black/50 max-w-md">{service.shortDescription}</p><Link href={`/services/${service.slug}`} className="relative w-12 h-12 rounded-full border border-black grid place-items-center overflow-hidden"><ArrowUpRight size={18}/><Image src={service.coverImage} alt="" fill className="object-cover opacity-0 group-hover:opacity-100 transition-opacity"/></Link></motion.div>)}</div>
  <Link href="/services" className="inline-flex items-center gap-2 mt-10 text-sm border-b border-black pb-1">Tous les services <ArrowUpRight size={16}/></Link></div></section>}
