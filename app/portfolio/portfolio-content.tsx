'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, categories } from '@/lib/data';

const labels: Record<string,string> = { branding:'Branding','social-media':'Social Media','site-web':'Site Web','ui-ux':'UX/UI' };

export function PortfolioPageContent() {
  const [filter,setFilter]=useState('all');
  const scope=useRef<HTMLElement>(null);
  const visible=filter==='all'?projects:projects.filter(p=>p.category===filter);
  useLayoutEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);
    const ctx=gsap.context(()=>{
      gsap.from('.portfolio-intro > *',{y:50,opacity:0,duration:.9,stagger:.12,ease:'power3.out'});
      gsap.to('.portfolio-intro',{y:70,ease:'none',scrollTrigger:{trigger:'.portfolio-intro',start:'top top',end:'bottom top',scrub:.8}});
    },scope);
    return ()=>ctx.revert();
  },[]);
  return <main ref={scope} className="bg-[#f8f7f3] min-h-screen">
    <section className="portfolio-intro pt-40 pb-20 px-6"><div className="container mx-auto text-center"><p className="text-[11px] uppercase tracking-[.28em] mb-6">Sélection de projets</p><h1 className="text-[clamp(4rem,12vw,11rem)] leading-[.8] tracking-[-.065em]">PORTFOLIO</h1><p className="text-sm md:text-base text-black/55 max-w-md mx-auto mt-9">Identités, campagnes et expériences numériques façonnées avec attention.</p></div></section>
    <section className="sticky top-[72px] z-20 bg-[#f8f7f3]/90 backdrop-blur-md py-5 px-6 border-y border-black/10"><div className="container mx-auto flex justify-center flex-wrap gap-x-7 gap-y-3">{categories.map(c=><button key={c.id} onClick={()=>setFilter(c.id)} className={`text-xs uppercase tracking-[.14em] pb-1 transition-colors ${filter===c.id?'text-black border-b border-black':'text-black/40 hover:text-black'}`}>{c.id==='ui-ux'?'UX/UI':c.label}</button>)}</div></section>
    <section className="px-3 md:px-6 py-10 md:py-16"><div className="container mx-auto columns-1 md:columns-2 lg:columns-3 gap-3 md:gap-5">
      <AnimatePresence mode="popLayout">{visible.map((project,index)=><motion.article layout key={project.id} initial={{opacity:0,y:35,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,scale:.96}} transition={{duration:.55,ease:[.22,1,.36,1]}} className="break-inside-avoid mb-3 md:mb-5 group">
        <Link href={`/portfolio/${project.slug}`} className="block"><div className={`relative overflow-hidden bg-neutral-200 ${index%5===0?'aspect-[4/5]':index%3===0?'aspect-square':'aspect-[4/3]'}`}><Image src={project.thumbnail} alt={project.title} fill sizes="(max-width:768px) 100vw, 34vw" className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"/><div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"/><div className="absolute inset-x-0 bottom-0 p-5 text-white translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"><h2 className="text-2xl">{project.title}</h2><p className="text-xs mt-1 uppercase tracking-[.13em]">{labels[project.category]} · {project.year}</p></div></div><div className="flex justify-between gap-4 py-3 md:hidden"><h2 className="text-lg">{project.title}</h2><span className="text-xs text-black/50">{project.year}</span></div></Link>
      </motion.article>)}</AnimatePresence>
    </div></section>
  </main>;
}
