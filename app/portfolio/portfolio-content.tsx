'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '@/lib/data';

export function PortfolioPageContent({ projects }: { projects: Project[] }) {
  const scope = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.work-row').forEach((row) => {
        const media = row.querySelector('.work-media');
        const image = row.querySelector('img');
        gsap.fromTo(media, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.15, ease: 'power4.out', scrollTrigger: { trigger: row, start: 'top 82%' } });
        gsap.fromTo(image, { scale: 1.14, yPercent: -4 }, { scale: 1, yPercent: 4, ease: 'none', scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: .8 } });
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return <main ref={scope} className="bg-[#f7f7f5] min-h-screen text-[#171717]">
    <section className="pt-36 md:pt-44 pb-20 px-6 text-center"><p className="text-[10px] uppercase tracking-[.28em] mb-5">Sélection de projets</p><motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} className="font-kellvin text-[clamp(2.6rem,6vw,4.5rem)] leading-none">Portfolio</motion.h1><p className="mt-6 text-sm text-black/50">Identités visuelles et campagnes choisies.</p></section>
    <section className="px-5 md:px-8 pb-28"><div className="max-w-6xl mx-auto space-y-14 md:space-y-24">{projects.map((project,index)=><article key={project.slug} className="work-row grid md:grid-cols-[minmax(0,1fr)_minmax(280px,.85fr)] gap-8 md:gap-16 items-center">
      <Link href={`/portfolio/${project.slug}`} className="work-media relative block aspect-square overflow-hidden bg-neutral-200 group"><Image src={project.thumbnail} alt={project.title} fill sizes="(max-width:768px) 100vw, 55vw" className="object-cover will-change-transform transition-transform duration-700 group-hover:scale-[1.04]"/><span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"/></Link>
      <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-15%'}} transition={{duration:.7,delay:.08}} className="md:text-center md:px-6"><p className="text-[10px] uppercase tracking-[.22em] text-black/40 mb-5">{index<8?'Identité visuelle':'Campagne'}</p><Link href={`/portfolio/${project.slug}`} className="group"><h2 className="font-display text-3xl md:text-[2.7rem] leading-[1.05] group-hover:italic transition-all">{project.title}</h2><span className="inline-block mt-5 text-xs border-b border-black/50 pb-1">Voir le projet</span></Link></motion.div>
    </article>)}</div></section>
  </main>;
}
