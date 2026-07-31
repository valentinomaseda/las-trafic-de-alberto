'use client';

import { Banknote, CreditCard, Landmark, ShieldCheck, Lock } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const PAYMENT_METHODS = [
  {
    icon: Banknote,
    title: 'Efectivo',
    text: 'Ideal para operaciones simples, señas o pagos directos al momento del viaje.',
  },
  {
    icon: Landmark,
    title: 'Transferencia Bancaria',
    text: 'La opción más ágil para empresas, grupos grandes y reservas coordinadas a distancia.',
  },
  {
    icon: CreditCard,
    title: 'Tarjetas de Crédito / Débito',
    text: 'Mayor flexibilidad para organizar el pago de tu viaje a través de links seguros.',
  },
];

const BRAND_RED = '#da0200';

// Variantes optimizadas para un solo Intersection Observer
const containerVariants: Variants = {
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
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
};

export function PaymentMethods() {
  return (
    <section id="pagos" className="w-full bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_65%,#f6f7f9_100%)] py-24 relative overflow-hidden">
      
      {/* Detalle decorativo minimalista de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#da0200]/5 rounded-full blur-3xl pointer-events-none opacity-70" />
      <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 rounded-full bg-slate-200/40 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabecera Refinada */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-bold uppercase tracking-widest text-slate-500 shadow-sm backdrop-blur">
            <Lock className="h-4 w-4" style={{ color: BRAND_RED }} />
            Transparencia Total
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl leading-[1.15]">
            Pagá de la manera que te resulte más cómoda.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Adaptamos nuestras opciones de facturación y cobro a las necesidades de tu grupo o empresa, garantizando siempre la máxima seguridad.
          </p>
        </motion.div>

        {/* Grid Interactivo */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {PAYMENT_METHODS.map(({ icon: Icon, title, text }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col h-full overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#fbfbfc_100%)] p-8 shadow-sm hover:shadow-2xl hover:shadow-[#da0200]/10 transition-all duration-300"
            >
              {/* Borde de acento superior que se revela en hover */}
              <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-[#da0200] to-red-500 group-hover:w-full transition-all duration-500 ease-out" />

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 transition-colors duration-300 group-hover:bg-red-50 group-hover:border-red-100">
                <Icon className="h-7 w-7 text-slate-600 transition-colors duration-300 group-hover:text-[#da0200]" strokeWidth={1.5} />
              </div>
              
              <h3 className="mb-3 text-xl font-bold text-slate-900 group-hover:text-[#da0200] transition-colors duration-300">
                {title}
              </h3>
              
              <p className="text-sm leading-relaxed text-slate-600 flex-grow">
                {text}
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* Banner de Confianza (Trust Anchor) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4 }}
          className="mt-12 mx-auto max-w-3xl rounded-2xl bg-slate-50 border border-slate-200 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Operaciones seguras y facturación clara</p>
            <p className="text-sm text-slate-600 mt-1">Emitimos comprobantes oficiales. Sin costos ocultos ni sorpresas de último momento.</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}