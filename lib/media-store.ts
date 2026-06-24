import { MEDIA_BUCKET, getSupabaseAdminClient } from '@/lib/supabase';

export type MediaItem = {
  id: string;
  name: string;
  url: string;
  file_url: string;
  file_path: string;
  category: string;
  alt_text: string;
  altText: string;
  size: number;
  mime_type: string;
  mimeType: string;
  created_at: string;
  createdAt: string;
};

type MediaRow = {
  id: string;
  name: string | null;
  file_url: string | null;
  file_path: string | null;
  category: string | null;
  alt_text: string | null;
  size: number | null;
  mime_type: string | null;
  created_at: string | null;
};

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

function safeName(name: string) {
  return (
    name
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9._-]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'image'
  );
}

function mapMedia(row: MediaRow): MediaItem {
  const createdAt = row.created_at || new Date().toISOString();
  const fileUrl = row.file_url || '';
  const mimeType = row.mime_type || '';
  const altText = row.alt_text || row.name || '';

  return {
    id: row.id,
    name: row.name || 'Image',
    url: fileUrl,
    file_url: fileUrl,
    file_path: row.file_path || '',
    category: row.category || 'Médiathèque',
    alt_text: altText,
    altText,
    size: Number(row.size || 0),
    mime_type: mimeType,
    mimeType,
    created_at: createdAt,
    createdAt,
  };
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

async function findMediaByIdOrUrl(idOrUrl: string) {
  const supabase = getSupabaseAdminClient();
  const request = supabase.from('media').select('*');
  const { data, error } = isUuid(idOrUrl)
    ? await request.eq('id', idOrUrl).maybeSingle()
    : await request.eq('file_url', idOrUrl).maybeSingle();

  if (error) throw error;
  return data as MediaRow | null;
}

export async function getMedia(options?: { query?: string; category?: string; page?: number; limit?: number }) {
  const supabase = getSupabaseAdminClient();
  const page = Math.max(1, Number(options?.page || 1));
  const limit = Math.min(80, Math.max(1, Number(options?.limit || 60)));
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let request = supabase
    .from('media')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (options?.query) {
    const query = options.query.replace(/[%_]/g, '');
    request = request.or(`name.ilike.%${query}%,alt_text.ilike.%${query}%,category.ilike.%${query}%`);
  }

  if (options?.category && options.category !== 'Tous') {
    request = request.eq('category', options.category);
  }

  const { data, error, count } = await request;
  if (error) throw error;

  return {
    media: (data || []).map((row) => mapMedia(row as MediaRow)),
    total: count || 0,
    page,
    limit,
  };
}

export async function searchMedia(query: string) {
  return getMedia({ query });
}

export async function uploadMedia(file: File, category = 'Médiathèque', altText = '') {
  if (!file.size || !allowedTypes.has(file.type)) {
    throw new Error('Image invalide. Formats acceptés : JPG, PNG, WebP, GIF.');
  }

  const supabase = getSupabaseAdminClient();
  const cleanName = safeName(file.name);
  const filePath = `${category || 'mediatheque'}/${Date.now()}-${crypto.randomUUID()}-${cleanName}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(filePath, buffer, {
      contentType: file.type,
      cacheControl: '31536000',
      upsert: false,
    });

  if (uploadError) throw uploadError;

  const { data: publicUrl } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(filePath);

  const { error: insertError } = await supabase.from('media').insert({
    name: cleanName,
    file_url: publicUrl.publicUrl,
    file_path: filePath,
    category: category || 'Médiathèque',
    alt_text: altText || cleanName.replace(/\.[^.]+$/, ''),
    size: file.size,
    mime_type: file.type,
  });

  if (insertError) {
    await supabase.storage.from(MEDIA_BUCKET).remove([filePath]);
    throw insertError;
  }

  return getMedia();
}

export async function deleteMedia(idOrUrl: string) {
  const supabase = getSupabaseAdminClient();
  const media = await findMediaByIdOrUrl(idOrUrl);
  if (!media) throw new Error('Image introuvable.');

  if (media.file_path) {
    const { error: storageError } = await supabase.storage.from(MEDIA_BUCKET).remove([media.file_path]);
    if (storageError) throw storageError;
  }

  const { error: deleteError } = await supabase.from('media').delete().eq('id', media.id);
  if (deleteError) throw deleteError;

  return getMedia();
}

export async function renameMedia(
  idOrUrl: string,
  updates: { name?: string; category?: string; alt_text?: string; altText?: string }
) {
  const supabase = getSupabaseAdminClient();
  const payload: Record<string, string> = {};

  if (updates.name) payload.name = safeName(updates.name);
  if (updates.category) payload.category = updates.category;
  if (updates.alt_text || updates.altText) payload.alt_text = updates.alt_text || updates.altText || '';

  if (!Object.keys(payload).length) return getMedia();

  const media = await findMediaByIdOrUrl(idOrUrl);
  if (!media) throw new Error('Image introuvable.');

  const { error } = await supabase.from('media').update(payload).eq('id', media.id);
  if (error) throw error;

  return getMedia();
}

export async function findMediaIdByUrl(url?: string) {
  if (!url) return null;
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.from('media').select('id').eq('file_url', url).maybeSingle();
  if (error) return null;
  return (data as { id: string } | null)?.id || null;
}
