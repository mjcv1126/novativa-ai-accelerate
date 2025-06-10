
import React from 'react';
import { useWeeklyCountdown } from '@/hooks/useWeeklyCountdown';
import { Clock, Zap } from 'lucide-react';

const PromotionCountdown = () => {
  const { days, hours, minutes, seconds } = useWeeklyCountdown();

  return (
    <div className="bg-gradient-to-r from-red-600/20 to-novativa-orange/20 rounded-xl p-6 border-2 border-red-500/50 animate-subtle-shake mb-8">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Zap className="w-6 h-6 text-red-500 mr-2 animate-pulse" />
          <h3 className="text-xl md:text-2xl font-bold text-red-500">
            ¡PROMOCIÓN ESPECIAL TERMINA PRONTO!
          </h3>
          <Zap className="w-6 h-6 text-red-500 ml-2 animate-pulse" />
        </div>
        
        <p className="text-gray-300 mb-6 text-sm md:text-base">
          Precio especial de $4.99 disponible solo hasta el próximo sábado
        </p>
        
        <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-md mx-auto">
          <div className="bg-black/50 rounded-lg p-3 md:p-4 border border-red-500/30">
            <div className="text-2xl md:text-3xl font-bold text-red-500">{days.toString().padStart(2, '0')}</div>
            <div className="text-xs md:text-sm text-gray-400">Días</div>
          </div>
          <div className="bg-black/50 rounded-lg p-3 md:p-4 border border-red-500/30">
            <div className="text-2xl md:text-3xl font-bold text-red-500">{hours.toString().padStart(2, '0')}</div>
            <div className="text-xs md:text-sm text-gray-400">Horas</div>
          </div>
          <div className="bg-black/50 rounded-lg p-3 md:p-4 border border-red-500/30">
            <div className="text-2xl md:text-3xl font-bold text-red-500">{minutes.toString().padStart(2, '0')}</div>
            <div className="text-xs md:text-sm text-gray-400">Min</div>
          </div>
          <div className="bg-black/50 rounded-lg p-3 md:p-4 border border-red-500/30">
            <div className="text-2xl md:text-3xl font-bold text-red-500 animate-pulse">{seconds.toString().padStart(2, '0')}</div>
            <div className="text-xs md:text-sm text-gray-400">Seg</div>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-center">
          <Clock className="w-4 h-4 text-red-500 mr-2" />
          <p className="text-red-400 font-semibold text-sm md:text-base">
            Después vuelve a $497 USD
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromotionCountdown;
