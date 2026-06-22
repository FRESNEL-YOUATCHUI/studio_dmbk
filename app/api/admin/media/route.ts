import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';
const publicDir = path.join(process.cwd(), 'public');
const uploadsDir = path.join(publicDir, 'uploads');
const libraryDir = path.join(uploadsDir, 'library');
const metadataFile = path.join(process.cwd(), 'data', 'media.json');
const allowed = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
type MediaMeta = Record<string, { category?: string }>;

const toUrl = (file: string) => '/' + path.relative(publicDir, file).split(path.sep).map(encodeURIComponent).join('/');
const safeName = (name: string) => name.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '') || 'image';
async function metadata(): Promise<MediaMeta> { try { return JSON.parse(await fs.readFile(metadataFile, 'utf8')); } catch { return {}; } }
async function saveMetadata(value: MediaMeta) { await fs.mkdir(path.dirname(metadataFile), { recursive: true }); await fs.writeFile(metadataFile, JSON.stringify(value, null, 2)); }
async function walk(dir: string): Promise<string[]> {
  try { const entries = await fs.readdir(dir, { withFileTypes: true }); return (await Promise.all(entries.map((e) => e.isDirectory() ? walk(path.join(dir, e.name)) : Promise.resolve(allowed.has(path.extname(e.name).toLowerCase()) ? [path.join(dir, e.name)] : [])))).flat(); }
  catch { return []; }
}
function resolveMediaUrl(url: string) {
  const decoded = decodeURIComponent(url).replace(/^\/+/, '').replace(/\//g, path.sep);
  const resolved = path.resolve(publicDir, decoded);
  if (!resolved.startsWith(path.resolve(uploadsDir) + path.sep)) throw new Error('Chemin refusé');
  return resolved;
}
async function listMedia() {
  const meta = await metadata();
  const files = await walk(uploadsDir);
  return Promise.all(files.map(async (file) => {
    const stat = await fs.stat(file); const url = toUrl(file);
    return { id: url, url, name: path.basename(file), category: meta[url]?.category || path.basename(path.dirname(file)), size: stat.size, createdAt: stat.birthtime.toISOString() };
  }));
}

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  return NextResponse.json({ media: await listMedia() });
}
export async function POST(request: Request) {
  if (!isAdmin()) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  const form = await request.formData(); const file = form.get('file');
  if (!(file instanceof File) || !file.size || !allowed.has(path.extname(file.name).toLowerCase())) return NextResponse.json({ error: 'Image invalide' }, { status: 400 });
  await fs.mkdir(libraryDir, { recursive: true });
  const name = `${Date.now()}-${safeName(file.name)}`; const destination = path.join(libraryDir, name);
  await fs.writeFile(destination, Buffer.from(await file.arrayBuffer()));
  const url = toUrl(destination); const meta = await metadata(); meta[url] = { category: String(form.get('category') || 'Médiathèque') }; await saveMetadata(meta);
  return NextResponse.json({ media: await listMedia() });
}
export async function PATCH(request: Request) {
  if (!isAdmin()) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  const { url, name, category } = await request.json(); const source = resolveMediaUrl(String(url));
  let currentUrl = String(url); const meta = await metadata();
  if (name) { const ext = path.extname(source); const base = safeName(String(name).replace(/\.[^.]+$/, '')); const target = path.join(path.dirname(source), base + ext); await fs.rename(source, target); currentUrl = toUrl(target); meta[currentUrl] = meta[String(url)] || {}; delete meta[String(url)]; }
  meta[currentUrl] = { ...(meta[currentUrl] || {}), category: String(category || meta[currentUrl]?.category || 'Médiathèque') }; await saveMetadata(meta);
  return NextResponse.json({ media: await listMedia() });
}
export async function DELETE(request: Request) {
  if (!isAdmin()) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  const { url } = await request.json(); const file = resolveMediaUrl(String(url)); await fs.unlink(file);
  const meta = await metadata(); delete meta[String(url)]; await saveMetadata(meta);
  return NextResponse.json({ media: await listMedia() });
}
