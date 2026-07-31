import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import DestinationsCarousel from '@/components/DestinationsCarousel';
import ShowsSection from '@/components/ShowsSection';
import SmartLeadGenerator from '@/components/SmartLeadGenerator';
import ServicesOverview from '@/components/ServicesOverview';
import ServiceSolutions from '@/components/ServiceSolutions';
import { VacationSpotlight } from '@/components/VacationSpotlight';
import { MetricsBar } from '@/components/MetricsBar';
import { AboutPreview } from '@/components/AboutPreview';
import { PaymentMethods } from '@/components/PaymentMethods';
import { LocationSection } from '@/components/LocationSection';
import { Testimonials } from '@/components/Testimonials';
import { SectionReveal } from '@/components/SectionReveal';
import { Footer } from '@/components/Footer';
import ConciergeCTA from '@/components/ConciergeCTA';

export default function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_#ffffff_0%,_#f8fafc_34%,_#eef2f7_100%)] font-sans text-slate-900 selection:bg-[#e8e9ed] selection:text-slate-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top_left,_rgba(218,2,0,0.12),_transparent_55%),radial-gradient(circle_at_top_right,_rgba(148,163,184,0.18),_transparent_45%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[42rem] -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#da0200]/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[20rem] right-0 -z-10 h-96 w-96 translate-x-1/3 rounded-full bg-slate-300/20 blur-3xl" />

      <Navbar />
      <Hero />

      {/* Sobre nosotros — trayectoria y reconocimiento en Arrecifes */}
      <SectionReveal delay={0.1}>
        <AboutPreview />
      </SectionReveal>

      <SectionReveal>
        <MetricsBar />
      </SectionReveal>

      {/* El carrusel de destinos turísticos */}
      <SectionReveal delay={0.1}>
        <DestinationsCarousel />
      </SectionReveal>

      {/* El generador de leads intercepta la intención generada por los destinos */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-8 mb-16">
        <SmartLeadGenerator />
      </div>

      {/* Sección de Shows & Recitales — se muestra solo si hay shows cargados */}
      <ShowsSection />

      <SectionReveal delay={0.2}>
        <VacationSpotlight />
      </SectionReveal>

      {/* Auto-segmentación del usuario (Turismo, Eventos, Corporativo) */}
      <SectionReveal>
        <ServiceSolutions />
      </SectionReveal>

      <SectionReveal>
        <ServicesOverview />
      </SectionReveal>

      <SectionReveal>
        <ConciergeCTA />
      </SectionReveal>

      <SectionReveal>
        <PaymentMethods />
      </SectionReveal>

      <SectionReveal>
        <LocationSection />
      </SectionReveal>

      <SectionReveal>
        <Testimonials />
      </SectionReveal>

      <Footer />
    </main>
  );
}