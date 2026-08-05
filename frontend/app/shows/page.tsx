'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Music,
  Search,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { supabase, type Show } from '@/lib/supabase';
import { ShowCard } from '@/components/ShowsSection';

const WHATSAPP_NUMBER = '5492478504811';
const BRAND_RED = '#da0200';
const PAGE_SIZE = 9;

const STATUS_LABELS: Record<string, string> = {
  available: 'Disponibles',
  few_seats: 'Ultimos lugares',
  sold_out: 'Agotados',
};

function SkeletonCard() {
  return (
    <div className="rounded-3xl bg-zinc-900 animate-pulse ring-1 ring-white/5">
      <div className="h-52 bg-zinc-800 rounded-t-3xl" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-zinc-700 rounded-full w-3/4" />
        <div className="h-3 bg-zinc-700 rounded-full w-1/2" />
        <div className="h-3 bg-zinc-700 rounded-full w-2/3" />
      </div>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  onPage,
}: {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={`h-10 w-10 rounded-full text-sm font-semibold transition-all ${p === page
              ? 'text-white'
              : 'text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
          style={p === page ? { backgroundColor: BRAND_RED } : {}}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPage(page + 1)}
        disabled={page === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function ShowsPage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeStatus, setActiveStatus] = useState<string | null>(null);
  const [page, setPage] = useState(1);

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

  // Reset página al cambiar filtros
  useEffect(() => { setPage(1); }, [search, activeStatus]);

  const filtered = useMemo(() => {
    return shows.filter((s) => {
      const matchSearch =
        !search ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.venue.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !activeStatus || s.status === activeStatus;
      return matchSearch && matchStatus;
    });
  }, [shows, search, activeStatus]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const goToPage = (p: number) => { setPage(p); scrollToTop(); };

  return (
    <main className="min-h-screen bg-zinc-950 font-sans text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(218,2,0,0.15),_transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col gap-4 mb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors group w-fit"
            >
              <ChevronLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              Volver al inicio
            </Link>

            <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest w-fit text-white/40">
              <Music className="w-4 h-4" />
              Traslados a Shows
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            Shows & Recitales
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
            Olvidate del estacionamiento y los remises. Te llevamos y te traemos directo al show con tu grupo.
          </p>
        </div>
      </section>

      {/* Filtros sticky */}
      <section className="sticky top-16 z-30 bg-zinc-900/90 backdrop-blur border-b border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Búsqueda */}
          <div className="relative flex-1 min-w-0 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar show o evento"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-white/10 bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:border-transparent transition"
              style={{ '--tw-ring-color': BRAND_RED } as React.CSSProperties}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filtro por estado */}
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            <button
              onClick={() => setActiveStatus(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${!activeStatus ? 'text-white shadow-sm' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              style={!activeStatus ? { backgroundColor: BRAND_RED } : {}}
            >
              Todos
            </button>
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveStatus(activeStatus === key ? null : key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${activeStatus === key ? 'text-white shadow-sm' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                style={activeStatus === key ? { backgroundColor: BRAND_RED } : {}}
              >
                {label}
              </button>
            ))}
          </div>

          {!loading && (
            <span className="ml-auto text-sm text-zinc-500 whitespace-nowrap flex-shrink-0">
              {filtered.length} {filtered.length === 1 ? 'show' : 'shows'}
            </span>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-4">
              <Music className="w-8 h-8 text-zinc-600" />
            </div>
            <h2 className="text-xl font-bold text-zinc-300 mb-2">Sin resultados</h2>
            <p className="text-zinc-500 max-w-xs">No encontramos shows que coincidan. Proba con otros filtros.</p>
            <button
              onClick={() => { setSearch(''); setActiveStatus(null); }}
              className="mt-6 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: BRAND_RED }}
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <>
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {paginated.map((show, index) => (
                  <motion.div
                    key={show.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    layout
                  >
                    <ShowCard show={show} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <Pagination page={page} totalPages={totalPages} onPage={goToPage} />
          </>
        )}
      </section>

      {/* CTA */}
      {!loading && filtered.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="rounded-3xl bg-zinc-900 border border-white/10 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">¿No encontras tu show?</h2>
              <p className="text-zinc-400">Consultanos y lo coordinamos por fuera del calendario.</p>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola Alberto, quiero consultar traslado para un show que no esta en la web.')}`}
              target="_blank"
              rel="noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
              style={{ backgroundColor: BRAND_RED }}
            >
              Consultar por WhatsApp
            </a>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
