'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import Image from 'next/image';

// Idealmente esto viene de un CMS o un archivo de constantes
const DESTINOS = [
  {
    id: 1,
    title: 'Cataratas del Iguazú',
    subtitle: 'Aventura y naturaleza',
    image: '/images/destinos/cataratas.jpg', // Reemplaza con rutas reales
    tags: ['7 días', 'Familiar']
  },
  {
    id: 2,
    title: 'Costa Atlántica',
    subtitle: 'Relax frente al mar',
    image: '/images/destinos/mardel.jpg', 
    tags: ['Fin de semana', 'Amigos']
  },
  {
    id: 3,
    title: 'Mendoza',
    subtitle: 'Ruta del Vino y Montaña',
    image: '/images/destinos/mendoza.jpg',
    tags: ['5 días', 'Parejas']
  },
  {
    id: 4,
    title: 'Patagonia Sur',
    subtitle: 'Glaciares y lagos',
    image: '/images/destinos/patagonia.jpg',
    tags: ['10 días', 'Premium']
  }
];

export default function DestinationsCarousel() {
  return (
    <section className="w-full py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Destinos Destacados
            </h2>
            <p className="text-slate-500 mt-2 max-w-2xl text-lg">
              Mirá algunos de los viajes que armamos. Vos elegís el destino, nosotros nos encargamos de que el viaje sea inolvidable.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-[#da0200] font-semibold hover:opacity-80 transition-colors">
            Ver todos los destinos <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 
          Arquitectura Mobile: Scroll Snap Horizontal (Native CSS, 0 JS) 
          Arquitectura Desktop: Grid de 4 columnas
        */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pb-8 md:pb-0 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          
          {DESTINOS.map((destino, index) => (
            <motion.div
              key={destino.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative min-w-[280px] md:min-w-0 h-[380px] rounded-2xl overflow-hidden group snap-center cursor-pointer isolate flex-shrink-0"
            >
              {/* Imagen optimizada de Next.js */}
              <Image 
                src={destino.image}
                alt={`Viaje a ${destino.title}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 z-0"
                sizes="(max-width: 768px) 280px, 25vw"
                priority={index < 2} // Priorizamos LCP en las dos primeras imágenes
              />
              
              {/* Gradiente sutil para legibilidad del texto sin usar dark mode completo */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10" />

              <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                <div className="flex gap-2 mb-3">
                  {destino.tags.map(tag => (
                    <span key={tag} className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{destino.title}</h3>
                <div className="flex items-center gap-2 text-slate-200 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-[#da0200]" />
                  {destino.subtitle}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Utilidad para ocultar la scrollbar nativa en navegadores webkit manteniendo la funcionalidad */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}