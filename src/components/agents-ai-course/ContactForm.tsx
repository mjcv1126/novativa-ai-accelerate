
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, UserRound, Phone, Send, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { countries } from '@/components/schedule/countryData';
import { useNavigate } from 'react-router-dom';

const ContactForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('506');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const selectedCountry = countries.find(c => c.code === countryCode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Form submission started");
    console.log("Form data:", { firstName, lastName, email, countryCode, phone });
    
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Format phone: country code + number (no + symbol, no spaces)
    const digitsOnly = phone.replace(/\D/g, '');
    const formattedPhone = `${countryCode}${digitsOnly}`;
    
    console.log("Sending to webhook:", formattedPhone);
    
    try {
      const response = await fetch('https://agencianovativa.app.n8n.cloud/webhook/17355330-85d4-42f2-93f3-dbc1b0c8afe9', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: formattedPhone,
          countryCode: countryCode,
          countryName: selectedCountry?.name || ''
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      console.log("Form submitted successfully");
      
      // Show success toast before redirecting
      toast({
        title: "¡Enviado exitosamente!",
        description: "Recibirás la información del curso pronto.",
      });

      // Small delay before redirect to ensure toast is visible
      setTimeout(() => {
        navigate('/curso-agentes-ia-gracias');
      }, 1000);
      
    } catch (error) {
      console.error("Error sending form:", error);
      toast({
        title: "Error",
        description: "No pudimos procesar tu solicitud. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-form" className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-4 md:p-6 border border-gray-800">
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
          Completa el Formulario
        </h3>
        <p className="text-gray-400">
          Recibe información completa del curso
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 px-3 py-2 border border-gray-700 rounded-md bg-gray-800/50 focus-within:ring-2 focus-within:ring-novativa-teal focus-within:border-transparent">
            <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Nombre"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="flex-1 outline-none bg-transparent text-white placeholder:text-gray-400 min-w-0"
              required
            />
          </div>
          
          <div className="flex items-center gap-2 px-3 py-2 border border-gray-700 rounded-md bg-gray-800/50 focus-within:ring-2 focus-within:ring-novativa-teal focus-within:border-transparent">
            <UserRound className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="flex-1 outline-none bg-transparent text-white placeholder:text-gray-400 min-w-0"
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="flex items-center gap-2 px-3 py-2 border border-gray-700 rounded-md bg-gray-800/50 focus-within:ring-2 focus-within:ring-novativa-teal focus-within:border-transparent">
          <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 outline-none bg-transparent text-white placeholder:text-gray-400 min-w-0"
            required
          />
        </div>
        
        {/* Phone Field */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-[120px] lg:w-[140px] flex-shrink-0">
            <Select value={countryCode} onValueChange={setCountryCode}>
              <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {countries.map((country, index) => (
                  <SelectItem key={`country-${index}-${country.code}`} value={country.code} className="text-white hover:bg-gray-700">
                    <span className="flex items-center gap-2">
                      <span className="text-sm">{country.flag}</span>
                      <span className="text-sm">+{country.code}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-700 rounded-md bg-gray-800/50 focus-within:ring-2 focus-within:ring-novativa-teal focus-within:border-transparent">
              <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <input
                type="tel"
                placeholder={`WhatsApp (${selectedCountry?.minLength} dígitos)`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 outline-none bg-transparent text-white placeholder:text-gray-400 text-sm sm:text-base min-w-0"
                required
              />
            </div>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white py-3 text-base md:text-lg font-semibold transition-all transform hover:scale-105"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : (
            <span className="flex items-center gap-2">
              <Send size={18} /> Enviar Información del Curso
            </span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
