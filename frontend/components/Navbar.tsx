'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, PhoneCall, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useScrolled } from '../hooks/useScrolled';

const whatsappHref = 'https://wa.me/5492478504811?text=Hola%20quiero%20cotizar%20un%20viaje%20con%20Las%20Trafic%20De%20Alberto';

const navItems = [
  { label: 'Inicio', href: '/#top' },
  { label: 'Destinos', href: '/#destinos' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Shows', href: '/#shows' },
  { label: 'Vacaciones', href: '/#vacaciones' },
  { label: 'Soluciones', href: '/#soluciones' },
  { label: 'Nuestra flota', href: '/#flota' },
  { label: 'Ubicacion', href: '/#ubicacion' },
  { label: 'Opiniones', href: '/#opiniones' },
];

export function Navbar() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const topTextClass = scrolled ? 'text-slate-600 hover:text-[#da0200]' : 'text-white/90 hover:text-white';
  const topButtonClass = scrolled
    ? 'inline-flex items-center gap-2 rounded-full bg-[#da0200] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#da0200]/25 transition hover:opacity-90'
    : 'inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 backdrop-blur transition hover:bg-white/15';
  const menuButtonClass = scrolled
    ? 'inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e8e9ed] bg-white text-slate-700 shadow-sm transition hover:border-[#da0200] md:hidden'
    : 'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-sm backdrop-blur transition hover:bg-white/15 md:hidden';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled
        ? 'border-[#e8e9ed] bg-white/95 shadow-sm backdrop-blur'
        : 'border-transparent bg-transparent'
        }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-[#da0200]/10 ring-1 ring-[#e8e9ed]">
            <Image src="/images/logo.jpg" alt="Las Trafic De Alberto" width={55} height={55} className="h-full w-full object-cover" priority />
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={`text-sm font-medium transition ${topTextClass}`}>
              {item.label}
            </Link>
          ))}
          <Link href={whatsappHref} target="_blank" rel="noreferrer" className={topButtonClass}>
            <PhoneCall className="h-4 w-4" />
            Cotizar
          </Link>
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((current) => !current)}
          className={menuButtonClass}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className={`overflow-hidden border-t ${scrolled ? 'border-[#e8e9ed] bg-white/98' : 'border-white/10 bg-slate-950/95'} md:hidden`}
          >
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="grid gap-2 rounded-[1.75rem] border border-[#e8e9ed] bg-white p-4 shadow-lg shadow-black/5"
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: index * 0.03 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-[#e8e9ed] hover:text-[#da0200]"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <Link
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#da0200] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#da0200]/25 transition hover:opacity-90"
                >
                  <PhoneCall className="h-4 w-4" />
                  Cotizar por WhatsApp
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
