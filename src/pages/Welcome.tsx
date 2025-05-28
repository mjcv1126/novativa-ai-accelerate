
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const Welcome = () => {
  const openTidyCal = () => {
    window.open('https://tidycal.com/novativa/demo-gratis', '_blank');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-novativa-teal to-novativa-orange animate-fade-in">
            ¡Bienvenido a la Familia Novativa! 🎉
          </h1>
          
          <div className="my-8 flex justify-center">
            <img 
              src="https://media.giphy.com/media/l3q2G3MytGDTBpC6Y/giphy.gif" 
              alt="Celebration" 
              className="rounded-lg shadow-2xl max-w-md w-full"
            />
          </div>

          <p className="text-xl md:text-2xl mb-8 animate-fade-in delay-100">
            ¡Prepárate para recibir contenido increíble sobre IA! 🚀 
            <br />
            <span className="text-novativa-teal">Has tomado la mejor decisión</span>
          </p>

          <div className="space-y-4">
            <Button
              onClick={openTidyCal}
              size="lg"
              className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white px-8 py-6 text-lg animate-bounce-slow"
            >
              <Calendar className="w-6 h-6 mr-2" />
              ¡Agenda una demo gratis ahora!
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Welcome;
