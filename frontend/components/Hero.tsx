'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Users2, MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionReveal } from './SectionReveal';

const whatsappHref = 'https://wa.me/5492478505684?text=Hola%20Alberto%2C%20quiero%20cotizar%20un%20viaje%20con%20Las%20Trafic%20De%20Alberto';
const BRAND_RED = '#da0200';

export function Hero() {
  return (
    <section id="top" className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#101010] pt-24 pb-16">
      
      {/* 1. Imagen optimizada (LCP) */}
      <Image
        src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80"
        alt="Vehículo de Las Trafic de Alberto en ruta"
        fill
        priority
        className="object-cover object-center z-0"
        sizes="100vw"
      />
      
      {/* 2. Capas de Contraste y Marca (El Overlay Rojo Corregido) */}
      <div className="absolute inset-0 bg-[#101010]/50 z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,16,16,0.85)_30%,rgba(218,2,0,0.45)_100%)] z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent z-0" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8 items-center">
          
          {/* Columna Izquierda: Propuesta de Valor y Conversión */}
          <SectionReveal className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur-md">
              <ShieldCheck className="h-4 w-4" style={{ color: BRAND_RED }} />
              Viajes grupales seguros y a medida
            </div>

            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
              Organizamos tus vacaciones con la <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">confianza que mereces.</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-slate-200 mb-8">
              Desde escapadas familiares hasta logística corporativa. Flota moderna, choferes expertos y un servicio que empieza con un simple mensaje.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10">
              {/* CTA 1: WhatsApp directo */}
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-xl px-7 text-base font-semibold text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: BRAND_RED, boxShadow: `0 10px 25px -5px ${BRAND_RED}50` }}
              >
                Cotizar viaje
                <ArrowRight className="h-5 w-5" />
              </Link>

              {/* CTA 2: Scroll al formulario inteligente */}
              <a
                href="#cotizador"
                className="inline-flex h-14 items-center justify-center rounded-xl border border-white/30 bg-white/5 px-7 text-base font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
              >
                Cotizá tu viaje a medida
              </a>

              {/* CTA 3: Traslado a shows */}
              <a
                href="#shows"
                className="inline-flex h-14 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-7 text-base font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
              >
                Traslado a shows
              </a>
            </div>

            {/* Micro-beneficios con acentos en rojo */}
            <div className="flex flex-wrap gap-3">
              {['Turismo Nacional', 'Eventos Privados', 'Traslados Corporativos'].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-sm font-medium text-slate-200 backdrop-blur-sm">
                  <CheckCircle2 className="h-3.5 w-3.5" style={{ color: BRAND_RED }} />
                  {item}
                </div>
              ))}
            </div>
          </SectionReveal>

          {/* Columna Derecha: Widget de Autoridad Logística (Diseño claro para máximo contraste) */}
          <SectionReveal delay={0.2} className="relative hidden md:block">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl shadow-black/40"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                  <MapPin className="h-6 w-6" style={{ color: BRAND_RED }} />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900">Logística sin estrés</p>
                </div>
              </div>
              
              <p className="text-sm leading-relaxed text-slate-600 mb-6 pb-6 border-b border-slate-100">
                Nos alejamos del alquiler tradicional. Diseñamos la ruta, coordinamos los tiempos y garantizamos el confort de todo tu grupo.
              </p>

              <div className="grid gap-5">
                <div className="flex gap-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-slate-50">
                    <Users2 className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Grupos Grandes</p>
                    <p className="text-sm text-slate-500">Unidades adaptables a la cantidad de pasajeros.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-slate-50">
                    <ShieldCheck className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Seguridad Total</p>
                    <p className="text-sm text-slate-500">Mantenimiento estricto y choferes profesionales.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </SectionReveal>
          
        </div>
      </div>
    </section>
  );
}