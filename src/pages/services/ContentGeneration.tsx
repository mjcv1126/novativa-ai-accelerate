
import React from 'react';
import { FileText, Mic, Share2, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContentGeneration = () => {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Generación de Contenido con IA
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Crea contenido de alta calidad de manera automática para todas tus plataformas
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <FileText className="h-8 w-8 text-novativa-teal mb-4" />
              <h3 className="text-xl font-semibold mb-2">Clonación de Estilos</h3>
              <p className="text-gray-600">
                Creamos contenido que mantiene el tono y estilo único de tu marca, asegurando consistencia en todas las comunicaciones.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <Mic className="h-8 w-8 text-novativa-orange mb-4" />
              <h3 className="text-xl font-semibold mb-2">Clonación de Voz</h3>
              <p className="text-gray-600">
                Genera contenido de audio que suena exactamente como tu voz o la voz de tu marca, perfecto para podcasts y videos.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <Share2 className="h-8 w-8 text-novativa-teal mb-4" />
              <h3 className="text-xl font-semibold mb-2">Automatización Social</h3>
              <p className="text-gray-600">
                Crea y programa contenido automáticamente para todas tus redes sociales, manteniendo una presencia activa y relevante.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">¿Por qué usar IA para generar contenido?</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Consistencia y Escala</h3>
                <p className="text-gray-600">
                  Mantén una producción constante de contenido de alta calidad sin sacrificar recursos o tiempo valioso.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Optimización SEO</h3>
                <p className="text-gray-600">
                  Contenido optimizado automáticamente para motores de búsqueda, mejorando tu visibilidad online.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Personalización</h3>
                <p className="text-gray-600">
                  Adapta el contenido a diferentes audiencias y plataformas manteniendo tu voz de marca.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Potencia tu estrategia de contenido</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Descubre cómo la IA puede revolucionar tu creación de contenido
          </p>
          <Button
            asChild
            size="lg"
            className="bg-novativa-orange hover:bg-novativa-lightOrange text-white"
          >
            <a href="https://tidycal.com/novativa" target="_blank" rel="noopener noreferrer">
              Agenda una demostración gratuita
            </a>
          </Button>
        </div>
      </section>
    </>
  );
};

export default ContentGeneration;
