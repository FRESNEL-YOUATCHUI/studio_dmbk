import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, sessionToken, validCredentials } from '@/lib/admin-auth';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!validCredentials(String(email || ''), String(password || ''))) return NextResponse.json({ error: 'Identifiants incorrects.' }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, sessionToken(), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 12 });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, '', { path: '/', maxAge: 0 });
  return response;
}

