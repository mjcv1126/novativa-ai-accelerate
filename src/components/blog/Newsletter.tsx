
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';

const Newsletter = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    
    // Create a hidden iframe for the sendfox form submission
    const iframeId = 'sendfox-iframe';
    let iframe = document.getElementById(iframeId) as HTMLIFrameElement;
    
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = iframeId;
      iframe.name = iframeId;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }
    
    // Set form target to the iframe
    form.target = iframeId;
    form.submit();
    
    toast.success('¡Gracias por suscribirte a nuestro newsletter!', {
      duration: 5000,
    });
    
    // Reset the form
    form.reset();
  };

  return (
    <div className="bg-gradient-to-br from-novativa-teal/10 to-white p-8 rounded-lg">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
        <div className="lg:flex-1">
          <h3 className="text-xl font-bold mb-2">¡Mantente informado!</h3>
          <p className="text-gray-600">
            Suscríbete a nuestro newsletter para recibir los últimos artículos, noticias y actualizaciones sobre IA y automatización.
          </p>
        </div>
        
        <div className="lg:flex-1">
          <form 
            method="post" 
            action="https://sendfox.com/form/mpov6q/36n47o" 
            className="sendfox-form space-y-4" 
            id="36n47o" 
            data-async="true" 
            data-recaptcha="true"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="sendfox_form_name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre:
              </label>
              <Input
                type="text"
                id="sendfox_form_name"
                placeholder="Nombre"
                name="first_name"
                required
                className="border-gray-300 focus:border-novativa-teal focus:ring-novativa-teal/20"
              />
            </div>
            
            <div>
              <label htmlFor="sendfox_form_last_name" className="block text-sm font-medium text-gray-700 mb-1">
                Apellido:
              </label>
              <Input
                type="text"
                id="sendfox_form_last_name"
                placeholder="Apellido"
                name="last_name"
                required
                className="border-gray-300 focus:border-novativa-teal focus:ring-novativa-teal/20"
              />
            </div>
            
            <div>
              <label htmlFor="sendfox_form_email" className="block text-sm font-medium text-gray-700 mb-1">
                Email:
              </label>
              <Input
                type="email"
                id="sendfox_form_email"
                placeholder="Email"
                name="email"
                required
                className="border-gray-300 focus:border-novativa-teal focus:ring-novativa-teal/20"
              />
            </div>
            
            {/* Hidden field to prevent bots */}
            <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
              <input type="text" name="a_password" tabIndex={-1} value="" autoComplete="off" />
            </div>
            
            <Button 
              type="submit" 
              className="bg-novativa-teal hover:bg-novativa-darkTeal text-white w-full transition-all hover:shadow-lg"
            >
              Suscribirme al Newsletter
            </Button>
          </form>
          
          {/* Sendfox script */}
          <script src="https://cdn.sendfox.com/js/form.js" charSet="utf-8" defer />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
