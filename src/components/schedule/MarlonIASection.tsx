
import React from 'react';

const MarlonIASection = () => {
  return (
    <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-xl shadow-2xl p-8 mb-12 border border-purple-300/20">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Conoce mi Marca Personal hecha con videos IA
        </h2>
        <p className="text-purple-100 text-lg max-w-3xl mx-auto leading-relaxed">
          He creado una marca personal exitosa en TikTok utilizando exclusivamente videos generados con inteligencia artificial. 
          Sin aparecer físicamente, sin grabar contenido tradicional.
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* TikTok Column */}
        <div className="flex flex-col items-center">
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-white/10">
            <blockquote 
              className="tiktok-embed" 
              cite="https://www.tiktok.com/@hackmillonario" 
              data-unique-id="hackmillonario" 
              data-embed-type="creator"
              style={{ maxWidth: '400px', minWidth: '320px', width: '100%' }}
            >
              <section>
                <a target="_blank" href="https://www.tiktok.com/@hackmillonario?refer=creator_embed">
                  @hackmillonario
                </a>
              </section>
            </blockquote>
          </div>
          <div className="mt-4 text-center">
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              🔥 Quiero crear mi marca con IA
            </button>
          </div>
        </div>

        {/* LinkedIn Column */}
        <div className="flex flex-col items-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-white/20 w-full max-w-[400px]">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Marlon Caballero</h3>
              <p className="text-purple-100 text-sm mb-4 leading-relaxed">
                Conecta conmigo en LinkedIn para contenido profesional y estrategias de crecimiento empresarial
              </p>
              <a 
                href="https://www.linkedin.com/in/marloncaballero/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#005582] transition-all font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Conectar en LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="text-center mt-8 pt-6 border-t border-white/20">
        <p className="text-white/90 mb-4">
          <span className="font-semibold">¿El resultado?</span> Una marca personal auténtica y escalable que genera engagement constante las 24/7.
        </p>
        <p className="text-purple-200 text-sm">
          Te invito a que nos mantengamos conectados y descubras cómo puedes implementar estas mismas estrategias
        </p>
      </div>

      <script async src="https://www.tiktok.com/embed.js"></script>
    </div>
  );
};

export default MarlonIASection;
