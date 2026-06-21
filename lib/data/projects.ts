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

const img = (id: string) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;

const seeds = [
  { slug: 'e-drive', title: 'E-Drive', client: 'E-Drive', year: '2025', category: 'branding', photo: '9800029', context: 'Description à venir.', mission: 'Créer une identité visuelle distinctive pour un acteur de la mobilité électrique.', solution: 'Direction artistique, logotype et système graphique pensés pour les usages numériques et physiques.', tags: ['Direction artistique', 'Logotype', 'Identité visuelle'] },
  { slug: 'le-cliche-by-ffhl', title: 'Le Cliché by FFHL', client: 'Le Cliché by FFHL', year: '2025', category: 'branding', photo: '3379943', context: 'Description à venir.', mission: 'Construire une signature élégante pour un studio photographique contemporain.', solution: 'Une identité éditoriale sobre mettant les images et le regard du studio au premier plan.', tags: ['Branding', 'Art direction', 'Photographie'] },
  { slug: 'repi-farm', title: 'Repi Farm', client: 'Repi Farm', year: '2025', category: 'branding', photo: '2132250', context: 'Description à venir.', mission: 'Donner à la marque agricole un univers authentique, moderne et accessible.', solution: 'Un langage visuel organique conçu pour le packaging, le digital et la signalétique.', tags: ['Identité visuelle', 'Packaging', 'Illustration'] },
  { slug: 'obsidian-cybersecurite', title: 'Obsidian', client: 'Obsidian', year: '2025', category: 'branding', photo: '5380642', context: 'Obsidian est une agence de cybersécurité qui accompagne les organisations dans la protection de leurs systèmes et de leurs données.', mission: 'Exprimer la précision, la confiance et la maîtrise technologique sans tomber dans les codes visuels génériques du secteur.', solution: 'Une identité sombre et structurée, portée par une typographie nette et un système graphique modulaire.', tags: ['Stratégie de marque', 'Logotype', 'Système graphique'] },
  { slug: 'ciel-et-sel', title: 'Ciel & Sel', client: 'Ciel & Sel', year: '2025', category: 'branding', photo: '262978', context: 'Ciel & Sel est un restaurant gastronomique étoilé où la cuisine, la matière et le geste composent une expérience sensible.', mission: 'Créer une identité raffinée qui évoque la gastronomie sans surcharge décorative.', solution: 'Un univers éditorial délicat, déployé sur les menus, la papeterie et les supports numériques.', tags: ['Identité visuelle', 'Édition', 'Art de la table'] },
  { slug: 'helix', title: 'Helix', client: 'Helix', year: '2025', category: 'branding', photo: '3822622', context: 'Helix développe une approche douce de la santé mentale et de la méditation.', mission: 'Créer un espace de marque rassurant, inclusif et contemporain.', solution: 'Une palette apaisante et un système visuel fluide accompagnent les contenus de soin et de méditation.', tags: ['Branding', 'Bien-être', 'Direction artistique'] },
  { slug: 'volta-studio', title: 'Volta Studio', client: 'Volta Studio', year: '2025', category: 'branding', photo: '157811', context: 'Volta Studio est un cabinet d’architecture et de design d’intérieur.', mission: 'Traduire la rigueur architecturale et la sensibilité du studio dans une identité pérenne.', solution: 'Une grille précise, une signature typographique et un traitement photographique centré sur l’espace.', tags: ['Identité visuelle', 'Architecture', 'Édition'] },
  { slug: 'fragment-magazine', title: 'Frag·ment', client: 'Frag·ment', year: '2025', category: 'branding', photo: '590493', context: 'Frag·ment est un magazine culturel indépendant qui explore les scènes, idées et voix émergentes.', mission: 'Concevoir une identité éditoriale capable de se renouveler à chaque numéro.', solution: 'Un système typographique radical et flexible, adapté à l’imprimé comme aux formats sociaux.', tags: ['Design éditorial', 'Typographie', 'Identité visuelle'] },
  { slug: 'estm-rentree-2025', title: 'ESTM — Rentrée 2025', client: 'ESTM', year: '2025', category: 'social-media', photo: '267885', context: 'Campagne de communication conçue pour la rentrée académique 2025 de l’ESTM.', mission: 'Rendre l’offre de formation visible et créer une campagne immédiatement reconnaissable.', solution: 'Un territoire visuel énergique décliné en affichage, digital et réseaux sociaux.', tags: ['Campagne', 'Social media', 'Affichage'] },
  { slug: 'estm-rentree-2026', title: 'ESTM — Rentrée 2026', client: 'ESTM', year: '2026', category: 'social-media', photo: '289737', context: 'Nouvelle campagne de rentrée de l’ESTM, construite pour prolonger la reconnaissance acquise en 2025.', mission: 'Faire évoluer la campagne tout en conservant une filiation visuelle forte.', solution: 'Une composition plus éditoriale, des messages courts et un système de déclinaisons multi-format.', tags: ['Campagne 360°', 'Direction artistique', 'Social media'] },
] as const;

export const projects: Project[] = seeds.map((project, index) => {
  const main = img(project.photo);
  const alternates = [img(['3182812','4348404','196644','3184291'][index % 4]), img(['3183150','4064835','6476589','3861969'][index % 4])];
  return { ...project, id: String(index + 1), category: project.category as Project['category'], thumbnail: main, images: [main, ...alternates], tags: [...project.tags], results: [] };
});

export const categories = [{ id: 'all', label: 'Tout' }, { id: 'branding', label: 'Identité visuelle' }, { id: 'social-media', label: 'Campagnes' }];
export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);
export function getRelatedProjects(currentSlug: string, limit = 3) { const current = getProjectBySlug(currentSlug); return current ? projects.filter((p) => p.slug !== currentSlug && p.category === current.category).slice(0, limit) : []; }
export function getAdjacentProjects(currentSlug: string) { const index = projects.findIndex((p) => p.slug === currentSlug); return index < 0 ? { previous: undefined, next: undefined } : { previous: projects[(index - 1 + projects.length) % projects.length], next: projects[(index + 1) % projects.length] }; }
