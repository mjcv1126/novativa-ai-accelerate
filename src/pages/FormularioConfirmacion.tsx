import React, { useState, useEffect } from 'react';
import NovativaLogo from '@/components/shared/NovativaLogo';
import { useInterval } from '@/hooks/useInterval';

const FormularioConfirmacion = () => {
  const [countdown, setCountdown] = useState(9);

  // Hide Botsify widget on this page
  useEffect(() => {
    const hideBotsifyWidget = () => {
      const style = document.createElement('style');
      style.id = 'hide-botsify-widget';
      style.textContent = `
        #webbot-container,
        #webbot-iframe,
        .webbot-container,
        .webbot-iframe,
        [id*="webbot"],
        [class*="webbot"],
        script[src*="chat.novativa.org"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          z-index: -9999 !important;
        }
      `;
      document.head.appendChild(style);
    };

    hideBotsifyWidget();

    return () => {
      const existingStyle = document.getElementById('hide-botsify-widget');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  // Countdown timer and redirect
  useInterval(() => {
    if (countdown > 0) {
      setCountdown(prev => prev - 1);
    }
  }, 1000);

  useEffect(() => {
    if (countdown === 0) {
      window.location.href = 'https://tidycal.com/novativa/demo-gratis';
    }
  }, [countdown]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <NovativaLogo size="large" />
        </div>

        {/* Success message */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            ¡Tu información ha sido enviada exitosamente!
          </h1>
          
          {/* Highlighted scheduling instruction */}
          <div className="bg-gradient-to-r from-blue-100 via-purple-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6 mb-8 shadow-md">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-blue-500 rounded-full p-2 mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-blue-600 font-bold text-sm uppercase tracking-wide">Siguiente paso</span>
            </div>
            <p className="text-xl font-bold text-gray-800 leading-relaxed">
              Ahora solo debes agendar tu videollamada en la fecha y hora de tu preferencia.
            </p>
            <div className="mt-3 text-blue-600 font-medium">
              📅 ¡Es muy importante que completes este paso!
            </div>
          </div>
          
          {/* Countdown */}
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-gray-700 font-medium">
              Serás redireccionado en {countdown} segundos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioConfirmacion;
