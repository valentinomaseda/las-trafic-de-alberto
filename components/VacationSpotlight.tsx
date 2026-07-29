'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, PlaneTakeoff, ShieldCheck, Users2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SectionReveal } from './SectionReveal';

const travelerImages = [
  {
    title: 'Viaje familiar',
    subtitle: 'Vacaciones organizadas con todo el grupo en un solo vehículo.',
    src: '/images/gente.jpg',
  },
  {
    title: 'Escapada con amigos',
    subtitle: 'Salida cómoda, ordenada y pensada para disfrutar desde el inicio.',
    src: '/images/gente2.jpg',
  },
  {
    title: 'Experiencia de grupo',
    subtitle: 'Traslado coordinado con foco en confort y puntualidad.',
    src: '/images/gente3.jpg',
  },
];

export function VacationSpotlight() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % travelerImages.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const goToPrevious = () => setActiveIndex((currentIndex) => (currentIndex - 1 + travelerImages.length) % travelerImages.length);
  const goToNext = () => setActiveIndex((currentIndex) => (currentIndex + 1) % travelerImages.length);

  return (
    <section id="vacaciones" className="bg-white py-6 sm:py-0">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-0 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <SectionReveal className="flex items-center py-16 lg:py-24">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e8e9ed] bg-[#e8e9ed]/45 px-4 py-2 text-sm font-medium text-slate-700">
              <PlaneTakeoff className="h-4 w-4 text-[#da0200]" />
              Organizamos tus vacaciones
            </div>

            <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              La propuesta principal de la empresa, en una pantalla completa.
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
              Planificamos tus vacaciones para que el viaje arranque bien desde el primer mensaje. Coordinamos salidas, horarios y el traslado del grupo con atención directa por WhatsApp y una operación que prioriza comodidad, orden y confianza.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Users2,
                  title: 'Viajes en grupo',
                  text: 'Pensado para familias, amigos y delegaciones.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Coordinación segura',
                  text: 'Todo alineado para que no tengas que improvisar.',
                },
              ].map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-[1.75rem] border border-[#e8e9ed] bg-[#e8e9ed]/35 p-5 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#da0200] text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1} className="flex items-center py-10 lg:py-24">
          <div className="relative w-full overflow-hidden rounded-[2.5rem] bg-slate-900 p-4 shadow-2xl shadow-black/20">
            <div className="relative min-h-[32rem] overflow-hidden rounded-[2rem]">
              {travelerImages.map((src, index) => (
                <motion.div
                  key={src.title}
                  initial={false}
                  animate={{ opacity: index === activeIndex ? 1 : 0, scale: index === activeIndex ? 1 : 1.06 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <Image src={src.src} alt={src.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority={index === 0} />
                  <div className="flex h-full w-full items-end bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(17,24,39,0.65))] p-8">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">{src.title}</p>
                      <p className="mt-3 max-w-md text-2xl font-semibold leading-tight text-white">{src.subtitle}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.55))]" />

              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">Viajeros felices</p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">
                  Una imagen que acompaña el mensaje de vacaciones y experiencias compartidas.
                </h3>
              </div>

              <button
                type="button"
                aria-label="Imagen anterior"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Imagen siguiente"
                onClick={goToNext}
                className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
                {travelerImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Ir a imagen ${index + 1}`}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all ${index === activeIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/50'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
