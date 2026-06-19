export interface ServiceFeature {
  title: string;
  description: string;
  image: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  delivery: string;
  price: string;
  icon: 'Image' | 'Palette' | 'Users' | 'Monitor';
  coverImage: string;
  heroImage: string;
  features: ServiceFeature[];
  gallery: string[];
  testimonials: Testimonial[];
  faq: FAQ[];
}

const images = {
  visual: 'https://images.pexels.com/photos/5653796/pexels-photo-5653796.jpeg?auto=compress&cs=tinysrgb&w=1600',
  brand: 'https://images.pexels.com/photos/6311590/pexels-photo-6311590.jpeg?auto=compress&cs=tinysrgb&w=1600',
  social: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1600',
  web: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600',
  desk: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1600',
  phone: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1600',
  print: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1600',
};

const commonFaq: FAQ[] = [
  { question: 'Comment démarrer ?', answer: 'Un appel de découverte nous permet de cadrer vos objectifs, vos délais et les livrables.' },
  { question: 'Les fichiers sources sont-ils inclus ?', answer: 'Oui, les fichiers finaux et sources prévus au devis sont livrés dans un espace organisé.' },
];

export const services: Service[] = [
  {
    id: 'pack-visuel', slug: 'pack-visuel', title: 'Pack Visuel', icon: 'Image',
    shortDescription: 'Des contenus graphiques cohérents et prêts à publier pour faire vivre votre marque.',
    description: 'Un système visuel flexible pour vos campagnes, lancements et prises de parole quotidiennes, conçu pour rester reconnaissable sur chaque format.',
    delivery: '48 à 72 h', price: 'À partir de 250 €', coverImage: images.visual, heroImage: images.visual,
    features: [
      { title: 'Posts & Stories', description: 'Une série cohérente qui raconte votre offre sans répétition.', image: images.social },
      { title: 'Formats adaptés', description: 'Déclinaisons Instagram, LinkedIn, Facebook et formats publicitaires.', image: images.phone },
      { title: 'Charte respectée', description: 'Couleurs, typographies et composition alignées à votre identité.', image: images.brand },
      { title: 'Révisions', description: 'Une phase de retours claire pour affiner chaque création.', image: images.desk },
    ],
    gallery: [images.visual, images.social, images.phone, images.brand, images.print],
    testimonials: [{ quote: 'Une direction visuelle forte et des contenus enfin cohérents.', author: 'Aminata D.', role: 'Fondatrice, Nio Studio' }], faq: commonFaq,
  },
  {
    id: 'identite-visuelle', slug: 'identite-visuelle', title: 'Identité Visuelle', icon: 'Palette',
    shortDescription: 'Une identité singulière, mémorable et simple à déployer.',
    description: 'Nous traduisons votre vision en un langage de marque complet : logo, couleurs, typographies, règles de composition et usages concrets.',
    delivery: '10 à 15 jours', price: 'À partir de 900 €', coverImage: images.brand, heroImage: images.brand,
    features: [
      { title: 'Stratégie de marque', description: 'Positionnement, personnalité et territoire créatif.', image: images.desk },
      { title: 'Logo & déclinaisons', description: 'Un signe distinctif pensé pour tous les contextes.', image: images.brand },
      { title: 'Charte graphique', description: 'Un guide pratique pour préserver la cohérence.', image: images.print },
      { title: 'Kit de lancement', description: 'Les premiers supports pour activer la nouvelle identité.', image: images.visual },
    ],
    gallery: [images.brand, images.print, images.desk, images.visual],
    testimonials: [{ quote: 'Notre marque a enfin une personnalité à la hauteur de notre ambition.', author: 'Moussa K.', role: 'CEO, Kora Labs' }], faq: commonFaq,
  },
  {
    id: 'community-management', slug: 'community-management', title: 'Community Management', icon: 'Users',
    shortDescription: 'Une présence sociale régulière, humaine et pilotée par les résultats.',
    description: 'De la ligne éditoriale au reporting, nous créons et animons une présence qui transforme une audience en communauté engagée.',
    delivery: 'Accompagnement mensuel', price: 'À partir de 600 €/mois', coverImage: images.social, heroImage: images.social,
    features: [
      { title: 'Stratégie éditoriale', description: 'Piliers, ton et calendrier alignés à vos objectifs.', image: images.desk },
      { title: 'Création de contenu', description: 'Visuels et textes conçus comme une série cohérente.', image: images.visual },
      { title: 'Animation', description: 'Publication, modération et conversations avec votre audience.', image: images.phone },
      { title: 'Reporting', description: 'Une lecture claire des performances et actions suivantes.', image: images.web },
    ],
    gallery: [images.social, images.phone, images.visual, images.desk],
    testimonials: [{ quote: 'La communauté grandit, mais surtout elle nous répond.', author: 'Fatou N.', role: 'Marketing, Sutura' }], faq: commonFaq,
  },
  {
    id: 'site-web', slug: 'site-web', title: 'Site Web', icon: 'Monitor',
    shortDescription: 'Des sites expressifs, rapides et conçus pour convertir.',
    description: 'Une expérience web sur mesure qui combine stratégie, design, mouvement et performance, de la première impression au passage à l’action.',
    delivery: '3 à 6 semaines', price: 'À partir de 1 800 €', coverImage: images.web, heroImage: images.web,
    features: [
      { title: 'UX & architecture', description: 'Des parcours simples construits autour de vos visiteurs.', image: images.desk },
      { title: 'Direction artistique', description: 'Une interface originale fidèle à votre marque.', image: images.visual },
      { title: 'Développement responsive', description: 'Une expérience fluide sur mobile comme sur grand écran.', image: images.phone },
      { title: 'Performance & SEO', description: 'Une base technique propre, rapide et découvrable.', image: images.web },
    ],
    gallery: [images.web, images.desk, images.phone, images.visual],
    testimonials: [{ quote: 'Le nouveau site explique enfin notre valeur en quelques secondes.', author: 'Ibrahima S.', role: 'Directeur, Baobab Conseil' }], faq: commonFaq,
  },
];

export const getServiceBySlug = (slug: string) => services.find((service) => service.slug === slug);
