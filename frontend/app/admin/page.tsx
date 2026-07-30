import { redirect } from 'next/navigation';

// Redirigir /admin → /admin/login
export default function AdminPage() {
  redirect('/admin/login');
}
