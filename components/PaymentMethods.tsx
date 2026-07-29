'use client';

import { Banknote, CreditCard, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionReveal } from './SectionReveal';

const methods = [
  {
    icon: Banknote,
    title: 'Efectivo',
    text: 'Ideal para operaciones simples y acuerdos directos.',
  },
  {
    icon: CreditCard,
    title: 'Tarjetas de crédito y débito',
    text: 'Una alternativa práctica para organizar el pago con más flexibilidad.',
  },
  {
    icon: Landmark,
    title: 'Transferencia',
    text: 'Una opción ágil para empresas, grupos y reservas coordinadas.',
  },
];

export function PaymentMethods() {
  return (
    <section className="bg-[#e8e9ed]/45 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#da0200]">Facilidades de pago</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Pagá de la manera que te resulte más cómoda.
          </h2>
        </SectionReveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {methods.map(({ icon: Icon, title, text }) => (
            <SectionReveal key={title}>
              <motion.article
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="h-full rounded-[1.75rem] border border-[#e8e9ed] bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#da0200] text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </motion.article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
