
import React from 'react';
import { Video, BrainCircuit, Mic, Share2, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ContentGeneration = () => {
  return <>
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Clona tu Voz y Avatar para Contenido Automatizado
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Crea flujos autónomos de contenido con tu clon digital y IA avanzada
            </p>
            <div className="relative max-w-4xl mx-auto">
              <video 
                autoPlay 
                loop 
                muted={false}
                playsInline 
                controls
                preload="auto"
                className="rounded-xl shadow-2xl w-full"
                onError={(e) => {
                  console.error('Error loading video:', e);
                }}
                onLoadStart={() => {
                  console.log('Video started loading');
                }}
                onCanPlay={() => {
                  console.log('Video can play');
                }}
                onLoadedData={() => {
                  console.log('Video data loaded');
                }}
              >
                <source src="https://gktrnjjbhqxkbcvonzxv.supabase.co/storage/v1/object/public/user-uploads/uploads/1749325088429.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento video.
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
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <img alt="AI Avatar Creation" className="w-12 h-12 rounded-xl object-cover" src="https://school.mangoanimate.com/wp-content/uploads/2024/08/AI-talking-avatar.gif" />
              </div>
              <h3 className="text-xl font-bold mb-3">Avatar Inteligente</h3>
              <p className="text-gray-600">
                Tu avatar digital actúa de forma autónoma, creando contenido según tus preferencias y estilo.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-indigo-600 p-3 rounded-xl">
                  <Mic className="h-6 w-6 text-white" />
                </div>
                <img alt="Voice Cloning" className="w-12 h-12 rounded-xl object-cover" src="https://i.pinimg.com/originals/19/e4/21/19e421ce92a12f4bfdc1171abb28486c.gif" />
              </div>
              <h3 className="text-xl font-bold mb-3">Clonación de Voz</h3>
              <p className="text-gray-600">
                Genera contenido en múltiples idiomas con tu voz clonada, manteniendo tu tono y estilo personal.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-indigo-600 p-3 rounded-xl">
                  <BrainCircuit className="h-6 w-6 text-white" />
                </div>
                <img alt="Autonomous Creation" className="w-12 h-12 rounded-xl object-cover" src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWl3aHByNjExanh3aXNncTZ0cm9lZ2RncGlqZmdmZ21ldGJkcmJ6OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OQKfMFE85TeOCJ88EB/giphy.gif" />
              </div>
              <h3 className="text-xl font-bold mb-3">Flujos Autónomos</h3>
              <p className="text-gray-600">
                Automatiza la creación de contenido con flujos personalizados y programación inteligente.
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
                      <h3 className="font-bold mb-2">1. Configura tu Avatar</h3>
                      <p className="text-gray-600">Entrena tu clon digital con videos cortos y muestras de voz.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-600 p-2 rounded-lg mt-1">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">2. Define tus flujos</h3>
                      <p className="text-gray-600">Establece reglas y patrones para la generación automática de contenido.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-600 p-2 rounded-lg mt-1">
                      <Share2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">3. Automatiza</h3>
                      <p className="text-gray-600">Tu avatar genera y publica contenido de forma autónoma siguiendo tus pautas.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img alt="AI Automation Flow" className="rounded-xl shadow-lg w-full" src="https://miro.medium.com/v2/resize:fit:1400/1*aZuI7LYUUlk-cA_foVCL6A.gif" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>;
};

export default ContentGeneration;
