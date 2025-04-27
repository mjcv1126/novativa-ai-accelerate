
import React from 'react';
import { Video, User, BrainCircuit, Mic, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ContentGeneration = () => {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Crea tu Avatar Digital con IA
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Clona tu voz y apariencia para crear contenido impactante en minutos
            </p>
            <div className="relative max-w-4xl mx-auto">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="rounded-xl shadow-2xl w-full"
                poster="https://cdn-site-assets.veed.io/cdn-cgi/image/width=1536,quality=75,format=auto/AI_Avatar_6a9e429709/AI_Avatar_6a9e429709.png"
              >
                <source src="https://cdn.heygen.ai/video/homepage/avatar_4.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-indigo-600 p-3 rounded-xl">
                  <User className="h-6 w-6 text-white" />
                </div>
                <img 
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzEwNjBkYTEyY2Y1ZTcwNWI4NTg5ODM1MzAyMGU0NjZmYTE3MzIwYiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/3oKIPnAiaMCws8nOsE/giphy.gif"
                  alt="Avatar Creation"
                  className="w-12 h-12 rounded-xl object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Avatar Fotorrealista</h3>
              <p className="text-gray-600">
                Creamos un avatar digital idéntico a ti con tecnología de IA avanzada. Solo necesitas un video corto.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-indigo-600 p-3 rounded-xl">
                  <Mic className="h-6 w-6 text-white" />
                </div>
                <img 
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTkyZDI2NzQ4ZjZkMzc4YTQ5NTkyNDJkNjc3YjFiZGE5M2RhYWU4NSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/HVr4gFHYIqeti/giphy.gif"
                  alt="Voice Cloning"
                  className="w-12 h-12 rounded-xl object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Clonación de Voz</h3>
              <p className="text-gray-600">
                Tu voz digital idéntica lista para crear contenido en cualquier idioma con solo 3 minutos de audio.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-indigo-600 p-3 rounded-xl">
                  <Video className="h-6 w-6 text-white" />
                </div>
                <img 
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGY2YjMzMjY4Y2MzYjJmMmU0OWRhMDdkODcwM2JiOGFhYzBiYzg2ZiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/JIX9t2j0ZTN9S/giphy.gif"
                  alt="Video Generation"
                  className="w-12 h-12 rounded-xl object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Creación de Videos</h3>
              <p className="text-gray-600">
                Genera videos profesionales con tu avatar en minutos. Perfecto para redes sociales y marketing.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">¿Cómo funciona?</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-600 p-2 rounded-lg mt-1">
                      <BrainCircuit className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">1. Sube tu contenido</h3>
                      <p className="text-gray-600">Un video corto o 3 minutos de audio es todo lo que necesitas.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-600 p-2 rounded-lg mt-1">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">2. Creamos tu avatar</h3>
                      <p className="text-gray-600">Nuestro sistema de IA genera tu clon digital en alta calidad.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-600 p-2 rounded-lg mt-1">
                      <Share2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">3. Crea contenido</h3>
                      <p className="text-gray-600">Genera videos profesionales con tu avatar en cualquier idioma.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjg4MTU4YzI4NjZkZDQ2MTVhNDUyZDM2ZGRhY2E4NmEwZmJkYmNhMyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/l44Qqz6gO6JiVV3pu/giphy.gif"
                  alt="AI Avatar Demo" 
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para crear tu avatar digital?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Descubre cómo la tecnología de clonación de IA puede revolucionar tu creación de contenido
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-100"
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
