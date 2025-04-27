
import React from 'react';
import ConfirmationHeader from '@/components/schedule/ConfirmationHeader';
import MarlonIASection from '@/components/schedule/MarlonIASection';

const ScheduleConfirmation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-sky-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <ConfirmationHeader />
        <MarlonIASection />
        <div className="max-w-3xl mx-auto bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-purple-100">
          <h2 className="text-2xl font-bold text-center mb-6">Pregunta cómo recibir un descuento especial con este agente 🤝</h2>
          <div style={{ width: '100%', height: '600px', border: 'none' }}>
            <iframe 
              src="https://chat.novativa.org/web-bot/landing/3zBcClgcGe2nz6GJuWFS2KzybqTY8sWnUpRolSQ0" 
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="fullscreen"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleConfirmation;
