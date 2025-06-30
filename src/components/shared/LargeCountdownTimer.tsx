
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, AlertTriangle } from 'lucide-react';

interface LargeCountdownTimerProps {
  targetDate: Date;
  onExpire?: () => void;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const LargeCountdownTimer = ({ targetDate, onExpire, className = '' }: LargeCountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        const timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
        
        setTimeLeft(timeLeft);
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (!isExpired) {
          setIsExpired(true);
          onExpire?.();
        }
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onExpire, isExpired]);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  if (isExpired) {
    return (
      <Card className={`border-red-200 bg-red-50 ${className}`}>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-red-700 mb-2">¡Tiempo Agotado!</</h3>
            <p className="text-red-600">La oferta ha expirado</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg ${className}`}>
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="h-8 w-8 text-orange-600" />
            <h3 className="text-2xl font-bold text-orange-800">¡Tiempo Limitado!</h3>
          </div>
          <p className="text-orange-700 font-medium">No pierdas esta oportunidad única</p>
        </div>

        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
          {/* Days */}
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-md p-4 border-2 border-orange-100">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                {formatNumber(timeLeft.days)}
              </div>
              <div className="text-sm font-semibold text-orange-700 uppercase tracking-wide">
                Días
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-md p-4 border-2 border-orange-100">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                {formatNumber(timeLeft.hours)}
              </div>
              <div className="text-sm font-semibold text-orange-700 uppercase tracking-wide">
                Horas
              </div>
            </div>
          </div>

          {/* Minutes */}
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-md p-4 border-2 border-red-100">
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
                {formatNumber(timeLeft.minutes)}
              </div>
              <div className="text-sm font-semibold text-red-700 uppercase tracking-wide">
                Min
              </div>
            </div>
          </div>

          {/* Seconds */}
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-md p-4 border-2 border-red-100 animate-pulse">
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
                {formatNumber(timeLeft.seconds)}
              </div>
              <div className="text-sm font-semibold text-red-700 uppercase tracking-wide">
                Seg
              </div>
            </div>
          </div>
        </div>

        {/* Urgency Message */}
        <div className="text-center mt-6 p-4 bg-red-100 rounded-lg border border-red-200">
          <p className="text-red-800 font-semibold text-lg">
            ⚡ ¡Esta oferta especial termina pronto! ⚡
          </p>
          <p className="text-red-700 text-sm mt-1">
            No dejes pasar esta oportunidad única de transformar tu negocio
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
