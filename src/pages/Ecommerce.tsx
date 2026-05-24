import React, { useEffect, useRef } from 'react';
import { ShoppingCart, CreditCard, Package, Globe, Zap, Shield, TrendingUp, Smartphone, Check, Sparkles, Store, BarChart3 } from 'lucide-react';

const CTA_URL = 'https://tidycal.com/hackmillonario/desarrollo-ia';

const ParticlesBG: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * devicePixelRatio);

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    window.addEventListener('resize', onResize);

    const COUNT = 80;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.4 * devicePixelRatio,
      r: (Math.random() * 1.6 + 0.6) * devicePixelRatio,
      hue: Math.random() > 0.5 ? 280 : 180,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const max = 140 * devicePixelRatio;
          if (dist < max) {
            ctx.strokeStyle = `hsla(${(p.hue + q.hue) / 2}, 90%, 65%, ${0.18 * (1 - dist / max)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = `hsla(${p.hue}, 95%, 70%, 0.85)`;
        ctx.shadowColor = `hsla(${p.hue}, 95%, 70%, 0.9)`;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

const Ecommerce: React.FC = () => {
  useEffect(() => {
    document.title = 'E-commerce y Páginas Web a Medida | $600 | Novativa';
    const meta = document.querySelector('meta[name="description"]');
    const desc = 'Desarrollamos tu tienda online, página web o catálogo con pasarela de pago integrada. Precio único de $600. Agenda una llamada hoy.';
    if (meta) meta.setAttribute('content', desc);
    else {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = desc;
      document.head.appendChild(m);
    }
  }, []);

  const features = [
    { icon: ShoppingCart, title: 'Tienda Online Completa', desc: 'Catálogo, carrito, checkout y gestión de inventario listos para vender.' },
    { icon: CreditCard, title: 'Pasarela de Pago Integrada', desc: 'Stripe, PayPal, transferencias y métodos locales conectados desde el día uno.' },
    { icon: Smartphone, title: '100% Responsive', desc: 'Diseñado mobile-first. Tu tienda se ve perfecta en cualquier dispositivo.' },
    { icon: Zap, title: 'Velocidad Optimizada', desc: 'Carga ultra rápida para maximizar conversiones y posicionamiento SEO.' },
    { icon: Shield, title: 'SSL y Seguridad', desc: 'Certificados SSL, protección de datos y cumplimiento de buenas prácticas.' },
    { icon: BarChart3, title: 'Analítica y Pixel', desc: 'Google Analytics, Meta Pixel y eventos de conversión configurados.' },
  ];

  const includes = [
    'Diseño UI/UX personalizado a tu marca',
    'Hasta páginas/productos ilimitados',
    'Pasarela de pago (Stripe, PayPal u otra)',
    'Panel de administración intuitivo',
    'Optimización SEO on-page',
    'Integración con WhatsApp Business',
    'Formularios de contacto y captura de leads',
    'Hosting y dominio configurado',
    'Capacitación para que gestiones tu sitio',
    'Soporte post-lanzamiento',
  ];

  const projectTypes = [
    { icon: Store, title: 'E-commerce', desc: 'Tienda online con carrito y pagos en línea.' },
    { icon: Globe, title: 'Páginas Web', desc: 'Sitios corporativos, landing pages y portafolios.' },
    { icon: Package, title: 'Catálogos', desc: 'Catálogos digitales con cotización vía WhatsApp.' },
  ];

  return (
    <div className="relative min-h-screen bg-[#05010f] text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.25),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(236,72,153,0.20),_transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(34,211,238,0.18),_transparent_50%)]" />
        <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-fuchsia-600/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-32 w-[420px] h-[420px] rounded-full bg-cyan-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1.2s' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-violet-600/20 blur-3xl animate-pulse" style={{ animationDelay: '2.4s' }} />
        <ParticlesBG />
        {/* grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-20 border-b border-white/10 backdrop-blur-md bg-black/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="shrink-0">
            <img
              alt="Novativa"
              className="h-8 md:h-10 w-auto object-contain"
              src="/lovable-uploads/876bbab1-6c0b-4434-ba8d-c6e774f6d16d.png"
            />
          </a>
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:from-fuchsia-400 hover:to-violet-500 transition-all font-semibold text-sm shadow-lg shadow-fuchsia-500/30"
          >
            Agendar llamada
          </a>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO */}
        <section className="px-4 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-200 text-xs md:text-sm font-medium backdrop-blur-sm mb-6 animate-fade-in">
              <Sparkles size={14} />
              Desarrollo web profesional · Pago 50/50
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
              Lanza tu{' '}
              <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
                E-commerce
              </span>
              <br />
              que vende mientras duermes
            </h1>
            <p className="mt-6 text-base md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Tienda online, página web o catálogo digital con{' '}
              <span className="text-cyan-300 font-semibold">pasarela de pago integrada</span>, diseño
              premium y todo lo que necesitas para vender en internet.
            </p>

            {/* Price block */}
            <div className="mt-10 inline-block relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 rounded-2xl blur opacity-60 animate-pulse" />
              <div className="relative bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-6">
                <div className="text-xs uppercase tracking-widest text-gray-400 mb-1">Precio único</div>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                    $600
                  </span>
                  <span className="text-gray-400 text-sm">USD</span>
                </div>
                <div className="mt-2 text-sm text-gray-300">
                  <span className="text-fuchsia-300 font-semibold">50%</span> para arrancar ·{' '}
                  <span className="text-cyan-300 font-semibold">50%</span> al finalizar
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:from-fuchsia-400 hover:to-violet-500 transition-all font-bold shadow-2xl shadow-fuchsia-500/40 hover:shadow-fuchsia-500/60 hover:scale-105"
              >
                <Zap size={18} />
                Agendar mi llamada
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all font-semibold"
              >
                Ver qué incluye
              </a>
            </div>
          </div>
        </section>

        {/* Project Types */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-4">
              Un solo precio para{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
                tres tipos de proyecto
              </span>
            </h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
              Sea cual sea tu negocio, este desarrollo se adapta a lo que necesitas vender online.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {projectTypes.map((p, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl p-px bg-gradient-to-br from-white/20 via-white/5 to-transparent hover:from-fuchsia-400/60 hover:via-violet-400/30 transition-all"
                >
                  <div className="relative h-full rounded-2xl bg-black/60 backdrop-blur-xl p-8 text-center">
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 border border-fuchsia-400/20 mb-4 group-hover:scale-110 transition-transform">
                      <p.icon className="text-fuchsia-300" size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                    <p className="text-gray-400 text-sm">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-200 text-xs font-medium mb-4">
                <TrendingUp size={14} /> Lo que recibes
              </div>
              <h2 className="text-3xl md:text-5xl font-bold">
                Todo lo necesario para{' '}
                <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  vender online
                </span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 hover:border-fuchsia-400/40 hover:bg-white/[0.06] transition-all"
                >
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-fuchsia-500/10 blur-2xl group-hover:bg-fuchsia-500/20 transition-all" />
                  <f.icon className="text-fuchsia-300 mb-4" size={28} />
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Includes list + price card */}
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ¿Qué incluye tu{' '}
                <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
                  desarrollo?
                </span>
              </h2>
              <p className="text-gray-400 mb-8">
                Un paquete completo, sin sorpresas. Todo lo que necesitas para empezar a generar
                ingresos online desde el primer día.
              </p>
              <ul className="space-y-3">
                {includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center shadow-md shadow-fuchsia-500/40">
                      <Check size={14} className="text-white" strokeWidth={3} />
                    </div>
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing card */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 rounded-3xl blur-xl opacity-40" />
              <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-black/80 to-black/50 backdrop-blur-xl p-8 md:p-10">
                <div className="flex items-center gap-2 text-fuchsia-300 text-sm font-semibold mb-2">
                  <Sparkles size={16} /> Plan único
                </div>
                <h3 className="text-2xl font-bold mb-1">Desarrollo Web Pro</h3>
                <p className="text-gray-400 text-sm mb-6">E-commerce, web o catálogo</p>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-6xl font-extrabold bg-gradient-to-r from-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                    $600
                  </span>
                  <span className="text-gray-400">USD</span>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-sm text-gray-300">Pago inicial</span>
                    <span className="font-bold text-fuchsia-300">$300 (50%)</span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-sm text-gray-300">Al finalizar</span>
                    <span className="font-bold text-cyan-300">$300 (50%)</span>
                  </div>
                </div>

                <a
                  href={CTA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:from-fuchsia-400 hover:to-violet-500 transition-all font-bold shadow-xl shadow-fuchsia-500/30 hover:scale-[1.02]"
                >
                  <Zap size={18} />
                  Quiero mi sitio web
                </a>
                <p className="text-center text-xs text-gray-500 mt-4">
                  Sin costos ocultos · Soporte incluido
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects showcase */}
        <section className="px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 mb-4">
                <Sparkles size={14} className="text-fuchsia-300" />
                Proyectos desarrollados
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Algunos sitios{' '}
                <span className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                  que ya están en línea
                </span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Clientes reales, tiendas y catálogos lanzados por nuestro equipo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'TecExpress HN', url: 'https://tecexpresshn.com/' },
                { name: 'Alliance Trading Corp', url: 'https://alliancetradingcorp.com/' },
                { name: 'Fudgo', url: 'https://fudgo.com/' },
                { name: 'Buzo App', url: 'https://buzoapp.com/' },
                { name: 'Yojoa Chocolate', url: 'https://yojoachocolate.com/' },
                { name: 'The Gold Macaw Coffee', url: 'https://thegoldmacawcoffee.com/' },
                { name: 'VYM Honduras', url: 'https://www.vymhonduras.com/' },
                { name: 'BeSafe Product', url: 'https://besafe-product.com/' },
              ].map((p) => {
                const host = p.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
                const shot = `https://image.thum.io/get/width/800/crop/600/noanimate/${p.url}`;
                return (
                  <a
                    key={p.url}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur hover:border-fuchsia-400/40 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-fuchsia-500/20"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-violet-900/40 to-fuchsia-900/30">
                      <img
                        src={shot}
                        alt={`Vista previa de ${p.name}`}
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-white truncate">{p.name}</h3>
                        <Globe size={14} className="text-fuchsia-300 shrink-0" />
                      </div>
                      <p className="text-xs text-gray-400 truncate mt-1">{host}</p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}

        <section className="px-4 py-24">
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 rounded-3xl blur-2xl opacity-30" />
            <div className="relative rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl p-10 md:p-16 text-center overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-fuchsia-500/20 blur-3xl rounded-full" />
              <div className="relative">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  ¿Listo para llevar tu negocio{' '}
                  <span className="bg-gradient-to-r from-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                    al siguiente nivel?
                  </span>
                </h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Agenda una llamada gratuita y conversemos sobre tu proyecto. Te mostramos cómo
                  podemos lanzar tu tienda en cuestión de días.
                </p>
                <a
                  href={CTA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:from-fuchsia-400 hover:to-violet-500 transition-all font-bold text-lg shadow-2xl shadow-fuchsia-500/40 hover:scale-105"
                >
                  <Zap size={20} />
                  Agendar mi llamada ahora
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Novativa · Desarrollo web a medida
      </footer>
    </div>
  );
};

export default Ecommerce;
