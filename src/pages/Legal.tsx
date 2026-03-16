
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Phone, Mail, MapPin, MessageCircle, Calendar, Scale, Shield, FileText, Users, Home, Truck, CheckCircle } from 'lucide-react';

const WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=50482524225';
const CALENDAR_URL = 'https://calendar.novativa.org/dennisse-cuellar/legal';

const FAQItem = ({ question, answer }: { question: string; answer: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-amber-900/30 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-amber-950/20 transition-colors"
      >
        <span className="text-amber-100 font-medium pr-4">{question}</span>
        {open ? <ChevronUp className="text-amber-500 shrink-0" size={20} /> : <ChevronDown className="text-amber-500 shrink-0" size={20} />}
      </button>
      {open && <div className="px-5 pb-5 text-gray-400 leading-relaxed">{answer}</div>}
    </div>
  );
};

const ServiceCard = ({ icon: Icon, title, description, items }: { icon: React.ElementType; title: string; description: string; items: string[] }) => (
  <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-amber-900/20 rounded-2xl p-8 hover:border-amber-700/40 transition-all duration-300 group">
    <div className="w-14 h-14 bg-amber-900/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-amber-900/30 transition-colors">
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

const Legal = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-md border-b border-amber-900/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <img src="/novalegal-logo.png" alt="NovaLegal" className="h-12 w-auto" />
          <div className="flex items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white text-sm font-semibold rounded-lg transition-all"
            >
              <Calendar size={16} />
              Agendar Cita
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/10 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 py-20 md:py-32 text-center relative z-10">
          <p className="text-amber-500 font-semibold tracking-widest uppercase text-sm mb-4">Legalidad · Orden · Confianza</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Abogada<br />
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Dennisse Cuéllar</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-4 max-w-2xl mx-auto">
            Asesoría legal profesional para personas, familias y empresas
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed text-sm md:text-base">
            Me dedico a brindar asesoría legal y servicios notariales para personas, emprendedores y empresas que necesitan formalizar documentos, proteger su patrimonio y realizar trámites jurídicos con respaldo profesional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors text-lg"
            >
              <MessageCircle size={22} />
              Contactar por WhatsApp
            </a>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold rounded-xl transition-all text-lg"
            >
              <Calendar size={22} />
              Agendar Cita Presencial
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-gray-950/50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-amber-500">Sobre</span> la Abogada
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            La Abogada Dennisse Cuéllar se dedica a brindar asesoría legal y servicios notariales enfocados en la elaboración, formalización y protocolización de documentos jurídicos para personas y empresas.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Legalidad', desc: 'Cada documento y trámite se realiza cumpliendo estrictamente con los requisitos legales establecidos.' },
              { title: 'Orden', desc: 'Los procesos legales deben estar correctamente estructurados para evitar errores, rechazos o complicaciones futuras.' },
              { title: 'Confianza', desc: 'Cada cliente recibe asesoría profesional y acompañamiento durante todo el proceso legal.' },
            ].map((p, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-gray-900/50 border border-amber-900/15">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-900/20 flex items-center justify-center">
                  <Scale className="text-amber-500" size={28} />
                </div>
                <h3 className="text-xl font-bold text-amber-400 mb-3">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-center mt-10 text-sm italic">
            Más allá de un trámite, cada servicio representa una responsabilidad jurídica que requiere atención, experiencia y profesionalismo.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="text-amber-500">Servicios</span> Legales
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-14">
            Amplia variedad de servicios legales y notariales para personas, familias, emprendedores y empresas.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={Shield}
              title="Constitución de empresas"
              description="Asesoría y elaboración de documentos legales para formalizar negocios y estructuras empresariales."
              items={['Comerciantes individuales', 'Sociedades S. de R.L.', 'Sociedades anónimas', 'Protocolización de asambleas', 'Poderes de administración y representación']}
            />
            <ServiceCard
              icon={FileText}
              title="Poderes y autorizaciones"
              description="Elaboración y formalización de documentos para delegar representación legal o autorizar actos jurídicos."
              items={['Poderes para pleitos', 'Poderes de administración', 'Autorizaciones de salida', 'Cartas poder autenticadas', 'Autenticación de autorizaciones']}
            />
            <ServiceCard
              icon={Scale}
              title="Documentación notarial"
              description="Elaboración y autenticación de distintos instrumentos jurídicos."
              items={['Escrituras de descargo de propiedad intelectual', 'Actas de cancelación en papel notarial', 'Instrumentos legales sin valor determinado', 'Autenticación de fotocopias']}
            />
            <ServiceCard
              icon={Users}
              title="Actos patrimoniales y familiares"
              description="Asesoría legal para documentos de patrimonio y relaciones familiares."
              items={['Testamentos', 'Donaciones', 'Trámites de herencias', 'Matrimonios', 'Declaraciones ad perpetuam']}
            />
            <ServiceCard
              icon={Home}
              title="Operaciones sobre bienes"
              description="Formalización de documentos para transacciones y actos jurídicos sobre bienes."
              items={['Escrituras de compraventa', 'Traspasos de bienes', 'Unificación y remedida', 'Trámites por fracción adicional']}
            />
            <ServiceCard
              icon={Truck}
              title="Envío internacional de documentos"
              description="Servicio de envío seguro de documentos legales hacia Estados Unidos y Europa."
              items={['Envío a EE.UU. y Europa', 'Documentación formalizada', 'Gestión desde Honduras', 'Recepción sin complicaciones']}
            />
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="py-20 bg-gray-950/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
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
              <div key={i} className="flex items-center gap-3 bg-gray-900/50 border border-amber-900/15 rounded-xl p-4">
                <CheckCircle className="text-amber-500 shrink-0" size={20} />
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Preguntas <span className="text-amber-500">Frecuentes</span>
          </h2>
          <div className="space-y-3">
            <FAQItem
              question="¿Dónde puedo encontrar un abogado en Honduras para realizar trámites legales?"
              answer={
                <p>Si necesitas un abogado en Honduras para trámites como constitución de empresas, poderes, compraventas, herencias o autenticaciones notariales, puedes contactar directamente a la Abogada Dennisse Cuéllar. <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">Contactar por WhatsApp</a></p>
              }
            />
            <FAQItem
              question="¿Cómo se realiza el traspaso de un vehículo en Honduras?"
              answer="El traspaso de vehículo en Honduras requiere la elaboración de un documento legal o escritura de traspaso que cumpla con los requisitos establecidos por la normativa correspondiente. La Abogada Dennisse Cuéllar brinda asesoría en la elaboración de estos documentos."
            />
            <FAQItem
              question="¿Cuánto cuesta constituir una empresa en Honduras?"
              answer="El costo varía según el tipo de sociedad: comerciante individual, S. de R.L. o sociedad anónima. Cada estructura tiene requisitos legales específicos. La Abogada Dennisse Cuéllar ofrece asesoría personalizada para emprendedores y empresarios."
            />
            <FAQItem
              question="¿Qué documentos se necesitan para hacer una compraventa en Honduras?"
              answer="Normalmente se requiere la elaboración de una escritura que formalice la transferencia de propiedad. Los requisitos pueden variar según el tipo de bien. La Abogada Dennisse Cuéllar brinda asesoría para la elaboración de documentos de compraventa."
            />
            <FAQItem
              question="¿Cómo hacer un poder legal en Honduras?"
              answer="Un poder legal permite autorizar a otra persona para actuar en su representación. Existen poderes de administración, para pleitos, cartas poder y autorizaciones legales. La Abogada Dennisse Cuéllar puede asesorarte según el tipo de trámite."
            />
            <FAQItem
              question="¿Cómo tramitar una herencia en Honduras?"
              answer="El trámite de herencias determina la distribución del patrimonio de una persona fallecida. Puede requerir documentos legales específicos y procedimientos notariales. La Abogada Dennisse Cuéllar ofrece asesoría para la gestión de herencias."
            />
            <FAQItem
              question="¿Dónde puedo hacer un testamento en Honduras?"
              answer="Un testamento debe cumplir ciertos requisitos legales para garantizar su validez. La Abogada Dennisse Cuéllar ofrece asesoría en la elaboración de testamentos y planificación legal patrimonial."
            />
            <FAQItem
              question="¿Puedo hacer trámites legales en Honduras si vivo en Estados Unidos o Europa?"
              answer="Sí. La Abogada Dennisse Cuéllar ofrece asesoría para gestionar procesos legales y cuenta con servicio de envío de documentos legales a Estados Unidos y Europa."
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-gray-950/50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="text-amber-500">Contacto</span>
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Si necesitas asesoría legal o deseas iniciar un trámite, puedes comunicarte directamente.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 bg-gray-900/50 border border-amber-900/15 rounded-xl hover:border-emerald-700/40 transition-colors group">
                <div className="w-12 h-12 bg-emerald-900/30 rounded-lg flex items-center justify-center group-hover:bg-emerald-900/50 transition-colors">
                  <MessageCircle className="text-emerald-400" size={24} />
                </div>
                <div>
                  <p className="text-amber-100 font-semibold">WhatsApp</p>
                  <p className="text-gray-400 text-sm">+504 8252-4225</p>
                </div>
              </a>
              <a href="tel:+50482524225" className="flex items-center gap-4 p-5 bg-gray-900/50 border border-amber-900/15 rounded-xl hover:border-amber-700/40 transition-colors group">
                <div className="w-12 h-12 bg-amber-900/20 rounded-lg flex items-center justify-center group-hover:bg-amber-900/30 transition-colors">
                  <Phone className="text-amber-500" size={24} />
                </div>
                <div>
                  <p className="text-amber-100 font-semibold">Teléfono</p>
                  <p className="text-gray-400 text-sm">+504 8252-4225</p>
                </div>
              </a>
              <a href="mailto:legal@novativa.org" className="flex items-center gap-4 p-5 bg-gray-900/50 border border-amber-900/15 rounded-xl hover:border-amber-700/40 transition-colors group">
                <div className="w-12 h-12 bg-amber-900/20 rounded-lg flex items-center justify-center group-hover:bg-amber-900/30 transition-colors">
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
              <div className="bg-gradient-to-br from-amber-950/30 to-gray-900 border border-amber-900/30 rounded-2xl p-8 text-center">
                <Calendar className="text-amber-500 mx-auto mb-4" size={40} />
                <h3 className="text-xl font-bold text-amber-100 mb-3">Agendar cita presencial</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Las citas se realizan <strong className="text-amber-200">en San Pedro Sula, Honduras, Barrio Guamilito.</strong> Si estás consciente de que la reunión será en esta ubicación, puedes continuar con el agendamiento.
                </p>
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold rounded-xl transition-all text-lg"
                >
                  <Calendar size={20} />
                  Agendar Cita
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-900/20 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src="/novalegal-logo.png" alt="NovaLegal" className="h-10 w-auto opacity-70" />
          <p className="text-gray-600 text-sm text-center">
            © {new Date().getFullYear()} Abogada Dennisse Cuéllar · Legalidad. Orden. Confianza.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Legal;
