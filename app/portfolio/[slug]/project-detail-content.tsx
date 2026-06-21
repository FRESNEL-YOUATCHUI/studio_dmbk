'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { ArrowLeft, Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Project, getAdjacentProjects } from '@/lib/data';

function HorizontalProjectGallery({ images, title, onOpen }: { images: string[]; title: string; onOpen: (index: number) => void }) {
  const [paused, setPaused] = useState(false);
  const position = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 45, stiffness: 220 });
  const x = useTransform(position, (value) => `${value}%`);
  const parallaxY = useTransform(scrollY, [0, 3500], [22, -34]);
  const loop = [...images, ...images];

  useAnimationFrame((_, delta) => {
    if (paused) return;
    const scrollBoost = Math.min(Math.abs(velocity.get()) / 1200, 2.5);
    const next = position.get() - delta * (0.0022 + scrollBoost * 0.0018);
    position.set(next <= -50 ? 0 : next);
  });

  return <section className="py-20 md:py-28 overflow-hidden border-y border-black/10 bg-[#efeee9]">
    <div className="px-6 mb-9 flex items-end justify-between gap-5"><div><p className="text-[10px] uppercase tracking-[.22em] text-black/45">Galerie en mouvement</p><h2 className="text-2xl md:text-3xl mt-3 font-medium">Autres réalisations</h2></div><p className="hidden md:block text-xs text-black/45">Survolez pour mettre en pause</p></div>
    <motion.div style={{ x, y: parallaxY }} className="flex w-max gap-4 will-change-transform" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {loop.map((src, index) => <button key={`${src}-${index}`} onClick={() => onOpen(index % images.length)} className="relative w-[72vw] md:w-[34vw] lg:w-[28vw] aspect-[4/3] shrink-0 overflow-hidden cursor-zoom-in group" aria-label={`Agrandir le visuel ${(index % images.length) + 1}`}><Image src={src} alt={`${title}, galerie ${(index % images.length) + 1}`} fill sizes="(max-width:768px) 72vw, 34vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.045]"/></button>)}
    </motion.div>
  </section>;
}

export function ProjectDetailContent({project}:{project:Project}) {
  const [active,setActive]=useState<number|null>(null);
  const {previous,next}=getAdjacentProjects(project.slug);
  const {scrollY}=useScroll();
  const heroY=useTransform(scrollY,[0,900],[0,90]);
  const move=(step:number)=>setActive(v=>v===null?null:(v+step+project.images.length)%project.images.length);
  useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setActive(null);if(e.key==='ArrowRight')move(1);if(e.key==='ArrowLeft')move(-1)};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)});
  return <main className="bg-[#f7f7f5] text-[#171717]">
    <section className="pt-28"><div className="px-6 max-w-7xl mx-auto"><Link href="/portfolio" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[.2em] mb-8"><ArrowLeft size={14}/> Portfolio</Link></div><div className="h-[70vh] min-h-[480px] overflow-hidden"><motion.div style={{y:heroY}} className="relative h-[calc(100%+100px)]"><Image src={project.images[0]} alt={project.title} fill priority sizes="100vw" className="object-cover"/></motion.div></div></section>
    <section className="py-20 md:py-28 px-6 text-center"><div className="max-w-3xl mx-auto"><motion.h1 initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-none underline decoration-1 underline-offset-8">{project.title}</motion.h1><p className="mt-10 text-base md:text-lg leading-relaxed text-black/65">{project.context}</p>
      <div className="mt-12 flex flex-col items-center gap-3">{project.tags.map(tag=><div key={tag} className="flex items-center gap-3 text-sm"><Check size={16}/><span>{tag}</span></div>)}</div>
      <dl className="mt-14 space-y-2"><div><dt className="text-[10px] uppercase tracking-[.2em] text-black/40">Client</dt><dd className="font-display text-2xl mt-1">{project.client}</dd></div><div className="pt-4"><dt className="text-[10px] uppercase tracking-[.2em] text-black/40">Année</dt><dd className="font-display text-2xl mt-1">{project.year}</dd></div></dl>
    </div></section>
    <section className="px-4 md:px-8 pb-24"><div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-4 md:gap-7">{project.images.slice(1).map((src,index)=><motion.button key={src} initial={{opacity:0,y:45}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-10%'}} transition={{duration:.75,delay:index*.08}} onClick={()=>setActive(index+1)} className="relative aspect-[4/5] overflow-hidden cursor-zoom-in group"><Image src={src} alt={`${project.title}, visuel ${index+2}`} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"/></motion.button>)}</div></section>
    <HorizontalProjectGallery images={project.images} title={project.title} onOpen={setActive}/>
    <nav className="grid md:grid-cols-2 border-t border-black/15">{[previous,next].map((item,i)=>item&&<Link key={item.slug} href={`/portfolio/${item.slug}`} className="p-9 md:p-14 border-b md:border-b-0 md:border-r border-black/15"><span className="text-[10px] uppercase tracking-[.2em] text-black/40">{i?'Projet suivant':'Projet précédent'}</span><p className="font-display text-2xl md:text-3xl mt-3">{item.title}</p></Link>)}</nav>
    <AnimatePresence>{active!==null&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[100] bg-black/95 grid place-items-center p-4" role="dialog" aria-modal="true"><button onClick={()=>setActive(null)} className="absolute top-5 right-5 text-white p-3" aria-label="Fermer"><X/></button><button onClick={()=>move(-1)} className="absolute left-2 md:left-7 text-white p-3" aria-label="Image précédente"><ChevronLeft size={34}/></button><motion.div key={active} initial={{opacity:0,scale:.97}} animate={{opacity:1,scale:1}} className="relative w-[82vw] h-[84vh]"><Image src={project.images[active]} alt="Aperçu" fill sizes="90vw" className="object-contain"/></motion.div><button onClick={()=>move(1)} className="absolute right-2 md:right-7 text-white p-3" aria-label="Image suivante"><ChevronRight size={34}/></button></motion.div>}</AnimatePresence>
  </main>;
}
