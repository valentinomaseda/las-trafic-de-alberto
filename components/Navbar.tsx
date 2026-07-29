'use client';

import Link from 'next/link';
import { Menu, PhoneCall } from 'lucide-react';
import { useScrolled } from '../hooks/useScrolled';

export function Navbar() {
  const scrolled = useScrolled();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-slate-200/80 bg-white/95 shadow-sm backdrop-blur'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="#top" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white shadow-lg shadow-slate-900/20">
            LT
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-[0.22em] text-slate-500 uppercase">
              Las Trafic
            </span>
            <span className="block text-base font-semibold text-slate-900">De Alberto</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="#about" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
            Nosotros
          </Link>
          <Link href="#flota" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
            Flota
          </Link>
          <Link href="#servicios" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
            Servicios
          </Link>
          <Link
            href="#cotizar"
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/25 transition hover:bg-sky-700 hover:shadow-sky-700/30"
          >
            <PhoneCall className="h-4 w-4" />
            Cotizar
          </Link>
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>
    </header>
  );
}
