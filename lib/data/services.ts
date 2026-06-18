export interface Service {
  id: string;
  title: string;
  subtitle: string;
  delivery: string;
  price: string;
  description: string;
  features: string[];
  icon: string;
  href: string;
}

export const services: Service[] = [
  {
    id: 'pack-visuel',
    title: 'Pack Visuel',
    subtitle: 'Création de visuels pour vos réseaux sociaux',
    delivery: 'Livraison sous 48h',
    price: 'Sur devis',
    description: 'Boostez votre présence sur les réseaux sociaux avec des visuels professionnels et percutants.',
    features: [
      'Posts et stories',
      'Formats adaptés à chaque plateforme',
      '1 révision incluse',
      'Respect de votre charte graphique',
      'Fichiers sources livrés',
    ],
    icon: 'Image',
    href: '/services#pack-visuel',
  },
  {
    id: 'identite-visuelle',
    title: 'Identité Visuelle',
    subtitle: 'Création complète de votre identité de marque',
    delivery: 'Livraison sous 5 jours',
    price: 'Sur devis',
    description: 'Définissez une identité unique et mémorable qui vous distingue de la concurrence.',
    features: [
      'Logo principal et déclinaisons',
      'Charte graphique complète',
      'Palette de couleurs professionnelle',
      'Typographies adaptées',
      '3 révisions incluses',
      'Guide d\'utilisation',
    ],
    icon: 'Palette',
    href: '/services#identite-visuelle',
  },
  {
    id: 'community-management',
    title: 'Community Management',
    subtitle: 'Gestion complète de vos réseaux sociaux',
    delivery: 'Mensuel',
    price: 'Sur devis',
    description: 'Confiez votre présence digitale à des experts qui comprennent votre audience.',
    features: [
      'Planning éditorial mensuel',
      'Création de contenu engageant',
      'Animation de communauté',
      'Reporting mensuel détaillé',
      'Réponse aux messages',
      'Stratégie de croissance',
    ],
    icon: 'Users',
    href: '/services#community-management',
  },
  {
    id: 'site-web',
    title: 'Site Web',
    subtitle: 'Création de sites web modernes et performants',
    delivery: 'Sur devis',
    price: 'Sur devis',
    description: 'Un site web sur mesure qui convertit vos visiteurs en clients.',
    features: [
      'Design sur mesure',
      '100% Responsive',
      'SEO optimisé',
      'Hébergement inclus',
      'Maintenance disponible',
      'Intégration responsive',
    ],
    icon: 'Monitor',
    href: '/services#site-web',
  },
];
