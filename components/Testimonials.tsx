'use client';

import { Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionReveal } from './SectionReveal';

const testimonials = [
  {
    name: 'Mariana R.',
    role: 'Vacaciones familiares',
    text: 'Nos organizaron todo con mucha claridad y el viaje salió impecable. El trato fue excelente desde el primer mensaje.',
  },
  {
    name: 'Diego L.',
    role: 'Coordinación corporativa',
    text: 'Necesitábamos un traslado de equipo y resolvieron horarios, comunicación y puntualidad sin complicaciones.',
  },
  {
    name: 'Sofía M.',
    role: 'Evento y turismo',
    text: 'Muy buena atención, vehículos cómodos y una sensación de seguridad constante durante todo el recorrido.',
  },
];

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
                <div className="mt-5 flex gap-1 text-[#da0200]" aria-hidden="true">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-700">{item.text}</p>
                <div className="mt-6 border-t border-[#e8e9ed] pt-4">
                  <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.role}</p>
                </div>
              </motion.article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
