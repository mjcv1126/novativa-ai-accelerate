
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare, Users, Bot, Clock, BarChart, Shield, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ProblemsSectionProps {
  openTidyCal: () => void;
}

const ProblemsSection: React.FC<ProblemsSectionProps> = ({ openTidyCal }) => {
  const problems = [
    { icon: Users, title: "Pacientes Perdidos", desc: "Falta de seguimiento post-consulta", impact: "30% no regresa", animation: "animate-shake-custom" },
    { icon: Clock, title: "Tiempo Desperdiciado", desc: "Tareas administrativas repetitivas", impact: "2-3 horas diarias", animation: "animate-rotate" },
    { icon: MessageSquare, title: "Comunicación Fragmentada", desc: "WhatsApp, llamadas, sin centralizar", impact: "Mensajes perdidos", animation: "animate-bounce-custom" },
    { icon: BarChart, title: "Sin Métricas Claras", desc: "No sabés qué está funcionando", impact: "Decisiones a ciegas", animation: "animate-pulse-custom" },
    { icon: Shield, title: "Imagen Desprofesionalizada", desc: "Comunicación informal", impact: "Menos confianza", animation: "animate-swing" },
    { icon: Bot, title: "Disponibilidad Limitada", desc: "Solo en horarios de consulta", impact: "Oportunidades perdidas", animation: "animate-heart" }
  ];

  const handleFormularioClick = () => {
    window.location.href = '/formulario';
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-red-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block p-3 sm:p-4 bg-red-50 rounded-full mb-6 border border-red-100">
            <Target className="w-8 h-8 sm:w-12 sm:h-12 text-red-500 animate-pulse-custom" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 text-gray-900 px-2">
            <span className="text-red-500">Los Problemas Invisibles</span> <br />
            que Afectan tu Consulta
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto mb-8 sm:mb-12 px-2">
            Incluso siendo un excelente profesional, estos factores pueden estar limitando tu práctica
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <Card key={index} className="group relative p-6 sm:p-8 bg-white border-2 border-red-100 hover:border-red-200 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              <CardContent className="p-0">
                <div className="absolute inset-0 bg-red-50/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                <div className="relative z-10 text-center">
                  <div className="bg-red-50 p-3 sm:p-4 rounded-full w-fit mb-4 sm:mb-6 mx-auto border border-red-100">
                    <problem.icon className={`w-6 h-6 sm:w-8 sm:h-8 text-red-500 ${problem.animation}`} />
                  </div>
                  <h3 className="font-semibold text-lg sm:text-xl mb-3 text-red-500">{problem.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">{problem.desc}</p>
                  <Button 
                    onClick={handleFormularioClick}
                    variant="outline"
                    size="sm"
                    className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200 hover:border-red-300 transition-all duration-200 hover:scale-105 w-full sm:w-auto"
                  >
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Solucionar Ahora
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
