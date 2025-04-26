
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor ingresa un email válido.",
  }),
});

interface NewsletterFormProps {
  light?: boolean;
}

export function NewsletterForm({ light = false }: NewsletterFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const response = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Error al suscribir');

      toast({
        title: "¡Bienvenido a la comunidad IA!",
        description: "Pronto recibirás nuestras actualizaciones.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "No pudimos procesar tu suscripción. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const formClasses = light ? "text-white" : "";
  const inputClasses = light 
    ? "bg-white/10 text-white border-white/30 placeholder:text-white/70 focus:ring-white/50" 
    : "";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-4 ${formClasses}`}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={light ? "text-white" : ""}>Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="tu@email.com" 
                  {...field} 
                  className={inputClasses} 
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription className={light ? "text-white/80" : ""}>
                Recibe nuestras actualizaciones y ofertas especiales.
              </FormDescription>
              <FormMessage className={light ? "text-orange-200" : ""} />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className={`w-full ${light 
            ? "bg-novativa-orange hover:bg-novativa-lightOrange text-white" 
            : "bg-novativa-teal hover:bg-novativa-lightTeal text-white"}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Suscribirse"}
        </Button>
      </form>
    </Form>
  );
}
