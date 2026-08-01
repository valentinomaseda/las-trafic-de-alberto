'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, ArrowRight, Wrench, Route, Headset } from 'lucide-react';
import { SectionReveal } from './SectionReveal';

const BRAND_RED = '#da0200';
const WHATSAPP_URL = 'https://wa.me/5492478505684?text=Hola%20Alberto%2C%20tengo%20una%20consulta%20especial%20sobre%20un%20viaje.';

const GARANTIAS = [
  { 
    titulo: 'Asistencia 24/7', 
    descripcion: 'Soporte constante durante todo el viaje. Nunca viajan solos.',
    icon: Headset 
  },
  { 
    titulo: 'Rutas Complejas', 
    descripcion: '¿Múltiples paradas o destinos combinados? Lo diseñamos a medida.',
    icon: Route 
  },
  { 
    titulo: 'Respaldo Mecánico', 
    descripcion: 'Unidades controladas y red de mecánicos en toda la ruta.',
    icon: Wrench 
  },
];

export default function ConciergeCTA() {
  return (
    <section className="relative w-full py-24 overflow-hidden bg-slate-950">
      
      {/* Resplandor radial de la marca para romper la monotonía del gris/blanco */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px] opacity-15 pointer-events-none"
        style={{ backgroundColor: BRAND_RED }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-2xl">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Columna Izquierda: El mensaje para casos "difíciles" */}
            <SectionReveal className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-300 mb-6">
                <PhoneCall className="h-4 w-4" style={{ color: BRAND_RED }} />
                Atención Directa
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-6">
                ¿Tu viaje tiene requerimientos especiales?
              </h2>
              
              <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
                Entendemos que no todos los viajes encajan en un formulario. Si coordinás un contingente grande, un viaje corporativo o un itinerario atípico, hablá directamente con nosotros.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-xl px-8 text-base font-bold text-white shadow-xl transition-all hover:brightness-110"
                  style={{ 
                    backgroundColor: BRAND_RED,
                    boxShadow: `0 10px 30px -10px ${BRAND_RED}` 
                  }}
                >
                  Hablar con un coordinador
                  <ArrowRight className="h-5 w-5" />
                </motion.a>
              </div>
            </SectionReveal>

            {/* Columna Derecha: Garantías de Servicio (Derribo de objeciones) */}
            <SectionReveal delay={0.2} className="lg:col-span-5 grid gap-6">
              {GARANTIAS.map((garantia, idx) => {
                const Icon = garantia.icon;
                return (
                  <motion.div 
                    key={idx} 
                    whileHover={{ x: 5 }}
                    className="flex gap-4 p-5 rounded-2xl bg-slate-800/30 border border-slate-700/50 transition-colors hover:bg-slate-800/60 hover:border-slate-600"
                  >
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-700">
                      <Icon className="h-6 w-6" style={{ color: BRAND_RED }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-200 mb-1">
                        {garantia.titulo}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {garantia.descripcion}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </SectionReveal>

          </div>
        </div>
      </div>
    </section>
  );
}