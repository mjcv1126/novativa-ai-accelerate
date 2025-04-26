
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, Phone, Star, MessageCircle } from 'lucide-react';

// Country codes with flags using emoji and expected phone lengths
const countries = [
  { code: "506", name: "Costa Rica", flag: "🇨🇷", minLength: 8, maxLength: 8 },
  { code: "504", name: "Honduras", flag: "🇭🇳", minLength: 8, maxLength: 8 },
  { code: "503", name: "El Salvador", flag: "🇸🇻", minLength: 8, maxLength: 8 },
  { code: "502", name: "Guatemala", flag: "🇬🇹", minLength: 8, maxLength: 8 },
  { code: "505", name: "Nicaragua", flag: "🇳🇮", minLength: 8, maxLength: 8 },
  { code: "507", name: "Panamá", flag: "🇵🇦", minLength: 8, maxLength: 8 },
  { code: "52", name: "México", flag: "🇲🇽", minLength: 10, maxLength: 10 },
  { code: "1", name: "Estados Unidos", flag: "🇺🇸", minLength: 10, maxLength: 10 },
];

// Get the webhook URL from environment variables
const HOOK_MAKE_PHONE = import.meta.env.VITE_HOOK_MAKE_PHONE || "";

const ScheduleConfirmation = () => {
  const [countryCode, setCountryCode] = useState("506");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const { toast } = useToast();

  // Get the selected country object
  const selectedCountry = countries.find(c => c.code === countryCode);

  // Validate phone number based on country
  const validatePhone = (phoneNumber: string) => {
    if (!selectedCountry) return false;
    
    // Remove any non-digit characters for validation
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    
    // Check if length matches expected length for this country
    return (
      digitsOnly.length >= selectedCountry.minLength && 
      digitsOnly.length <= selectedCountry.maxLength
    );
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    
    // Clear error if field is empty
    if (!value) {
      setPhoneError("");
      return;
    }
    
    // Show error if not valid for selected country
    if (!validatePhone(value)) {
      setPhoneError(`Introduce ${selectedCountry?.minLength} dígitos para ${selectedCountry?.name}`);
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate before submission
    if (!validatePhone(phone)) {
      setPhoneError(`Introduce ${selectedCountry?.minLength} dígitos para ${selectedCountry?.name}`);
      return;
    }
    
    // Clear any previous errors
    setPhoneError("");
    setIsSubmitting(true);
    
    // Format the phone number: remove all non-digits and ensure format is +[code][number]
    const digitsOnly = phone.replace(/\D/g, '');
    const formattedPhone = `+${countryCode}${digitsOnly}`;
    
    try {
      console.log("Sending to webhook:", formattedPhone);
      const response = await fetch(HOOK_MAKE_PHONE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: formattedPhone }),
      });

      if (response.ok) {
        toast({
          title: "¡Genial! 🎉",
          description: "Te enviaremos el descuento especial por WhatsApp pronto.",
        });
        setPhone("");
      } else {
        console.error("Error response:", response.status, response.statusText);
        throw new Error('Error al enviar el número');
      }
    } catch (error) {
      console.error("Error sending number:", error);
      toast({
        title: "¡Ups! Algo salió mal 😅",
        description: "No pudimos procesar tu solicitud. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-sky-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Fun animated header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-6 p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full">
            <Star className="h-12 w-12 text-white animate-pulse-subtle" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 text-transparent bg-clip-text">
            ¡Nos vemos en la videollamada! 🚀
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Exploraremos juntos cómo implementar soluciones de 
            <span className="font-bold text-blue-600"> inteligencia artificial</span> y 
            <span className="font-bold text-purple-600"> automatización</span> en tu empresa.
          </p>
          <div className="flex justify-center gap-3 mb-8">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2 animate-bounce-slow">
              <MessageCircle size={18} /> Chatbot IA
            </span>
            <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full flex items-center gap-2 animate-subtle-shake">
              <Check size={18} /> Automatización
            </span>
          </div>
        </div>

        {/* Script Section with glass effect */}
        <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg p-8 mb-12 border border-blue-100">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <div className="h-6 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
            Conversemos con Marlon IA
          </h2>
          <div id="marlon-ia-script" className="w-full min-h-[400px] rounded-lg">
            {/* Script will be inserted here from admin panel */}
          </div>
        </div>

        {/* Phone Form with glass effect */}
        <div className="max-w-md mx-auto bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-purple-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                ¿No recibiste el descuento? 🎁
              </h3>
              <p className="text-sm text-gray-600">
                Ingresa tu número aquí
              </p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <Select value={countryCode} onValueChange={(value) => {
                setCountryCode(value);
                // Clear error when changing country
                if (phone) {
                  setPhoneError("");
                }
              }}>
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
              
              <div className="flex-1">
                <Input
                  type="tel"
                  placeholder={`Número (${selectedCountry?.minLength} dígitos)`}
                  value={phone}
                  onChange={handlePhoneChange}
                  className={`w-full ${phoneError ? 'border-red-300 focus:ring-red-500' : ''}`}
                />
                {phoneError && (
                  <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                )}
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:opacity-90 transition-all"
              disabled={isSubmitting || !!phoneError}>
              {isSubmitting ? "Enviando..." : "¡Quiero mi descuento! 🎉"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleConfirmation;
