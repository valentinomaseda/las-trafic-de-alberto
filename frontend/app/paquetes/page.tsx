'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  ArrowRight,
  Compass,
  Search,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { supabase, type Package } from '@/lib/supabase';

const BRAND_RED = '#da0200';
const WHATSAPP_NUMBER = '5492478505684';
const PAGE_SIZE = 12;

function buildWhatsappHref(pkg: Package) {
  const tags = pkg.tags || [];
  const mensaje = [
    'Hola Alberto, quiero consultar disponibilidad para un viaje.',
    `Destino: ${pkg.title}`,
    `Idea: ${pkg.subtitle}`,
    tags[0] ? `Días: ${tags[0]}` : null,
    tags[1] ? `Perfil: ${tags[1]}` : null,
    'Me podes pasar opciones y presupuesto? Gracias.',
  ]
    .filter(Boolean)
    .join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

function SkeletonCard() {
  return (
    <div className="rounded-3xl bg-slate-200 animate-pulse overflow-hidden">
      <div className="h-64 bg-slate-300" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-slate-300 rounded-full w-2/3" />
        <div className="h-6 bg-slate-300 rounded-full w-4/5" />
        <div className="h-4 bg-slate-300 rounded-full w-1/2" />
      </div>
    </div>
  );
}

function PackageCard({ pkg, index }: { pkg: Package; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      layout
    >
      <Link
        href={buildWhatsappHref(pkg)}
        target="_blank"
        rel="noreferrer"
        className="group block rounded-3xl overflow-hidden shadow-md shadow-slate-200/60 ring-1 ring-slate-900/5 bg-white hover:shadow-xl hover:shadow-slate-300/60 transition-all duration-500"
      >
        {/* Imagen */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={pkg.image_url}
            alt={`Viaje a ${pkg.title}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Overlay sutil */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

          {/* Tags sobre la imagen */}
          <div className="absolute top-3 right-3 flex flex-wrap gap-1.5 justify-end">
            {(pkg.tags || []).map((tag) => (
              <span
                key={tag}
                className="bg-slate-900/60 backdrop-blur-md border border-white/10 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Contenido */}
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium mb-1.5">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: BRAND_RED }} />
            <span className="truncate">{pkg.subtitle}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#da0200] transition-colors duration-300">
            {pkg.title}
          </h3>

          {/* Detalles opcionales */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 mb-4">
            {pkg.duration_days > 0 && (
              <span>{pkg.duration_days} días / {pkg.duration_nights} noches</span>
            )}
            {pkg.hotel_name && <span>{pkg.hotel_name}</span>}
          </div>

          {/* CTA */}
          <div
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5"
            style={{ color: BRAND_RED }}
          >
            <span className="border-b border-current pb-0.5">Consultar disponibilidad</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
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
        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={`h-10 w-10 rounded-full text-sm font-semibold transition-all ${
            p === page
              ? 'text-white'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
          style={p === page ? { backgroundColor: BRAND_RED } : {}}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPage(page + 1)}
        disabled={page === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function PaquetesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // Reset página al cambiar filtros
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setPage(1); }, [search, activeTag]);

  useEffect(() => {
    supabase
      .from('packages')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        setPackages((data as Package[]) || []);
        setLoading(false);
      });
  }, []);

  // Recopilar todos los tags únicos
  const allTags = useMemo(() => {
    const set = new Set<string>();
    packages.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
    return Array.from(set);
  }, [packages]);

  // Filtrado
  const filtered = useMemo(() => {
    return packages.filter((pkg) => {
      const matchSearch =
        !search ||
        pkg.title.toLowerCase().includes(search.toLowerCase()) ||
        pkg.subtitle.toLowerCase().includes(search.toLowerCase());
      const matchTag = !activeTag || (pkg.tags || []).includes(activeTag);
      return matchSearch && matchTag;
    });
  }, [packages, search, activeTag]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const goToPage = (p: number) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      {/* Hero de la página */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-900">
        {/* Fondo decorativo */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(218,2,0,0.18),_transparent_55%),radial-gradient(circle_at_bottom_right,_rgba(148,163,184,0.10),_transparent_45%)]" />

        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col gap-4 mb-4">
            {/* Breadcrumb */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors group w-fit"
            >
              <ChevronLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              Volver al inicio
            </Link>

            <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest w-fit" style={{ color: BRAND_RED }}>
              <Compass className="w-4 h-4" />
              Galería de Destinos
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            Todos los paquetes
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Explorá nuestra oferta completa de itinerarios. Encontrá el destino ideal y
            consultanos para armar la logística a medida de tu grupo.
          </p>
        </div>
      </section>

      {/* Barra de filtros */}
      <section className="sticky top-16 z-30 bg-white/90 backdrop-blur border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Búsqueda */}
          <div className="relative flex-1 min-w-0 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar destino…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:border-transparent transition"
              style={{ '--tw-ring-color': BRAND_RED } as React.CSSProperties}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Tags filter */}
          {allTags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <SlidersHorizontal className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <button
                onClick={() => setActiveTag(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${!activeTag
                  ? 'text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                style={!activeTag ? { backgroundColor: BRAND_RED } : {}}
              >
                Todos
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${activeTag === tag
                    ? 'text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  style={activeTag === tag ? { backgroundColor: BRAND_RED } : {}}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Contador */}
          {!loading && (
            <span className="ml-auto text-sm text-slate-400 whitespace-nowrap flex-shrink-0">
              {filtered.length} {filtered.length === 1 ? 'paquete' : 'paquetes'}
            </span>
          )}
        </div>
      </section>

      {/* Grid de paquetes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <Compass className="w-8 h-8 text-slate-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-700 mb-2">Sin resultados</h2>
            <p className="text-slate-500 max-w-xs">
              No encontramos paquetes que coincidan con tu búsqueda. Probá con otros filtros.
            </p>
            <button
              onClick={() => { setSearch(''); setActiveTag(null); }}
              className="mt-6 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: BRAND_RED }}
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {paginated.map((pkg, index) => (
                  <PackageCard key={pkg.id} pkg={pkg} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>

            <Pagination page={page} totalPages={totalPages} onPage={goToPage} />
          </>
        )}
      </section>

      {/* CTA final */}
      {!loading && filtered.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="rounded-3xl bg-slate-900 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">¿No encontrás lo que buscás?</h2>
              <p className="text-slate-400">
                Armamos itinerarios a medida para cualquier destino y grupo.
              </p>
            </div>
            <Link
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola Alberto, me gustaría consultar sobre un destino personalizado.')}`}
              target="_blank"
              rel="noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
              style={{ backgroundColor: BRAND_RED }}
            >
              Consultar destino personalizado
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
