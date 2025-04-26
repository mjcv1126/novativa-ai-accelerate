
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, Phone, Star, MessageCircle, Gift } from 'lucide-react';
import { trackFacebookConversion } from '@/utils/trackFacebookConversion';

// Country codes with flags using emoji and expected phone lengths
const countries = [
  // Central America
  { code: "506", name: "Costa Rica", flag: "🇨🇷", minLength: 8, maxLength: 8 },
  { code: "504", name: "Honduras", flag: "🇭🇳", minLength: 8, maxLength: 8 },
  { code: "503", name: "El Salvador", flag: "🇸🇻", minLength: 8, maxLength: 8 },
  { code: "502", name: "Guatemala", flag: "🇬🇹", minLength: 8, maxLength: 8 },
  { code: "505", name: "Nicaragua", flag: "🇳🇮", minLength: 8, maxLength: 8 },
  { code: "507", name: "Panamá", flag: "🇵🇦", minLength: 8, maxLength: 8 },
  { code: "501", name: "Belice", flag: "🇧🇿", minLength: 8, maxLength: 8 },
  
  // North America
  { code: "52", name: "México", flag: "🇲🇽", minLength: 10, maxLength: 10 },
  { code: "1", name: "Estados Unidos", flag: "🇺🇸", minLength: 10, maxLength: 10 },
  { code: "1", name: "Canadá", flag: "🇨🇦", minLength: 10, maxLength: 10 },
  
  // South America
  { code: "54", name: "Argentina", flag: "🇦🇷", minLength: 10, maxLength: 10 },
  { code: "591", name: "Bolivia", flag: "🇧🇴", minLength: 8, maxLength: 8 },
  { code: "55", name: "Brasil", flag: "🇧🇷", minLength: 10, maxLength: 11 },
  { code: "56", name: "Chile", flag: "🇨🇱", minLength: 9, maxLength: 9 },
  { code: "57", name: "Colombia", flag: "🇨🇴", minLength: 10, maxLength: 10 },
  { code: "593", name: "Ecuador", flag: "🇪🇨", minLength: 9, maxLength: 9 },
  { code: "594", name: "Guayana Francesa", flag: "🇬🇫", minLength: 9, maxLength: 9 },
  { code: "592", name: "Guyana", flag: "🇬🇾", minLength: 7, maxLength: 7 },
  { code: "595", name: "Paraguay", flag: "🇵🇾", minLength: 9, maxLength: 9 },
  { code: "51", name: "Perú", flag: "🇵🇪", minLength: 9, maxLength: 9 },
  { code: "597", name: "Surinam", flag: "🇸🇷", minLength: 7, maxLength: 7 },
  { code: "598", name: "Uruguay", flag: "🇺🇾", minLength: 8, maxLength: 9 },
  { code: "58", name: "Venezuela", flag: "🇻🇪", minLength: 10, maxLength: 10 },
  
  // Caribbean
  { code: "1787", name: "Puerto Rico", flag: "🇵🇷", minLength: 7, maxLength: 7 },
  { code: "1809", name: "República Dominicana", flag: "🇩🇴", minLength: 7, maxLength: 7 },
  { code: "53", name: "Cuba", flag: "🇨🇺", minLength: 8, maxLength: 8 },
  { code: "1876", name: "Jamaica", flag: "🇯🇲", minLength: 7, maxLength: 7 },
  { code: "509", name: "Haití", flag: "🇭🇹", minLength: 8, maxLength: 8 },
  
  // Europe
  { code: "49", name: "Alemania", flag: "🇩🇪", minLength: 10, maxLength: 11 },
  { code: "43", name: "Austria", flag: "🇦🇹", minLength: 10, maxLength: 11 },
  { code: "32", name: "Bélgica", flag: "🇧🇪", minLength: 9, maxLength: 9 },
  { code: "359", name: "Bulgaria", flag: "🇧🇬", minLength: 9, maxLength: 9 },
  { code: "385", name: "Croacia", flag: "🇭🇷", minLength: 9, maxLength: 9 },
  { code: "45", name: "Dinamarca", flag: "🇩🇰", minLength: 8, maxLength: 8 },
  { code: "421", name: "Eslovaquia", flag: "🇸🇰", minLength: 9, maxLength: 9 },
  { code: "386", name: "Eslovenia", flag: "🇸🇮", minLength: 8, maxLength: 8 },
  { code: "34", name: "España", flag: "🇪🇸", minLength: 9, maxLength: 9 },
  { code: "372", name: "Estonia", flag: "🇪🇪", minLength: 7, maxLength: 8 },
  { code: "358", name: "Finlandia", flag: "🇫🇮", minLength: 9, maxLength: 10 },
  { code: "33", name: "Francia", flag: "🇫🇷", minLength: 9, maxLength: 9 },
  { code: "30", name: "Grecia", flag: "🇬🇷", minLength: 10, maxLength: 10 },
  { code: "36", name: "Hungría", flag: "🇭🇺", minLength: 9, maxLength: 9 },
  { code: "353", name: "Irlanda", flag: "🇮🇪", minLength: 9, maxLength: 9 },
  { code: "354", name: "Islandia", flag: "🇮🇸", minLength: 7, maxLength: 7 },
  { code: "39", name: "Italia", flag: "🇮🇹", minLength: 10, maxLength: 10 },
  { code: "371", name: "Letonia", flag: "🇱🇻", minLength: 8, maxLength: 8 },
  { code: "370", name: "Lituania", flag: "🇱🇹", minLength: 8, maxLength: 8 },
  { code: "352", name: "Luxemburgo", flag: "🇱🇺", minLength: 9, maxLength: 9 },
  { code: "356", name: "Malta", flag: "🇲🇹", minLength: 8, maxLength: 8 },
  { code: "31", name: "Países Bajos", flag: "🇳🇱", minLength: 9, maxLength: 9 },
  { code: "48", name: "Polonia", flag: "🇵🇱", minLength: 9, maxLength: 9 },
  { code: "351", name: "Portugal", flag: "🇵🇹", minLength: 9, maxLength: 9 },
  { code: "44", name: "Reino Unido", flag: "🇬🇧", minLength: 10, maxLength: 10 },
  { code: "420", name: "República Checa", flag: "🇨🇿", minLength: 9, maxLength: 9 },
  { code: "40", name: "Rumania", flag: "🇷🇴", minLength: 9, maxLength: 9 },
  { code: "46", name: "Suecia", flag: "🇸🇪", minLength: 9, maxLength: 10 },
];

// Get the webhook URL from environment variables
const HOOK_MAKE_PHONE = import.meta.env.VITE_HOOK_MAKE_PHONE || "";

const ScheduleConfirmation = () => {
  const [countryCode, setCountryCode] = useState("506");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
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
      
      if (!HOOK_MAKE_PHONE) {
        console.error("Webhook URL is not defined!");
        throw new Error('No se ha configurado la URL del webhook');
      }
      
      const response = await fetch(HOOK_MAKE_PHONE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: formattedPhone }),
      });

      if (response.ok) {
        // Track the conversion
        await trackFacebookConversion('Lead', {
          customData: {
            content_name: 'Phone number submitted',
            value: 0.01,
            currency: 'USD',
          }
        });
        
        setIsSubmitted(true);
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
            ¿Para qué esperar? Conversa un poco con Marlon IA ahorita:
          </h2>
          <div id="marlon-ia-script" className="w-full min-h-[400px] rounded-lg">
            {/* Script will be inserted here from admin panel */}
          </div>
        </div>

        {/* Phone Form with glass effect */}
        <div className="max-w-md mx-auto bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-purple-100">
          {!isSubmitted ? (
            <>
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
                    <SelectContent className="max-h-[280px]">
                      {countries.map((country) => (
                        <SelectItem key={`${country.code}-${country.name}`} value={country.code}>
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
                  {isSubmitting ? "Enviando..." : (
                    <span className="flex items-center gap-2">
                      <Gift size={18} /> ¡Quiero mi descuento! 🎉
                    </span>
                  )}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="inline-block mb-4 rounded-full p-3 bg-green-100">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">¡Tu regalo va en camino! 🎁</h3>
              <p className="text-gray-600">
                Hemos recibido tu número correctamente. Pronto recibirás el descuento especial por WhatsApp.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleConfirmation;
