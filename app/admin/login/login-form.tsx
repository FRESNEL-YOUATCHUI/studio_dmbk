'use client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LockKeyhole } from 'lucide-react';

export function LoginForm() {
  const router = useRouter(); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(''); const data = new FormData(event.currentTarget);
    const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: data.get('email'), password: data.get('password') }) });
    if (!response.ok) { setError('Adresse mail ou mot de passe incorrect.'); setBusy(false); return; }
    router.replace('/admin'); router.refresh();
  }
  return <main className="min-h-screen bg-[#fff6ca] grid place-items-center px-5"><form onSubmit={submit} className="w-full max-w-md bg-white border border-[#1a132d]/20 p-8 rounded-xl">
    <span className="w-12 h-12 grid place-items-center bg-[#00b4d8] text-white rounded-lg mb-8"><LockKeyhole /></span><p className="text-xs uppercase tracking-[.22em] text-[#eb593b] mb-3">ID Craft</p><h1 className="font-dusan text-4xl text-[#1a132d] mb-8">Administration</h1>
    <label className="admin-label">Adresse mail<input required name="email" type="email" className="admin-input" autoComplete="email" /></label><label className="admin-label">Mot de passe<input required name="password" type="password" className="admin-input" autoComplete="current-password" /></label>
    {error && <p className="text-sm text-red-600 mb-4">{error}</p>}<button disabled={busy} className="w-full bg-[#1a132d] text-white rounded-lg py-3 font-semibold disabled:opacity-50">{busy ? 'Connexion…' : 'Se connecter'}</button>
  </form></main>;
}
