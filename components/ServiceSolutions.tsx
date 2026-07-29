'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Plane, Map, Music, Briefcase } from 'lucide-react';

const SOLUCIONES = [
  {
    id: 'turismo',
    title: 'Turismo y Vacaciones',
    description: 'Armamos la ruta perfecta para tu grupo. Olvidate de coordinar varios autos, peajes o el cansancio de manejar. El viaje empieza al subir.',
    icon: Map,
    color: 'bg-[#e8e9ed] text-[#da0200]',
  },
  {
    id: 'eventos',
    title: 'Eventos y Casamientos',
    description: 'Disfruten la fiesta sin preocupaciones. Llevamos a tus invitados y los traemos de vuelta seguros a la madrugada.',
    icon: Music,
    color: 'bg-[#e8e9ed] text-[#da0200]',
  },
  {
    id: 'aeropuertos',
    title: 'Traslados a Aeropuertos',
    description: 'Puntualidad absoluta para Ezeiza o Aeroparque. Amplio espacio para valijas y la tranquilidad de llegar a tiempo a tu vuelo.',
    icon: Plane,
    color: 'bg-[#e8e9ed] text-[#da0200]',
  },
  {
    id: 'corporativo',
    title: 'Viajes Corporativos',
    description: 'Traslados para empresas, convenciones o retiros de equipo. Unidades confortables ideales para mantener a tu equipo unido.',
    icon: Briefcase,
    color: 'bg-[#e8e9ed] text-[#da0200]',
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 20 }
  }
};

export default function ServiceSolutions() {
  return (
    <section className="w-full py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16 md:w-2/3">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight"
          >
            Soluciones para cada tipo de viaje
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-slate-600"
          >
            No importa el motivo, adaptamos nuestra logística a la necesidad de tu grupo. 
            Elegí tu escenario y nosotros nos encargamos del camino.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SOLUCIONES.map((solucion) => {
            const Icon = solucion.icon;
            return (
              <motion.div
                key={solucion.id}
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all border border-[#e8e9ed] group flex flex-col h-full"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${solucion.color}`}>
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {solucion.title}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                  {solucion.description}
                </p>
                
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}