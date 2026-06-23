'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '@/lib/data';

function CoverflowShowcase({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const offsets = [-2, -1, 0, 1, 2];

  useEffect(() => {
    if (!projects.length) return;
    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % projects.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [projects.length]);

  if (!projects.length) return null;

  return (
    <section className="relative overflow-hidden bg-[#fff6ca] py-12 md:py-16 border-y border-[#1a132d]/10">
      <div className="px-6 mb-8 text-center">
        <p className="text-[10px] uppercase tracking-[.24em] text-[#1a132d]/45">
          Galerie en mouvement
        </p>
      </div>
      <div className="relative h-[650px] md:h-[700px] [perspective:1400px]">
        {offsets.map((offset) => {
          const project = projects[(active + offset + projects.length) % projects.length];
          const isCenter = offset === 0;
          return (
            <motion.div
              key={`${project.slug}-${offset}`}
              className="absolute top-0 left-1/2 w-[316px] h-[620px]"
              initial={false}
              animate={{
                x: offset * 190 - 158,
                rotateY: offset * -16,
                scale: isCenter ? 1.02 : 0.88,
                opacity: Math.abs(offset) === 2 ? 0.45 : 1,
                zIndex: 10 - Math.abs(offset),
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="group relative block h-full w-full overflow-hidden bg-neutral-200"
                aria-label={`Voir ${project.title}`}
              >
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="316px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.055]"
                  style={{
                    filter: isCenter ? 'none' : 'brightness(.72) saturate(.82) blur(.35px)',
                  }}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#1a132d]/45 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="block text-[10px] uppercase tracking-[.18em] opacity-80">
                    {project.category}
                  </span>
                  <span className="font-dusan text-3xl leading-none">{project.title}</span>
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export function PortfolioPageContent({ projects }: { projects: Project[] }) {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.work-row').forEach((row) => {
        const media = row.querySelector('.work-media');
        const image = row.querySelector('img');
        gsap.fromTo(
          media,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.05,
            ease: 'power4.out',
            scrollTrigger: { trigger: row, start: 'top 86%' },
          }
        );
        gsap.fromTo(
          image,
          { scale: 1.12, yPercent: -4 },
          {
            scale: 1,
            yPercent: 4,
            ease: 'none',
            scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
          }
        );
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={scope} className="bg-[#f7f7f5] min-h-screen text-[#1a132d]">
      <section className="pt-40 md:pt-48 pb-14 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-dusan text-[#1a132d] text-[clamp(3rem,7vw,5.2rem)] leading-none italic"
        >
          Portfolio
        </motion.h1>
        <p className="mt-5 text-sm text-[#1a132d]/50">Quelques identités, campagnes et images choisies.</p>
      </section>

      <CoverflowShowcase projects={projects} />

      <section className="px-5 md:px-8 py-20 md:py-28">
        <div className="max-w-4xl mx-auto space-y-7 md:space-y-10">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className="work-row grid grid-cols-[minmax(120px,42vw)_minmax(0,1fr)] md:grid-cols-[330px_1fr] gap-4 md:gap-10 items-center"
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="work-media relative block aspect-square overflow-hidden bg-neutral-200 group"
                aria-label={`Voir ${project.title}`}
              >
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="(max-width:768px) 42vw, 330px"
                  className="object-cover will-change-transform transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </Link>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 0.7, delay: 0.08 }}
                className="text-center px-1 md:px-6"
              >
                <p className="hidden sm:block text-[10px] uppercase tracking-[.22em] text-[#1a132d]/35 mb-4">
                  {index < 8 ? 'Identité visuelle' : 'Campagne'}
                </p>
                <Link href={`/portfolio/${project.slug}`} className="group">
                  <h2 className="font-display text-[clamp(1.2rem,4.7vw,2.55rem)] md:text-[2.7rem] leading-[1.12] text-[#1a132d]/80 group-hover:text-[#eb593b] transition-colors">
                    Une identité visuelle pour {project.client}
                  </h2>
                  <span className="inline-block mt-4 text-xs border-b border-[#1a132d]/40 pb-1 text-[#1a132d]/55">
                    Voir le projet
                  </span>
                </Link>
              </motion.div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
