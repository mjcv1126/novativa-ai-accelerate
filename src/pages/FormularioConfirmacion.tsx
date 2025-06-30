
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, Clock, Star, ArrowRight, Gift } from 'lucide-react';
import { LargeCountdownTimer } from '@/components/shared/LargeCountdownTimer';

export default function FormularioConfirmacion() {
  const [showSpecialOffer, setShowSpecialOffer] = useState(false);
  
  // Set countdown to 24 hours from now
  const countdownTarget = new Date(Date.now() + 24 * 60 * 60 * 1000);

  useEffect(() => {
    // Show special offer after 3 seconds
    const timer = setTimeout(() => {
      setShowSpecialOffer(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleCountdownExpire = () => {
    console.log('Countdown expired - offer ended');
  };

  const handleScheduleCall = () => {
    window.open('https://calendly.com/novativa', '_blank');
  };

  const handleSpecialOffer = () => {
    window.open('https://novativa.org/pricing', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Success Message */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardContent className="text-center p-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              ¡Formulario Enviado Exitosamente!
            </h1>
            <p className="text-green-700 text-lg">
              Gracias por tu interés. Nos pondremos en contacto contigo muy pronto.
            </p>
          </CardContent>
        </Card>

        {/* Large Countdown Timer */}
        <div className="mb-8">
          <LargeCountdownTimer 
            targetDate={countdownTarget}
            onExpire={handleCountdownExpire}
            className="w-full"
          />
        </div>

        {/* Special Offer Card */}
        {showSpecialOffer && (
          <Card className="mb-8 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 animate-fade-in">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Gift className="h-8 w-8 text-purple-600" />
                <CardTitle className="text-2xl text-purple-800">
                  ¡Oferta Especial Solo Por Hoy!
                </CardTitle>
              </div>
              <p className="text-purple-700">
                Como acabas de completar el formulario, tienes acceso a un descuento exclusivo
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-white rounded-lg p-6 mb-6 border-2 border-purple-200">
                <div className="text-6xl font-bold text-purple-600 mb-2">50%</div>
                <div className="text-xl font-semibold text-purple-800 mb-2">DE DESCUENTO</div>
                <div className="text-purple-700">En tu primer mes de cualquier plan</div>
              </div>
              
              <Button 
                onClick={handleSpecialOffer}
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-4 animate-pulse"
              >
                <Star className="h-5 w-5 mr-2" />
                Aprovechar Oferta Ahora
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              
              <p className="text-sm text-purple-600 mt-4">
                * Válido solo durante las próximas 24 horas
              </p>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-gray-800">
              ¿Qué Sigue Ahora?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  1. Agenda una Llamada
                </h3>
                <p className="text-gray-600 mb-4">
                  Reserva 30 minutos para una consulta personalizada gratuita
                </p>
                <Button 
                  onClick={handleScheduleCall}
                  variant="outline" 
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendar Ahora
                </Button>
              </div>
              
              <div className="text-center">
                <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  2. Respuesta Rápida
                </h3>
                <p className="text-gray-600 mb-4">
                  Te contactaremos en las próximas 2-4 horas hábiles
                </p>
                <div className="text-orange-600 font-semibold">
                  ⏱️ Tiempo de respuesta promedio: 2 horas
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card className="bg-gray-50">
          <CardContent className="text-center p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Mientras Esperas...
            </h3>
            <p className="text-gray-600 mb-4">
              Explora nuestros casos de éxito y descubre cómo hemos ayudado a otras empresas
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => window.open('https://novativa.org/services', '_blank')}
                className="text-blue-600 hover:bg-blue-50"
              >
                Ver Servicios
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => window.open('https://novativa.org/pricing', '_blank')}
                className="text-green-600 hover:bg-green-50"
              >
                Ver Precios
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
