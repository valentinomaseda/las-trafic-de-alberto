import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { MetricsBar } from '../components/MetricsBar';
import { ServicesOverview } from '../components/ServicesOverview';
import { AboutPreview } from '../components/AboutPreview';

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      <MetricsBar />
      <ServicesOverview />
      <AboutPreview />

      <section id="cotizar" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#e8e9ed] bg-[#e8e9ed]/35 px-6 py-10 sm:px-10 sm:py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#da0200]">WhatsApp</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">Las consultas se hacen por WhatsApp</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            No vamos a usar lógica de cotización en la web. El botón principal deriva a WhatsApp para resolver el pedido de forma directa y simple.
          </p>
        </div>
      </section>
    </main>
  );
}
