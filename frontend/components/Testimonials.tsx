'use client';

import { Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionReveal } from './SectionReveal';

// Fechas reales aproximadas de cada reseña (basadas en las fechas de Google)
const testimonials = [
  {
    name: 'JP Moreno',
    badge: 'Local Guide · 31 opiniones · 10 fotos',
    date: new Date('2025-10-01'), // "Hace 9 meses" desde jul-2026
    text: 'Servicio impecable y puntual. Recomendados 100%',
  },
  {
    name: 'Valeria Nadin',
    badge: 'Local Guide · 24 opiniones',
    date: new Date('2022-07-01'), // "Hace 4 años"
    text: 'Muy buena atención como siempre. Y muy buenos servicios.',
  },
  {
    name: 'Cilder Ojeda',
    badge: 'Local Guide · 23 opiniones · 30 fotos',
    date: new Date('2021-07-01'), // "Hace 5 años"
    text: 'Las trafic de Alberto? Excelente, buena onda simpáticos y muy importantes, precios accesibles!!!',
  },
];

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return 'Hoy';
  if (diffDays < 7) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffDays < 30) return `Hace ${diffWeeks} semana${diffWeeks > 1 ? 's' : ''}`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffDays < 365) return `Hace ${diffMonths} mes${diffMonths > 1 ? 'es' : ''}`;

  const diffYears = Math.floor(diffDays / 365);
  return `Hace ${diffYears} año${diffYears > 1 ? 's' : ''}`;
}

export function Testimonials() {
  return (
    <section id="opiniones" className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(218,2,0,0.06),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(148,163,184,0.12),transparent_35%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#da0200]">Opiniones</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Lo que dicen los clientes que ya viajaron con nosotros.
          </h2>
        </SectionReveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <SectionReveal key={item.name} delay={index * 0.08}>
              <motion.article
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="relative h-full rounded-[2rem] border border-[#e8e9ed] bg-white/85 p-6 shadow-sm backdrop-blur"
              >
                <Quote className="h-8 w-8 text-[#da0200]" />
                <div className="mt-5 flex items-center gap-1 text-[#da0200]" aria-hidden="true">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="ml-2 text-xs font-medium text-slate-400">
                    {getRelativeTime(item.date)}
                  </span>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-700">{item.text}</p>
                <div className="mt-6 border-t border-[#e8e9ed] pt-4">
                  <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.badge}</p>
                </div>
              </motion.article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
