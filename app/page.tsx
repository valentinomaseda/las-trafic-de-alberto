import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { MetricsBar } from '../components/MetricsBar';
import { AboutPreview } from '../components/AboutPreview';

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      <MetricsBar />
      <AboutPreview />

      <section id="cotizar" className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-white px-6 py-10 shadow-sm ring-1 ring-slate-200 sm:px-10 sm:py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">Cotización</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">Bloque listo para integrar formulario o WhatsApp</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Este bloque funciona como ancla de conversión. Puedes conectarlo a un formulario real, a WhatsApp o a un CRM sin cambiar la estructura visual.
          </p>
        </div>
      </section>
    </main>
  );
}
