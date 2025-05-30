import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, UserCheck, Timer, Activity, Play } from 'lucide-react';
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
      <div className="absolute inset-0 z-10 bg-white/85" />
      
      {/* Elementos decorativos */}
      <div className="absolute top-20 left-4 sm:left-20 w-32 h-32 bg-novativa-teal/5 rounded-full blur-xl animate-pulse z-20" />
      <div className="absolute bottom-32 right-4 sm:right-32 w-48 h-48 bg-novativa-orange/5 rounded-full blur-2xl animate-pulse z-20" />
      
      {/* Contenido principal */}
      <div className="relative z-30 text-center w-full max-w-6xl mx-auto">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img src="/lovable-uploads/53b63427-314f-4c41-bbd8-fb0d8225d268.png" alt="NovaMedic Logo" className="h-6 sm:h-8 md:h-10 w-auto" />
        </div>
        
        {/* Título principal mejorado */}
        <div className="mb-8">
          <div className="inline-block bg-gradient-to-r from-novativa-teal/10 to-novativa-orange/10 rounded-full px-6 py-3 mb-6 border border-novativa-teal/20 animate-pulse-subtle">
            <span className="text-novativa-teal font-semibold text-sm sm:text-base tracking-wide uppercase">🚀 Lanzamiento Exclusivo</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-gray-900 px-2 mb-4">
            <span className="block mb-2 sm:mb-4">TRANSFORMA LA</span>
            <span className="block bg-gradient-to-r from-novativa-teal via-novativa-lightTeal to-novativa-orange bg-clip-text text-transparent animate-pulse-subtle">EXPERIENCIA MÉDICA</span>
          </h1>
          
          <div className="bg-gradient-to-r from-novativa-orange to-novativa-lightOrange bg-clip-text text-transparent">
            
            <p className="text-lg sm:text-xl md:text-2xl font-semibold mt-2 text-gray-700"></p>
          </div>
        </div>
        
        {/* Nuevo subtítulo */}
        <p className="sm:text-2xl md:text-3xl mb-8 text-gray-700 px-2 font-bold text-lg">50% de Descuento para médicos seleccionados que accedan a esta versión privada antes del lanzamiento oficial.</p>
        
        {/* Video demo */}
        <div className="relative bg-gradient-to-r from-novativa-teal/10 to-novativa-orange/10 rounded-2xl p-4 sm:p-8 mb-8 shadow-lg mx-2 sm:mx-4">
          <div className="bg-white/80 rounded-xl p-4 sm:p-8 backdrop-blur-sm border border-gray-200">
            <div className="flex items-center justify-center h-48 sm:h-64 bg-gradient-to-br from-novativa-teal/10 to-novativa-orange/10 rounded-lg">
              <div className="text-center">
                <Play className="w-12 h-12 sm:w-16 sm:h-16 text-novativa-teal mx-auto mb-4 animate-pulse-custom" />
                <p className="text-base sm:text-lg text-gray-700">Demo: NovaMedic en Acción</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Párrafo movido aquí, debajo del video */}
        <p className="text-lg sm:text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-600 px-2">
          Para este lanzamiento, ofrecemos un <span className="font-bold text-novativa-orange">50% de descuento</span> <br className="hidden sm:block" />
          SOLO para doctores que cumplan ciertos criterios.
        </p>
        
        {/* CTA debajo del párrafo */}
        <div className="mb-12 px-2">
          <Button onClick={openTidyCal} size="lg" className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold group shadow-xl w-full sm:w-auto">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-swing" />
            Verificar si califico para el descuento
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 max-w-4xl mx-auto px-2">
          <div className="group relative">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-gray-100 hover:border-novativa-teal/30 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-novativa-teal/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="bg-novativa-teal/10 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 group-hover:bg-novativa-teal/20 transition-colors duration-300">
                  <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-novativa-teal mx-auto animate-bounce-custom" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-novativa-teal mb-2 group-hover:scale-110 transition-transform duration-300">95%</div>
                <div className="text-gray-800 font-medium text-sm sm:text-base">Satisfacción del paciente</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-2">Pacientes más felices y confiados</div>
              </div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-gray-100 hover:border-novativa-orange/30 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-novativa-orange/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="bg-novativa-orange/10 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 group-hover:bg-novativa-orange/20 transition-colors duration-300">
                  <Timer className="w-6 h-6 sm:w-8 sm:h-8 text-novativa-orange mx-auto animate-rotate" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-novativa-orange mb-2 group-hover:scale-110 transition-transform duration-300">60%</div>
                <div className="text-gray-800 font-medium text-sm sm:text-base">Menos tiempo administrativo</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-2">Más tiempo para tus pacientes</div>
              </div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-gray-100 hover:border-novativa-teal/30 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-novativa-teal/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="bg-novativa-teal/10 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 group-hover:bg-novativa-teal/20 transition-colors duration-300">
                  <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-novativa-teal mx-auto animate-pulse-custom" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-novativa-teal mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-gray-800 font-medium text-sm sm:text-base">Atención automatizada</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-2">Disponible cuando te necesitan</div>
              </div>
            </div>
          </div>
        </div>
        
        {showCTA && <div className="px-2">
          <Button onClick={openTidyCal} size="lg" className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl animate-bounce-slow shadow-lg w-full sm:w-auto">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2 animate-swing" />
            ¡Verificá si calificas hoy!
          </Button>
        </div>}
      </div>
    </section>;
};
export default HeroSection;