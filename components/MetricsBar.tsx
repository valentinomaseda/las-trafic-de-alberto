'use client';

import { Clock3, Map, ShieldCheck, Users2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionReveal } from './SectionReveal';

const metrics = [
  {
    icon: ShieldCheck,
    value: '+10',
    label: 'Años de experiencia',
  },
  {
    icon: Map,
    value: '+5000',
    label: 'Viajes realizados',
  },
  {
    icon: Users2,
    value: 'Flota moderna',
    label: 'Vehículos equipados para grupos',
  },
  {
    icon: Clock3,
    value: '24/7',
    label: 'Monitoreo satelital',
  },
];

export function MetricsBar() {
  return (
    <section className="bg-[#e8e9ed] text-slate-900">
      <div className="mx-auto grid max-w-7xl gap-px px-4 py-0 sm:px-6 lg:grid-cols-4 lg:px-8">
        {metrics.map(({ icon: Icon, value, label }, index) => (
          <SectionReveal key={label} delay={index * 0.08}>
            <motion.article
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="flex h-full flex-col gap-3 bg-white px-6 py-8 text-center sm:px-8"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#da0200]/10 text-[#da0200]">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
              <p className="text-sm leading-6 text-slate-600">{label}</p>
            </motion.article>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
