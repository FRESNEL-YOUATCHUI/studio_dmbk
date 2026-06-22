import { createHash, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'dmbk_admin_session';
export const adminEmail = process.env.ADMIN_EMAIL || 'admin@dmbk.studio';
const adminPassword = process.env.ADMIN_PASSWORD || 'DmbkStudio@2026!';
const secret = process.env.ADMIN_SESSION_SECRET || 'local-dmbk-secret-change-in-production';

export function sessionToken() {
  return createHash('sha256').update(`${adminEmail}:${secret}`).digest('hex');
}

export function validCredentials(email: string, password: string) {
  const expected = Buffer.from(`${adminEmail}\0${adminPassword}`);
  const received = Buffer.from(`${email}\0${password}`);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export function isAdmin() { return cookies().get(ADMIN_COOKIE)?.value === sessionToken(); }

