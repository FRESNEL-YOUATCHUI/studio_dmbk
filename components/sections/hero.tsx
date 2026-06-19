'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  const { scrollY } = useScroll();
  const visualY = useTransform(scrollY, [0, 700], [0, 90]);
  return <section className="creative-hero min-h-screen pt-32 pb-20 px-6 flex items-center overflow-hidden">
    <div className="container mx-auto grid lg:grid-cols-[1.08fr_.92fr] items-center gap-14 relative z-10">
      <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
        <p className="eyebrow inline-flex items-center gap-2"><Sparkles size={17}/> Studio créatif · Dakar & partout</p>
        <h1 className="mega-title mt-6">Des marques qui ne passent pas <span>inaperçues.</span></h1>
        <p className="text-xl leading-relaxed max-w-2xl mt-8">Identités visuelles, contenus et expériences digitales pensés avec stratégie, couleur et juste ce qu’il faut d’audace.</p>
        <div className="flex flex-wrap gap-4 mt-10"><Link href="/portfolio" className="creative-button">Voir les projets <ArrowRight/></Link><Link href="/devis" className="creative-button bg-[#ffd447]">Créer ensemble <ArrowRight/></Link></div>
      </motion.div>
      <motion.div style={{y:visualY}} className="relative min-h-[550px] rounded-[40px] border-[3px] border-black bg-[#ffd447] p-7 shadow-[14px_14px_0_#171717] rotate-2">
        <div className="relative h-full min-h-[490px] rounded-[30px] overflow-hidden border-[3px] border-black"><Image src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Équipe créative au travail" fill priority className="object-cover"/></div>
        <span className="absolute -left-8 top-12 w-24 h-24 rounded-full bg-[#ff8fab] border-[3px] border-black"/><span className="absolute -right-7 bottom-16 w-28 h-16 rounded-full bg-[#4d96ff] border-[3px] border-black -rotate-12"/>
      </motion.div>
    </div><div className="shape shape-a"/><div className="shape shape-b"/>
  </section>;
}
