
import React from 'react';
import { Star } from 'lucide-react';

const ConfirmationHeader = () => {
  return (
    <div className="text-center mb-12 animate-fade-in">
      <div className="inline-block mb-6 p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full">
        <Star className="h-12 w-12 text-white animate-pulse-subtle" />
      </div>
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 text-transparent bg-clip-text">
        ¡Nos vemos en la videollamada! 🚀
      </h1>
      <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
        Exploraremos juntos cómo implementar soluciones de 
        <span className="font-bold text-blue-600"> inteligencia artificial</span> y 
        <span className="font-bold text-purple-600"> automatización</span> en tu empresa.
      </p>
      <div className="flex justify-center gap-3 mb-8">
        <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2 animate-bounce-slow">
          <MessageCircle size={18} /> Chatbot IA
        </span>
        <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full flex items-center gap-2 animate-subtle-shake">
          <Check size={18} /> Automatización
        </span>
      </div>
    </div>
  );
};

export default ConfirmationHeader;
