import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import DestinationsCarousel from '@/components/DestinationsCarousel';
import SmartLeadGenerator from '@/components/SmartLeadGenerator';
import ServicesOverview from '@/components/ServicesOverview';
import ServiceSolutions from '@/components/ServiceSolutions';
import { VacationSpotlight } from '@/components/VacationSpotlight';
import { MetricsBar } from '@/components/MetricsBar';
import { PaymentMethods } from '@/components/PaymentMethods';
import { LocationSection } from '@/components/LocationSection';
import { Testimonials } from '@/components/Testimonials';
import { SectionReveal } from '@/components/SectionReveal';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#e8e9ed] selection:text-slate-900">
      <Navbar />
      <Hero />
      
      <SectionReveal>
        <MetricsBar />
      </SectionReveal>

      {/* El carrusel optimizado va justo después del Hero para inspirar */}
      <SectionReveal delay={0.1}>
        <DestinationsCarousel />
      </SectionReveal>

      {/* El generador de leads intercepta la intención generada por los destinos */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-8 mb-16">
        <SmartLeadGenerator />
      </div>

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
        <PaymentMethods />
      </SectionReveal>

      <SectionReveal>
        <LocationSection />
      </SectionReveal>

      {/* Explicación del Método para derribar objeciones previas al cierre */}



      <SectionReveal>
        <Testimonials />
      </SectionReveal>

      <Footer />
    </main>
  );
}