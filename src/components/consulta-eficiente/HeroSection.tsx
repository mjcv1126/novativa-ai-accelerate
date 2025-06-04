
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, UserCheck, Timer, Activity, Play, Award } from 'lucide-react';

interface HeroSectionProps {
  openTidyCal: () => void;
  showCTA: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  openTidyCal,
  showCTA
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* GIF de fondo */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 z-0" style={{
      backgroundImage: 'url(https://media.lordicon.com/icons/wired/gradient/1249-heart-beat.gif)',
      backgroundSize: 'contain',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat'
    }} />
      
      {/* Overlay blanco */}
      <div className="absolute inset-0 z-10 bg-white/90" />
      
      {/* Elementos decorativos sutiles */}
      <div className="absolute top-20 left-4 sm:left-20 w-24 h-24 bg-novativa-teal/3 rounded-full blur-xl animate-pulse z-20" />
      <div className="absolute bottom-32 right-4 sm:right-32 w-32 h-32 bg-novativa-orange/3 rounded-full blur-2xl animate-pulse z-20" />
      
      {/* Contenido principal */}
      <div className="relative z-30 text-center w-full max-w-6xl mx-auto">
        {/* Logo - Más pequeño en móvil */}
        <div className="mb-4 sm:mb-8 flex justify-center">
          <img src="/lovable-uploads/53b63427-314f-4c41-bbd8-fb0d8225d268.png" alt="NovaMedic Logo" className="h-4 sm:h-8 md:h-10 w-auto" />
        </div>
        
        {/* Badge de lanzamiento profesional - Compacto en móvil */}
        <div className="mb-4 sm:mb-8">
          <div className="relative inline-block mb-3 sm:mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl sm:rounded-2xl px-4 sm:px-8 py-2 sm:py-4 border-2 border-novativa-teal/20 shadow-lg">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <Award className="w-4 sm:w-6 h-4 sm:h-6 text-novativa-teal" />
                </div>
                <div className="text-center">
                  <div className="text-novativa-teal font-bold text-sm sm:text-lg md:text-xl tracking-wide">
                    LANZAMIENTO EXCLUSIVO
                  </div>
                  <div className="text-gray-600 font-medium text-xs sm:text-sm tracking-wide">
                    Programa Early Adopters para Profesionales Médicos
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Título principal con descuento - Más compacto en móvil */}
        <div className="mb-4 sm:mb-8">
          {/* Descuento profesional */}
          <div className="relative mb-4 sm:mb-8">
            {/* Descuento principal */}
            <div className="relative mb-3 sm:mb-6">
              <div className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-gradient-to-r from-novativa-teal via-blue-600 to-novativa-orange bg-clip-text leading-tight animate-pulse">
                50% DE DESCUENTO
              </div>
              
              {/* Elementos médicos profesionales - Ocultos en móvil para ahorrar espacio */}
              <div className="hidden sm:block absolute -top-2 -left-2 text-novativa-teal text-2xl opacity-60">🏥</div>
              <div className="hidden sm:block absolute -top-2 -right-2 text-novativa-orange text-2xl opacity-60">⚕️</div>
              <div className="hidden sm:block absolute -bottom-2 -left-2 text-blue-600 text-2xl opacity-60">🩺</div>
              <div className="hidden sm:block absolute -bottom-2 -right-2 text-novativa-teal text-2xl opacity-60">💊</div>
            </div>
          </div>
        </div>
        
        {/* Descripción de la plataforma - Más compacta en móvil */}
        <div className="mb-4 sm:mb-8 flex justify-center">
          <p className="text-sm sm:text-xl md:text-2xl text-gray-700 font-medium leading-relaxed max-w-4xl text-center">Plataforma exclusiva para profesionales médicos especialistas que califiquen en nuestro programa Early Adopters. Tu plataforma IA de atenciones médicas al alcance de un click.</p>
        </div>
        
        {/* Video demo profesional - Más pequeño en móvil */}
        <div className="relative mb-4 sm:mb-8">
          {/* Desktop: Con marco decorativo */}
          <div className="hidden sm:block bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 sm:p-8 shadow-lg mx-2 sm:mx-4 border border-gray-200">
            <div className="bg-white rounded-xl p-6 sm:p-8 backdrop-blur-sm border border-gray-100">
              <div className="relative w-full bg-gradient-to-br from-novativa-teal/5 to-novativa-orange/5 rounded-lg border border-gray-100 overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <iframe 
                  className="absolute inset-0 w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/h4UJmRrA9uk?loop=1&playlist=h4UJmRrA9uk"
                  title="NovaMedic Demostración Clínica"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Mobile: Video más compacto con aspecto 4:3 para ahorrar altura */}
          <div className="block sm:hidden -mx-2">
            <div className="relative w-full bg-gradient-to-br from-novativa-teal/5 to-novativa-orange/5 overflow-hidden shadow-xl rounded-lg" style={{ aspectRatio: '4/3' }}>
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/h4UJmRrA9uk?loop=1&playlist=h4UJmRrA9uk"
                title="NovaMedic Demostración Clínica"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
        
        {/* Párrafo explicativo profesional - Ahora visible en móvil también */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-12 max-w-4xl mx-auto border border-gray-200 shadow-sm">
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-3 sm:mb-6 leading-relaxed text-gray-700 px-1 sm:px-2">
            Estamos lanzando una solución tecnológica avanzada diseñada específicamente para profesionales médicos que buscan optimizar su práctica clínica sin comprometer la calidad de atención.
          </p>
          <div className="inline-block bg-gradient-to-r from-novativa-teal to-novativa-orange text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-lg shadow-lg">
            Programa exclusivo para médicos especialistas
          </div>
        </div>
        
        {/* CTA profesional - Compacto en móvil */}
        {showCTA && (
          <div className="mb-4 sm:mb-12 px-2">
            <Button onClick={openTidyCal} size="lg" className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 text-base sm:text-lg md:text-xl shadow-lg w-full sm:w-auto">
              <Calendar className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 mr-2" />
              Solicitar Evaluación Profesional
            </Button>
          </div>
        )}
        
        {/* Stats section profesional - Oculto en móvil para ahorrar espacio */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 max-w-5xl mx-auto px-2">
          <div className="group relative">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-novativa-teal/30 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-novativa-teal/3 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="bg-novativa-teal/10 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                  <UserCheck className="w-8 h-8 text-novativa-teal mx-auto" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-novativa-teal mb-2">95%</div>
                <div className="text-gray-800 font-semibold text-base">Satisfacción del Paciente</div>
                <div className="text-sm text-gray-600 mt-2">Mejora en la experiencia clínica</div>
              </div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-novativa-orange/30 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-novativa-orange/3 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="bg-novativa-orange/10 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                  <Timer className="w-8 h-8 text-novativa-orange mx-auto" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-novativa-orange mb-2">60%</div>
                <div className="text-gray-800 font-semibold text-base">Reducción Administrativa</div>
                <div className="text-sm text-gray-600 mt-2">Más tiempo para la atención médica</div>
              </div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-novativa-teal/30 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-novativa-teal/3 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="bg-novativa-teal/10 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                  <Activity className="w-8 h-8 text-novativa-teal mx-auto" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-novativa-teal mb-2">24/7</div>
                <div className="text-gray-800 font-semibold text-base">Atención Automatizada</div>
                <div className="text-sm text-gray-600 mt-2">Seguimiento continuo de pacientes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
