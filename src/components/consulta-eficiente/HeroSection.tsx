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
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
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
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img src="/lovable-uploads/53b63427-314f-4c41-bbd8-fb0d8225d268.png" alt="NovaMedic Logo" className="h-6 sm:h-8 md:h-10 w-auto" />
        </div>
        
        {/* Badge de lanzamiento profesional */}
        <div className="mb-8">
          <div className="relative inline-block mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl px-8 py-4 border-2 border-novativa-teal/20 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Award className="w-6 h-6 text-novativa-teal" />
                </div>
                <div className="text-center">
                  <div className="text-novativa-teal font-bold text-lg sm:text-xl tracking-wide">
                    LANZAMIENTO EXCLUSIVO
                  </div>
                  <div className="text-gray-600 font-medium text-sm tracking-wide">
                    Programa Early Adopters para Profesionales Médicos
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Título principal con descuento elegante */}
        <div className="mb-8">
          {/* Descuento profesional */}
          <div className="relative mb-8">
            <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-3xl p-8 border-2 border-novativa-teal/10 shadow-xl max-w-4xl mx-auto">
              {/* Descuento principal */}
              <div className="relative mb-4">
                <div className="text-5xl sm:text-7xl md:text-8xl font-black text-transparent bg-gradient-to-r from-novativa-teal via-blue-600 to-novativa-orange bg-clip-text leading-tight">
                  50% DE DESCUENTO
                </div>
                
                {/* Elementos médicos profesionales */}
                <div className="absolute -top-2 -left-2 text-novativa-teal text-2xl opacity-60">🏥</div>
                <div className="absolute -top-2 -right-2 text-novativa-orange text-2xl opacity-60">⚕️</div>
                <div className="absolute -bottom-2 -left-2 text-blue-600 text-2xl opacity-60">🩺</div>
                <div className="absolute -bottom-2 -right-2 text-novativa-teal text-2xl opacity-60">💊</div>
              </div>
              
              {/* Subtítulo profesional */}
              <div className="bg-novativa-teal/5 rounded-xl px-6 py-3 border border-novativa-teal/20">
                <div className="text-novativa-teal font-semibold text-lg sm:text-xl">
                  Para profesionales médicos que califiquen en nuestro programa Early Adopters
                </div>
              </div>
            </div>
          </div>
          
          {/* Título principal */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 px-2 mb-6">
            
            
            <span className="block text-2xl sm:text-3xl text-gray-600 mt-2 font-medium md:text-base">La plataforma de IA que revoluciona la atención médica.
Optimiza tu consulta, mejora la experiencia del paciente y potencia tu práctica profesional.</span>
          </h1>
        </div>
        
        {/* Video demo profesional */}
        <div className="relative bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 sm:p-8 mb-8 shadow-lg mx-2 sm:mx-4 border border-gray-200">
          <div className="bg-white rounded-xl p-6 sm:p-8 backdrop-blur-sm border border-gray-100">
            <div className="flex items-center justify-center h-48 sm:h-64 bg-gradient-to-br from-novativa-teal/5 to-novativa-orange/5 rounded-lg border border-gray-100">
              <div className="text-center">
                <Play className="w-12 h-12 sm:w-16 sm:h-16 text-novativa-teal mx-auto mb-4" />
                <p className="text-base sm:text-lg text-gray-700 font-medium">Demostración Clínica: NovaMedic en Acción</p>
                <p className="text-sm text-gray-500 mt-2">Vea cómo optimizar su consulta médica</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Párrafo explicativo profesional */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-12 max-w-4xl mx-auto border border-gray-200 shadow-sm">
          <p className="text-lg sm:text-xl md:text-2xl mb-6 leading-relaxed text-gray-700 px-2">
            Estamos lanzando una solución tecnológica avanzada diseñada específicamente para profesionales médicos que buscan optimizar su práctica clínica sin comprometer la calidad de atención.
          </p>
          <div className="inline-block bg-gradient-to-r from-novativa-teal to-novativa-orange text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg">
            Programa exclusivo para médicos especialistas
          </div>
        </div>
        
        {/* CTA profesional */}
        <div className="mb-12 px-2">
          <Button onClick={openTidyCal} size="lg" className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold group shadow-xl w-full sm:w-auto">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Evaluar Elegibilidad para el Programa
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        {/* Stats section profesional */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 max-w-5xl mx-auto px-2">
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
        
        {showCTA && <div className="px-2">
          <Button onClick={openTidyCal} size="lg" className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl shadow-lg w-full sm:w-auto">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            Solicitar Evaluación Profesional
          </Button>
        </div>}
      </div>
    </section>;
};
export default HeroSection;