
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Phone, Gift, Check } from 'lucide-react';
import { trackFacebookConversion } from '@/utils/trackFacebookConversion';
import { countries } from './countryData';

// Get the webhook URL from environment variables
const HOOK_MAKE_PHONE = import.meta.env.VITE_HOOK_MAKE_PHONE || "";

const PhoneForm = () => {
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
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    return (
      digitsOnly.length >= selectedCountry.minLength && 
      digitsOnly.length <= selectedCountry.maxLength
    );
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    if (!value) {
      setPhoneError("");
      return;
    }
    if (!validatePhone(value)) {
      setPhoneError(`Introduce ${selectedCountry?.minLength} dígitos para ${selectedCountry?.name}`);
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(phone)) {
      setPhoneError(`Introduce ${selectedCountry?.minLength} dígitos para ${selectedCountry?.name}`);
      return;
    }
    setPhoneError("");
    setIsSubmitting(true);
    
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

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="inline-block mb-4 rounded-full p-3 bg-green-100">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">¡Tu regalo va en camino! 🎁</h3>
        <p className="text-gray-600">
          Hemos recibido tu número correctamente. Pronto recibirás el descuento especial por WhatsApp.
        </p>
      </div>
    );
  }

  return (
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
          disabled={isSubmitting || !!phoneError}
        >
          {isSubmitting ? "Enviando..." : (
            <span className="flex items-center gap-2">
              <Gift size={18} /> ¡Quiero mi descuento! 🎉
            </span>
          )}
        </Button>
      </form>
    </>
  );
};

export default PhoneForm;
