'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Plane, Map, Music, Briefcase, GraduationCap, CalendarClock, Package, ArrowRight, CheckCircle2 } from 'lucide-react';

const BRAND_RED = '#da0200';

const SOLUCIONES = [
  {
    id: 'turismo',
    title: 'Turismo y Vacaciones',
    description: 'Armamos la ruta perfecta para tu grupo. Olvidate de coordinar varios autos, peajes o el cansancio de manejar.',
    icon: Map,
    cta: 'Cotizar viaje',
  },
  {
    id: 'eventos',
    title: 'Eventos y Casamientos',
    description: 'Disfruten la fiesta sin preocupaciones. Llevamos a tus invitados y los traemos de vuelta seguros a la madrugada.',
    icon: Music,
    cta: 'Cotizar traslados',
  },
  {
    id: 'aeropuertos',
    title: 'Traslados a Aeropuertos',
    description: 'Puntualidad absoluta para Ezeiza o Aeroparque. Amplio espacio para valijas y tranquilidad antes de tu vuelo.',
    icon: Plane,
    cta: 'Reservar fecha',
  },
  {
    id: 'corporativo',
    title: 'Viajes Corporativos',
    description: 'Traslados para empresas, convenciones o retiros de equipo. Unidades ideales para mantener a tu equipo unido.',
    icon: Briefcase,
    cta: 'Consultar logística',
  },
  {
    id: 'educativos',
    title: 'Viajes Educativos',
    description: 'Excursiones escolares y salidas didácticas con la seguridad y el cuidado que los estudiantes merecen.',
    icon: GraduationCap,
    cta: 'Consultar viaje escolar',
  },
  {
    id: 'bsas-fijos',
    title: 'Viajes Fijos a Bs. As.',
    description: 'Servicio regular de lunes a viernes hacia Buenos Aires. Reservá tu lugar y viajá sin preocupaciones, todos los días.',
    icon: CalendarClock,
    cta: 'Ver horarios y reservar',
  },
  {
    id: 'encomiendas',
    title: 'Encomiendas',
    description: 'Envío y recepción de paquetes y envíos entre Arrecifes y Buenos Aires. Rápido, seguro y con seguimiento.',
    icon: Package,
    cta: 'Enviar encomienda',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
};

export default function ServiceSolutions() {
  return (
    <section id="soluciones" className="w-full py-24 bg-slate-50 relative overflow-hidden">
      
      {/* Elemento decorativo de fondo sutil para romper la monotonía del gris */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#da0200]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabecera Editorial */}
        <div className="mb-16 md:w-2/3">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#da0200]/20 bg-[#da0200]/5 px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#da0200]"
          >
            <CheckCircle2 className="h-4 w-4" />
            Especialidades
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]"
          >
            Soluciones logísticas para cada tipo de viaje
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg leading-relaxed text-slate-600 max-w-2xl"
          >
            No importa el motivo, adaptamos nuestra flota a la necesidad de tu grupo. 
            Elegí tu escenario y nosotros nos encargamos del camino.
          </motion.p>
        </div>

        {/* Grid de Tarjetas Interactivas */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {SOLUCIONES.map((solucion) => {
            const Icon = solucion.icon;
            
            // Reemplazar este href con la lógica real de WhatsApp (ej: abriendo modal o wa.me)
            const whatsappLink = `https://wa.me/5490000000000?text=Hola,%20me%20interesa%20consultar%20por%20el%20servicio%20de%20${encodeURIComponent(solucion.title)}`;

            return (
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                key={solucion.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-[#da0200]/10 transition-all duration-300 border border-slate-200 hover:border-[#da0200]/30 flex flex-col h-full overflow-hidden"
              >
                {/* Acento superior sutil que aparece en hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#da0200] to-red-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

                {/* Contenedor del Icono refinado */}
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 transition-colors duration-300 group-hover:bg-red-50 group-hover:border-red-100">
                  <Icon className="w-7 h-7 text-slate-700 transition-colors duration-300 group-hover:text-[#da0200]" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#da0200] transition-colors duration-300">
                  {solucion.title}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed flex-grow mb-6">
                  {solucion.description}
                </p>
                
                {/* Micro-CTA interactivo */}
                <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#da0200]">
                  {solucion.cta}
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </motion.a>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}