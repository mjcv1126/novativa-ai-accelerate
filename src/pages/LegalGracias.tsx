
import React from 'react';
import { CheckCircle, MessageCircle, Calendar, ArrowLeft } from 'lucide-react';

const WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=50433703214&text=Hola%2C%20acabo%20de%20agendar%20mi%20cita%20y%20quiero%20confirmarla.';
const HERO_VIDEO_URL = 'https://www.marlonhn.com/wp-content/uploads/2026/03/justice-and-law-concept-on-wooden-background-8P6DQK4.mp4';

const LegalGracias = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 font-sans flex flex-col relative">
      {/* Background Video */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          src={HERO_VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          className="pointer-events-none object-cover w-full h-full absolute inset-0"
        />
        <div className="absolute inset-0 bg-[#0a0a0f]/75 pointer-events-none" />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full border-b border-amber-900/20 bg-[#0a0a0f]/60 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/legal" className="shrink-0">
            <img src="/novalegal-logo.png" alt="NovaLegal" className="h-10 md:h-12 w-auto" />
          </a>
          <a href="/legal" className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors text-sm">
            <ArrowLeft size={16} />
            Volver
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full text-center space-y-8">
          {/* Profile Photo + Name */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-amber-500 via-amber-700 to-amber-900 rounded-full blur-sm opacity-60" />
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-amber-700/50 shadow-2xl shadow-amber-900/20">
                <img src="/dennisse-profile.png" alt="Abogada Dennisse Cuéllar" className="w-full h-full object-cover object-top scale-110" />
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Abogada <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Dennisse Cuéllar</span>
            </h2>
          </div>

          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-20 h-20 bg-emerald-900/30 border-2 border-emerald-500/40 rounded-full flex items-center justify-center">
                <CheckCircle className="text-emerald-400" size={40} />
              </div>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              ¡Muchas gracias por agendar tu cita!
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Tu reservación ha sido registrada exitosamente. <br className="hidden md:block" />
              <span className="text-amber-400 font-medium">¡Te esperamos!</span>
            </p>
          </div>

          {/* Calendar Info */}
          <div className="bg-gray-900/60 border border-amber-900/20 rounded-xl p-6 space-y-3 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-amber-400">
              <Calendar size={20} />
              <span className="font-semibold">Último paso</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Para confirmar tu cita, escríbenos por WhatsApp indicando que ya realizaste tu reservación. Así podremos preparar todo para atenderte.
            </p>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg rounded-xl transition-all hover:scale-105 shadow-lg shadow-emerald-900/30"
          >
            <MessageCircle size={24} />
            Confirmar por WhatsApp
          </a>

          <p className="text-gray-500 text-sm">
            Al hacer clic serás redirigido a WhatsApp para enviar tu confirmación.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-amber-900/10 py-6 text-center">
        <p className="text-gray-600 text-xs">
          Powered by{' '}
          <a href="/" className="text-amber-600 hover:text-amber-400 transition-colors">Novativa</a>
        </p>
      </footer>
    </div>
  );
};

export default LegalGracias;
