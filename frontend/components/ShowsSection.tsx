'use client';

import { useEffect, useState } from 'react';
import { supabase, type Show } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Music, ArrowRight, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const WHATSAPP_NUMBER = '5492478505684';
const BRAND_RED = '#da0200';
const HOME_LIMIT = 6;

function buildWhatsappHref(show: Show): string {
  const date = new Date(show.event_date).toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const mensaje = [
    'Hola Alberto, quiero consultar traslado para un show.',
    `Show: ${show.title}`,
    `Venue: ${show.venue}`,
    `Fecha: ${date}`,
    'Tenes lugares disponibles y cual seria el precio? Gracias.',
  ].join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

const STATUS_CONFIG = {
  available: {
    label: 'Lugares disponibles',
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-400',
    dot: 'bg-emerald-400',
    border: 'border-emerald-500/30',
  },
  few_seats: {
    label: 'Últimos lugares',
    bg: 'bg-amber-500/20',
    text: 'text-amber-400',
    dot: 'bg-amber-400 animate-pulse',
    border: 'border-amber-500/30',
  },
  sold_out: {
    label: 'Agotado',
    bg: 'bg-slate-700/60',
    text: 'text-slate-500',
    dot: 'bg-slate-500',
    border: 'border-slate-600/30',
  },
};

export function ShowCard({ show, index }: { show: Show; index: number }) {
  const status = STATUS_CONFIG[show.status] ?? STATUS_CONFIG.available;
  const isSoldOut = show.status === 'sold_out';
  const date = new Date(show.event_date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col rounded-3xl overflow-hidden ring-1 ring-white/8 shadow-2xl shadow-black/60 ${isSoldOut ? 'opacity-55' : ''}`}
    >
      {/* Imagen */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={show.image_url}
          alt={show.title}
          fill
          className={`object-cover transition-transform duration-700 ${!isSoldOut ? 'group-hover:scale-105' : ''}`}
          sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-md ${status.bg} ${status.text} ${status.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${status.dot}`} />
            {status.label}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 flex flex-col p-5 bg-zinc-900/80 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-white mb-3 leading-tight">{show.title}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <MapPin className="w-4 h-4 flex-shrink-0 text-zinc-500" />
            <span>{show.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <Calendar className="w-4 h-4 flex-shrink-0 text-zinc-500" />
            <span>
              {date.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              {' · '}
              {date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })}hs
            </span>
          </div>
        </div>

        <div className="mt-auto">
          {isSoldOut ? (
            <div className="w-full py-3 text-center text-slate-500 text-sm font-semibold bg-slate-700/50 rounded-xl">
              Sin disponibilidad
            </div>
          ) : (
            <a
              href={buildWhatsappHref(show)}
              target="_blank"
              rel="noreferrer"
              className="group/btn w-full flex items-center justify-center gap-2 py-3 bg-[#da0200] hover:bg-[#b80200] text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-[#da0200]/20 hover:shadow-[#da0200]/40"
            >
              <MessageCircle className="w-4 h-4" />
              Consultar traslado
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ShowsSection() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('shows')
      .select('*')
      .order('event_date', { ascending: true })
      .limit(HOME_LIMIT)
      .then(({ data }) => {
        setShows((data as Show[]) || []);
        setLoading(false);
      });
  }, []);

  // No renderizar la sección si no hay shows
  if (!loading && shows.length === 0) return null;

  return (
    <section id="shows" className="w-full py-20 bg-zinc-950 relative">
      {/* Decoraciones de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(218,2,0,0.07),_transparent_55%)]" />
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50">
              <Music className="w-4 h-4" />
              Traslados a Shows
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Shows & Recitales
            </h2>
            <p className="text-zinc-400 mt-4 text-lg leading-relaxed">
              Olvidate del estacionamiento y los remises. <strong className="text-white">Te llevamos y te traemos</strong> directo al show con tu grupo.
            </p>
          </div>

          <Link
            href="/shows"
            className="hidden md:inline-flex items-center gap-2 font-semibold text-white/60 hover:text-white transition-colors"
          >
            Ver todos los shows
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile: carrusel horizontal — desborda intencionalmente para mostrar peek de la siguiente card */}
        {loading ? (
          <div className="flex md:hidden overflow-x-auto gap-4 pb-6 -mx-4 sm:-mx-6 px-4 sm:px-6 snap-x snap-mandatory hide-scrollbar">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-[78vw] max-w-[310px] flex-shrink-0 h-[380px] rounded-3xl bg-zinc-900 animate-pulse ring-1 ring-white/5 snap-start" />
            ))}
          </div>
        ) : (
          <div className="flex md:hidden overflow-x-auto gap-4 pb-6 -mx-4 sm:-mx-6 px-4 sm:px-6 snap-x snap-mandatory hide-scrollbar">
            {shows.map((show, index) => (
              <div key={show.id} className="w-[78vw] max-w-[310px] flex-shrink-0 snap-start">
                <ShowCard show={show} index={index} />
              </div>
            ))}
          </div>
        )}

        {/* Desktop: grid hasta 6 */}
        {loading ? (
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[380px] rounded-3xl bg-zinc-900 animate-pulse ring-1 ring-white/5" />
            ))}
          </div>
        ) : (
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5">
            {shows.map((show, index) => (
              <ShowCard key={show.id} show={show} index={index} />
            ))}
          </div>
        )}

        {/* Footer: ver todos + consultar show */}
        {!loading && shows.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <p className="text-slate-500 text-sm">
              ¿No encontras tu show?{' '}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola Alberto, quiero consultar traslado para un show que no esta en la web.')}`}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-zinc-300 underline underline-offset-2 font-semibold"
              >
                Consultanos por WhatsApp
              </a>
            </p>

            <Link
              href="/shows"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Ver todos los shows
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      ` }} />
    </section>
  );
}
