
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Flag } from 'lucide-react';

// Country codes with flags using emoji
const countries = [
  { code: "506", name: "Costa Rica", flag: "🇨🇷" },
  { code: "504", name: "Honduras", flag: "🇭🇳" },
  { code: "503", name: "El Salvador", flag: "🇸🇻" },
  { code: "502", name: "Guatemala", flag: "🇬🇹" },
  { code: "505", name: "Nicaragua", flag: "🇳🇮" },
  { code: "507", name: "Panamá", flag: "🇵🇦" },
  { code: "52", name: "México", flag: "🇲🇽" },
  { code: "1", name: "Estados Unidos", flag: "🇺🇸" },
];

// Get the webhook URL from environment variables
const HOOK_MAKE_PHONE = import.meta.env.VITE_HOOK_MAKE_PHONE || "";

const ScheduleConfirmation = () => {
  const [countryCode, setCountryCode] = useState("506");
  const [phone, setPhone] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedPhone = `+${countryCode}${phone.replace(/[-\s]/g, '')}`;
    
    try {
      const response = await fetch(HOOK_MAKE_PHONE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: formattedPhone }),
      });

      if (response.ok) {
        toast({
          title: "¡Enviado con éxito!",
          description: "Te enviaremos el descuento por WhatsApp pronto.",
        });
        setPhone("");
      } else {
        throw new Error('Error al enviar el número');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No pudimos procesar tu solicitud. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">
            ¡Nos vemos en la videollamada!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Exploraremos juntos cómo implementar soluciones de inteligencia artificial y automatización en tu empresa.
            Mientras tanto, te presento a Marlon IA, un clon creado con IA listo para contestar tus dudas y
            ¡parece que tiene una sorpresa especial para ti!
          </p>
        </div>

        {/* Script Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Conversemos con Marlon IA
          </h2>
          <div id="marlon-ia-script" className="w-full min-h-[400px]">
            {/* Script will be inserted here from admin panel */}
          </div>
        </div>

        {/* Phone Form */}
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            ¿No recibiste el descuento especial?
          </h3>
          <p className="text-gray-600 mb-6">
            Si no lograste recibir el descuento en tu WhatsApp, ingresa tu número aquí:
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <span className="flex items-center gap-2">
                        <span>{country.flag}</span>
                        <span>+{country.code}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Input
                type="tel"
                placeholder="Número de teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <Button type="submit" className="w-full bg-gradient-to-r from-novativa-teal to-novativa-lightTeal hover:opacity-90">
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleConfirmation;
