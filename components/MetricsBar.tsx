'use client';

import { Clock3, Map, ShieldCheck, Users2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { SectionReveal } from './SectionReveal';

const metrics = [
  {
    icon: ShieldCheck,
    value: 10,
    prefix: '+',
    label: 'Años de experiencia',
  },
  {
    icon: Map,
    value: 5000,
    prefix: '+',
    label: 'Viajes realizados',
  },
  {
    icon: Users2,
    value: 'Flota moderna',
    label: 'Vehículos equipados para grupos',
  },
  {
    icon: Clock3,
    value: 24,
    suffix: '/7',
    label: 'Monitoreo satelital',
  },
];

function AnimatedCount({
  end,
  prefix = '',
  suffix = '',
}: {
  end: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setHasAnimated(true);
        const duration = 1400;
        const startTime = performance.now();

        const step = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(end * eased));

          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };

        requestAnimationFrame(step);
        observer.disconnect();
      },
      { threshold: 0.45 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {new Intl.NumberFormat('es-AR').format(count)}
      {suffix}
    </span>
  );
}

export function MetricsBar() {
  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f8f8f8_100%)] py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="overflow-hidden rounded-[2rem] border border-[#e8e9ed] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.06)]">
            <div className="border-b border-[#e8e9ed] bg-[#e8e9ed]/35 px-6 py-6 sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#da0200]">Nuestra fuerza</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Resultados que transmiten confianza antes de viajar.
              </h2>
            </div>

            <div className="grid gap-4 px-6 py-6 sm:px-8 lg:grid-cols-4">
              {metrics.map(({ icon: Icon, value, label, prefix, suffix }, index) => (
          <SectionReveal key={label} delay={index * 0.08}>
            <motion.article
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
                  className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-[1.75rem] border border-[#e8e9ed] bg-[linear-gradient(180deg,#ffffff_0%,#fafafa_100%)] px-6 py-7 text-center shadow-sm transition-shadow hover:shadow-lg hover:shadow-black/5 sm:px-8"
            >
                <div className="absolute inset-x-0 top-0 h-1 bg-[#da0200] opacity-75" />
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#da0200]/10 text-[#da0200] ring-1 ring-[#da0200]/10">
                <Icon className="h-5 w-5" />
              </div>
                <p className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-[2.15rem]">
                  {typeof value === 'number' ? (
                    <AnimatedCount end={value} prefix={prefix} suffix={suffix} />
                  ) : (
                    value
                  )}
                </p>
                <p className="text-sm leading-6 text-slate-600">{label}</p>
            </motion.article>
          </SectionReveal>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
