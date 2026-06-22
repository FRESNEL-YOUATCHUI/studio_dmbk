import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { getSiteContent, saveSiteContent } from '@/lib/content-store';

export const dynamic = 'force-dynamic';
export async function GET() { return isAdmin() ? NextResponse.json(await getSiteContent()) : NextResponse.json({ error: 'Non autorisé' }, { status: 401 }); }
export async function PUT(request: Request) {
  if (!isAdmin()) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  const body = await request.json();
  if (!Array.isArray(body.projects) || !Array.isArray(body.services)) return NextResponse.json({ error: 'Contenu invalide' }, { status: 400 });
  return NextResponse.json(await saveSiteContent(body));
}
