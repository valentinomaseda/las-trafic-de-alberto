'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Users, CalendarDays, Send } from 'lucide-react';

export default function SmartLeadGenerator() {
  const telefonoWhatsApp = '5492478504811';
  const [formData, setFormData] = useState({
    destino: '',
    pasajeros: '',
    fechaAprox: '',
    tipoViaje: 'vacaciones' // vacaciones, evento, corporativo
  });

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    
    const mensaje = `Hola Alberto, vengo de la web y me gustaria que me ayudes a armar un viaje a medida.

Destino o idea: ${formData.destino}
Somos: ${formData.pasajeros} personas
Fecha aproximada: ${formData.fechaAprox}
Tipo de viaje: ${formData.tipoViaje === 'vacaciones' ? 'Vacaciones / Turismo' : formData.tipoViaje === 'evento' ? 'Evento / Casamiento' : 'Viaje Corporativo'}

Me podrias asesorar con las opciones y un presupuesto? Gracias.`;

    const whatsappUrl = `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl shadow-xl shadow-black/5 overflow-hidden border border-[#e8e9ed] flex flex-col md:flex-row">
        
        {/* Columna de Valor - Vende el servicio, no el vehículo */}
        <div className="bg-[#e8e9ed] p-8 md:p-12 md:w-2/5 text-slate-900 flex flex-col justify-center">
          <h3 className="text-3xl font-bold tracking-tight mb-4">
            Diseñamos tu viaje a medida
          </h3>
          <p className="text-slate-600 mb-6 text-sm md:text-base leading-relaxed">
            Cada grupo es único. Contanos a dónde quieren ir y nosotros nos encargamos de la logística, la ruta y la comodidad de todos.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <div className="w-8 h-8 rounded-full bg-[#da0200]/10 flex items-center justify-center text-[#da0200]">1</div>
              Asesoramiento personalizado
            </li>
            <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <div className="w-8 h-8 rounded-full bg-[#da0200]/10 flex items-center justify-center text-[#da0200]">2</div>
              Presupuesto sin compromiso
            </li>
            <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <div className="w-8 h-8 rounded-full bg-[#da0200]/10 flex items-center justify-center text-[#da0200]">3</div>
              Reserva directa
            </li>
          </ul>
        </div>

        {/* Columna del Formulario */}
        <div className="p-8 md:p-12 md:w-3/5 bg-white">
          <form onSubmit={handleWhatsAppRedirect} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Map className="w-4 h-4 text-[#da0200]" /> ¿A dónde quieren ir?
              </label>
              <input 
                type="text" 
                required
                placeholder="Ej: Cataratas, Mendoza, Costa Atlántica..."
                className="w-full p-4 rounded-xl border border-[#e8e9ed] bg-[#e8e9ed]/30 focus:ring-2 focus:ring-[#da0200] focus:border-transparent transition-all outline-none"
                value={formData.destino}
                onChange={(e) => setFormData({...formData, destino: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#da0200]" /> Pasajeros
                </label>
                <input 
                  type="number" 
                  min="1" required
                  placeholder="Ej: 12"
                  className="w-full p-4 rounded-xl border border-[#e8e9ed] bg-[#e8e9ed]/30 focus:ring-2 focus:ring-[#da0200] focus:border-transparent transition-all outline-none"
                  value={formData.pasajeros}
                  onChange={(e) => setFormData({...formData, pasajeros: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-[#da0200]" /> Fecha estimada
                </label>
                <input 
                  type="text" required
                  placeholder="Ej: Mitad de Enero"
                  className="w-full p-4 rounded-xl border border-[#e8e9ed] bg-[#e8e9ed]/30 focus:ring-2 focus:ring-[#da0200] focus:border-transparent transition-all outline-none"
                  value={formData.fechaAprox}
                  onChange={(e) => setFormData({...formData, fechaAprox: e.target.value})}
                />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full mt-4 bg-[#da0200] hover:bg-[#b90100] text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#da0200]/20"
            >
              <Send className="w-5 h-5" /> Iniciar consulta por WhatsApp
            </motion.button>
            <p className="text-center text-xs text-slate-500 font-medium">
              Te responderemos a la brevedad para afinar los detalles.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
