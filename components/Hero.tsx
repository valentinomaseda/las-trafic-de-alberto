'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck, Users2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionReveal } from './SectionReveal';

const whatsappHref = 'https://wa.me/5490000000000?text=Hola%20quiero%20cotizar%20un%20viaje%20con%20Las%20Trafic%20De%20Alberto';

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white pt-28 text-white sm:pt-32">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,16,16,0.72),rgba(218,2,0,0.52))]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.12))]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:pb-24">
        <SectionReveal className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-[#da0200]" />
            Traslados grupales seguros y puntuales
          </div>

          <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Viajes grupales con la confianza que tu familia y tu empresa merecen.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
            Flota moderna, choferes profesionales y atención coordinada de principio a fin para que cada traslado sea cómodo, seguro y sin fricciones.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#da0200] px-6 text-sm font-semibold text-white shadow-xl shadow-[#da0200]/30 transition hover:opacity-90"
            >
              Cotizar por WhatsApp
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#flota"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/35 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Conocer la Flota
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-3">
            {[
              'Atención personalizada',
              'Coordinación ágil',
              'Cobertura para grupos',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white backdrop-blur">
                {item}
              </div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.12} className="relative">
          <motion.article
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/12 p-4 shadow-2xl shadow-black/25 backdrop-blur"
          >
            <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#da0200]">Viaje sin preocupaciones</p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight text-slate-900">
                Un servicio pensado para familias, colegios y equipos de trabajo.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Control de tiempos, comunicación clara y experiencia operativa para que cada recorrido mantenga un estándar alto de seguridad y confort.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#e8e9ed] p-4">
                  <Users2 className="h-5 w-5 text-[#da0200]" />
                  <p className="mt-3 text-sm font-semibold text-slate-900">Grupos coordinados</p>
                  <p className="mt-1 text-sm text-slate-600">Puntos de encuentro y salidas ordenadas.</p>
                </div>
                <div className="rounded-2xl bg-[#e8e9ed] p-4">
                  <ShieldCheck className="h-5 w-5 text-[#da0200]" />
                  <p className="mt-3 text-sm font-semibold text-slate-900">Operación confiable</p>
                  <p className="mt-1 text-sm text-slate-600">Un proceso claro desde la consulta hasta el viaje.</p>
                </div>
              </div>
            </div>
          </motion.article>
        </SectionReveal>
      </div>
    </section>
  );
}
