import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { deleteMedia, getMedia, renameMedia, searchMedia, uploadMedia } from '@/lib/media-store';

export const dynamic = 'force-dynamic';

function unauthorized() {
  return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
}

function errorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : 'Une erreur est survenue.';
  return NextResponse.json({ error: message }, { status: 500 });
}

export async function GET(request: Request) {
  if (!isAdmin()) return unauthorized();

  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('query') || '';
    const category = url.searchParams.get('category') || 'Tous';
    const page = Number(url.searchParams.get('page') || 1);
    const limit = Number(url.searchParams.get('limit') || 60);
    const result = query ? await searchMedia(query) : await getMedia({ category, page, limit });

    return NextResponse.json(result);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  if (!isAdmin()) return unauthorized();

  try {
    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Image invalide' }, { status: 400 });
    }

    const result = await uploadMedia(
      file,
      String(form.get('category') || 'Médiathèque'),
      String(form.get('alt_text') || form.get('altText') || '')
    );

    return NextResponse.json(result);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request: Request) {
  if (!isAdmin()) return unauthorized();

  try {
    const { id, url, name, category, alt_text, altText } = await request.json();
    const result = await renameMedia(String(id || url), { name, category, alt_text, altText });
    return NextResponse.json(result);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: Request) {
  if (!isAdmin()) return unauthorized();

  try {
    const { id, url } = await request.json();
    const result = await deleteMedia(String(id || url));
    return NextResponse.json(result);
  } catch (error) {
    return errorResponse(error);
  }
}
