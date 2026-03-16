
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, ChevronUp, Phone, Mail, MapPin, MessageCircle, Calendar, Scale, Shield, FileText, Users, Home, Truck, CheckCircle, Gavel, Menu, X, Facebook, Instagram } from 'lucide-react';
import { TiktokIcon } from '@/components/shared/TiktokIcon';

const WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=50482524225';
const CALENDAR_URL = 'https://tidycal.com/team/dennisse-cuellar/legal';
const SOCIAL_LINKS = {
  tiktok: 'https://www.tiktok.com/@dennisse.cuellar',
  facebook: 'https://www.facebook.com/novalegalhn',
  instagram: 'https://www.instagram.com/novalegalhn',
};

const SocialIcons = ({ className = '', iconSize = 18 }: { className?: string; iconSize?: number }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-amber-400 transition-colors"><Facebook size={iconSize} /></a>
    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-amber-400 transition-colors"><Instagram size={iconSize} /></a>
    <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-amber-400 transition-colors"><TiktokIcon className={`w-[${iconSize}px] h-[${iconSize}px]`} style={{ width: iconSize, height: iconSize }} /></a>
  </div>
);

/* ───── Scroll-triggered animation hook ───── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ───── Parallax hook ───── */
function useParallax(speed = 0.3) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handler = () => setOffset(window.scrollY * speed);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [speed]);
  return offset;
}

/* ───── Animated counter ───── */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const { ref, visible } = useScrollReveal();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1500;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ───── FAQ Item ───── */
const FAQItem = ({ question, answer }: { question: string; answer: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`border border-amber-900/30 rounded-lg overflow-hidden transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-amber-950/20 transition-colors"
      >
        <span className="text-amber-100 font-medium pr-4">{question}</span>
        {open ? <ChevronUp className="text-amber-500 shrink-0" size={20} /> : <ChevronDown className="text-amber-500 shrink-0" size={20} />}
      </button>
      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-gray-400 leading-relaxed">{answer}</div>
        </div>
      </div>
    </div>
  );
};

/* ───── Service Card ───── */
const ServiceCard = ({ icon: Icon, title, description, items, delay }: { icon: React.ElementType; title: string; description: string; items: string[]; delay: number }) => {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`bg-gradient-to-br from-gray-900 to-gray-950 border border-amber-900/20 rounded-2xl p-8 hover:border-amber-700/40 hover:shadow-[0_0_30px_rgba(217,119,6,0.08)] hover:-translate-y-1 transition-all duration-700 group ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="w-14 h-14 bg-amber-900/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-amber-900/30 group-hover:scale-110 transition-all duration-300">
        <Icon className="text-amber-500" size={28} />
      </div>
      <h3 className="text-xl font-bold text-amber-100 mb-3">{title}</h3>
      <p className="text-gray-400 mb-5 text-sm leading-relaxed">{description}</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
            <CheckCircle className="text-amber-600 shrink-0 mt-0.5" size={16} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
/* ───── News Ticker ───── */
const TICKER_SERVICES = [
  '⚖️ Constitución de Empresas',
  '📄 Poderes y Autorizaciones',
  '🔏 Documentación Notarial',
  '👨‍👩‍👧 Actos Patrimoniales y Familiares',
  '🏠 Compraventa de Bienes',
  '✈️ Envío Internacional de Documentos',
  '📋 Testamentos y Herencias',
  '💼 Sociedades S. de R.L.',
  '🏢 Sociedades Anónimas',
  '✅ Autenticación de Documentos',
  '📝 Matrimonios y Divorcios',
  '🔐 Protección de Patrimonio',
];

const NewsTicker = () => (
  <div className="bg-gradient-to-r from-amber-900/40 via-amber-800/30 to-amber-900/40 border-b border-amber-900/20 overflow-hidden whitespace-nowrap">
    <div className="inline-flex animate-[ticker_35s_linear_infinite]">
      {[...TICKER_SERVICES, ...TICKER_SERVICES].map((s, i) => (
        <span key={i} className="inline-flex items-center px-6 py-1.5 text-xs text-amber-300/80 font-medium">
          {s}
          <span className="mx-4 text-amber-700/50">•</span>
        </span>
      ))}
    </div>
  </div>
);

/* ───── Hero Video Background ───── */
const HERO_VIDEOS = ['rFygb2YoQ0A', 'Asylmg8PPCg', 'U6PjNf0Vj6E'];

const HeroVideoBackground = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % HERO_VIDEOS.length);
    }, 20000); // switch every 20s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {HERO_VIDEOS.map((id, i) => (
        <div
          key={id}
          className="absolute inset-0 transition-opacity duration-[2000ms]"
          style={{ opacity: i === activeIndex ? 0.15 : 0 }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&fs=0&iv_load_policy=3`}
            title={`Background video ${i + 1}`}
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] md:w-[120%] md:h-[120%] pointer-events-none border-0"
            style={{ minWidth: '100%', minHeight: '100%' }}
          />
        </div>
      ))}
    </div>
  );
};


const Legal = () => {
  const parallaxOffset = useParallax(0.25);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Custom balance/scales cursor CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'legal-balance-cursor';
    style.textContent = `
      .legal-page { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='%23d97706' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2v20'/%3E%3Cpath d='M2 10h4l2-4 2 8h4'/%3E%3Cpath d='M14 10h4l2-4 2 8'/%3E%3Cpath d='m2 14 4 0'/%3E%3Cpath d='m18 14 4 0'/%3E%3Cpath d='M2 14a4 4 0 0 0 8 0'/%3E%3Cpath d='M14 14a4 4 0 0 0 8 0'/%3E%3Ccircle cx='12' cy='2' r='1'/%3E%3C/svg%3E") 14 14, auto; }
      .legal-page a, .legal-page button { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' fill='%23d97706' stroke='%23fbbf24' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2v20'/%3E%3Cpath d='M2 10h4l2-4 2 8h4'/%3E%3Cpath d='M14 10h4l2-4 2 8'/%3E%3Cpath d='m2 14 4 0'/%3E%3Cpath d='m18 14 4 0'/%3E%3Cpath d='M2 14a4 4 0 0 0 8 0'/%3E%3Cpath d='M14 14a4 4 0 0 0 8 0'/%3E%3Ccircle cx='12' cy='2' r='1'/%3E%3C/svg%3E") 14 14, pointer; }
      @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    `;
    document.head.appendChild(style);
    return () => { document.getElementById('legal-balance-cursor')?.remove(); };
  }, []);

  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = 96;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = Math.max(elementPosition - headerOffset, 0);

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, []);

  const navItems = [
    { label: 'Inicio', id: 'hero' },
    { label: 'Sobre Mí', id: 'about' },
    { label: 'Servicios', id: 'services' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contacto', id: 'contact' },
  ];

  // Section reveal hooks
  const heroReveal = useScrollReveal(0.1);
  const aboutReveal = useScrollReveal();
  const statsReveal = useScrollReveal();
  const whyReveal = useScrollReveal();
  const servicesReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();
  const faqReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <div className="legal-page min-h-screen bg-[#0a0a0f] text-gray-200 font-sans">
      {/* ───── News Ticker ───── */}
      <NewsTicker />
      {/* ───── Header ───── */}
      <header className={`sticky top-0 z-[100] w-full transition-all duration-300 ${scrolled ? 'bg-[#0a0a0f]/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-[#0a0a0f]/85 backdrop-blur-md'} border-b border-amber-900/20`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="shrink-0">
            <img src="/novalegal-logo.png" alt="NovaLegal" className="h-10 md:h-12 w-auto" />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm text-gray-400 hover:text-amber-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-amber-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left after:duration-300"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Social + CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <SocialIcons iconSize={16} />
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors">
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white text-sm font-semibold rounded-lg transition-all">
              <Calendar size={16} /> Agendar Cita
            </a>
          </div>

          {/* Mobile: WhatsApp CTA + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors">
              <MessageCircle size={16} /> WhatsApp
            </a>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-amber-400">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 pb-4 space-y-1 bg-[#0a0a0f]/95 backdrop-blur-md">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className="block w-full text-left py-3 px-4 text-gray-300 hover:text-amber-400 hover:bg-amber-950/20 rounded-lg transition-colors">
                {item.label}
              </button>
            ))}
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-2 px-4 py-3 bg-gradient-to-r from-amber-700 to-amber-600 text-white font-semibold rounded-lg">
              <Calendar size={16} /> Agendar Cita Presencial
            </a>
          </div>
        </div>
      </header>

      {/* ───── Hero ───── */}
      <section id="hero" className="relative overflow-hidden min-h-[90vh] flex items-center scroll-mt-24">
        {/* ── Background Video Slider ── */}
        <HeroVideoBackground />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[#0a0a0f]/80 z-[1] pointer-events-none" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-900/5 rounded-full blur-3xl animate-pulse" style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-900/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', transform: `translateY(${parallaxOffset * 0.3}px)` }} />
          <Gavel className="absolute top-20 right-[15%] text-amber-900/10 animate-bounce" size={48} style={{ animationDuration: '3s', transform: `translateY(${parallaxOffset * -0.4}px)` }} />
          <Scale className="absolute bottom-32 left-[10%] text-amber-900/10 animate-bounce" size={40} style={{ animationDuration: '4s', animationDelay: '1s', transform: `translateY(${parallaxOffset * -0.2}px)` }} />
          <Gavel className="absolute top-40 left-[20%] text-amber-900/8 animate-bounce" size={32} style={{ animationDuration: '5s', animationDelay: '2s', transform: `translateY(${parallaxOffset * -0.6}px) rotate(45deg)` }} />
        </div>

        <div
          ref={heroReveal.ref}
          className={`max-w-5xl mx-auto px-4 py-20 md:py-28 relative z-10 flex flex-col md:flex-row items-center gap-10 transition-all duration-1000 ${heroReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          {/* Profile photo */}
          <div className="shrink-0 relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-amber-500 via-amber-700 to-amber-900 rounded-full blur-sm opacity-60 group-hover:opacity-90 transition-opacity duration-500 animate-[spin_8s_linear_infinite]" />
            <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-amber-700/50 shadow-2xl shadow-amber-900/20">
              <img src="/dennisse-profile.png" alt="Abogada Dennisse Cuéllar" className="w-full h-full object-cover object-top scale-110 group-hover:scale-125 transition-transform duration-700" />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-2 -right-2 bg-amber-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-bounce" style={{ animationDuration: '2s' }}>
              <Gavel size={14} className="inline mr-1" />Abogada
            </div>
          </div>

          {/* Text */}
          <div className="text-center md:text-left">
            <p className="text-amber-500 font-semibold tracking-widest uppercase text-sm mb-4 animate-fade-in">Legalidad · Orden · Confianza</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Abogada<br />
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Dennisse Cuéllar</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-4 max-w-xl">
              Asesoría legal profesional para personas, familias y empresas
            </p>
            <p className="text-gray-500 max-w-xl mb-8 leading-relaxed text-sm md:text-base">
              Me dedico a brindar asesoría legal y servicios notariales para personas, emprendedores y empresas que necesitan formalizar documentos, proteger su patrimonio y realizar trámites jurídicos con respaldo profesional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="group/btn inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all text-lg hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5">
                <MessageCircle size={22} className="group-hover/btn:animate-bounce" /> Contactar por WhatsApp
              </a>
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer"
                className="group/btn inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold rounded-xl transition-all text-lg hover:shadow-lg hover:shadow-amber-900/30 hover:-translate-y-0.5">
                <Calendar size={22} className="group-hover/btn:animate-bounce" /> Agendar Cita Presencial
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce text-amber-700/50 z-10">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ───── Services Carousel ───── */}
      {(() => {
        const svcList = [
          { icon: Shield, title: 'Constitución de Empresas', desc: 'Formalización de negocios y estructuras empresariales' },
          { icon: FileText, title: 'Poderes y Autorizaciones', desc: 'Delegación de representación legal' },
          { icon: Gavel, title: 'Documentación Notarial', desc: 'Autenticación de instrumentos jurídicos' },
          { icon: Users, title: 'Actos Patrimoniales', desc: 'Testamentos, herencias y donaciones' },
          { icon: Home, title: 'Operaciones sobre Bienes', desc: 'Compraventa y traspasos de propiedad' },
          { icon: Truck, title: 'Envío Internacional', desc: 'Documentos legales a EE.UU. y Europa' },
        ];
        const ServiceCard = ({ svc, idx }: { svc: typeof svcList[0]; idx: number }) => {
          const IconComp = svc.icon;
          return (
            <button
              key={idx}
              onClick={() => scrollTo('services')}
              className="p-4 md:p-5 bg-gradient-to-br from-gray-900/80 to-gray-950/60 border border-amber-900/20 rounded-xl hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(217,119,6,0.12)] transition-all duration-500 group text-left relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-700/0 group-hover:from-amber-500/5 group-hover:to-amber-700/10 transition-all duration-500 rounded-xl" />
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-[1]">
                <div className="w-10 h-10 rounded-lg bg-amber-900/20 border border-amber-800/20 flex items-center justify-center mb-3 group-hover:bg-amber-900/30 group-hover:scale-110 group-hover:border-amber-700/40 transition-all duration-300">
                  <IconComp className="text-amber-500 group-hover:text-amber-400 transition-colors" size={20} />
                </div>
                <h4 className="text-amber-200 font-semibold text-sm mb-1 group-hover:text-amber-300 transition-colors">{svc.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed group-hover:text-gray-400 transition-colors">{svc.desc}</p>
              </div>
              <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/40 transition-all duration-500" />
            </button>
          );
        };
        return (
          <section className="py-10 bg-gray-950/30 border-b border-amber-900/10 overflow-hidden">
            {/* Mobile: 2-column grid */}
            <div className="grid grid-cols-2 gap-3 px-4 md:hidden">
              {svcList.map((svc, i) => <ServiceCard key={i} svc={svc} idx={i} />)}
            </div>
            {/* Desktop: infinite carousel */}
            <div className="hidden md:block relative">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
              <div className="flex animate-[ticker_40s_linear_infinite] hover:[animation-play-state:paused]">
                {[...Array(2)].flatMap((_, dupeIdx) =>
                  svcList.map((svc, i) => (
                    <div key={`${dupeIdx}-${i}`} className="shrink-0 w-64 mx-3">
                      <ServiceCard svc={svc} idx={i} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ───── Stats strip ───── */}
      <section className="relative py-12 bg-gradient-to-r from-amber-950/20 via-gray-950 to-amber-950/20 border-y border-amber-900/15">
        <div ref={statsReveal.ref} className={`max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center transition-all duration-700 ${statsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { n: 500, suffix: '+', label: 'Clientes atendidos' },
            { n: 5, suffix: '+', label: 'Años de experiencia' },
            { n: 1000, suffix: '+', label: 'Documentos legales' },
            { n: 50, suffix: '+', label: 'Empresas constituidas' },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-3xl md:text-4xl font-bold text-amber-500"><AnimatedCounter target={s.n} suffix={s.suffix} /></p>
              <p className="text-gray-500 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── About ───── */}
      <section id="about" className="py-20 bg-gray-950/50">
        <div ref={aboutReveal.ref} className={`max-w-4xl mx-auto px-4 transition-all duration-1000 ${aboutReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-amber-500">Sobre</span> la Abogada
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            La Abogada Dennisse Cuéllar se dedica a brindar asesoría legal y servicios notariales enfocados en la elaboración, formalización y protocolización de documentos jurídicos para personas y empresas.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Legalidad', desc: 'Cada documento y trámite se realiza cumpliendo estrictamente con los requisitos legales establecidos.', icon: Scale },
              { title: 'Orden', desc: 'Los procesos legales deben estar correctamente estructurados para evitar errores, rechazos o complicaciones futuras.', icon: FileText },
              { title: 'Confianza', desc: 'Cada cliente recibe asesoría profesional y acompañamiento durante todo el proceso legal.', icon: Shield },
            ].map((p, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-gray-900/50 border border-amber-900/15 hover:border-amber-700/30 hover:-translate-y-1 transition-all duration-500 group" style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-900/20 flex items-center justify-center group-hover:bg-amber-900/30 group-hover:scale-110 transition-all duration-300">
                  <p.icon className="text-amber-500" size={28} />
                </div>
                <h3 className="text-xl font-bold text-amber-400 mb-3">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-center mt-10 text-sm italic">
            Más allá de un trámite, cada servicio representa una responsabilidad jurídica que requiere atención, experiencia y profesionalismo.
          </p>
          <div className="flex justify-center mt-6">
            <SocialIcons iconSize={22} className="gap-5" />
          </div>
        </div>
      </section>

      {/* ───── Why choose ───── */}
      <section className="py-20 bg-[#0a0a0f]">
        <div ref={whyReveal.ref} className={`max-w-4xl mx-auto px-4 text-center transition-all duration-1000 ${whyReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Por qué trabajar con la <span className="text-amber-500">Abogada Dennisse Cuéllar</span>?
          </h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Elegir un servicio legal no es solo un trámite administrativo, es una decisión de confianza.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              'Atención personalizada',
              'Explicación clara de cada trámite',
              'Documentación correctamente elaborada',
              'Cumplimiento de requisitos legales',
              'Seguridad jurídica en cada proceso',
              'Orden, respaldo y tranquilidad',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-900/50 border border-amber-900/15 rounded-xl p-4 hover:border-amber-700/30 hover:-translate-y-0.5 transition-all duration-300" style={{ transitionDelay: `${i * 80}ms` }}>
                <CheckCircle className="text-amber-500 shrink-0" size={20} />
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Services ───── */}
      <section id="services" className="py-20 relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-900/5 rounded-full blur-3xl" style={{ transform: `translateY(${parallaxOffset * -0.15}px)` }} />
        </div>
        <div ref={servicesReveal.ref} className={`max-w-6xl mx-auto px-4 relative z-10 transition-all duration-1000 ${servicesReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="text-amber-500">Servicios</span> Legales
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-14">
            Amplia variedad de servicios legales y notariales para personas, familias, emprendedores y empresas.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard delay={0} icon={Shield} title="Constitución de empresas"
              description="Asesoría y elaboración de documentos legales para formalizar negocios y estructuras empresariales."
              items={['Comerciantes individuales', 'Sociedades S. de R.L.', 'Sociedades anónimas', 'Protocolización de asambleas', 'Poderes de administración y representación']} />
            <ServiceCard delay={100} icon={FileText} title="Poderes y autorizaciones"
              description="Elaboración y formalización de documentos para delegar representación legal o autorizar actos jurídicos."
              items={['Poderes para pleitos', 'Poderes de administración', 'Autorizaciones de salida', 'Cartas poder autenticadas', 'Autenticación de autorizaciones']} />
            <ServiceCard delay={200} icon={Gavel} title="Documentación notarial"
              description="Elaboración y autenticación de distintos instrumentos jurídicos."
              items={['Escrituras de descargo de propiedad intelectual', 'Actas de cancelación en papel notarial', 'Instrumentos legales sin valor determinado', 'Autenticación de fotocopias']} />
            <ServiceCard delay={300} icon={Users} title="Actos patrimoniales y familiares"
              description="Asesoría legal para documentos de patrimonio y relaciones familiares."
              items={['Testamentos', 'Donaciones', 'Trámites de herencias', 'Matrimonios', 'Declaraciones ad perpetuam']} />
            <ServiceCard delay={400} icon={Home} title="Operaciones sobre bienes"
              description="Formalización de documentos para transacciones y actos jurídicos sobre bienes."
              items={['Escrituras de compraventa', 'Traspasos de bienes', 'Unificación y remedida', 'Trámites por fracción adicional']} />
            <ServiceCard delay={500} icon={Truck} title="Envío internacional de documentos"
              description="Servicio de envío seguro de documentos legales hacia Estados Unidos y Europa."
              items={['Envío a EE.UU. y Europa', 'Documentación formalizada', 'Gestión desde Honduras', 'Recepción sin complicaciones']} />
          </div>
        </div>
      </section>



      {/* ───── CTA Banner ───── */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-amber-800/10 to-amber-900/20" />
        <div className="absolute inset-0 pointer-events-none">
          <Gavel className="absolute top-6 left-[10%] text-amber-700/10 rotate-12" size={60} style={{ transform: `translateY(${parallaxOffset * -0.1}px)` }} />
          <Scale className="absolute bottom-6 right-[10%] text-amber-700/10 -rotate-12" size={60} style={{ transform: `translateY(${parallaxOffset * -0.1}px)` }} />
        </div>
        <div ref={ctaReveal.ref} className={`max-w-3xl mx-auto px-4 text-center relative z-10 transition-all duration-1000 ${ctaReveal.visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">¿Necesitas asesoría legal?</h2>
          <p className="text-gray-400 mb-8">Comunícate directamente para resolver tus asuntos jurídicos con seguridad y tranquilidad.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5">
              <MessageCircle size={22} /> WhatsApp
            </a>
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-amber-900/30 hover:-translate-y-0.5">
              <Calendar size={22} /> Agendar Cita
            </a>
          </div>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section id="faq" className="py-20">
        <div ref={faqReveal.ref} className={`max-w-3xl mx-auto px-4 transition-all duration-1000 ${faqReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Preguntas <span className="text-amber-500">Frecuentes</span>
          </h2>
          <div className="space-y-3">
            <FAQItem question="¿Dónde puedo encontrar un abogado en Honduras para realizar trámites legales?"
              answer={<p>Si necesitas un abogado en Honduras para trámites como constitución de empresas, poderes, compraventas, herencias o autenticaciones notariales, puedes contactar directamente a la Abogada Dennisse Cuéllar. <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">Contactar por WhatsApp</a></p>} />
            <FAQItem question="¿Cómo se realiza el traspaso de un vehículo en Honduras?"
              answer="El traspaso de vehículo en Honduras requiere la elaboración de un documento legal o escritura de traspaso que cumpla con los requisitos establecidos por la normativa correspondiente. La Abogada Dennisse Cuéllar brinda asesoría en la elaboración de estos documentos." />
            <FAQItem question="¿Cuánto cuesta constituir una empresa en Honduras?"
              answer="El costo varía según el tipo de sociedad: comerciante individual, S. de R.L. o sociedad anónima. Cada estructura tiene requisitos legales específicos. La Abogada Dennisse Cuéllar ofrece asesoría personalizada para emprendedores y empresarios." />
            <FAQItem question="¿Qué documentos se necesitan para hacer una compraventa en Honduras?"
              answer="Normalmente se requiere la elaboración de una escritura que formalice la transferencia de propiedad. Los requisitos pueden variar según el tipo de bien. La Abogada Dennisse Cuéllar brinda asesoría para la elaboración de documentos de compraventa." />
            <FAQItem question="¿Cómo hacer un poder legal en Honduras?"
              answer="Un poder legal permite autorizar a otra persona para actuar en su representación. Existen poderes de administración, para pleitos, cartas poder y autorizaciones legales. La Abogada Dennisse Cuéllar puede asesorarte según el tipo de trámite." />
            <FAQItem question="¿Cómo tramitar una herencia en Honduras?"
              answer="El trámite de herencias determina la distribución del patrimonio de una persona fallecida. Puede requerir documentos legales específicos y procedimientos notariales. La Abogada Dennisse Cuéllar ofrece asesoría para la gestión de herencias." />
            <FAQItem question="¿Dónde puedo hacer un testamento en Honduras?"
              answer="Un testamento debe cumplir ciertos requisitos legales para garantizar su validez. La Abogada Dennisse Cuéllar ofrece asesoría en la elaboración de testamentos y planificación legal patrimonial." />
            <FAQItem question="¿Puedo hacer trámites legales en Honduras si vivo en Estados Unidos o Europa?"
              answer="Sí. La Abogada Dennisse Cuéllar ofrece asesoría para gestionar procesos legales y cuenta con servicio de envío de documentos legales a Estados Unidos y Europa." />
          </div>
        </div>
      </section>

      {/* ───── Contact ───── */}
      <section id="contact" className="py-20 bg-gray-950/50">
        <div ref={contactReveal.ref} className={`max-w-4xl mx-auto px-4 transition-all duration-1000 ${contactReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="text-amber-500">Contacto</span>
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Si necesitas asesoría legal o deseas iniciar un trámite, puedes comunicarte directamente.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 bg-gray-900/50 border border-amber-900/15 rounded-xl hover:border-emerald-700/40 hover:-translate-y-0.5 transition-all duration-300 group">
                <div className="w-12 h-12 bg-emerald-900/30 rounded-lg flex items-center justify-center group-hover:bg-emerald-900/50 group-hover:scale-110 transition-all">
                  <MessageCircle className="text-emerald-400" size={24} />
                </div>
                <div>
                  <p className="text-amber-100 font-semibold">WhatsApp</p>
                  <p className="text-gray-400 text-sm">+504 8252-4225</p>
                </div>
              </a>
              <a href="tel:+50482524225" className="flex items-center gap-4 p-5 bg-gray-900/50 border border-amber-900/15 rounded-xl hover:border-amber-700/40 hover:-translate-y-0.5 transition-all duration-300 group">
                <div className="w-12 h-12 bg-amber-900/20 rounded-lg flex items-center justify-center group-hover:bg-amber-900/30 group-hover:scale-110 transition-all">
                  <Phone className="text-amber-500" size={24} />
                </div>
                <div>
                  <p className="text-amber-100 font-semibold">Teléfono</p>
                  <p className="text-gray-400 text-sm">+504 8252-4225</p>
                </div>
              </a>
              <a href="mailto:legal@novativa.org" className="flex items-center gap-4 p-5 bg-gray-900/50 border border-amber-900/15 rounded-xl hover:border-amber-700/40 hover:-translate-y-0.5 transition-all duration-300 group">
                <div className="w-12 h-12 bg-amber-900/20 rounded-lg flex items-center justify-center group-hover:bg-amber-900/30 group-hover:scale-110 transition-all">
                  <Mail className="text-amber-500" size={24} />
                </div>
                <div>
                  <p className="text-amber-100 font-semibold">Correo electrónico</p>
                  <p className="text-gray-400 text-sm">legal@novativa.org</p>
                </div>
              </a>
              <div className="flex items-center gap-4 p-5 bg-gray-900/50 border border-amber-900/15 rounded-xl">
                <div className="w-12 h-12 bg-amber-900/20 rounded-lg flex items-center justify-center">
                  <MapPin className="text-amber-500" size={24} />
                </div>
                <div>
                  <p className="text-amber-100 font-semibold">Dirección</p>
                  <p className="text-gray-400 text-sm">Bo. Guamilito, 4 Calle, 10 y 11 Ave<br />San Pedro Sula, Honduras</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="bg-gradient-to-br from-amber-950/30 to-gray-900 border border-amber-900/30 rounded-2xl p-8 text-center hover:border-amber-700/40 transition-all duration-300">
                <Calendar className="text-amber-500 mx-auto mb-4" size={40} />
                <h3 className="text-xl font-bold text-amber-100 mb-3">Agendar cita presencial</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Las citas se realizan <strong className="text-amber-200">en San Pedro Sula, Honduras, Barrio Guamilito.</strong> Si estás consciente de que la reunión será en esta ubicación, puedes continuar con el agendamiento.
                </p>
                <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold rounded-xl transition-all text-lg hover:shadow-lg hover:shadow-amber-900/30">
                  <Calendar size={20} /> Agendar Cita
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Footer ───── */}
      <footer className="border-t border-amber-900/20 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src="/novalegal-logo.png" alt="NovaLegal" className="h-10 w-auto opacity-70" />
          <SocialIcons iconSize={20} className="gap-4" />
          <p className="text-gray-600 text-sm text-center">
            © {new Date().getFullYear()} Abogada Dennisse Cuéllar · Legalidad. Orden. Confianza.
          </p>
          <a
            href="https://www.novativa.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gray-600 hover:text-amber-400/80 transition-colors text-xs"
          >
            Powered by <span className="font-semibold text-amber-500/70">Novativa</span>
          </a>
        </div>
      </footer>

      {/* ───── Legal Disclaimer Bar ───── */}
      <div className="border-t border-amber-900/10 py-4 bg-[#08080c]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-[11px] text-gray-700">
          <span>© {new Date().getFullYear()} Todos los derechos reservados</span>
          <span className="hidden sm:inline text-gray-800">·</span>
          <span>La información de este sitio no constituye asesoría legal formal</span>
          <span className="hidden sm:inline text-gray-800">·</span>
          <span>Consulte directamente para su caso particular</span>
        </div>
      </div>
    </div>
  );
};

export default Legal;
