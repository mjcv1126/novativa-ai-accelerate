import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, UserCheck, Timer, Activity, Play, Percent } from 'lucide-react';
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
        
        {/* Badge de lanzamiento con descuento destacado */}
        <div className="mb-8">
          <div className="relative inline-block mb-6">
            {/* Resplandor de fondo para el badge */}
            <div className="absolute inset-0 bg-gradient-to-r from-novativa-orange via-yellow-400 to-novativa-orange rounded-full blur-lg animate-pulse scale-110 opacity-75"></div>
            
            <div className="relative bg-gradient-to-r from-novativa-orange via-yellow-400 to-novativa-orange rounded-full px-8 py-4 border-4 border-white shadow-2xl animate-bounce-slow">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Percent className="w-8 h-8 text-white animate-spin" />
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                </div>
                <div className="text-center">
                  <div className="text-white font-black text-2xl sm:text-3xl tracking-wider drop-shadow-lg">
                    🔥 LANZAMIENTO EXCLUSIVO 🔥
                  </div>
                  <div className="text-white/90 font-bold text-sm sm:text-base tracking-wide uppercase">
                    Transformá tu consulta con
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Título principal con descuento súper destacado */}
        <div className="mb-8">
          {/* Descuento mega destacado */}
          <div className="relative mb-6">
            {/* Efectos de resplandor múltiples */}
            <div className="absolute inset-0 blur-3xl">
              <div className="bg-gradient-to-r from-red-500 via-yellow-400 to-orange-500 text-transparent bg-clip-text text-6xl sm:text-8xl md:text-9xl font-black animate-pulse">
                50% OFF
              </div>
            </div>
            <div className="absolute inset-0 blur-xl">
              <div className="bg-gradient-to-r from-red-600 via-yellow-500 to-orange-600 text-transparent bg-clip-text text-6xl sm:text-8xl md:text-9xl font-black animate-pulse">
                50% OFF
              </div>
            </div>
            
            {/* Texto principal del descuento */}
            <div className="relative">
              <div className="bg-gradient-to-r from-red-600 via-yellow-400 to-orange-500 text-transparent bg-clip-text text-6xl sm:text-8xl md:text-9xl font-black animate-pulse-subtle drop-shadow-2xl">
                50% OFF
              </div>
              
              {/* Elementos decorativos alrededor */}
              <div className="absolute -top-4 -left-4 text-yellow-400 text-4xl animate-bounce">⚡</div>
              <div className="absolute -top-4 -right-4 text-red-500 text-4xl animate-bounce" style={{animationDelay: '0.5s'}}>🔥</div>
              <div className="absolute -bottom-4 -left-4 text-orange-500 text-4xl animate-bounce" style={{animationDelay: '1s'}}>💥</div>
              <div className="absolute -bottom-4 -right-4 text-yellow-400 text-4xl animate-bounce" style={{animationDelay: '1.5s'}}>⭐</div>
            </div>
          </div>
          
          {/* Subtítulo del descuento */}
          <div className="relative inline-block mb-6">
            <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl px-6 py-3 border-2 border-red-200 shadow-xl">
              <div className="text-red-700 font-bold text-lg sm:text-xl md:text-2xl">
                (si calificás para este lanzamiento exclusivo)
              </div>
            </div>
          </div>
          
          {/* Título principal */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 px-2 mb-4">
            <span className="block mb-2 sm:mb-4">TRANSFORMÁ TU</span>
            <span className="block bg-gradient-to-r from-novativa-teal via-novativa-lightTeal to-novativa-orange bg-clip-text text-transparent">CONSULTA MÉDICA</span>
          </h1>
        </div>
        
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
        
        {/* Párrafo explicativo */}
        <p className="text-lg sm:text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-600 px-2">
          Estamos lanzando una solución personalizada para consultas médicas que quieren mejorar su atención sin complicarse. <br className="hidden sm:block" />
          <span className="inline-block bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-lg font-bold text-xl shadow-lg animate-pulse-subtle mt-2">
            SOLO para doctores que cumplan ciertos criterios
          </span>
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
