import React from 'react';
import { Smartphone, Star, Download, ExternalLink, Sparkles, ShoppingBag } from 'lucide-react';

const APP_URL = 'https://play.google.com/store/apps/details?id=com.tribuimportadora.app&hl=es_419';
const APP_ICON = 'https://play-lh.googleusercontent.com/7jB8d7nCQIsyltAokikfqPe75h4o4KxHLYhocjQhpYuEYewssLmz_AeDannBXLOtdcaB-NzoLmsiIIeZ00VNSMo';

const LatestProject: React.FC = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 mb-4">
            <Sparkles size={14} className="text-fuchsia-300" />
            Proyecto más reciente
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Lanzamiento{' '}
            <span className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              destacado
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            App nativa publicada en Google Play, desarrollada con nuestro stack de IA Coding.
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />

          <div className="relative rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
              {/* Icon / preview */}
              <div className="md:col-span-2 relative p-8 md:p-10 flex items-center justify-center bg-gradient-to-br from-fuchsia-500/10 via-violet-500/10 to-cyan-400/10 border-b md:border-b-0 md:border-r border-white/10">
                <div className="relative">
                  <div className="absolute -inset-6 bg-fuchsia-500/30 rounded-3xl blur-2xl animate-pulse" />
                  <img
                    src={APP_ICON}
                    alt="Icono de App Tribu Importadora"
                    className="relative w-44 h-44 md:w-56 md:h-56 rounded-3xl shadow-2xl shadow-fuchsia-500/30 border border-white/10"
                  />
                  <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg border-2 border-black">
                    <Smartphone size={22} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="md:col-span-3 p-8 md:p-10">
                <div className="flex items-center gap-2 text-xs text-fuchsia-300 mb-3">
                  <ShoppingBag size={14} />
                  E-commerce · Marketplace móvil
                </div>
                <h3 className="text-2xl md:text-4xl font-bold mb-3">App Tribu Importadora</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Aplicación móvil nativa para Android que conecta a los clientes con el catálogo
                  completo de Tribu Importadora. Incluye carrito de compras, navegación de categorías,
                  notificaciones push y experiencia optimizada para compras desde el celular.
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                    <Star size={16} className="text-yellow-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-400">Publicada</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                    <Smartphone size={16} className="text-cyan-300 mx-auto mb-1" />
                    <div className="text-xs text-gray-400">Plataforma</div>
                    <div className="text-sm font-semibold">Android</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                    <Download size={16} className="text-emerald-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-400">Estado</div>
                    <div className="text-sm font-semibold">En vivo</div>
                  </div>
                </div>

                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:from-fuchsia-400 hover:to-violet-500 transition-all font-semibold shadow-lg shadow-fuchsia-500/30 hover:scale-105"
                >
                  Ver en Google Play
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestProject;
