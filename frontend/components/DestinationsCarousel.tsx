'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Compass } from 'lucide-react';
import Image from 'next/image';
import { supabase, type Package } from '@/lib/supabase';

const BRAND_RED = '#da0200';
const WHATSAPP_NUMBER = '5492478505684';

function buildWhatsappHref(pkg: Package) {
  const tags = pkg.tags || [];
  const mensaje = [
    'Hola Alberto, quiero consultar disponibilidad para un viaje.',
    `Destino: ${pkg.title}`,
    `Idea: ${pkg.subtitle}`,
    tags[0] ? `Días: ${tags[0]}` : null,
    tags[1] ? `Perfil: ${tags[1]}` : null,
    'Me podes pasar opciones y presupuesto? Gracias.',
  ].filter(Boolean).join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

// Skeleton de carga que mantiene el mismo layout que las cards
function CardSkeleton() {
  return (
    <div className="w-[85vw] max-w-[320px] md:w-auto h-[420px] rounded-3xl bg-slate-200 animate-pulse flex-shrink-0 snap-center" />
  );
}

export default function DestinationsCarousel() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('packages')
      .select('id, title, subtitle, image_url, tags')
      .eq('is_active', true)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        setPackages((data as Package[]) || []);
        setLoading(false);
      });
  }, []);

  return (
    <section id="destinos" className="w-full py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabecera Refinada */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest" style={{ color: BRAND_RED }}>
              <Compass className="w-4 h-4" />
              Inspiración de Ruta
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Destinos Destacados
            </h2>
            <p className="text-slate-600 mt-4 text-lg leading-relaxed">
              Explorá algunos de los itinerarios que hemos desarrollado. Contanos tu idea y <strong className="font-semibold text-slate-900">diseñaremos la logística a medida</strong> para tu grupo.
            </p>
          </div>

          <button className="group hidden md:flex items-center gap-2 font-semibold transition-all hover:opacity-80" style={{ color: BRAND_RED }}>
            Ver galería completa
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Contenedor de tarjetas */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 pb-8 md:pb-0 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">

          {loading
            ? [1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)
            : packages.length === 0
              ? (
                <div className="col-span-4 text-center py-20 text-slate-400">
                  <p className="text-lg">No hay destinos disponibles por el momento.</p>
                </div>
              )
              : packages.map((pkg, index) => (
                <Link
                  key={pkg.id}
                  href={buildWhatsappHref(pkg)}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative w-[85vw] max-w-[320px] md:w-auto h-[420px] rounded-3xl overflow-hidden snap-center cursor-pointer isolate flex-shrink-0 shadow-lg shadow-slate-200/50 ring-1 ring-slate-900/5 block"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative h-full"
                  >
                    <Image
                      src={pkg.image_url}
                      alt={`Viaje a ${pkg.title}`}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110 z-0"
                      sizes="(max-width: 768px) 85vw, 25vw"
                      priority={index < 2}
                    />

                    {/* Overlay gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent z-10 opacity-80 transition-opacity duration-500 group-hover:opacity-90" />

                    <div className="absolute inset-0 p-6 flex flex-col justify-between z-20">
                      {/* Tags */}
                      <div className="flex gap-2 justify-end flex-wrap">
                        {(pkg.tags || []).map((tag) => (
                          <span key={tag} className="bg-slate-900/60 backdrop-blur-md border border-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Contenido inferior */}
                      <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                        <div className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-2">
                          <MapPin className="w-4 h-4" style={{ color: BRAND_RED }} />
                          {pkg.subtitle}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">{pkg.title}</h3>

                        <div className="inline-flex items-center gap-2 text-sm font-semibold opacity-80 transition-all duration-500 hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 text-white">
                          <span className="border-b border-[#da0200] pb-0.5">Consultar disponibilidad</span>
                          <ArrowRight className="w-4 h-4 text-[#da0200] transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))
          }
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      ` }} />
    </section>
  );
}