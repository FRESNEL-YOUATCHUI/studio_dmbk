'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, MessageCircle, X } from 'lucide-react';
import type { Service } from '@/lib/data';

export function ServiceDetailContent({ service }: { service: Service }) {
  const [active, setActive] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, .35], [0, 90]);
  const move = (direction: number) => setActive((value) => value === null ? null : (value + direction + service.gallery.length) % service.gallery.length);
  useEffect(() => { const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null); if (e.key === 'ArrowRight') move(1); if (e.key === 'ArrowLeft') move(-1); }; window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key); });

  return <>
    <section className="pt-32 px-6 bg-[#fff8ef] overflow-hidden">
      <div className="container mx-auto"><Link href="/services" className="inline-flex items-center gap-2 font-bold mb-10"><ArrowLeft size={18}/> Tous les services</Link>
        <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}}><p className="eyebrow">{service.delivery} · {service.price}</p><h1 className="mega-title max-w-6xl">{service.title}</h1><p className="text-xl md:text-2xl max-w-3xl mt-7 leading-relaxed">{service.shortDescription}</p></motion.div>
      </div>
      <motion.div style={{ y: heroY }} className="container mx-auto mt-14 relative h-[58vh] min-h-[420px] rounded-[8px] overflow-hidden border border-black"><Image src={service.heroImage} alt={service.title} fill priority sizes="100vw" className="object-cover scale-105"/></motion.div>
    </section>

    <section className="pt-40 pb-20 px-6 bg-[#fff8ef]"><div className="container mx-auto grid lg:grid-cols-[.8fr_1.2fr] gap-12"><p className="eyebrow">Le service</p><p className="text-2xl md:text-4xl font-bold leading-tight">{service.description}</p></div></section>

    <section className="py-20 px-6 bg-[#171717] text-white"><div className="container mx-auto"><p className="eyebrow text-[#ffd447]">Ce qui est inclus</p>
      <div className="mt-12 space-y-8">{service.features.map((feature, i) => <motion.article key={feature.title} initial={{opacity:0,y:50}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-100px'}} className="grid md:grid-cols-2 gap-8 items-center border-t border-white/25 pt-8">
        <div className={i%2 ? 'md:order-2':''}><span className="text-[#ffd447] font-black">0{i+1}</span><h2 className="text-4xl md:text-6xl font-black mt-3">{feature.title}</h2><p className="text-lg text-white/70 mt-5 max-w-xl">{feature.description}</p><div className="flex gap-2 items-center mt-6 font-bold"><Check className="text-[#68d391]"/> Inclus dans l’offre</div></div>
        <motion.div whileHover={{scale:1.02}} className={`relative aspect-[4/3] rounded-[6px] overflow-hidden ${i%2?'md:order-1':''}`}><Image src={feature.image} alt={feature.title} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover"/></motion.div>
      </motion.article>)}</div></div></section>

    <section className="py-24 px-6 bg-[#ffd447]"><div className="container mx-auto"><p className="eyebrow">Galerie</p><h2 className="mega-title !text-[clamp(3rem,7vw,7rem)]">Un aperçu <span>concret.</span></h2>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-5 mt-12">{service.gallery.map((src,i)=><motion.button key={`${src}-${i}`} initial={{opacity:0,scale:.96}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} onClick={()=>setActive(i)} className="relative w-full mb-5 break-inside-avoid overflow-hidden rounded-[24px] border-2 border-black group" style={{height:i%3===0?460:320}}><Image src={src} alt={`${service.title} — galerie ${i+1}`} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110"/><span className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors"/></motion.button>)}</div>
    </div></section>

    <section className="py-24 px-6 bg-[#ff8fab]"><div className="container mx-auto grid lg:grid-cols-2 gap-10"><div><p className="eyebrow">Ils en parlent</p><blockquote className="text-3xl md:text-5xl font-normal leading-tight mt-6">“{service.testimonials[0]?.quote}”</blockquote><p className="mt-6 font-bold">{service.testimonials[0]?.author} — {service.testimonials[0]?.role}</p></div><div className="space-y-4">{service.faq.map(item=><details key={item.question} className="bg-white border border-black rounded-[6px] p-6"><summary className="font-bold cursor-pointer">{item.question}</summary><p className="mt-4 leading-relaxed">{item.answer}</p></details>)}</div></div></section>

    <section className="py-24 px-6 bg-[#fff8ef] text-center"><h2 className="mega-title !text-[clamp(2.5rem,5vw,4.8rem)]">On crée quelque chose de <span>fort ?</span></h2><div className="flex flex-wrap justify-center gap-4 mt-10"><Link href={`/devis?service=${service.slug}`} className="creative-button">Demander un devis <ArrowRight/></Link><a href="https://wa.me/221777017004?text=Bonjour%20DMBK%20Studio" target="_blank" rel="noreferrer" className="creative-button bg-[#68d391]">WhatsApp <MessageCircle/></a></div></section>

    <AnimatePresence>{active !== null && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[100] bg-black/95 p-4 md:p-12 grid place-items-center" role="dialog" aria-modal="true"><button onClick={()=>setActive(null)} className="absolute top-6 right-6 text-white p-3" aria-label="Fermer"><X size={32}/></button><button onClick={()=>move(-1)} className="absolute left-3 md:left-8 text-white p-3" aria-label="Précédente"><ChevronLeft size={40}/></button><div className="relative w-[85vw] h-[80vh]"><Image src={service.gallery[active]} alt="Aperçu agrandi" fill sizes="90vw" className="object-contain"/></div><button onClick={()=>move(1)} className="absolute right-3 md:right-8 text-white p-3" aria-label="Suivante"><ChevronRight size={40}/></button></motion.div>}</AnimatePresence>
  </>;
}
