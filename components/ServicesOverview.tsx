'use client';

import { BriefcaseBusiness, BusFront, MapPinned, PartyPopper, PlaneTakeoff, Users2, WandSparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionReveal } from './SectionReveal';

const services = [
  {
    icon: PlaneTakeoff,
    title: 'Organizamos tus vacaciones',
    text: 'La opción más importante: planificamos traslados vacacionales para que disfrutes el viaje desde el primer kilómetro.',
    featured: true,
  },
  {
    icon: BriefcaseBusiness,
    title: 'Viajes corporativos',
    text: 'Soluciones puntuales y prolijas para reuniones, visitas comerciales y agendas ejecutivas.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Viajes empresariales',
    text: 'Traslados organizados para equipos, delegaciones y operaciones internas de la empresa.',
  },
  {
    icon: Users2,
    title: 'Traslado de personal',
    text: 'Movilidad confiable para turnos, ingresos coordinados y salidas programadas.',
  },
  {
    icon: BusFront,
    title: 'Alquiler de camionetas',
    text: 'Opciones versátiles para grupos reducidos, recorridos especiales y trayectos a medida.',
  },
  {
    icon: PartyPopper,
    title: 'Shows y eventos',
    text: 'Cobertura logística para fechas especiales, espectáculos, encuentros sociales y traslados de invitados.',
  },
  {
    icon: WandSparkles,
    title: 'Turismo nacional y países limítrofes',
    text: 'Recorridos por todo el país y destinos cercanos con una coordinación pensada para grupos.',
  },
  {
    icon: MapPinned,
    title: 'Traslados a todo destino',
    text: 'Armamos el recorrido según la necesidad del grupo, el punto de salida y la llegada final.',
  },
];

export function ServicesOverview() {
  return (
    <section id="servicios" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#da0200]">Servicios</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Opciones de viaje pensadas para resolver desde vacaciones hasta operaciones empresariales.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Presentamos las posibilidades de uso de forma clara, con las vacaciones como propuesta principal y el resto de servicios como alternativas concretas para distintos tipos de traslado.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map(({ icon: Icon, title, text, featured }) => (
            <SectionReveal key={title}>
              <motion.article
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={`h-full rounded-[2rem] border p-6 shadow-sm transition ${
                  featured
                    ? 'border-[#da0200] bg-[#da0200] text-white shadow-black/10'
                    : 'border-[#e8e9ed] bg-[#e8e9ed]/35 text-slate-900'
                }`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${featured ? 'bg-white/15 text-white' : 'bg-[#da0200] text-white'}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold leading-tight">{title}</h3>
                <p className={`mt-3 text-sm leading-6 ${featured ? 'text-white/90' : 'text-slate-600'}`}>{text}</p>
              </motion.article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
