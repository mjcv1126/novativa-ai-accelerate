
import React from 'react';
import { FileText, Video, Share2, User, BrainCircuit, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <FileText className="h-8 w-8 text-novativa-teal" />
                <img 
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGY2YjMzMjY4Y2MzYjJmMmU0OWRhMDdkODcwM2JiOGFhYzBiYzg2ZiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/JIX9t2j0ZTN9S/giphy.gif" 
                  alt="AI Writing" 
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Clonación de Estilos</h3>
              <p className="text-gray-600">
                Creamos contenido que mantiene el tono y estilo único de tu marca, asegurando consistencia en todas las comunicaciones.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <User className="h-8 w-8 text-novativa-orange" />
                <img 
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzEwNjBkYTEyY2Y1ZTcwNWI4NTg5ODM1MzAyMGU0NjZmYTE3MzIwYiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/3oKIPnAiaMCws8nOsE/giphy.gif" 
                  alt="Avatar Creation" 
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Avatares Personalizados</h3>
              <p className="text-gray-600">
                Crea tu avatar digital para contenido de video, presentaciones y redes sociales. Tu presencia digital disponible 24/7.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <Share2 className="h-8 w-8 text-novativa-teal" />
                <img 
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTkyZDI2NzQ4ZjZkMzc4YTQ5NTkyNDJkNjc3YjFiZGE5M2RhYWU4NSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/HVr4gFHYIqeti/giphy.gif" 
                  alt="Social Media" 
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Automatización Social</h3>
              <p className="text-gray-600">
                Crea y programa contenido automáticamente para todas tus redes sociales, manteniendo una presencia activa y relevante.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">¿Cómo funciona nuestra tecnología de avatares?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <img 
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjg4MTU4YzI4NjZkZDQ2MTVhNDUyZDM2ZGRhY2E4NmEwZmJkYmNhMyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/l44Qqz6gO6JiVV3pu/giphy.gif"
                  alt="AI Avatar Demo" 
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-novativa-teal rounded-full p-2">
                    <Wand2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Clonación de Voz</h3>
                    <p className="text-gray-600">Tu voz digitalizada para crear contenido de audio natural y auténtico.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-novativa-orange rounded-full p-2">
                    <Video className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Gestos y Expresiones</h3>
                    <p className="text-gray-600">Movimientos naturales y expresiones faciales realistas para una comunicación más efectiva.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-novativa-teal rounded-full p-2">
                    <BrainCircuit className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">IA Conversacional</h3>
                    <p className="text-gray-600">Interacciones naturales y respuestas contextuales basadas en tu conocimiento y estilo.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Potencia tu presencia digital</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Descubre cómo la IA puede revolucionar tu creación de contenido
          </p>
          <Button
            asChild
            size="lg"
            className="bg-novativa-orange hover:bg-novativa-lightOrange text-white"
          >
            <a href="https://tidycal.com/novativa/demo-gratis" target="_blank" rel="noopener noreferrer">
              Agenda una demostración gratuita
            </a>
          </Button>
        </div>
      </section>
    </>
  );
};

export default ContentGeneration;
