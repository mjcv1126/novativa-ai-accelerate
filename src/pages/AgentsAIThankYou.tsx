
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, MessageCircle, ExternalLink } from 'lucide-react';

const AgentsAIThankYou = () => {
  const handleRedirect = () => {
    window.open('https://edu.novativa.org/cursos/novachannel/', '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/lovable-uploads/c2890f6b-3389-4bdd-bda7-91fb9287a818.png" 
              alt="Novativa - Agencia IA & Automatización que Acelera tu Negocio" 
              className="mx-auto h-16 md:h-20 w-auto"
            />
          </div>

          {/* Success Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-novativa-teal to-novativa-orange rounded-full animate-bounce-slow">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Main Message */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-novativa-teal to-novativa-orange bg-clip-text text-transparent">
            ¡Te hemos enviado información vía WhatsApp!
          </h1>

          {/* Video Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
              <div className="relative w-full bg-gradient-to-br from-novativa-teal/5 to-novativa-orange/5 rounded-lg border border-gray-700 overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <video 
                  autoPlay 
                  loop 
                  muted={false}
                  playsInline 
                  controls
                  preload="auto"
                  className="absolute inset-0 w-full h-full rounded-lg object-cover"
                  onError={(e) => {
                    console.error('Error loading video:', e);
                  }}
                >
                  <source src="https://gktrnjjbhqxkbcvonzxv.supabase.co/storage/v1/object/public/user-uploads/uploads/1749574034002.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento video.
                </video>
              </div>
            </div>
          </div>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Deberías estar recibiendo todos los detalles y podrás realizar la compra del mismo directamente en WhatsApp.
          </p>

          {/* WhatsApp Info */}
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MessageCircle className="w-8 h-8 text-novativa-teal" />
              <span className="text-lg font-semibold">Revisa tu WhatsApp</span>
            </div>
            <p className="text-gray-400">
              En los próximos minutos recibirás un mensaje con toda la información del curso y el enlace de compra seguro.
            </p>
          </div>

          {/* Fallback Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              ¿No has recibido un mensaje?
            </h2>
            
            <p className="text-gray-300">
              No te preocupes, también puedes acceder directamente desde aquí:
            </p>

            <Button 
              onClick={handleRedirect}
              size="lg"
              className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white text-xl px-12 py-6 animate-pulse transform hover:scale-105 transition-all"
            >
              <ExternalLink className="mr-3 h-6 w-6" />
              Regístrate Aquí
            </Button>

            <p className="text-sm text-gray-500">
              Se abrirá en una nueva pestaña
            </p>
          </div>

          {/* Additional Info */}
          <div className="mt-12 p-6 bg-gradient-to-r from-novativa-teal/10 to-novativa-orange/10 rounded-lg border border-novativa-teal/30">
            <h3 className="text-lg font-bold text-white mb-2">
              🚀 ¡Prepárate para transformar tu negocio!
            </h3>
            <p className="text-gray-300">
              Con este curso aprenderás a generar hasta $10,000 mensuales de forma pasiva creando agentes de IA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentsAIThankYou;
