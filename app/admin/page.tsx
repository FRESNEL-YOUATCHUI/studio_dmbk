import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin-auth';
import { AdminDashboard } from './admin-dashboard';
export const dynamic = 'force-dynamic';
export default function AdminPage() { if (!isAdmin()) redirect('/admin/login'); return <AdminDashboard />; }
