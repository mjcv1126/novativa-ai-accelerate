import React from 'react';

const ChinaImportSection = () => {
  return (
    <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center py-4">
        <p className="text-gray-400 text-sm">Esto también puede interesarte</p>
      </div>
      <a 
        href="https://webinar.buzoapp.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full hover:bg-gray-800/50 transition-colors group"
      >
        <div className="relative py-8 px-4 md:px-8">
          {/* Decorative orange accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500"></div>
          
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
            {/* Facebook Video */}
            <div className="flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
              <iframe 
                src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F953033913657001%2F&show_text=false&width=267&t=0" 
                width="150" 
                height="260" 
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no" 
                frameBorder="0" 
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                🚢 Aprende a Importar de China
              </h3>
              <p className="text-gray-300 text-base md:text-lg mb-4 max-w-2xl">
                Te enseñamos GRATIS cómo buscar proveedores en China por Alibaba de forma segura y llevar tu mercancía hasta la puerta de tu negocio o casa. Asesoría gratuita + comunidad exclusiva.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium">Compras Seguras</span>
                <span className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium">Envío Marítimo</span>
                <span className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium">Nacionalización</span>
                <span className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium">Comunidad</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold text-lg group-hover:from-orange-600 group-hover:to-orange-700 transition-all shadow-lg">
                Más Info
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>

          {/* Bottom decorative line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500"></div>
        </div>
      </a>
    </div>
  );
};

export default ChinaImportSection;
