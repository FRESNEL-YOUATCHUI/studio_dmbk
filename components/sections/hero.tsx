'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  const { scrollY } = useScroll();
  const artY = useTransform(scrollY, [0, 700], [0, 55]);

  return (
    <section className="home-hero min-h-[92vh] pt-36 pb-14 px-6 overflow-hidden">
      <div className="container mx-auto grid lg:grid-cols-[1.12fr_.88fr] gap-12 lg:gap-6 items-center min-h-[72vh]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="relative z-10"
        >
          <p className="text-[11px] uppercase tracking-[.22em] text-[#1a132d]/55 mb-8">
            Studio de création · partout dans le monde
          </p>
          <h1 className="font-dusan text-[#eb593b] text-[clamp(3rem,5.6vw,6rem)] leading-[.94] max-w-4xl">
            Le studio qui s’aligne aux dimensions uniques de ses clients
          </h1>
          <p className="mt-10 text-sm md:text-base leading-relaxed max-w-2xl text-[#1a132d]/70">
            Nous dessinons vos idées selon vos besoins et votre direction artistique.
            Vous rêvez le projet, nous lui donnons une forme juste, claire et mémorable.
          </p>
          <div className="flex flex-wrap gap-3 mt-9">
            <Link href="/portfolio" className="creative-button">
              Découvrir nos projets <ArrowRight size={17} />
            </Link>
            <Link href="/devis" className="creative-button">
              Obtenir un devis <ArrowRight size={17} />
            </Link>
          </div>
        </motion.div>

        <motion.div
          style={{ y: artY }}
          className="hero-type-art relative min-h-[500px] md:min-h-[610px]"
          aria-label="Votre identité faite sur mesure"
        >
          <div className="absolute right-[4%] top-[7%] w-[72%] h-[46%] bg-[#ffe76d]" />
          <p className="absolute right-[2%] top-[2%] text-[#1a132d] text-[clamp(3.1rem,7vw,7.2rem)] leading-none font-semibold tracking-[-.07em]">
            Votre <span className="font-dusan text-[#eb593b] tracking-normal">identité</span>
          </p>
          <p className="absolute left-[25%] top-[32%] font-dusan text-[#00b4d8] text-[clamp(2.8rem,5.2vw,5.8rem)] leading-none">
            faite <span className="text-[#eb593b]">sur</span>
          </p>
          <p className="absolute left-[3%] top-[49%] font-dusan text-[#eb593b] text-[clamp(5.4rem,11vw,11.5rem)] leading-[.72]">
            mesure
          </p>
          <div className="absolute left-[5%] bottom-[3%] hero-geo">
            <span />
            <i />
            <b />
          </div>
          <svg className="absolute bottom-0 right-0 w-[72%] h-28" viewBox="0 0 700 120" fill="none">
            <path
              d="M0 90C70 125 89 8 138 55C180 95 250 105 310 64C388 9 440 105 512 82C568 64 618 34 700 12"
              stroke="#ffe76d"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
