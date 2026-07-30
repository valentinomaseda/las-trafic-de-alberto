'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, PlaneTakeoff, ShieldCheck, Map, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { SectionReveal } from './SectionReveal';

const travelerImages = [
  {
    title: 'Viajes Familiares',
    subtitle: 'La familia unida, sin dividir el grupo en varios autos ni discutir por la ruta.',
    src: '/images/gente.jpg', // Recordá reemplazar con fotos reales
  },
  {
    title: 'Escapadas con Amigos',
    subtitle: 'Nos encargamos del volante para que el grupo empiece a disfrutar desde que sube.',
    src: '/images/gente2.jpg',
  },
  {
    title: 'Grupos y Delegaciones',
    subtitle: 'Logística milimétrica para que grandes grupos lleguen a tiempo y descansados.',
    src: '/images/gente3.jpg',
  },
];

const BRAND_RED = '#da0200';

export function VacationSpotlight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // Para pausar el slider
  const [direction, setDirection] = useState(0); // Para saber hacia dónde animar

  // Auto-play inteligente: se pausa si el usuario interactúa
  useEffect(() => {
    if (isHovered) return;
    
    const interval = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % travelerImages.length);
    }, 6000); // 6 segundos es más respetuoso con el tiempo de lectura

    return () => window.clearInterval(interval);
  }, [isHovered]);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((current) => (current + newDirection + travelerImages.length) % travelerImages.length);
  }, []);

  // Variantes de Framer Motion para un slide físico direccional
  const variants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 1.05,
      transition: { duration: 0.5, ease: 'easeOut' }
    })
  };

  return (
    <section id="vacaciones" className="bg-slate-50 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 items-center">
        
        {/* Columna Izquierda: Copy Editorial */}
        <SectionReveal className="flex flex-col justify-center">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#da0200]/20 bg-[#da0200]/5 px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#da0200]">
              <PlaneTakeoff className="h-4 w-4" />
              Servicio Integral
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl leading-[1.15] mb-6">
              Tus vacaciones empiezan antes de llegar al destino.
            </h2>

            <p className="text-lg leading-relaxed text-slate-600 mb-8">
              No somos solo un transporte. Somos los arquitectos de tu ruta. Nos contás tu idea y organizamos los horarios, las paradas estratégicas y el confort total de tu grupo para que nadie tenga que estresarse al volante.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 mb-8">
              {[
                {
                  icon: Map,
                  title: 'Rutas Optimizadas',
                  text: 'Evitamos tráfico y elegimos los mejores caminos.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Viaje Privado',
                  text: 'El vehículo es 100% exclusivo para tu grupo.',
                },
              ].map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#da0200]">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{text}</p>
                </article>
              ))}
            </div>
            
            <button className="group inline-flex items-center gap-2 font-semibold text-[#da0200] hover:text-red-700 transition-colors">
              Conocé cómo trabajamos 
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </SectionReveal>

        {/* Columna Derecha: Slider Interactivo Elegante */}
        <SectionReveal delay={0.2} className="relative w-full">
          <div 
            className="relative h-[500px] sm:h-[600px] w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-slate-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                {/* Removido el priority={index === 0} para proteger el LCP del Hero */}
                <Image 
                  src={travelerImages[activeIndex].src} 
                  alt={travelerImages[activeIndex].title} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 1024px) 100vw, 50vw" 
                />
                
                {/* Gradiente limpio para proteger la lectura del texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />

                {/* Texto único y con jerarquía */}
                <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12 text-white">
                  <p className="text-sm font-bold uppercase tracking-widest text-[#da0200] mb-3">
                    {travelerImages[activeIndex].title}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-semibold leading-tight max-w-md">
                    {travelerImages[activeIndex].subtitle}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controles de Navegación (Refinados) */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:opacity-100 z-10 pointer-events-none">
              <button
                aria-label="Anterior"
                onClick={() => paginate(-1)}
                className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-white hover:text-slate-900 hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                aria-label="Siguiente"
                onClick={() => paginate(1)}
                className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-white hover:text-slate-900 hover:scale-105 active:scale-95"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Paginación (Pills) */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 z-10">
              {travelerImages.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Ir a imagen ${index + 1}`}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-8 bg-[#da0200]' : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>

          </div>
        </SectionReveal>
      </div>
    </section>
  );
}