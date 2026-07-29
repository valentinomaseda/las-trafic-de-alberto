'use client';

import Link from 'next/link';
import { Menu, PhoneCall } from 'lucide-react';
import { useScrolled } from '../hooks/useScrolled';

const whatsappHref = 'https://wa.me/5490000000000?text=Hola%20quiero%20cotizar%20un%20viaje%20con%20Las%20Trafic%20De%20Alberto';

export function Navbar() {
  const scrolled = useScrolled();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-[#e8e9ed] bg-white/95 shadow-sm backdrop-blur'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="#top" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#da0200] text-sm font-semibold text-white shadow-lg shadow-[#da0200]/20">
            LT
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-[0.22em] text-[#da0200] uppercase">
              Las Trafic
            </span>
            <span className="block text-base font-semibold text-slate-900">De Alberto</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="#about" className="text-sm font-medium text-slate-600 transition hover:text-[#da0200]">
            Nosotros
          </Link>
          <Link href="#flota" className="text-sm font-medium text-slate-600 transition hover:text-[#da0200]">
            Flota
          </Link>
          <Link href="#servicios" className="text-sm font-medium text-slate-600 transition hover:text-[#da0200]">
            Servicios
          </Link>
          <Link href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#da0200] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#da0200]/25 transition hover:opacity-90">
            <PhoneCall className="h-4 w-4" />
            Cotizar
          </Link>
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e8e9ed] bg-white text-slate-700 shadow-sm transition hover:border-[#da0200] md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>
    </header>
  );
}
