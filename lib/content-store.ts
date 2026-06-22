import { promises as fs } from 'fs';
import path from 'path';
import { projects as seedProjects, type Project } from '@/lib/data/projects';
import { services as seedServices, type Service } from '@/lib/data/services';

export interface SiteContent { projects: Project[]; services: Service[] }

const dataDir = path.join(process.cwd(), 'data');
const contentFile = path.join(dataDir, 'content.json');
const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'projects-import');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

function publicUrl(file: string) {
  const relative = path.relative(path.join(process.cwd(), 'public'), file).split(path.sep);
  return '/' + relative.map(encodeURIComponent).join('/');
}

async function walkImages(directory: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    const files = await Promise.all(entries.map((entry) => {
      const full = path.join(directory, entry.name);
      return entry.isDirectory() ? walkImages(full) : Promise.resolve(imageExtensions.has(path.extname(entry.name).toLowerCase()) ? [full] : []);
    }));
    return files.flat();
  } catch { return []; }
}

async function reconcileLocalProjectMedia(content: SiteContent): Promise<SiteContent> {
  const imported = await walkImages(uploadsDir);
  const collator = new Intl.Collator('fr', { numeric: true, sensitivity: 'base' });
  const normalized = imported.map((file) => ({ file, name: path.basename(file).toLocaleLowerCase('fr'), folder: path.dirname(file).toLocaleLowerCase('fr') }));
  const mappings: Record<string, { folder: string; banner?: string }> = {
    'e-drive': { folder: 'projet e drive', banner: 'e drive' },
    'le-cliche-by-ffhl': { folder: 'projet 01 le clich', banner: 'le clich' },
    helix: { folder: 'projet helix', banner: 'helix' },
    'estm-rentree-2026': { folder: 'affiches campage' },
  };
  const projects = content.projects.map((project) => {
    const mapping = mappings[project.slug];
    if (!mapping) return project;
    const details = normalized.filter(({ folder }) => folder.includes(mapping.folder) && !folder.includes('banni')).map(({ file }) => file).sort(collator.compare).map(publicUrl);
    const banner = mapping.banner ? normalized.find(({ folder, name }) => folder.includes('banni') && name.includes(mapping.banner!))?.file : details[0];
    const cover = banner ? publicUrl(banner) : details[0];
    const customMedia = project.images.filter((url) => url.startsWith('/uploads/library/'));
    const images = Array.from(new Set([cover, ...details, ...customMedia].filter(Boolean))) as string[];
    const customCover = project.thumbnail.startsWith('/uploads/library/') ? project.thumbnail : undefined;
    return images.length ? { ...project, thumbnail: customCover || cover || images[0], images } : project;
  });
  return { ...content, projects };
}

async function enrichedSeeds(): Promise<SiteContent> {
  return reconcileLocalProjectMedia({ projects: seedProjects, services: seedServices });
}

export async function getSiteContent(): Promise<SiteContent> {
  try { return reconcileLocalProjectMedia(JSON.parse(await fs.readFile(contentFile, 'utf8')) as SiteContent); }
  catch { return enrichedSeeds(); }
}

export async function saveSiteContent(content: SiteContent) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(contentFile, JSON.stringify(content, null, 2), 'utf8');
  return content;
}
