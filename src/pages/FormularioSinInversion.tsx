
import React, { useEffect } from 'react';
import NovativaLogo from '@/components/shared/NovativaLogo';
import { TiktokIcon } from '@/components/shared/TiktokIcon';

const FormularioSinInversion = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <NovativaLogo size="large" />
        </div>

        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            ¡Gracias por tu interés!
          </h1>
          
          <p className="text-lg text-gray-600 mb-4">
            Tus datos han sido enviados exitosamente.
          </p>
          
          <p className="text-lg text-gray-600 mb-8">
            Lamentablemente, nuestros precios ya están establecidos y, al no contar con la inversión necesaria, no podemos continuar con el proceso en este momento.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Pero no te vayas aún.
            </h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Te invitamos a mantenerte conectado con nuestras redes sociales, especialmente en TikTok, donde compartimos dinámicas exclusivas, sorteos y regalías para emprendedores como tú: webs gratis, jingles personalizados y mucho más.
            </p>
            
            <p className="text-gray-700 mb-8 font-medium">
              Síguenos y mantente atento a nuestras próximas oportunidades.<br />
              Tu momento puede estar más cerca de lo que imaginas.
            </p>

            {/* TikTok Embed */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-center gap-3 mb-4">
                <TiktokIcon className="w-8 h-8 text-black" />
                <h3 className="text-xl font-bold text-gray-800">Síguenos en TikTok</h3>
              </div>
              
              <div className="w-full max-w-md mx-auto">
                <iframe
                  src="https://www.tiktok.com/embed/@hackmillonario"
                  width="100%"
                  height="500"
                  frameBorder="0"
                  scrolling="no"
                  allow="encrypted-media"
                  className="rounded-lg"
                  title="TikTok Hack Millonario"
                />
              </div>
              
              <a
                href="https://www.tiktok.com/@hackmillonario"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                <TiktokIcon className="w-5 h-5" />
                Visitar @hackmillonario
              </a>
            </div>
          </div>

          {/* Additional encouragement */}
          <div className="text-center p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
            <p className="text-gray-700 font-medium">
              🚀 ¡Las oportunidades llegan cuando menos las esperas!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioSinInversion;
