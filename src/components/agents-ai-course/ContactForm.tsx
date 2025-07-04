
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, UserRound, Phone, Send, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { countries } from '@/components/schedule/countryData';
import { useNavigate } from 'react-router-dom';
import { useContactSync } from '@/hooks/crm/useContactSync';

const ContactForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('506');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { syncContactFromForm } = useContactSync();

  const selectedCountry = countries.find(c => c.code === countryCode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
    
    // Get current date and time
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const formattedTime = now.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    const isoDateTime = now.toISOString();
    
    try {
      // Sync contact to CRM first
      const syncResult = await syncContactFromForm({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: digitsOnly,
        countryCode,
        countryName: selectedCountry?.name || '',
        services: 'Curso Agentes IA',
        formType: 'Curso Agentes IA'
      });

      if (syncResult.success) {
        console.log('Contact synced to CRM:', syncResult.contactId);
        toast({
          title: syncResult.isNew ? "Nuevo lead agregado al CRM" : "Lead actualizado en CRM",
          description: `Contacto ${syncResult.isNew ? 'creado' : 'actualizado'} correctamente`,
        });
      }

      const response = await fetch('https://hook.us2.make.com/ymsbbblf4mxb6sj4somln8ry6j3sb5u8', {
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
          countryName: selectedCountry?.name || '',
          submissionDate: formattedDate,
          submissionTime: formattedTime,
          submissionDateTime: isoDateTime,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
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
                {countries.map((country) => (
                  <SelectItem key={`${country.code}-${country.name}`} value={country.code} className="text-white hover:bg-gray-700">
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
