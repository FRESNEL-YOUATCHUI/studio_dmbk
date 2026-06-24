import { createClient } from '@supabase/supabase-js';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const contentFile = path.join(root, 'data', 'content.json');
const allowed = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

function loadEnv() {
  return fs
    .readFile(path.join(root, '.env.local'), 'utf8')
    .then((value) => {
      for (const line of value.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
        const [key, ...parts] = trimmed.split('=');
        process.env[key] ||= parts.join('=').replace(/^["']|["']$/g, '');
      }
    })
    .catch(() => undefined);
}

function safeName(name) {
  return (
    name
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9._-]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'image'
  );
}

function contentType(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.gif') return 'image/gif';
  return 'application/octet-stream';
}

async function walk(directory) {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    const nested = await Promise.all(
      entries.map((entry) => {
        const full = path.join(directory, entry.name);
        return entry.isDirectory()
          ? walk(full)
          : Promise.resolve(allowed.has(path.extname(entry.name).toLowerCase()) ? [full] : []);
      })
    );
    return nested.flat();
  } catch {
    return [];
  }
}

function localPublicUrl(file) {
  return `/${path.relative(publicDir, file).split(path.sep).map(encodeURIComponent).join('/')}`;
}

function replaceLocalUrls(value, mediaMap) {
  if (typeof value === 'string') return mediaMap.get(value) || value;
  if (Array.isArray(value)) return value.map((item) => replaceLocalUrls(item, mediaMap));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, replaceLocalUrls(item, mediaMap)]));
  }
  return value;
}

async function findMediaIdByUrl(supabase, url) {
  if (!url) return null;
  const { data } = await supabase.from('media').select('id').eq('file_url', url).maybeSingle();
  return data?.id || null;
}

async function upsertBySlug(supabase, table, payload) {
  const { data: existing, error: findError } = await supabase.from(table).select('id').eq('slug', payload.slug).maybeSingle();
  if (findError) throw findError;
  const response = existing
    ? await supabase.from(table).update(payload).eq('id', existing.id)
    : await supabase.from(table).insert(payload);
  if (response.error) throw response.error;
}

async function migrateContent(supabase, content) {
  for (const project of content.projects || []) {
    const imageId = await findMediaIdByUrl(supabase, project.thumbnail);
    await upsertBySlug(supabase, 'projects', {
      title: project.title,
      slug: project.slug,
      category: project.category || 'branding',
      image_id: imageId,
      description: JSON.stringify({
        client: project.client,
        year: project.year,
        thumbnail: project.thumbnail,
        images: project.images || [],
        context: project.context,
        mission: project.mission,
        solution: project.solution,
        results: project.results || [],
        tags: project.tags || [],
      }),
    });
  }

  for (const service of content.services || []) {
    const imageId = await findMediaIdByUrl(supabase, service.coverImage);
    await upsertBySlug(supabase, 'services', {
      title: service.title,
      slug: service.slug,
      image_id: imageId,
      description: JSON.stringify({
        shortDescription: service.shortDescription,
        description: service.description,
        delivery: service.delivery,
        price: service.price,
        icon: service.icon,
        coverImage: service.coverImage,
        heroImage: service.heroImage,
        features: service.features || [],
        gallery: service.gallery || [],
        testimonials: service.testimonials || [],
        faq: service.faq || [],
      }),
    });
  }
}

await loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Variables Supabase manquantes dans .env.local.');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const originalContent = JSON.parse(await fs.readFile(contentFile, 'utf8'));
await migrateContent(supabase, originalContent);
console.log('Contenus projets/services insérés. Les pages ne devraient plus tomber en 404.');

const files = await walk(path.join(publicDir, 'uploads'));
const mediaMap = new Map();

const { data: existingMediaRows, error: existingMediaError } = await supabase
  .from('media')
  .select('name,file_url,file_path');

if (existingMediaError) throw existingMediaError;

const existingByName = new Map((existingMediaRows || []).map((item) => [item.name, item.file_url]));

for (const file of files) {
  const localUrl = localPublicUrl(file);
  const relative = path.relative(path.join(publicDir, 'uploads'), file).split(path.sep);
  const category = relative.length > 1 ? relative[0] : 'Médiathèque';
  const fileName = safeName(path.basename(file));
  const filePath = `${category}/${crypto.randomUUID()}-${fileName}`;
  const bytes = await fs.readFile(file);
  const mimeType = contentType(file);

  const existingUrl = existingByName.get(fileName);
  if (existingUrl) {
    mediaMap.set(localUrl, existingUrl);
    continue;
  }

  const { error: uploadError } = await supabase.storage.from('media').upload(filePath, bytes, {
    contentType: mimeType,
    cacheControl: '31536000',
    upsert: false,
  });
  if (uploadError) throw uploadError;

  const { data: publicUrl } = supabase.storage.from('media').getPublicUrl(filePath);
  const fileUrl = publicUrl.publicUrl;

  const { error: insertError } = await supabase.from('media').insert({
    name: fileName,
    file_url: fileUrl,
    file_path: filePath,
    category,
    alt_text: fileName.replace(/\.[^.]+$/, ''),
    size: bytes.byteLength,
    mime_type: mimeType,
  });
  if (insertError) throw insertError;

  existingByName.set(fileName, fileUrl);
  mediaMap.set(localUrl, fileUrl);
}

const content = replaceLocalUrls(originalContent, mediaMap);
await migrateContent(supabase, content);

console.log(`Migration terminée : ${files.length} fichiers analysés, ${mediaMap.size} médias liés.`);
