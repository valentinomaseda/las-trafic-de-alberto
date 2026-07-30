'use client';

import { CheckCircle2, MapPinHouse, Users2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionReveal } from './SectionReveal';

export function AboutPreview() {
  return (
    <section id="about" className="bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <SectionReveal className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#da0200]">Sobre el servicio</p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            El viaje empieza con vacaciones bien organizadas y se sostiene con una operación seria, prolija y confiable.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Priorizamos la experiencia de viaje de punta a punta: vacaciones, traslados corporativos y turismo, con atención directa y una propuesta flexible para cada grupo.
          </p>

          <div className="mt-8 space-y-4">
            {[
              {
                icon: Users2,
                title: 'Vacaciones como prioridad',
                text: 'La propuesta más relevante para familias y grupos que quieren disfrutar sin complicaciones.',
              },
              {
                icon: MapPinHouse,
                title: 'Cobertura de múltiples destinos',
                text: 'Viajes corporativos, empresariales, eventos y turismo nacional o limítrofe.',
              },
              {
                icon: CheckCircle2,
                title: 'Experiencia ordenada',
                text: 'Coordinación clara, trato cordial y una operación pensada para resolver rápido.',
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="flex gap-4 rounded-3xl border border-[#e8e9ed] bg-[#e8e9ed]/45 p-5 shadow-sm transition hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#da0200] text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.12} className="relative">
          <motion.article
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.25 }}
            className="relative min-h-[26rem] overflow-hidden rounded-[2rem] bg-[#da0200] p-6 text-white shadow-2xl shadow-black/15"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_32%),linear-gradient(145deg,rgba(218,2,0,0.96),rgba(126,4,4,0.95))]" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">Experiencia del viaje</p>
                <h3 className="mt-4 max-w-sm text-2xl font-semibold leading-tight text-white">
                  Una presentación sobria para transmitir confianza desde el primer contacto.
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur">
                  <p className="text-sm text-white/80">Asistencia</p>
                  <p className="mt-1 text-2xl font-semibold text-white">Coordinada</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur">
                  <p className="text-sm text-white/80">Enfoque</p>
                  <p className="mt-1 text-2xl font-semibold text-white">Corporativo</p>
                </div>
              </div>
            </div>
          </motion.article>
        </SectionReveal>
      </div>
    </section>
  );
}
