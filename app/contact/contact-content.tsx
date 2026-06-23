'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Check, Loader2, Phone, Mail, MapPin, MessageCircle, Instagram, Facebook, Linkedin, Send } from 'lucide-react';
import { slideUp, staggerContainer, staggerItem } from '@/lib/animations';
import { cn } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+221 77 701 70 04',
    href: 'tel:+221777017004',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+221 77 701 70 04',
    href: 'https://wa.me/221777017004',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'jjob86213@gmail.com',
    href: 'mailto:jjob86213@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Adresse',
    value: 'Partout dans le monde',
    href: null,
  },
];

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/dmbkstudio' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/dmbkstudio' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/dmbkstudio' },
];

export function ContactPageContent() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const subject = encodeURIComponent(`Nouveau contact — ${data.name}`);
    const body = encodeURIComponent(`Nom : ${data.name}\nEmail : ${data.email}\n\nMessage :\n${data.message}`);
    window.location.href = `mailto:jjob86213@gmail.com?subject=${subject}&body=${body}`;
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-brand-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideUp}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold text-sm font-medium rounded-full mb-6">
              Contact
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-brand-black mb-6">
              Parlons{' '}
              <span className="text-brand-gold">ensemble</span>
            </h1>
            <p className="text-lg text-brand-gray leading-relaxed max-w-2xl mx-auto">
              Une question, un projet ou simplement envie de discuter ? Nous sommes là pour vous accompagner.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-24 md:pb-32 bg-brand-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-display text-brand-black mb-8">
                Nos coordonnées
              </h2>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-brand-gray mb-1">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-brand-black hover:text-brand-gold transition-colors whitespace-pre-line"
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-brand-black whitespace-pre-line">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <h3 className="text-sm font-medium uppercase tracking-wider text-brand-gray mb-4">
                  Suivez-nous
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-brand-black text-brand-white flex items-center justify-center hover:bg-brand-gold transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Zone de disponibilité */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 rounded-lg overflow-hidden bg-[#fff6ca] border border-[#1a132d]/10 p-8"
              >
                <p className="text-sm uppercase tracking-[.2em] text-[#00b4d8] mb-3">
                  Disponible à distance
                </p>
                <p className="text-[#1a132d]/70 leading-relaxed">
                  Les échanges, devis et livraisons peuvent se faire en ligne, partout dans le monde.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-brand-black rounded-lg p-8 md:p-10">
                <h2 className="text-2xl font-display text-brand-white mb-2">
                  Envoyez-nous un message
                </h2>
                <p className="text-brand-gray mb-8">
                  Nous vous répondons sous 24h.
                </p>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-brand-white mb-2">
                          Nom *
                        </label>
                        <input
                          {...register('name')}
                          type="text"
                          id="name"
                          className={cn(
                            'w-full px-4 py-3 rounded-sm border bg-brand-black/50 text-brand-white focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all',
                            errors.name ? 'border-red-500' : 'border-white/20'
                          )}
                          placeholder="Votre nom"
                        />
                        {errors.name && (
                          <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-brand-white mb-2">
                          Email *
                        </label>
                        <input
                          {...register('email')}
                          type="email"
                          id="email"
                          className={cn(
                            'w-full px-4 py-3 rounded-sm border bg-brand-black/50 text-brand-white focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all',
                            errors.email ? 'border-red-500' : 'border-white/20'
                          )}
                          placeholder="votre@email.com"
                        />
                        {errors.email && (
                          <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-brand-white mb-2">
                          Message *
                        </label>
                        <textarea
                          {...register('message')}
                          id="message"
                          rows={5}
                          className={cn(
                            'w-full px-4 py-3 rounded-sm border bg-brand-black/50 text-brand-white focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all resize-none',
                            errors.message ? 'border-red-500' : 'border-white/20'
                          )}
                          placeholder="Votre message..."
                        />
                        {errors.message && (
                          <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center px-6 py-4 bg-brand-gold text-brand-black font-medium rounded-sm hover:bg-brand-gold-light transition-colors duration-300 disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            Envoyer le message
                            <Send className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center mx-auto mb-6">
                        <Check className="w-8 h-8 text-brand-gold" />
                      </div>
                      <h3 className="text-xl font-display text-brand-white mb-2">
                        Message envoyé !
                      </h3>
                      <p className="text-brand-gray mb-6">
                        Nous vous répondrons rapidement.
                      </p>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          reset();
                        }}
                        className="text-brand-gold hover:text-brand-gold-light transition-colors"
                      >
                        Envoyer un autre message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
