'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, MapPinned } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SectionReveal } from './SectionReveal';

const whatsappBase = 'https://wa.me/5490000000000';
const placeImage = '/images/mardel.jpg';

const destinations = [
  {
    name: 'Córdoba',
    description: 'Escapadas, circuitos serranos y viajes grupales con salida coordinada.',
  },
  {
    name: 'Mendoza',
    description: 'Turismo, bodegas y recorridos para grupos con planificación simple.',
  },
  {
    name: 'Buenos Aires',
    description: 'Shows, eventos, turismo urbano y traslados ejecutivos de alta demanda.',
  },
  {
    name: 'Uruguay',
    description: 'Destinos limítrofes para vacaciones y escapadas con asistencia personalizada.',
  },
];

export function DestinationsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % destinations.length);
    }, 5500);

    return () => window.clearInterval(interval);
  }, []);

  const current = destinations[activeIndex];

  const goToPrevious = () => setActiveIndex((currentIndex) => (currentIndex - 1 + destinations.length) % destinations.length);
  const goToNext = () => setActiveIndex((currentIndex) => (currentIndex + 1) % destinations.length);

  const destinationMessage = encodeURIComponent(`Hola, quiero consultar un viaje a ${current.name} con Las Trafic De Alberto.`);

  return (
    <section id="destinos" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#da0200]">Destinos</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Un carrusel de destinos para inspirar tu próximo viaje.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Cada tarjeta representa un destino distinto y lleva directo a WhatsApp con un mensaje preparado para resolver la consulta más rápido.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionReveal className="flex items-center">
            <div className="w-full rounded-[2.5rem] border border-[#e8e9ed] bg-[#e8e9ed]/35 p-4 shadow-sm">
              <div className="relative min-h-[30rem] overflow-hidden rounded-[2rem]">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${placeImage})` }}
                    aria-label={current.name}
                  />
                </motion.div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.58))]" />

                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                    <MapPinned className="h-4 w-4 text-[#da0200]" />
                    Destino destacado
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold">{current.name}</h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-white/90">{current.description}</p>
                  <Link
                    href={`${whatsappBase}?text=${destinationMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#da0200] px-5 text-sm font-semibold text-white shadow-lg shadow-[#da0200]/25 transition hover:opacity-90"
                  >
                    Más info
                  </Link>
                </div>

                <button
                  type="button"
                  aria-label="Destino anterior"
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Destino siguiente"
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1} className="flex items-center">
            <div className="w-full">
              <div className="grid gap-4 sm:grid-cols-2">
                {destinations.map((destination, index) => {
                  const message = encodeURIComponent(`Hola, quiero más info sobre el viaje a ${destination.name} con Las Trafic De Alberto.`);

                  return (
                    <motion.article
                      key={destination.name}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className={`overflow-hidden rounded-[1.75rem] border bg-white shadow-sm transition ${index === activeIndex ? 'border-[#da0200]' : 'border-[#e8e9ed]'}`}
                    >
                      <div className="relative h-44 overflow-hidden">
                        <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${placeImage})` }} aria-label={destination.name} />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.58))]" />
                        <div className="absolute inset-0 flex items-end p-4 text-white">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">Destino</p>
                            <h3 className="mt-2 text-xl font-semibold">{destination.name}</h3>
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="mt-2 text-sm leading-6 text-slate-600">{destination.description}</p>
                        <Link
                          href={`${whatsappBase}?text=${message}`}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[#da0200] px-4 text-sm font-semibold text-white transition hover:opacity-90"
                        >
                          Más info
                        </Link>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
