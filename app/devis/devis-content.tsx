'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Check, Send, Loader2, ArrowRight } from 'lucide-react';
import { slideUp, staggerContainer, staggerItem } from '@/lib/animations';
import { Button } from '@/components/ui/cursor';
import { cn } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  company: z.string().optional(),
  phone: z.string().min(8, 'Numéro de téléphone invalide'),
  email: z.string().email('Adresse email invalide'),
  service: z.string().min(1, 'Veuillez sélectionner un service'),
  budget: z.string().min(1, 'Veuillez sélectionner une fourchette de budget'),
  description: z.string().min(20, 'Décrivez votre projet en au moins 20 caractères'),
});

type FormData = z.infer<typeof schema>;

const services = [
  { id: 'pack-visuel', label: 'Pack Visuel' },
  { id: 'identite-visuelle', label: 'Identité Visuelle' },
  { id: 'community-management', label: 'Community Management' },
  { id: 'site-web', label: 'Site Web' },
  { id: 'autre', label: 'Autre' },
];

const budgets = [
  { id: 'less-500', label: 'Moins de 500 €' },
  { id: '500-1500', label: '500 € à 1 500 €' },
  { id: '1500-3000', label: '1 500 € à 3 000 €' },
  { id: 'more-3000', label: 'Plus de 3 000 €' },
];

export function QuotePageContent() {
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
    const subject = encodeURIComponent(`Demande de devis — ${data.name}`);
    const body = encodeURIComponent(`Nom : ${data.name}\nEntreprise : ${data.company || 'Non renseignée'}\nTéléphone : ${data.phone}\nEmail : ${data.email}\nService : ${data.service}\nBudget : ${data.budget}\n\nProjet :\n${data.description}`);
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
              Obtenir un devis
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-brand-black mb-6">
              Parlons de{' '}
              <span className="text-brand-gold">votre projet</span>
            </h1>
            <p className="text-lg text-brand-gray leading-relaxed max-w-2xl mx-auto">
              Remplissez ce formulaire et recevez une proposition personnalisée sous 24h. Nous étudions chaque projet avec soin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24 md:pb-32 bg-brand-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* Personal Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-brand-white border border-gray-100 rounded-lg p-6 md:p-8"
                  >
                    <h2 className="text-xl font-display text-brand-black mb-6">
                      Vos informations
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-brand-black mb-2">
                          Nom complet *
                        </label>
                        <input
                          {...register('name')}
                          type="text"
                          id="name"
                          className={cn(
                            'w-full px-4 py-3 rounded-sm border bg-brand-white text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all',
                            errors.name ? 'border-red-500' : 'border-gray-200'
                          )}
                          placeholder="Votre nom"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      {/* Company */}
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-brand-black mb-2">
                          Entreprise
                        </label>
                        <input
                          {...register('company')}
                          type="text"
                          id="company"
                          className="w-full px-4 py-3 rounded-sm border border-gray-200 bg-brand-white text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-brand-black mb-2">
                          Téléphone *
                        </label>
                        <input
                          {...register('phone')}
                          type="tel"
                          id="phone"
                          className={cn(
                            'w-full px-4 py-3 rounded-sm border bg-brand-white text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all',
                            errors.phone ? 'border-red-500' : 'border-gray-200'
                          )}
                          placeholder="+221 77 701 70 04"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-brand-black mb-2">
                          Email *
                        </label>
                        <input
                          {...register('email')}
                          type="email"
                          id="email"
                          className={cn(
                            'w-full px-4 py-3 rounded-sm border bg-brand-white text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all',
                            errors.email ? 'border-red-500' : 'border-gray-200'
                          )}
                          placeholder="votre@email.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Service Selection */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-brand-white border border-gray-100 rounded-lg p-6 md:p-8"
                  >
                    <h2 className="text-xl font-display text-brand-black mb-6">
                      Type de prestation *
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <label
                          key={service.id}
                          className={cn(
                            'flex items-center p-4 rounded-sm border cursor-pointer transition-all duration-300',
                            'hover:border-brand-gold hover:bg-brand-gold/5'
                          )}
                        >
                          <input
                            {...register('service')}
                            type="radio"
                            value={service.id}
                            className="w-4 h-4 text-brand-gold focus:ring-brand-gold"
                          />
                          <span className="ml-3 text-brand-black">{service.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.service && (
                      <p className="text-red-500 text-sm mt-2">{errors.service.message}</p>
                    )}
                  </motion.div>

                  {/* Budget Selection */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-brand-white border border-gray-100 rounded-lg p-6 md:p-8"
                  >
                    <h2 className="text-xl font-display text-brand-black mb-6">
                      Budget estimé *
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {budgets.map((budget) => (
                        <label
                          key={budget.id}
                          className={cn(
                            'flex items-center p-4 rounded-sm border cursor-pointer transition-all duration-300',
                            'hover:border-brand-gold hover:bg-brand-gold/5'
                          )}
                        >
                          <input
                            {...register('budget')}
                            type="radio"
                            value={budget.id}
                            className="w-4 h-4 text-brand-gold focus:ring-brand-gold"
                          />
                          <span className="ml-3 text-brand-black">{budget.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.budget && (
                      <p className="text-red-500 text-sm mt-2">{errors.budget.message}</p>
                    )}
                  </motion.div>

                  {/* Project Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-brand-white border border-gray-100 rounded-lg p-6 md:p-8"
                  >
                    <h2 className="text-xl font-display text-brand-black mb-6">
                      Décrivez votre projet *
                    </h2>
                    <textarea
                      {...register('description')}
                      rows={6}
                      className={cn(
                        'w-full px-4 py-3 rounded-sm border bg-brand-white text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all resize-none',
                        errors.description ? 'border-red-500' : 'border-gray-200'
                      )}
                      placeholder="Décrivez votre projet, vos objectifs, vos attentes..."
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-2">{errors.description.message}</p>
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center px-10 py-4 bg-brand-gold text-brand-white font-medium rounded-sm hover:bg-brand-gold-dark transition-colors duration-300 disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Recevoir mon devis
                          <Send className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </button>
                    <p className="text-brand-gray text-sm mt-4">
                      Nous vous répondons sous 24h ouvrées
                    </p>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-brand-gold" />
                  </div>
                  <h2 className="text-3xl font-display text-brand-black mb-4">
                    Demande envoyée !
                  </h2>
                  <p className="text-brand-gray text-lg mb-8 max-w-md mx-auto">
                    Merci pour votre demande. Je vous contacterai sous 24h pour discuter de votre projet.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      reset();
                    }}
                    variant="outline"
                  >
                    Envoyer une autre demande
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Trust Signs */}
      <section className="py-16 bg-brand-black text-brand-white">
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <motion.div variants={staggerItem}>
              <div className="text-3xl font-display font-semibold text-brand-gold mb-2">
                24h
              </div>
              <p className="text-brand-gray">Délai de réponse maximum</p>
            </motion.div>
            <motion.div variants={staggerItem}>
              <div className="text-3xl font-display font-semibold text-brand-gold mb-2">
                Gratuit
              </div>
              <p className="text-brand-gray">Devis sans engagement</p>
            </motion.div>
            <motion.div variants={staggerItem}>
              <div className="text-3xl font-display font-semibold text-brand-gold mb-2">
                100%
              </div>
              <p className="text-brand-gray">Projets sur mesure</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
