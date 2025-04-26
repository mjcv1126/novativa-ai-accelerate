
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { addSubscriberToSendFox } from '@/utils/sendFoxAPI';

interface NewsletterFormProps {
  light?: boolean;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ light = false }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await addSubscriberToSendFox(email);
      
      if (!response.success) {
        throw new Error(response.message || 'Error al suscribir');
      }

      toast({
        title: "¡Bienvenido a la comunidad IA!",
        description: "Pronto recibirás nuestras actualizaciones.",
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: "No pudimos procesar tu suscripción. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tu email"
        required
        className={`w-full px-4 py-2 rounded focus:outline-none focus:ring-2 ${
          light 
            ? "text-gray-800 focus:ring-novativa-orange" 
            : "border border-gray-300 focus:ring-novativa-teal focus:border-novativa-teal"
        }`}
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className={`w-full ${
          light 
            ? "bg-novativa-orange hover:bg-novativa-lightOrange text-white" 
            : "bg-novativa-teal hover:bg-novativa-lightTeal text-white"
        }`}
      >
        {isSubmitting ? "Enviando..." : "Suscribirme"}
      </Button>
    </form>
  );
};

export default NewsletterForm;
