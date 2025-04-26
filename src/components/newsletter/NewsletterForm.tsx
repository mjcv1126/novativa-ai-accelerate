
import React from 'react';
import { toast } from '@/components/ui/sonner';

interface NewsletterFormProps {
  light?: boolean;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ light = false }) => {
  React.useEffect(() => {
    // Override form submission to show success message
    const handleFormSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement;
      if (form && form.classList.contains('sendfox-form')) {
        // Don't intercept the original submission
        // Just add our toast notification
        setTimeout(() => {
          toast.success("¡Bienvenido a Novativa!");
        }, 1000);
      }
    };

    document.addEventListener('submit', handleFormSubmit);
    
    return () => {
      document.removeEventListener('submit', handleFormSubmit);
    };
  }, []);

  return (
    <div className={light ? "text-white" : ""}>
      <form method="post" action="https://sendfox.com/form/mpov6q/36n47o" className="sendfox-form" id="36n47o" data-async="true" data-recaptcha="true">
        <p><label htmlFor="sendfox_form_name">First Name: </label><input type="text" id="sendfox_form_name" placeholder="First Name" name="first_name" required /></p>
        <p><label htmlFor="sendfox_form_last_name">Last Name: </label><input type="text" id="sendfox_form_last_name" placeholder="Last Name" name="last_name" required /></p>
        <p><label htmlFor="sendfox_form_email">Email: </label><input type="email" id="sendfox_form_email" placeholder="Email" name="email" required /></p>
        {/* no botz please */}
        <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true"><input type="text" name="a_password" tabIndex={-1} value="" autoComplete="off" /></div>
        <p><button type="submit">Enviar</button></p>
      </form>
      <script src="https://cdn.sendfox.com/js/form.js" charSet="utf-8"></script>
    </div>
  );
};

export default NewsletterForm;
