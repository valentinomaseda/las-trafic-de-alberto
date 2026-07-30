'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Users, Wind, ShieldCheck, Luggage, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const CARACTERISTICAS = [
  { icon: Users, title: 'Capacidad Adaptable', texto: 'Hasta 19 pasajeros viajando con total comodidad.' },
  { icon: Wind, title: 'Climatización Individual', texto: 'Aire acondicionado y calefacción regulable por butaca.' },
  { icon: Luggage, title: 'Bodega de Gran Capacidad', texto: 'Espacio de sobra para valijas sin sacrificar el habitáculo.' },
  { icon: ShieldCheck, title: 'Monitoreo 24/7', texto: 'Seguimiento satelital en tiempo real durante toda la ruta.' },
];

const BRAND_RED = '#da0200';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } }
};

export default function ServicesOverview() {
  return (
    <section id="flota" className="w-full py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* Columna Izquierda: Copy Editorial y Lista de Beneficios */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#da0200]/20 bg-[#da0200]/5 px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#da0200]">
              <CheckCircle2 className="h-4 w-4" />
              Nuestra Flota
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6 leading-[1.15]">
              Diseñada para que el viaje sea parte de tus vacaciones.
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
              Operamos con unidades Mercedes Benz y Renault de última generación. 
              El mantenimiento estricto y el equipamiento premium aseguran que tu grupo 
              llegue descansado y a tiempo.
            </p>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              {CARACTERISTICAS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    className="group flex items-start gap-5 p-3 -ml-3 rounded-2xl hover:bg-slate-50 transition-colors duration-300"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#e8e9ed] flex items-center justify-center text-[#da0200] shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#da0200] group-hover:text-white shadow-sm border border-slate-100">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-600 leading-relaxed text-sm">
                        {item.texto}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Columna Visual: Composición de Doble Exposición */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative order-1 lg:order-2 h-[500px] sm:h-[600px] w-full"
          >
            {/* Imagen Principal (Interior / Confort) */}
            <div className="absolute top-0 right-0 w-4/5 h-[85%] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/60 z-0">
              <Image 
                src="/images/flota-interior.jpg" // SUGERENCIA: Mostrar butacas cómodas
                alt="Interior premium de las unidades"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
              <div className="absolute inset-0 bg-slate-900/10" /> {/* Overlay sutil */}
            </div>

            {/* Imagen Secundaria (Exterior / Confianza) superpuesta */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute bottom-0 left-0 w-3/5 h-[55%] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white z-10"
            >
              <Image 
                src="/images/flota-exterior.jpg" // SUGERENCIA: Mostrar la van desde afuera, impecable
                alt="Exterior moderno de la flota"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 60vw, 30vw"
              />
            </motion.div>
            
            {/* Sello de Autoridad Visual (CNRT) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
              className="absolute top-10 -left-6 sm:left-0 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 z-20"
            >
              <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#da0200] to-red-600 text-white shadow-inner">
                <ShieldCheck className="w-7 h-7" />
                {/* Ping animation para llamar la atención */}
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
                </span>
              </div>
              <div className="pr-2">
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Habilitación</p>
                <p className="text-base font-bold text-slate-900 leading-none">Nacional CNRT</p>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}