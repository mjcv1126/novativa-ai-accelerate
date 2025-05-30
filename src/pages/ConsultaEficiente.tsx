
import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/consulta-eficiente/HeroSection';
import ProblemsSection from '@/components/consulta-eficiente/ProblemsSection';
import SolutionSection from '@/components/consulta-eficiente/SolutionSection';
import TestimonialsSection from '@/components/consulta-eficiente/TestimonialsSection';
import FinalCTASection from '@/components/consulta-eficiente/FinalCTASection';

const ConsultaEficiente = () => {
  const [showCTA, setShowCTA] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Activar CTA después de 2 minutos
    const timer = setTimeout(() => {
      setShowCTA(true);
    }, 120000); // 2 minutos

    return () => clearTimeout(timer);
  }, []);

  const openTidyCal = () => {
    window.open('https://tidycal.com/novativa/demo-gratis', '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden w-full px-4 sm:px-6 lg:px-8">
      <style>{`
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
          40%, 43% { transform: translateY(-10px); }
          70% { transform: translateY(-5px); }
          90% { transform: translateY(-3px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        
        @keyframes swing {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-15deg); }
        }
        
        .animate-heart { animation: heartBeat 1.5s ease-in-out infinite; }
        .animate-rotate { animation: rotate 3s linear infinite; }
        .animate-bounce-custom { animation: bounce 2s infinite; }
        .animate-pulse-custom { animation: pulse 2s infinite; }
        .animate-shake-custom { animation: shake 1s infinite; }
        .animate-swing { animation: swing 2s ease-in-out infinite; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <HeroSection openTidyCal={openTidyCal} showCTA={showCTA} />
        <ProblemsSection openTidyCal={openTidyCal} />
        <SolutionSection />
        <TestimonialsSection />
        <FinalCTASection openTidyCal={openTidyCal} />
      </div>

      {/* Sticky CTA flotante */}
      {showCTA && <div className="fixed bottom-6 right-6 z-50">
          {/* This area can be used for a floating CTA if needed */}
        </div>}
    </div>
  );
};

export default ConsultaEficiente;
