export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: 'branding' | 'social-media' | 'site-web' | 'ui-ux';
  year: string;
  thumbnail: string;
  images: string[];
  context: string;
  mission: string;
  solution: string;
  results: string[];
  tags: string[];
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'afrostyle-branding',
    title: 'AfroStyle',
    client: 'AfroStyle Fashion',
    category: 'branding',
    year: '2024',
    thumbnail: 'https://images.pexels.com/photos/1536679/pexels-photo-1536679.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1536679/pexels-photo-1536679.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    context: 'AfroStyle Fashion est une marque de prêt-à-porter africain contemporain qui souhaitait se repositionner sur le marché international.',
    mission: 'Créer une identité visuelle moderne qui célèbre l\'héritage africain tout en touchant une audience internationale.',
    solution: 'Nous avons développé une identité complète avec des motifs inspirés des textiles traditionnels, une palette de couleurs riches et une typographie élégante.',
    results: [
      'Augmentation de 150% des ventes en ligne',
      'Présence dans 3 nouveaux marchés internationaux',
      'Reconnaissance de marque renforcée',
    ],
    tags: ['Logo', 'Charte graphique', 'Stationery', 'Packaging'],
  },
  {
    id: '2',
    slug: 'techstart-website',
    title: 'TechStart Africa',
    client: 'TechStart Africa',
    category: 'site-web',
    year: '2024',
    thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    context: 'TechStart Africa est une plateforme de formation en ligne dédiée aux développeurs africains.',
    mission: 'Concevoir un site web moderne et performant qui convertit les visiteurs en apprenants.',
    solution: 'Un site web responsive avec une UX optimisée, un tunnel de conversion efficace et une intégration complète de la plateforme LMS.',
    results: [
      'Taux de conversion de 12%',
      'Plus de 5000 inscriptions la première année',
      'Temps de chargement sous 2 secondes',
    ],
    tags: ['Web Design', 'Développement', 'UX/UI', 'LMS'],
  },
  {
    id: '3',
    slug: 'savannah-social',
    title: 'Savannah Coffee',
    client: 'Savannah Coffee Co.',
    category: 'social-media',
    year: '2024',
    thumbnail: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4105496/pexels-photo-4105496.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4105455/pexels-photo-4105455.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    context: 'Savannah Coffee Co. est une marque de café éthique sourcé directement des planteurs africains.',
    mission: 'Développer une stratégie social media qui raconte l\'histoire du café africain et engage une communauté passionnée.',
    solution: 'Une stratégie de contenu visuelle avec des photos lifestyle, des vidéos de coulisses et des collaborations avec des influenceurs.',
    results: [
      'Croissance de 300% des abonnés Instagram',
      'Engagement moyen de 8%',
      'Campagne virale avec 2M d\'impressions',
    ],
    tags: ['Instagram', 'Facebook', 'Contenu', 'Stratégie'],
  },
  {
    id: '4',
    slug: 'zenith-app',
    title: 'Zenith Banking App',
    client: 'Zenith Bank',
    category: 'ui-ux',
    year: '2023',
    thumbnail: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    context: 'Zenith Bank souhaitait moderniser son application mobile banking pour une meilleure expérience utilisateur.',
    mission: 'Redesigner l\'interface pour la rendre intuitive, moderne et accessible à tous les profils d\'utilisateurs.',
    solution: 'Un design system complet avec des parcours utilisateur simplifiés, des animations fluides et une accessibilité renforcée.',
    results: [
      'Note App Store passée de 3.2 à 4.7',
      'Réduction de 40% du taux de désabonnement',
      'Prix de l\'innovation bancaire 2023',
    ],
    tags: ['Mobile', 'UI/UX', 'Banking', 'Design System'],
  },
  {
    id: '5',
    slug: 'ngonie-branding',
    title: 'Ngonee Cosmetics',
    client: 'Ngonee Cosmetics',
    category: 'branding',
    year: '2023',
    thumbnail: 'https://images.pexels.com/photos/3685563/pexels-photo-3685563.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3685563/pexels-photo-3685563.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3756025/pexels-photo-3756025.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3685520/pexels-photo-3685520.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    context: 'Ngonee Cosmetics est une marque de cosmétiques naturels africains ciblant les femmes modernes.',
    mission: 'Créer une identité visuelle luxueuse qui reflète l\'authenticité et la qualité des produits.',
    solution: 'Une identité premium avec des illustrations botaniques, une palette de couleurs naturelles et un packaging élégant.',
    results: [
      'Lancement réussi dans 50 boutiques',
      'Reconnaissance internationale',
      'Collaboration avec Sephora Africa',
    ],
    tags: ['Logo', 'Packaging', 'Branding', 'Print'],
  },
  {
    id: '6',
    slug: 'bantou-events',
    title: 'Bantou Events',
    client: 'Bantou Events',
    category: 'site-web',
    year: '2023',
    thumbnail: 'https://images.pexels.com/photos/1183216/pexels-photo-1183216.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1183216/pexels-photo-1183216.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/169189/pexels-photo-169189.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    context: 'Bantou Events est une agence événementielle spécialisée dans les mariages et événements corporatifs.',
    mission: 'Créer un site vitrine impressionnant qui met en valeur leur portfolio et facilite les prises de contact.',
    solution: 'Un site web immersif avec des effets de parallax, une galerie de projets dynamique et un système de devis en ligne.',
    results: [
      'Augmentation de 200% des demandes de devis',
      'Temps moyen sur site de 4 minutes',
      'Taux de rebond réduit à 25%',
    ],
    tags: ['Web Design', 'Portfolio', 'Animation', 'Parallax'],
  },
  {
    id: '7',
    slug: 'moringa-social',
    title: 'Moringa Life',
    client: 'Moringa Life',
    category: 'social-media',
    year: '2024',
    thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4199098/pexels-photo-4199098.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    context: 'Moringa Life est une marque de compléments alimentaires à base de moringa, superfood africaine.',
    mission: 'Lancer la marque sur les réseaux sociaux avec une stratégie de contenu impactante.',
    solution: 'Stratégie éducative avec des infographies, témoignages clients et partenariats avec des influenceurs bien-être.',
    results: [
      '50K abonnés en 6 mois',
      'Ventes multipliées par 5',
      'Communauté engagée de 15K membres',
    ],
    tags: ['Lancement', 'Stratégie', 'Influence', 'Contenu'],
  },
  {
    id: '8',
    slug: 'ecobank-dashboard',
    title: 'EcoBank Enterprise',
    client: 'EcoBank',
    category: 'ui-ux',
    year: '2024',
    thumbnail: 'https://images.pexels.com/photos/669612/pexels-photo-669612.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/669612/pexels-photo-669612.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    context: 'EcoBank souhaitait moderniser son portail entreprise pour une meilleure gestion des comptes professionnels.',
    mission: 'Redesigner le dashboard pour offrir une expérience fluide et des insights actionable.',
    solution: 'Une interface moderne avec des visualisations de données intuitives, des rapports personnalisables et des notifications intelligentes.',
    results: [
      'Satisfaction client de 92%',
      'Réduction de 60% des appels support',
      'Adoption de 85% par les clients entreprise',
    ],
    tags: ['Dashboard', 'Data Viz', 'Enterprise', 'Fintech'],
  },
];

export const categories = [
  { id: 'all', label: 'Tous' },
  { id: 'branding', label: 'Branding' },
  { id: 'social-media', label: 'Social Media' },
  { id: 'site-web', label: 'Site Web' },
  { id: 'ui-ux', label: 'UI/UX' },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(currentSlug: string, limit: number = 3): Project[] {
  const current = getProjectBySlug(currentSlug);
  if (!current) return [];

  return projects
    .filter((p) => p.slug !== currentSlug && p.category === current.category)
    .slice(0, limit);
}
