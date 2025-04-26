
import React from 'react';
import { toast } from '@/components/ui/sonner';

interface NewsletterFormProps {
  light?: boolean;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ light = false }) => {
  React.useEffect(() => {
    const handleFormSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement;
      if (form && form.classList.contains('sendfox-form')) {
        setTimeout(() => {
          window.location.href = '/welcome';
        }, 1000);
      }
    };

    document.addEventListener('submit', handleFormSubmit);
    return () => {
      document.removeEventListener('submit', handleFormSubmit);
    };
  }, []);

  return (
    <div className={`max-w-md mx-auto p-6 rounded-xl shadow-lg bg-white ${light ? "text-white" : ""}`}>
      <h2 className="text-2xl font-bold mb-2 text-novativa-teal">Suscríbete al newsletter</h2>
      <p className="text-gray-600 mb-6">Recibe los últimos artículos y recursos directamente en tu bandeja de entrada.</p>
      
      <form method="post" action="https://sendfox.com/form/mpov6q/36n47o" className="sendfox-form" id="36n47o" data-async="true" data-recaptcha="true">
        <div className="space-y-4">
          <div>
            <label htmlFor="sendfox_form_name" className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
            <input 
              type="text" 
              id="sendfox_form_name" 
              placeholder="Tu nombre" 
              name="first_name" 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-novativa-teal focus:border-novativa-teal"
            />
          </div>
          
          <div>
            <label htmlFor="sendfox_form_last_name" className="block text-sm font-medium text-gray-700 mb-1">Apellido:</label>
            <input 
              type="text" 
              id="sendfox_form_last_name" 
              placeholder="Tu apellido" 
              name="last_name" 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-novativa-teal focus:border-novativa-teal"
            />
          </div>
          
          <div>
            <label htmlFor="sendfox_form_email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico:</label>
            <input 
              type="email" 
              id="sendfox_form_email" 
              placeholder="tucorreo@ejemplo.com" 
              name="email" 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-novativa-teal focus:border-novativa-teal"
            />
          </div>
        </div>
        
        <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
          <input type="text" name="a_password" tabIndex={-1} value="" autoComplete="off" />
        </div>
        
        <button 
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-novativa-teal to-novativa-orange text-white py-3 px-6 rounded-md hover:opacity-90 transition-opacity font-semibold"
        >
          Suscribirse
        </button>
      </form>
      <script src="https://cdn.sendfox.com/js/form.js" charSet="utf-8"></script>
    </div>
  );
};

export default NewsletterForm;
