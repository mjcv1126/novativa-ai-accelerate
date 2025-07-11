import React from 'react';
import { Video, Camera, Headphones, Palette, Sparkles, Film, Plane } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AudiovisualProduction = () => {
  const { language } = useLanguage();
  
  const services = [
    {
      icon: <Camera className="text-blue-400 h-12 w-12" />,
      title: "📸 Sesiones fotográficas profesionales",
      description: "Fotografía de producto, lifestyle, corporativa y eventos con equipo profesional y técnicas avanzadas de iluminación."
    },
    {
      icon: <Video className="text-red-400 h-12 w-12" />,
      title: "🎬 Producción de video profesional",
      description: "Videos promocionales, testimoniales, reels y contenido audiovisual con cámaras 4K y storytelling impactante."
    },
    {
      icon: <Sparkles className="text-cyan-400 h-12 w-12" />,
      title: "🤖 Generación de videos con IA",
      description: "Creación completa de spots comerciales, anuncios y contenido publicitario usando inteligencia artificial avanzada."
    },
    {
      icon: <Headphones className="text-purple-400 h-12 w-12" />,
      title: "🎙️ Locución y voces con IA",
      description: "Voces sintéticas ultra-realistas en múltiples idiomas y tonos para spots comerciales y contenido audiovisual."
    },
    {
      icon: <Plane className="text-green-400 h-12 w-12" />,
      title: "🚁 Tomas aéreas con drones",
      description: "Perspectivas únicas y espectaculares con drones profesionales para destacar tu marca desde las alturas."
    },
    {
      icon: <Palette className="text-pink-400 h-12 w-12" />,
      title: "🎨 Diseño gráfico y creativos",
      description: "Diseños únicos para posts, stories, banners y material publicitario que refleja la identidad de tu marca."
    },
    {
      icon: <Film className="text-yellow-400 h-12 w-12" />,
      title: "🎞️ Edición y postproducción",
      description: "Montaje cinematográfico, efectos visuales, color grading y optimización para todas las plataformas digitales."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Producción Audiovisual Profesional
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Creamos contenido audiovisual de alta calidad combinando técnicas cinematográficas tradicionales 
            con inteligencia artificial avanzada. Desde spots comerciales 100% generados con IA hasta producciones profesionales.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/50 hover:border-pink-500/50"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-pink-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-75 transition-all duration-500" />
              
              <div className="relative z-10">
                <div className="bg-black/40 p-5 rounded-2xl w-fit mb-6 group-hover:bg-black/60 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-pink-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                  {service.description}
                </p>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-red-500/10 to-purple-500/10 border border-pink-500/20">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
              ¿Listo para revolucionar tu contenido?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Combinamos la creatividad artística con tecnología de punta para crear contenido 
              que no solo se ve increíble, sino que genera resultados reales para tu negocio.
            </p>
            <button 
              onClick={() => {
                const scheduleSection = document.getElementById('schedule');
                scheduleSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Crear Contenido Épico Ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudiovisualProduction;