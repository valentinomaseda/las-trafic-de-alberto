'use client';

import Link from 'next/link';
import { MapPin, Navigation, PhoneCall } from 'lucide-react';
import { SectionReveal } from './SectionReveal';

const WHATSAPP_NUMBER = '5492478505684';
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola Alberto, quiero consultar por la ubicacion de la oficina y coordinar una visita.')}`;

const businessHours = [
  { day: 'Lunes',    hours: '8:30–13:00 y 16:00–21:00' },
  { day: 'Martes',   hours: '8:30–13:00 y 16:00–21:00' },
  { day: 'Miércoles',hours: '8:30–13:00 y 16:00–21:00' },
  { day: 'Jueves',   hours: '8:30–13:00 y 16:00–21:00' },
  { day: 'Viernes',  hours: '8:30–13:00 y 16:00–21:00' },
  { day: 'Sábado',   hours: '8:30–13:00 y 16:00–21:00' },
  { day: 'Domingo',  hours: 'Solo WhatsApp' },
];

export function LocationSection() {
  return (
    <section id="ubicacion" className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] py-20 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 -translate-x-1/3 rounded-full bg-[#da0200]/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 rounded-full bg-slate-200/40 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#da0200]">Ubicacion</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Encontranos en la oficina y revisa la zona en el mapa.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Estamos en una ubicacion de referencia para coordinar consultas, salidas y reuniones. Si queres, tambien nos escribis por WhatsApp y te compartimos mas detalles.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionReveal className="rounded-[2rem] border border-[#e8e9ed] bg-white/90 p-6 shadow-sm backdrop-blur sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8e9ed] text-[#da0200]">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-2xl font-semibold text-slate-900">Oficina de Las Trafic de Alberto</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Consultas comerciales, coordinacion de viajes y atencion directa para cotizaciones.
            </p>

            <div className="mt-8 space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <Navigation className="mt-0.5 h-4 w-4 shrink-0 text-[#da0200]" />
                <span>La ubicacion esta visible en el mapa interactivo de la derecha.</span>
              </div>
              <div className="flex items-start gap-3">
                <PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-[#da0200]" />
                <span>Si preferis, coordinamos todo por WhatsApp antes de acercarte.</span>
              </div>
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-[#e8e9ed] bg-[#e8e9ed]/35 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#da0200]">Direccion</p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Frascheri 563, B2740 Arrecifes, Provincia de Buenos Aires
              </p>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#da0200]">Horarios</p>
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  {businessHours.map((item) => (
                    <div key={item.day} className="flex items-center justify-between gap-4 border-b border-[#e8e9ed]/80 pb-2 last:border-b-0 last:pb-0">
                      <span className="font-medium capitalize text-slate-900">{item.day}</span>
                      <span>{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#da0200] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#da0200]/20 transition hover:opacity-90"
            >
              <PhoneCall className="h-4 w-4" />
              Consultar por WhatsApp
            </Link>
          </SectionReveal>

          <SectionReveal delay={0.1} className="overflow-hidden rounded-[2rem] border border-[#e8e9ed] bg-white/90 shadow-sm backdrop-blur">
            <div className="relative min-h-[420px] w-full lg:h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.0646136293844!2d-60.1044911250716!3d-34.06785787315107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b99dc21867419d%3A0xe5d68ae1464094c4!2slas%20trafic%20de%20alberto!5e0!3m2!1ses-419!2sar!4v1785373981663!5m2!1ses-419!2sar"
                title="Ubicacion de la oficina de Las Trafic de Alberto"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}