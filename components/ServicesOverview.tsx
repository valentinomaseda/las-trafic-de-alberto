'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Wind, ShieldCheck, Luggage } from 'lucide-react';
import Image from 'next/image';

const CARACTERISTICAS = [
  { icon: Users, texto: 'Hasta 19 pasajeros' },
  { icon: Wind, texto: 'Climatización individual' },
  { icon: Luggage, texto: 'Amplio espacio de equipaje' },
  { icon: ShieldCheck, texto: 'Monitoreo satelital 24/7' },
];

export default function ServicesOverview() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Columna de Texto y Beneficios */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-6">
              Una flota pensada para tu confort
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Trabajamos con unidades Mercedes Benz y Renault de última generación. 
              Mantenimiento estricto, choferes profesionales y todo el equipamiento 
              necesario para que el viaje sea parte de las vacaciones.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {CARACTERISTICAS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#e8e9ed] flex items-center justify-center text-[#da0200] shrink-0">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <span className="font-semibold text-slate-700">
                      {item.texto}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Columna Visual - Enfoque en la experiencia */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50"
          >
            {/* Ideal: Una foto real del INTERIOR de la combi de Alberto, con gente cómoda */}
            <Image 
              src="/images/flota-interior.jpg" // Asegurate de tener esta imagen o cambiar la ruta
              alt="Interior de las unidades de Las Trafic de Alberto"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            
            {/* Tarjeta flotante de autoridad visual */}
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-lg flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#e8e9ed] flex items-center justify-center text-[#da0200]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Habilitación CNRT</p>
                <p className="text-xs font-medium text-slate-500">Unidades 100% en regla</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}