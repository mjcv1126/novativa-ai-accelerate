import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, ArrowRight, Loader2 } from 'lucide-react';

const BriefThankYou = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-novativa-darkBlue via-novativa-darkBlue to-novativa-teal flex items-center justify-center p-4">
      <Card className="max-w-lg w-full shadow-2xl border-0">
        <CardContent className="pt-12 pb-10 px-8 text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping"></div>
              <div className="relative bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-4">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-novativa-teal to-novativa-lightBlue bg-clip-text text-transparent">
              ¡Gracias por enviar tu información!
            </h1>
            <p className="text-muted-foreground text-lg">
              Tus datos han sido enviados exitosamente. Nuestro equipo revisará tu brief y te contactará pronto.
            </p>
          </div>

          {/* Countdown */}
          <div className="bg-muted/50 rounded-xl py-4 px-6">
            <p className="text-sm text-muted-foreground mb-2">
              Serás redirigido a la página de inicio en
            </p>
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-novativa-teal" />
              <span className="text-3xl font-bold text-novativa-darkBlue">{countdown}</span>
              <span className="text-muted-foreground">segundos</span>
            </div>
          </div>

          {/* Schedule Call Option */}
          <div className="border-t pt-6 space-y-3">
            <p className="text-sm text-muted-foreground">
              ¿Necesitas contactarnos urgentemente?
            </p>
            <Button 
              onClick={() => navigate('/contacto')}
              className="w-full bg-gradient-to-r from-novativa-teal to-novativa-lightBlue hover:from-novativa-teal/90 hover:to-novativa-lightBlue/90 text-white font-semibold py-6 text-lg"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Agendar videollamada
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BriefThankYou;
