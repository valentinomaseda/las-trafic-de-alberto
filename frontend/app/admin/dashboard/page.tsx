'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { Music, Map, LogOut, ExternalLink, Bus, ChevronRight } from 'lucide-react';
import ShowsManager from '@/components/admin/ShowsManager';
import PackagesManager from '@/components/admin/PackagesManager';

type Tab = 'shows' | 'packages';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('shows');
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/admin/login');
      } else {
        setUserEmail(session.user.email || '');
        setLoading(false);
      }
    });
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#da0200]/30 border-t-[#da0200] rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header/Topbar */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + título */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden ring-1 ring-white/10 flex-shrink-0">
                <Image src="/images/logo.jpg" alt="Las Trafic De Alberto" width={36} height={36} className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-sm text-slate-400">
                <span className="font-semibold text-white">Las Trafic De Alberto</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span>Panel Admin</span>
              </div>
              <div className="flex items-center gap-1.5 sm:hidden">
                <Bus className="w-4 h-4 text-[#da0200]" />
                <span className="font-bold text-white text-sm">Panel Admin</span>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-2">
              <span className="hidden md:block text-xs text-slate-500 mr-2">{userEmail}</span>
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-1.5 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl text-xs font-medium transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Ver sitio
              </Link>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-1.5 px-3 py-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl text-xs font-medium transition-colors disabled:opacity-50"
              >
                <LogOut className="w-3.5 h-3.5" />
                {loggingOut ? 'Saliendo...' : 'Cerrar sesión'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Bienvenida */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
          <p className="text-slate-400 mt-1 text-sm">Administrá los shows y paquetes turísticos que aparecen en el sitio.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-slate-800/60 rounded-2xl border border-white/8 w-fit mb-8">
          <button
            onClick={() => setActiveTab('shows')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'shows'
                ? 'bg-[#da0200] text-white shadow-lg shadow-[#da0200]/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Music className="w-4 h-4" />
            Shows
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'packages'
                ? 'bg-[#da0200] text-white shadow-lg shadow-[#da0200]/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Map className="w-4 h-4" />
            Paquetes turísticos
          </button>
        </div>

        {/* Contenido de cada tab */}
        <div className="bg-slate-800/30 border border-white/8 rounded-3xl p-6">
          {activeTab === 'shows' ? <ShowsManager /> : <PackagesManager />}
        </div>
      </main>

      {/* Footer del panel */}
      <footer className="border-t border-white/8 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-slate-600">
            Las Trafic De Alberto · Panel de administración
          </p>
        </div>
      </footer>
    </div>
  );
}
