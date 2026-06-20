'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Project, getAdjacentProjects } from '@/lib/data';

const labels: Record<string,string>={branding:'Branding','social-media':'Social Media','site-web':'Site Web','ui-ux':'UX/UI'};

export function ProjectDetailContent({project}:{project:Project}){
  const [active,setActive]=useState<number|null>(null);
  const {previous,next}=getAdjacentProjects(project.slug);
  const {scrollY}=useScroll();
  const heroY=useTransform(scrollY,[0,900],[0,130]);
  const move=(step:number)=>setActive(v=>v===null?null:(v+step+project.images.length)%project.images.length);
  useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setActive(null);if(e.key==='ArrowRight')move(1);if(e.key==='ArrowLeft')move(-1)};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)});
  return <main className="bg-[#f8f7f3]">
    <section className="pt-32 px-4 md:px-6"><div className="container mx-auto"><Link href="/portfolio" className="inline-flex items-center gap-2 text-xs uppercase tracking-[.15em] mb-10"><ArrowLeft size={15}/> Portfolio</Link><motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-10"><div><p className="text-xs uppercase tracking-[.2em] text-black/50 mb-5">{labels[project.category]}</p><h1 className="text-[clamp(3.5rem,9vw,8.5rem)] tracking-[-.06em] leading-[.82]">{project.title}</h1></div><dl className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm"><div><dt className="text-black/40 text-[10px] uppercase tracking-wider">Client</dt><dd className="mt-1">{project.client}</dd></div><div><dt className="text-black/40 text-[10px] uppercase tracking-wider">Année</dt><dd className="mt-1">{project.year}</dd></div></dl></motion.div></div>
      <div className="overflow-hidden h-[65vh] min-h-[460px]"><motion.div style={{y:heroY}} className="relative h-[calc(100%+140px)]"><Image src={project.images[0]} alt={project.title} fill priority sizes="100vw" className="object-cover"/></motion.div></div>
    </section>
    <section className="py-24 md:py-32 px-6"><div className="container mx-auto grid lg:grid-cols-[.65fr_1.35fr] gap-14"><div><p className="text-[10px] uppercase tracking-[.2em] text-black/45 mb-5">Compétences</p><div className="flex flex-wrap gap-2">{project.tags.map(tag=><span key={tag} className="px-3 py-1.5 border border-black/25 rounded-full text-xs">{tag}</span>)}</div></div><div className="space-y-16"><motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}><p className="text-[10px] uppercase tracking-[.2em] text-black/45 mb-5">Le projet</p><p className="text-2xl md:text-4xl leading-[1.18] tracking-[-.025em]">{project.context}</p></motion.div><div className="grid md:grid-cols-2 gap-10 text-sm leading-relaxed"><div><h2 className="text-lg mb-4">Objectif</h2><p className="text-black/60">{project.mission}</p></div><div><h2 className="text-lg mb-4">Solution</h2><p className="text-black/60">{project.solution}</p></div></div></div></div></section>
    <section className="px-3 md:px-6 pb-24"><div className="container mx-auto columns-1 md:columns-2 gap-3 md:gap-5">{project.images.map((src,index)=><motion.button key={`${src}-${index}`} initial={{opacity:0,y:45}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-10%'}} transition={{duration:.65}} onClick={()=>setActive(index)} className="relative block w-full break-inside-avoid mb-3 md:mb-5 overflow-hidden group cursor-zoom-in" style={{height:index%3===1?620:450}}><Image src={src} alt={`${project.title}, visuel ${index+1}`} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"/><span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"/></motion.button>)}</div></section>
    <nav className="grid md:grid-cols-2 border-t border-black/15">{[previous,next].map((item,i)=>item&&<Link key={item.slug} href={`/portfolio/${item.slug}`} className="p-10 md:p-16 border-b md:border-b-0 md:border-r border-black/15 group"><span className="text-[10px] uppercase tracking-[.2em] text-black/40">{i===0?'Projet précédent':'Projet suivant'}</span><p className="text-3xl md:text-5xl mt-4 group-hover:translate-x-2 transition-transform">{item.title}</p></Link>)}</nav>
    <AnimatePresence>{active!==null&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.3}} className="fixed inset-0 z-[100] bg-black/95 grid place-items-center p-4" role="dialog" aria-modal="true"><button onClick={()=>setActive(null)} className="absolute top-5 right-5 text-white p-3" aria-label="Fermer"><X/></button><button onClick={()=>move(-1)} className="absolute left-2 md:left-7 text-white p-3" aria-label="Image précédente"><ChevronLeft size={36}/></button><motion.div key={active} initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} className="relative w-[82vw] h-[84vh]"><Image src={project.images[active]} alt="Aperçu du projet" fill sizes="90vw" className="object-contain"/></motion.div><button onClick={()=>move(1)} className="absolute right-2 md:right-7 text-white p-3" aria-label="Image suivante"><ChevronRight size={36}/></button></motion.div>}</AnimatePresence>
  </main>;
}
