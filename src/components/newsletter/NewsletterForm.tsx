
import React from 'react';

interface NewsletterFormProps {
  light?: boolean;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ light = false }) => {
  React.useEffect(() => {
    // Add SendFox script
    const existingScript = document.querySelector('script[src="https://cdn.sendfox.com/js/form.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = "https://cdn.sendfox.com/js/form.js";
      script.charset = "utf-8";
      document.body.appendChild(script);
      
      return () => {
        // Clean up only if this component added the script
        const scriptToRemove = document.querySelector('script[src="https://cdn.sendfox.com/js/form.js"]');
        if (scriptToRemove) {
          document.body.removeChild(scriptToRemove);
        }
      };
    }
  }, []);

  return (
    <form 
      method="post" 
      action="https://sendfox.com/form/mpov6q/36n47o" 
      className={`sendfox-form space-y-3 ${light ? "text-white" : ""}`} 
      id="36n47o" 
      data-async="true" 
      data-recaptcha="true"
    >
      <div className="space-y-2">
        <div>
          <label htmlFor="sendfox_form_name" className={`block mb-1 ${light ? "text-white" : "text-gray-700"}`}>
            Nombre:
          </label>
          <input 
            type="text" 
            id="sendfox_form_name" 
            placeholder="Tu nombre" 
            name="first_name" 
            required
            className={`w-full px-4 py-2 rounded focus:outline-none focus:ring-2 ${
              light ? "bg-white/10 text-white placeholder-white/70 border border-white/30 focus:ring-novativa-orange" 
              : "border border-gray-300 focus:ring-novativa-teal focus:border-novativa-teal"
            }`} 
          />
        </div>
        
        <div>
          <label htmlFor="sendfox_form_last_name" className={`block mb-1 ${light ? "text-white" : "text-gray-700"}`}>
            Apellido:
          </label>
          <input 
            type="text" 
            id="sendfox_form_last_name" 
            placeholder="Tu apellido" 
            name="last_name" 
            required
            className={`w-full px-4 py-2 rounded focus:outline-none focus:ring-2 ${
              light ? "bg-white/10 text-white placeholder-white/70 border border-white/30 focus:ring-novativa-orange" 
              : "border border-gray-300 focus:ring-novativa-teal focus:border-novativa-teal"
            }`} 
          />
        </div>
        
        <div>
          <label htmlFor="sendfox_form_email" className={`block mb-1 ${light ? "text-white" : "text-gray-700"}`}>
            Email:
          </label>
          <input 
            type="email" 
            id="sendfox_form_email" 
            placeholder="Tu email" 
            name="email" 
            required
            className={`w-full px-4 py-2 rounded focus:outline-none focus:ring-2 ${
              light ? "bg-white/10 text-white placeholder-white/70 border border-white/30 focus:ring-novativa-orange" 
              : "border border-gray-300 focus:ring-novativa-teal focus:border-novativa-teal"
            }`} 
          />
        </div>
        
        {/* no bots please */}
        <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
          <input type="text" name="a_password" tabIndex={-1} value="" autoComplete="off" />
        </div>
        
        <button 
          type="submit"
          className={`w-full px-4 py-2 rounded font-medium ${
            light 
              ? "bg-novativa-orange hover:bg-novativa-lightOrange text-white" 
              : "bg-novativa-teal hover:bg-novativa-lightTeal text-white"
          }`}
        >
          Suscribirme
        </button>
      </div>
    </form>
  );
};

export default NewsletterForm;
