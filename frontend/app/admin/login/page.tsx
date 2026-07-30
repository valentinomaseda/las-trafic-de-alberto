'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, Mail, Eye, EyeOff, ArrowLeft, Bus } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');

  // Si ya está logueado, redirigir al dashboard
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/admin/dashboard');
      } else {
        setChecking(false);
      }
    });
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError('Email o contraseña incorrectos. Intentá de nuevo.');
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#da0200]/30 border-t-[#da0200] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(218,2,0,0.18),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(30,41,59,0.8),_transparent_60%)]" />
      <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Volver al sitio */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        Volver al sitio
      </Link>

      {/* Card de login */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-slate-800/60 backdrop-blur-2xl border border-white/8 rounded-3xl p-8 shadow-2xl shadow-black/60">

          {/* Logo & título */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl shadow-[#da0200]/20 ring-2 ring-white/10 mb-5 relative">
              <Image
                src="/images/logo.jpg"
                alt="Las Trafic De Alberto"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Bus className="w-4 h-4 text-[#da0200]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#da0200]">Panel de Administración</span>
            </div>
            <h1 className="text-2xl font-bold text-white text-center">Las Trafic De Alberto</h1>
            <p className="text-slate-400 text-sm mt-1.5 text-center">Ingresá con tus credenciales de administrador</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="admin-email" className="block text-sm font-semibold text-slate-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ejemplo.com"
                  required
                  autoComplete="email"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-700/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#da0200]/60 focus:border-[#da0200]/40 transition-all text-sm"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="admin-password" className="block text-sm font-semibold text-slate-300 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-700/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#da0200]/60 focus:border-[#da0200]/40 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 text-red-400 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Botón */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#da0200] hover:bg-[#b80200] active:bg-[#960000] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#da0200]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 text-sm mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Ingresando...
                </>
              ) : (
                'Ingresar al panel'
              )}
            </button>
          </form>

          {/* Footer del card */}
          <p className="text-center text-xs text-slate-600 mt-6">
            Acceso restringido solo para administradores
          </p>
        </div>
      </div>
    </div>
  );
}
