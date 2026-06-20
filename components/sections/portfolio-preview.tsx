'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/data';

export function PortfolioPreview(){return <section className="py-24 md:py-32 px-3 md:px-6 bg-[#f8f7f3]"><div className="container mx-auto"><div className="flex justify-between items-end px-3 md:px-0 mb-12"><div><p className="eyebrow mb-4">Réalisations</p><h2 className="text-5xl md:text-7xl tracking-[-.05em]">Travaux choisis.</h2></div><Link href="/portfolio" className="hidden md:inline-flex items-center gap-2 text-sm border-b border-black pb-1">Tout voir <ArrowUpRight size={16}/></Link></div>
  <div className="grid md:grid-cols-12 gap-3 md:gap-5">{projects.slice(0,5).map((project,i)=><motion.article key={project.id} initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-10%'}} className={`group ${i===0?'md:col-span-7':i===1?'md:col-span-5':i===2?'md:col-span-4':'md:col-span-4'}`}><Link href={`/portfolio/${project.slug}`}><div className={`relative overflow-hidden ${i<2?'aspect-[4/3]':'aspect-square'}`}><Image src={project.thumbnail} alt={project.title} fill sizes="(max-width:768px) 100vw, 55vw" className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"/></div><div className="flex justify-between py-3"><h3 className="text-lg">{project.title}</h3><span className="text-xs text-black/45">{project.year}</span></div></Link></motion.article>)}</div><Link href="/portfolio" className="md:hidden inline-flex items-center gap-2 mt-8 ml-3 text-sm border-b border-black pb-1">Tout voir <ArrowUpRight size={16}/></Link></div></section>}
