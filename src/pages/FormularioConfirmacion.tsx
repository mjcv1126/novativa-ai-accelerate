
import React, { useEffect, useState } from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FormularioConfirmacion = () => {
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect to TidyCal scheduling
          window.location.href = 'https://tidycal.com/novativa/demo-gratis';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>

          {/* Main Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Formulario Enviado con Éxito!
          </h1>

          <p className="text-lg text-gray-700 mb-6">
            Ahora solo debes completar el último paso que es <strong>agendar tu llamada</strong>.
          </p>

          <p className="text-gray-600 mb-8">
            Serás redireccionado automáticamente para que puedas realizar tu llamada.
          </p>

          {/* Countdown */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Clock className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold text-blue-800">
                Redirigiendo en:
              </span>
            </div>
            
            <div className="text-6xl font-bold text-blue-600 mb-2">
              {countdown}
            </div>
            
            <div className="text-sm text-blue-700">
              segundos
            </div>
          </div>

          {/* Manual redirect option */}
          <div className="text-sm text-gray-500">
            ¿No quieres esperar?{' '}
            <a 
              href="https://tidycal.com/novativa/demo-gratis"
              className="text-blue-600 hover:text-blue-700 font-medium underline"
            >
              Haz clic aquí para agendar ahora
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormularioConfirmacion;
