
import React, { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Phone, Gift, Check, User, UserRound } from 'lucide-react';
import { countries } from './countryData';
import { supabase } from "@/integrations/supabase/client";
import { trackFacebookConversion } from '@/utils/trackFacebookConversion';

const HOOK_MAKE_PHONE = "https://hook.us2.make.com/o7hcnw3x212w2ent64oopy9gku0m4kjz";

const PhoneForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("506");
  const [countrySearch, setCountrySearch] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  // Filter countries based on search
  const filteredCountries = useMemo(() => {
    const searchTerm = countrySearch.toLowerCase();
    return countries.filter(country => 
      country.name.toLowerCase().includes(searchTerm) ||
      country.flag.includes(searchTerm) ||
      country.code.includes(searchTerm)
    );
  }, [countrySearch]);

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

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    if (!value) {
      setNameError("Por favor ingresa tu nombre");
    } else {
      setNameError("");
    }
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    if (!value) {
      setLastNameError("Por favor ingresa tu apellido");
    } else {
      setLastNameError("");
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!firstName.trim()) {
      setNameError("Por favor ingresa tu nombre");
      isValid = false;
    }

    if (!lastName.trim()) {
      setLastNameError("Por favor ingresa tu apellido");
      isValid = false;
    }

    if (!validatePhone(phone)) {
      setPhoneError(`Introduce ${selectedCountry?.minLength} dígitos para ${selectedCountry?.name}`);
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    const digitsOnly = phone.replace(/\D/g, '');
    const formattedPhone = `+${countryCode}${digitsOnly}`;
    
    try {
      console.log("Sending to webhook:", formattedPhone, firstName, lastName);
      
      // First, store in Supabase
      const { data, error } = await supabase.rpc('store_contact', {
        p_first_name: firstName,
        p_last_name: lastName,
        p_country_code: countryCode,
        p_country_name: selectedCountry?.name || '',
        p_phone: formattedPhone
      });

      if (error) throw error;

      // Then send to Make.com webhook
      const response = await fetch(HOOK_MAKE_PHONE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phone: formattedPhone,
          firstName,
          lastName,
          countryCode,
          countryName: selectedCountry?.name
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el número');
      }

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
      setFirstName("");
      setLastName("");
      
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
          Hemos recibido tu información correctamente. Pronto recibirás el descuento especial por WhatsApp.
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
            Ingresa tus datos aquí
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
            <User className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Nombre"
              value={firstName}
              onChange={handleFirstNameChange}
              className="flex-1 outline-none bg-transparent text-gray-800 placeholder:text-gray-400"
            />
          </div>
          {nameError && (
            <p className="text-red-500 text-xs mt-1 ml-1">{nameError}</p>
          )}
          
          <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
            <UserRound className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Apellido"
              value={lastName}
              onChange={handleLastNameChange}
              className="flex-1 outline-none bg-transparent text-gray-800 placeholder:text-gray-400"
            />
          </div>
          {lastNameError && (
            <p className="text-red-500 text-xs mt-1 ml-1">{lastNameError}</p>
          )}
        </div>
        
        <div className="flex gap-3">
          <div className="relative w-[140px]">
            <Input 
              type="text"
              placeholder="Buscar país..."
              value={countrySearch}
              onChange={(e) => setCountrySearch(e.target.value)}
              className="mb-2"
            />
            <Select value={countryCode} onValueChange={(value) => {
              setCountryCode(value);
              if (phone) {
                setPhoneError("");
              }
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[280px]">
                {filteredCountries.map((country) => (
                  <SelectItem key={`${country.code}-${country.name}`} value={country.code}>
                    <span className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>+{country.code}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
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
          disabled={isSubmitting || !!phoneError || !!nameError || !!lastNameError}
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
