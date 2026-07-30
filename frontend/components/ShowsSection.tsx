'use client';

import { useEffect, useState } from 'react';
import { supabase, type Show } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Music, ArrowRight, MessageCircle } from 'lucide-react';
import Image from 'next/image';

const WHATSAPP_NUMBER = '5492478505684';
const BRAND_RED = '#da0200';

function buildWhatsappHref(show: Show): string {
  const date = new Date(show.event_date).toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const mensaje = [
    'Hola Alberto, quiero consultar traslado para un show.',
    `🎵 Show: ${show.title}`,
    `📍 Venue: ${show.venue}`,
    `📅 Fecha: ${date}`,
    '¿Tenés lugares disponibles y cuál sería el precio? Gracias.',
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

function ShowCard({ show, index }: { show: Show; index: number }) {
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
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
              {date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}hs
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
      .then(({ data }) => {
        setShows((data as Show[]) || []);
        setLoading(false);
      });
  }, []);

  // No renderizar la sección si no hay shows
  if (!loading && shows.length === 0) return null;

  return (
    <section id="shows" className="w-full py-20 bg-zinc-950 overflow-hidden relative">
      {/* Decoraciones de fondo — suaves para no competir con el rojo */}
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
        </div>

        {/* Grid de shows */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[380px] rounded-3xl bg-zinc-900 animate-pulse ring-1 ring-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {shows.map((show, index) => (
              <ShowCard key={show.id} show={show} index={index} />
            ))}
          </div>
        )}

        {/* CTA general */}
        {!loading && shows.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 text-center"
          >
            <p className="text-slate-500 text-sm">
              ¿No encontrás tu show?{' '}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola Alberto, quiero consultar traslado para un show que no está en la web.')}`}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-zinc-300 underline underline-offset-2 font-semibold"
              >
                Consultanos por WhatsApp
              </a>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
