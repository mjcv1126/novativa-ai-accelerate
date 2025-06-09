
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, UserRound, Phone, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { countries } from '@/components/schedule/countryData';
import { useNavigate } from 'react-router-dom';

const ContactForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [countryCode, setCountryCode] = useState('506');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const selectedCountry = countries.find(c => c.code === countryCode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Format phone: country code + number (no + symbol, no spaces)
    const digitsOnly = phone.replace(/\D/g, '');
    const formattedPhone = `${countryCode}${digitsOnly}`;
    
    try {
      const response = await fetch('https://hook.us2.make.com/ymsbbblf4mxb6sj4somln8ry6j3sb5u8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: formattedPhone,
          countryCode: countryCode,
          countryName: selectedCountry?.name || ''
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      // Redirect to thank you page
      navigate('/curso-agentes-ia-gracias');
      
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
    <div id="contact-form" className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">
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
            <User className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Nombre"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="flex-1 outline-none bg-transparent text-white placeholder:text-gray-400"
              required
            />
          </div>
          
          <div className="flex items-center gap-2 px-3 py-2 border border-gray-700 rounded-md bg-gray-800/50 focus-within:ring-2 focus-within:ring-novativa-teal focus-within:border-transparent">
            <UserRound className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="flex-1 outline-none bg-transparent text-white placeholder:text-gray-400"
              required
            />
          </div>
        </div>
        
        {/* Phone Field */}
        <div className="flex gap-3">
          <div className="w-[140px]">
            <Select value={countryCode} onValueChange={setCountryCode}>
              <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {countries.map((country) => (
                  <SelectItem key={`${country.code}-${country.name}`} value={country.code} className="text-white hover:bg-gray-700">
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
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-700 rounded-md bg-gray-800/50 focus-within:ring-2 focus-within:ring-novativa-teal focus-within:border-transparent">
              <Phone className="h-4 w-4 text-gray-400" />
              <input
                type="tel"
                placeholder={`WhatsApp (${selectedCountry?.minLength} dígitos)`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 outline-none bg-transparent text-white placeholder:text-gray-400"
                required
              />
            </div>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white py-3 text-lg font-semibold transition-all transform hover:scale-105"
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
