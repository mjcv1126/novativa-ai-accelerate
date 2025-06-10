
import { useState, useEffect } from 'react';

export function useWeeklyCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      
      // Calcular el próximo sábado a las 6pm
      const nextSaturday = new Date();
      const daysUntilSaturday = (6 - now.getDay() + 7) % 7;
      
      // Si es sábado y aún no son las 6pm, usar hoy
      if (now.getDay() === 6 && now.getHours() < 18) {
        nextSaturday.setDate(now.getDate());
      } else {
        // Si es sábado después de las 6pm o cualquier otro día, ir al próximo sábado
        nextSaturday.setDate(now.getDate() + (daysUntilSaturday || 7));
      }
      
      nextSaturday.setHours(18, 0, 0, 0); // 6pm
      
      const difference = nextSaturday.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}
