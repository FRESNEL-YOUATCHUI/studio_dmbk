'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/lib/data';

const titleColors = ['#eb593b', '#00b4d8', '#1a132d', '#eb593b'];

export function ServicesPreview({ services }: { services: Service[] }) {
  return (
    <section className="py-24 md:py-32 px-6 bg-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-end mb-16">
          <div>
            <p className="eyebrow mb-4">Services</p>
            <h2 className="font-dusan text-4xl md:text-6xl text-[#00b4d8] leading-[1.05]">
              Notre expertise,
              <br />
              sans superflu.
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-black/55 max-w-sm md:justify-self-end">
            Des offres flexibles pour bâtir une présence claire, cohérente et mémorable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <motion.article
              key={service.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="group bg-[#fff6ca] border border-[#1a132d]/15 p-7 md:p-10 min-h-72 flex flex-col overflow-hidden"
            >
              <div className="flex items-start justify-between gap-6">
                <span className="font-dusan text-5xl md:text-7xl leading-none text-[#1a132d]/15">
                  0{i + 1}
                </span>
                <span className="mt-2 h-3 w-3 bg-[#eb593b] rounded-full transition-transform duration-500 group-hover:scale-[1.9]" />
              </div>
              <h3
                className="font-dusan text-4xl md:text-5xl mt-8 leading-[.95]"
                style={{ color: titleColors[i % titleColors.length] }}
              >
                {service.title}
              </h3>
              <p className="text-sm text-black/55 mt-5 max-w-md leading-relaxed">
                {service.shortDescription}
              </p>
              <Link
                href={`/services/${service.slug}`}
                className="mt-auto pt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#eb593b]"
              >
                Découvrir <ArrowUpRight size={16} />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
