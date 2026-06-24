import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Variables Supabase manquantes. Lancez avec : node --env-file=.env.local scripts/organize-supabase-project-media.mjs');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const collator = new Intl.Collator('fr', { numeric: true, sensitivity: 'base' });

function normalize(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function parseMeta(value) {
  try {
    const parsed = JSON.parse(value || '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

const projectRules = {
  'e-drive': {
    category: 'Projet — E-Drive',
    match: (name) => name.includes('e-drive') || name.includes('e drive'),
    banner: (name) => name.includes('banniere') && (name.includes('e-drive') || name.includes('e drive')),
  },
  'le-cliche-by-ffhl': {
    category: 'Projet — Le Cliché by FFHL',
    match: (name) => name.includes('cliche') || name.includes('ffhl'),
    banner: (name) => name.includes('banniere') && name.includes('cliche'),
  },
  helix: {
    category: 'Projet — Helix',
    match: (name) => name.includes('helix'),
    banner: (name) => name.includes('banniere') && name.includes('helix'),
  },
  'estm-rentree-2026': {
    category: 'Projet — ESTM Rentrée 2026',
    match: (name) => name.includes('estm'),
    banner: () => false,
  },
};

const fallbackProjects = {
  'estm-rentree-2025': {
    thumbnail: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600',
    images: [
      'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
  },
};

function isLegacyLocalUrl(value) {
  return typeof value === 'string' && value.startsWith('/uploads/');
}

const { data: media, error: mediaError } = await supabase
  .from('media')
  .select('id,name,file_url,category')
  .order('name', { ascending: true });

if (mediaError) throw mediaError;

const { data: projects, error: projectsError } = await supabase
  .from('projects')
  .select('id,title,slug,category,image_id,description');

if (projectsError) throw projectsError;

const normalizedMedia = (media || []).map((item) => ({
  ...item,
  normalizedName: normalize(item.name),
}));

const summary = [];

for (const project of projects || []) {
  const rule = projectRules[project.slug];
  if (!rule) continue;

  const matches = normalizedMedia
    .filter((item) => item.file_url && rule.match(item.normalizedName))
    .sort((a, b) => collator.compare(a.name || '', b.name || ''));

  if (!matches.length) {
    summary.push({ project: project.slug, status: 'aucun média trouvé' });
    continue;
  }

  const banner = matches.find((item) => rule.banner(item.normalizedName));
  const ordered = [banner, ...matches.filter((item) => item.id !== banner?.id)].filter(Boolean);
  const cover = banner || ordered[0];
  const images = unique(ordered.map((item) => item.file_url));
  const meta = parseMeta(project.description);

  const nextMeta = {
    ...meta,
    thumbnail: cover.file_url,
    images,
  };

  const { error: updateProjectError } = await supabase
    .from('projects')
    .update({
      image_id: cover.id,
      description: JSON.stringify(nextMeta),
    })
    .eq('id', project.id);

  if (updateProjectError) throw updateProjectError;

  for (const item of matches) {
    const { error: updateMediaError } = await supabase
      .from('media')
      .update({ category: rule.category })
      .eq('id', item.id);

    if (updateMediaError) throw updateMediaError;
  }

  summary.push({
    project: project.slug,
    cover: cover.name,
    images: images.length,
    category: rule.category,
  });
}

for (const project of projects || []) {
  const fallback = fallbackProjects[project.slug];
  if (!fallback) continue;

  const meta = parseMeta(project.description);
  const hasLegacyUrls =
    isLegacyLocalUrl(meta.thumbnail) || (Array.isArray(meta.images) && meta.images.some((url) => isLegacyLocalUrl(url)));

  if (!hasLegacyUrls) continue;

  const nextMeta = {
    ...meta,
    thumbnail: fallback.thumbnail,
    images: fallback.images,
  };

  const { error } = await supabase
    .from('projects')
    .update({
      image_id: null,
      description: JSON.stringify(nextMeta),
    })
    .eq('id', project.id);

  if (error) throw error;

  summary.push({
    project: project.slug,
    cover: 'fallback distant',
    images: fallback.images.length,
    category: 'Fallback sans fichiers locaux',
  });
}

console.table(summary);
console.log('Organisation Supabase terminée.');
