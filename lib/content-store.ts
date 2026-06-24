import { getSupabaseAdminClient } from '@/lib/supabase';
import { projects as seedProjects, type Project } from '@/lib/data/projects';
import type { Service } from '@/lib/data/services';

export interface SiteContent {
  projects: Project[];
  services: Service[];
}

type MediaRow = {
  id: string;
  file_url: string | null;
  name?: string | null;
  category?: string | null;
};

type ProjectRow = {
  id: string;
  title: string | null;
  slug: string | null;
  description: string | null;
  category: string | null;
  image_id: string | null;
  created_at: string | null;
};

type ServiceRow = {
  id: string;
  title: string | null;
  slug: string | null;
  description: string | null;
  image_id: string | null;
  created_at: string | null;
};

function parseMeta<T extends Record<string, unknown>>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === 'object' && parsed ? { ...fallback, ...(parsed as T) } : fallback;
  } catch {
    return { ...fallback, context: value, description: value } as T;
  }
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function asProjectCategory(value: string | null): Project['category'] {
  if (value === 'social-media' || value === 'site-web' || value === 'ui-ux') return value;
  return 'branding';
}

type AutoProjectMedia = {
  coverId: string | null;
  coverUrl: string;
  images: string[];
};

const collator = new Intl.Collator('fr', { numeric: true, sensitivity: 'base' });

function normalize(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function mediaUrl(mediaById: Map<string, string>, id: string | null) {
  return id ? mediaById.get(id) || '' : '';
}

function isLegacyLocalUrl(value: unknown) {
  return typeof value === 'string' && value.startsWith('/uploads/');
}

function buildAutoProjectMedia(mediaRows: MediaRow[]) {
  const rows = mediaRows
    .filter((media) => media.file_url && media.name)
    .map((media) => ({ ...media, normalizedName: normalize(media.name || '') }));

  const mappings: Record<string, { match: (name: string) => boolean; banner?: (name: string) => boolean }> = {
    'e-drive': {
      match: (name) => name.includes('e-drive') || name.includes('e drive'),
      banner: (name) => name.includes('banniere') && (name.includes('e-drive') || name.includes('e drive')),
    },
    'le-cliche-by-ffhl': {
      match: (name) => name.includes('cliche') || name.includes('ffhl'),
      banner: (name) => name.includes('banniere') && name.includes('cliche'),
    },
    helix: {
      match: (name) => name.includes('helix'),
      banner: (name) => name.includes('banniere') && name.includes('helix'),
    },
    'estm-rentree-2026': {
      match: (name) => name.includes('estm'),
    },
  };

  const result = new Map<string, AutoProjectMedia>();

  for (const [slug, rules] of Object.entries(mappings)) {
    const matches = rows
      .filter((row) => rules.match(row.normalizedName))
      .sort((a, b) => collator.compare(a.name || '', b.name || ''));

    if (!matches.length) continue;

    const banner = rules.banner ? matches.find((row) => rules.banner?.(row.normalizedName)) : undefined;
    const detailImages = matches.filter((row) => row.id !== banner?.id);
    const ordered = [banner, ...detailImages].filter(Boolean) as MediaRow[];

    result.set(slug, {
      coverId: banner?.id || ordered[0]?.id || null,
      coverUrl: banner?.file_url || ordered[0]?.file_url || '',
      images: unique(ordered.map((row) => row.file_url || '')),
    });
  }

  return result;
}

async function loadMediaRows() {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.from('media').select('id,file_url,name,category').order('name', { ascending: true });
  if (error) throw error;
  return (data || []) as MediaRow[];
}

function projectFromRow(row: ProjectRow, mediaById: Map<string, string>, autoMedia: Map<string, AutoProjectMedia>): Project {
  const seed = seedProjects.find((project) => project.slug === row.slug);
  const meta = parseMeta(row.description, {
    client: row.title || '',
    year: row.created_at ? new Date(row.created_at).getFullYear().toString() : new Date().getFullYear().toString(),
    thumbnail: '',
    images: [] as string[],
    context: row.description || '',
    mission: '',
    solution: '',
    results: [] as string[],
    tags: [] as string[],
  });

  const auto = row.slug ? autoMedia.get(row.slug) : undefined;
  const storedThumbnail = isLegacyLocalUrl(meta.thumbnail) ? '' : String(meta.thumbnail || '');
  const storedImages = ((meta.images as string[] | undefined) || []).filter((url) => !isLegacyLocalUrl(url));
  const fallbackImages = seed?.images || [];
  const cover = auto?.coverUrl || mediaUrl(mediaById, row.image_id) || storedThumbnail || seed?.thumbnail || '';
  const images = auto?.images?.length ? auto.images : unique([cover, ...storedImages, ...(storedImages.length ? [] : fallbackImages)]);

  return {
    id: row.id,
    slug: row.slug || row.id,
    title: row.title || 'Projet',
    client: String(meta.client || row.title || ''),
    category: asProjectCategory(row.category),
    year: String(meta.year || ''),
    thumbnail: cover || images[0] || '',
    images,
    context: String(meta.context || ''),
    mission: String(meta.mission || ''),
    solution: String(meta.solution || ''),
    results: Array.isArray(meta.results) ? (meta.results as string[]) : [],
    tags: Array.isArray(meta.tags) ? (meta.tags as string[]) : [],
  };
}

function serviceFromRow(row: ServiceRow, mediaById: Map<string, string>): Service {
  const meta = parseMeta(row.description, {
    shortDescription: row.description || '',
    description: row.description || '',
    delivery: '',
    price: 'À partir de 0 €',
    icon: 'Image',
    coverImage: '',
    heroImage: '',
    features: [],
    gallery: [],
    testimonials: [],
    faq: [],
  });

  const cover = mediaUrl(mediaById, row.image_id) || String(meta.coverImage || '');
  const gallery = unique([cover, ...((meta.gallery as string[] | undefined) || [])]);

  return {
    id: row.id,
    slug: row.slug || row.id,
    title: row.title || 'Service',
    shortDescription: String(meta.shortDescription || ''),
    description: String(meta.description || row.description || ''),
    delivery: String(meta.delivery || ''),
    price: String(meta.price || 'À partir de 0 €'),
    icon: (meta.icon as Service['icon']) || 'Image',
    coverImage: cover,
    heroImage: String(meta.heroImage || cover),
    features: Array.isArray(meta.features) ? (meta.features as Service['features']) : [],
    gallery,
    testimonials: Array.isArray(meta.testimonials) ? (meta.testimonials as Service['testimonials']) : [],
    faq: Array.isArray(meta.faq) ? (meta.faq as Service['faq']) : [],
  };
}

async function imageIdsByUrl(urls: string[]) {
  const supabase = getSupabaseAdminClient();
  const cleanUrls = unique(urls);
  if (!cleanUrls.length) return new Map<string, string>();

  const { data, error } = await supabase.from('media').select('id,file_url').in('file_url', cleanUrls);
  if (error) throw error;

  return new Map((data || []).map((row) => [String((row as MediaRow).file_url || ''), (row as MediaRow).id]));
}

async function saveProject(project: Project, imageByUrl: Map<string, string>) {
  const supabase = getSupabaseAdminClient();
  const imageId = imageByUrl.get(project.thumbnail) || null;
  const description = JSON.stringify({
    client: project.client,
    year: project.year,
    thumbnail: project.thumbnail,
    images: project.images,
    context: project.context,
    mission: project.mission,
    solution: project.solution,
    results: project.results,
    tags: project.tags,
  });

  const payload = {
    title: project.title,
    slug: project.slug,
    description,
    category: project.category,
    image_id: imageId,
  };

  const { data: existing, error: findError } = await supabase.from('projects').select('id').eq('slug', project.slug).maybeSingle();
  if (findError) throw findError;

  const response = existing
    ? await supabase.from('projects').update(payload).eq('id', (existing as { id: string }).id)
    : await supabase.from('projects').insert(payload);

  if (response.error) throw response.error;
}

async function saveService(service: Service, imageByUrl: Map<string, string>) {
  const supabase = getSupabaseAdminClient();
  const imageId = imageByUrl.get(service.coverImage) || null;
  const description = JSON.stringify({
    shortDescription: service.shortDescription,
    description: service.description,
    delivery: service.delivery,
    price: service.price,
    icon: service.icon,
    coverImage: service.coverImage,
    heroImage: service.heroImage,
    features: service.features,
    gallery: service.gallery,
    testimonials: service.testimonials,
    faq: service.faq,
  });

  const payload = {
    title: service.title,
    slug: service.slug,
    description,
    image_id: imageId,
  };

  const { data: existing, error: findError } = await supabase.from('services').select('id').eq('slug', service.slug).maybeSingle();
  if (findError) throw findError;

  const response = existing
    ? await supabase.from('services').update(payload).eq('id', (existing as { id: string }).id)
    : await supabase.from('services').insert(payload);

  if (response.error) throw response.error;
}

async function deleteMissing(table: 'projects' | 'services', slugs: string[]) {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.from(table).select('slug');
  if (error) throw error;

  const missing = (data || [])
    .map((row) => String((row as { slug?: string }).slug || ''))
    .filter((slug) => slug && !slugs.includes(slug));

  if (missing.length) {
    const { error: deleteError } = await supabase.from(table).delete().in('slug', missing);
    if (deleteError) throw deleteError;
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  const supabase = getSupabaseAdminClient();
  const [mediaRows, projectsResult, servicesResult] = await Promise.all([
    loadMediaRows(),
    supabase.from('projects').select('*').order('created_at', { ascending: true }),
    supabase.from('services').select('*').order('created_at', { ascending: true }),
  ]);

  if (projectsResult.error) throw projectsResult.error;
  if (servicesResult.error) throw servicesResult.error;

  const mediaById = new Map(mediaRows.map((row) => [row.id, row.file_url || '']));
  const autoMedia = buildAutoProjectMedia(mediaRows);

  return {
    projects: ((projectsResult.data || []) as ProjectRow[]).map((row) => projectFromRow(row, mediaById, autoMedia)),
    services: ((servicesResult.data || []) as ServiceRow[]).map((row) => serviceFromRow(row, mediaById)),
  };
}

export async function saveSiteContent(content: SiteContent) {
  const allImageUrls = [
    ...content.projects.map((project) => project.thumbnail),
    ...content.services.map((service) => service.coverImage),
  ];
  const imageByUrl = await imageIdsByUrl(allImageUrls);

  await Promise.all([
    ...content.projects.map((project) => saveProject(project, imageByUrl)),
    ...content.services.map((service) => saveService(service, imageByUrl)),
  ]);

  await Promise.all([
    deleteMissing('projects', content.projects.map((project) => project.slug)),
    deleteMissing('services', content.services.map((service) => service.slug)),
  ]);

  return getSiteContent();
}
