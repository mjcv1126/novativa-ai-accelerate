
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { trackFacebookConversion } from '@/utils/trackFacebookConversion';
import { countries } from '@/components/schedule/countryData';
import { useContactSync } from './crm/useContactSync';

const HOOK_MAKE_PHONE = "https://hook.us2.make.com/o7hcnw3x212w2ent64oopy9gku0m4kjz";

export const usePhoneForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("506");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Nuevos campos
  const [secondaryPhone, setSecondaryPhone] = useState("");
  const [secondaryCountryCode, setSecondaryCountryCode] = useState("506");
  const [secondaryEmail, setSecondaryEmail] = useState("");
  const [secondaryPhoneError, setSecondaryPhoneError] = useState("");
  const [secondaryEmailError, setSecondaryEmailError] = useState("");
  
  const { toast } = useToast();
  const { syncContactFromForm } = useContactSync();

  const selectedCountry = countries.find(c => c.code === countryCode);
  const selectedSecondaryCountry = countries.find(c => c.code === secondaryCountryCode);

  const validatePhone = (phoneNumber: string, country: any) => {
    if (!country) return false;
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    return (
      digitsOnly.length >= country.minLength && 
      digitsOnly.length <= country.maxLength
    );
  };

  const validateEmail = (email: string) => {
    if (!email) return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (!value) {
      setPhoneError("");
      return;
    }
    if (!validatePhone(value, selectedCountry)) {
      setPhoneError(`Introduce ${selectedCountry?.minLength} dígitos para ${selectedCountry?.name}`);
    } else {
      setPhoneError("");
    }
  };

  const handleSecondaryPhoneChange = (value: string) => {
    setSecondaryPhone(value);
    if (!value) {
      setSecondaryPhoneError("");
      return;
    }
    if (!validatePhone(value, selectedSecondaryCountry)) {
      setSecondaryPhoneError(`Introduce ${selectedSecondaryCountry?.minLength} dígitos para ${selectedSecondaryCountry?.name}`);
    } else {
      setSecondaryPhoneError("");
    }
  };

  const handleSecondaryEmailChange = (value: string) => {
    setSecondaryEmail(value);
    if (!value) {
      setSecondaryEmailError("");
      return;
    }
    if (!validateEmail(value)) {
      setSecondaryEmailError("Introduce un email válido");
    } else {
      setSecondaryEmailError("");
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

    if (!validatePhone(phone, selectedCountry)) {
      setPhoneError(`Introduce ${selectedCountry?.minLength} dígitos para ${selectedCountry?.name}`);
      isValid = false;
    }

    // Validar teléfono secundario solo si se proporcionó
    if (secondaryPhone && !validatePhone(secondaryPhone, selectedSecondaryCountry)) {
      setSecondaryPhoneError(`Introduce ${selectedSecondaryCountry?.minLength} dígitos para ${selectedSecondaryCountry?.name}`);
      isValid = false;
    }

    // Validar email secundario solo si se proporcionó
    if (secondaryEmail && !validateEmail(secondaryEmail)) {
      setSecondaryEmailError("Introduce un email válido");
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
    
    // Formatear teléfono secundario si existe
    let formattedSecondaryPhone = '';
    if (secondaryPhone.trim()) {
      const secondaryDigitsOnly = secondaryPhone.replace(/\D/g, '');
      formattedSecondaryPhone = `+${secondaryCountryCode}${secondaryDigitsOnly}`;
    }
    
    try {
      // Preparar datos adicionales para el CRM
      const additionalData = {
        additionalPhones: formattedSecondaryPhone ? [formattedSecondaryPhone] : undefined,
        additionalEmails: secondaryEmail.trim() ? [secondaryEmail.trim()] : undefined
      };

      // Sync contact to CRM first
      const syncResult = await syncContactFromForm({
        firstName,
        lastName,
        phone: digitsOnly,
        countryCode,
        countryName: selectedCountry?.name || '',
        formType: 'Formulario de descuento',
        ...additionalData
      });

      if (syncResult.success) {
        console.log('Contact synced to CRM:', syncResult.contactId);
        toast({
          title: syncResult.isNew ? "Nuevo lead agregado al CRM" : "Lead actualizado en CRM",
          description: `Contacto ${syncResult.isNew ? 'creado' : 'actualizado'} correctamente`,
        });
      }

      // Send to Make webhook
      const webhookData = {
        firstName: firstName,
        lastName: lastName,
        phone: formattedPhone,
        countryCode: countryCode,
        countryName: selectedCountry?.name,
        ...(formattedSecondaryPhone && { secondaryPhone: formattedSecondaryPhone }),
        ...(secondaryEmail.trim() && { secondaryEmail: secondaryEmail.trim() })
      };

      const response = await fetch(HOOK_MAKE_PHONE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
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
      
      // Reset form
      setPhone("");
      setFirstName("");
      setLastName("");
      setSecondaryPhone("");
      setSecondaryEmail("");
      
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
    phone,
    isSubmitting,
    phoneError,
    nameError,
    lastNameError,
    isSubmitted,
    selectedCountry,
    setCountryCode,
    handlePhoneChange,
    handleFirstNameChange,
    handleLastNameChange,
    handleSubmit,
    // Nuevos campos
    secondaryPhone,
    secondaryCountryCode,
    secondaryEmail,
    secondaryPhoneError,
    secondaryEmailError,
    selectedSecondaryCountry,
    setSecondaryCountryCode,
    handleSecondaryPhoneChange,
    handleSecondaryEmailChange
  };
};
