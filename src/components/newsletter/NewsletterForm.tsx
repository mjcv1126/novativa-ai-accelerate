
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
      className="sendfox-form space-y-3" 
      id="36n47o" 
      data-async="true" 
      data-recaptcha="true"
    >
      <div className="space-y-2">
        <input 
          type="email" 
          id="sendfox_form_email" 
          placeholder="Tu Email" 
          name="email" 
          required 
          className={`w-full px-4 py-2 rounded focus:outline-none focus:ring-2 ${
            light ? "text-gray-800 focus:ring-novativa-orange" : "border border-gray-300 focus:ring-novativa-teal focus:border-novativa-teal"
          }`}
        />
        
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
