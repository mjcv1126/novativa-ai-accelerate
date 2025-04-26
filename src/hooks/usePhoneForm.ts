
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { trackFacebookConversion } from '@/utils/trackFacebookConversion';
import { countries } from '@/components/schedule/countryData';

const HOOK_MAKE_PHONE = "https://hook.us2.make.com/o7hcnw3x212w2ent64oopy9gku0m4kjz";

export const usePhoneForm = () => {
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

  const selectedCountry = countries.find(c => c.code === countryCode);

  const validatePhone = (phoneNumber: string) => {
    if (!selectedCountry) return false;
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    return (
      digitsOnly.length >= selectedCountry.minLength && 
      digitsOnly.length <= selectedCountry.maxLength
    );
  };

  const handlePhoneChange = (value: string) => {
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

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
    if (!value) {
      setNameError("Por favor ingresa tu nombre");
    } else {
      setNameError("");
    }
  };

  const handleLastNameChange = (value: string) => {
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

  return {
    firstName,
    lastName,
    countryCode,
    countrySearch,
    phone,
    isSubmitting,
    phoneError,
    nameError,
    lastNameError,
    isSubmitted,
    selectedCountry,
    setCountryCode,
    setCountrySearch,
    handlePhoneChange,
    handleFirstNameChange,
    handleLastNameChange,
    handleSubmit
  };
};
