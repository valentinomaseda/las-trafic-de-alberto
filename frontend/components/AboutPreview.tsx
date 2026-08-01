'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Shield, Star, Users, Award } from 'lucide-react';
import Image from 'next/image'; // Asumiendo Next.js. Cambiar por <img> si usas Vite puro.

const BRAND_RED = '#da0200';

const PILARES = [
  {
    icon: Clock,
    titulo: 'Años de trayectoria',
    descripcion: 'Nos forjamos viaje a viaje, ganando la confianza de cientos de familias en la región.',
  },
  {
    icon: MapPin,
    titulo: 'Arraigo en Arrecifes',
    descripcion: 'Somos parte de la comunidad. Conocemos las rutas y sabemos cómo hacer que cada viaje salga perfecto.',
  },
  {
    icon: Shield,
    titulo: 'Servicio de confianza',
    descripcion: 'Traslados con responsabilidad y trato personalizado. Sin letra chica, sin sorpresas.',
  },
  {
    icon: Users,
    titulo: 'Pensado para grupos',
    descripcion: 'Desde salidas familiares hasta eventos masivos. Capacidad y experiencia para mover a tu grupo.',
  },
];


// Variantes de Framer Motion para orquestar la cascada
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
};

export function AboutPreview() {
  return (
    <section id="nosotros" className="w-full py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Columna Izquierda: Lógica y Argumentos */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-bold uppercase tracking-widest text-[#da0200]">
                <Award className="w-4 h-4" />
                Sobre nosotros
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
                Más de 40 años <span style={{ color: BRAND_RED }}>moviéndose con Arrecifes</span>
              </h2>

              <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                No somos una empresa anónima. Nacimos en Arrecifes, conocemos a nuestra gente y ponemos la cara en cada viaje para garantizar tu tranquilidad.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid sm:grid-cols-2 gap-x-6 gap-y-10"
            >
              {PILARES.map(({ icon: Icon, titulo, descripcion }) => (
                <motion.div key={titulo} variants={itemVariants} className="group">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 transition-colors duration-300 group-hover:bg-red-50 group-hover:border-red-100">
                    <Icon className="w-6 h-6 text-slate-700 transition-colors duration-300 group-hover:text-[#da0200]" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{titulo}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{descripcion}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Columna Derecha: Emoción y Prueba Social */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 lg:order-2 relative h-[450px] sm:h-[600px] w-full rounded-[2.5rem] bg-slate-100 shadow-2xl shadow-slate-200/50 mt-8 lg:mt-0"
          >
            {/* INSTRUCCIÓN: Reemplazar el src con una foto real de Alberto o la Flota */}
            <Image
              src="/images/trafics/trafic2.jpeg"
              alt="Las Trafic De Alberto en Arrecifes"
              fill
              className="object-cover rounded-[2.5rem]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Gradiente protector para el contraste */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent rounded-[2.5rem]" />

            {/* Tarjeta Flotante de Cita (Brand Red) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -left-2 sm:-left-8 sm:bottom-12 max-w-[320px] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-white/10 z-10"
              style={{ backgroundColor: BRAND_RED }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-white text-white" />
                  ))}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-white/90">
                  El boca a boca
                </span>
              </div>
              <blockquote className="text-lg sm:text-xl font-semibold leading-snug">
                "Cada cliente satisfecho trajo al siguiente. Ese es nuestro mayor orgullo."
              </blockquote>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}