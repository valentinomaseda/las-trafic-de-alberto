'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PhoneCall, MapPin, Clock3, ArrowUpRight, Mail } from 'lucide-react';

const WHATSAPP_NUMBER = '5492478505684';
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola Alberto, quiero pedir informacion y coordinar un viaje.')}`;

const quickLinks = [
  { label: 'Inicio', href: '#top' },
  { label: 'Nuestra Flota', href: '#flota' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Shows y Espectáculos', href: '/shows' },
  { label: 'Opiniones', href: '#testimonios' },
];

const hours = [
  'Lunes a sábado: 8:30–13:00 y 16:00–21:00',
  'Domingo: Solo WhatsApp',
];

export function Footer() {
  return (
    <footer className="border-t border-slate-800/70 bg-[linear-gradient(180deg,#0f172a_0%,#111827_100%)] text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.9fr]">
          <div>
            <Link href="#top" className="inline-flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/20 ring-1 ring-white/10">
                <Image src="/images/logo.jpg" alt="Las Trafic De Alberto" width={56} height={56} className="h-full w-full object-cover" />
              </span>
              <span>
                <span className="block text-lg font-semibold text-white">Las Trafic de Alberto</span>
                <span className="block text-sm text-slate-300">Viajes grupales, traslados y excursiones</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">
              Organizamos cada viaje con foco en comodidad, seguridad y coordinacion directa. Cotizanos por WhatsApp y te respondemos a la brevedad.
            </p>

            <Link
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#da0200] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#da0200]/20 transition hover:opacity-90"
            >
              <PhoneCall className="h-4 w-4" />
              Escribinos por WhatsApp
            </Link>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#da0200]">Accesos rapidos</p>
            <div className="mt-5 grid gap-3 text-sm font-medium">
              {quickLinks.map((item) => (
                <Link key={item.label} href={item.href} className="inline-flex items-center gap-2 text-slate-300 transition hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#da0200]">Contacto y horarios</p>
            <div className="mt-5 space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#da0200]" />
                <span>Frascheri 563, B2740 Arrecifes, Provincia de Buenos Aires</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#da0200]" />
                <a
                  href="mailto:Albertoramosturismo@hotmail.com"
                  className="transition hover:text-white break-all"
                >
                  Albertoramosturismo@hotmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#da0200]" />
                <div className="space-y-1">
                  {hours.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Las Trafic de Alberto. Todos los derechos reservados.</p>
          <p>Hecho para convertir consultas en viajes.</p>
        </div>
      </div>
    </footer>
  );
}