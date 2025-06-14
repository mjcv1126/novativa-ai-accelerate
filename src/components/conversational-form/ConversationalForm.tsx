import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { User, UserRound, Phone, Send, Mail, ArrowRight, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { countries } from '@/components/schedule/countryData';
import NovativaLogo from '@/components/shared/NovativaLogo';
import { useInterval } from '@/hooks/useInterval';

const ConversationalForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('506');
  const [phone, setPhone] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const { toast } = useToast();

  const selectedCountry = countries.find(c => c.code === countryCode);

  // Hide Botsify widget on this page
  useEffect(() => {
    const hideBotsifyWidget = () => {
      const style = document.createElement('style');
      style.id = 'hide-botsify-widget';
      style.textContent = `
        #webbot-container,
        #webbot-iframe,
        .webbot-container,
        .webbot-iframe,
        [id*="webbot"],
        [class*="webbot"],
        script[src*="chat.novativa.org"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          z-index: -9999 !important;
        }
      `;
      document.head.appendChild(style);
    };

    hideBotsifyWidget();

    return () => {
      const existingStyle = document.getElementById('hide-botsify-widget');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  // Countdown timer and redirect
  useInterval(() => {
    if (isSubmitted && countdown > 0) {
      setCountdown(prev => prev - 1);
    }
  }, isSubmitted ? 1000 : null);

  useEffect(() => {
    if (isSubmitted && countdown === 0) {
      window.location.href = 'https://tidycal.com/novativa/demo-gratis';
    }
  }, [isSubmitted, countdown]);

  const serviceOptions = [
    'Agentes IA',
    'NovaMedic',
    'NovaFitness',
    'Creación de App Personalizada',
    'Clon Avatar',
    'Creación de Jingle',
    'Otra'
  ];

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const steps = [
    {
      question: "¿Cuál es tu primer nombre?",
      field: "firstName",
      type: "text",
      placeholder: "Escribe tu nombre aquí",
      value: firstName,
      setValue: setFirstName,
      icon: User
    },
    {
      question: "¡Perfecto! Ahora, ¿cuál es tu apellido?",
      field: "lastName", 
      type: "text",
      placeholder: "Escribe tu apellido aquí",
      value: lastName,
      setValue: setLastName,
      icon: UserRound
    },
    {
      question: "Excelente. ¿Cuál es tu correo electrónico?",
      field: "email",
      type: "email", 
      placeholder: "ejemplo@correo.com",
      value: email,
      setValue: setEmail,
      icon: Mail
    },
    {
      question: "Por último, ¿cuál es tu número de WhatsApp?",
      field: "phone",
      type: "tel",
      placeholder: "Tu número de WhatsApp",
      value: phone,
      setValue: setPhone,
      icon: Phone,
      hasCountrySelect: true
    },
    {
      question: "¿Qué solución o servicio buscas? (Puedes seleccionar varias opciones)",
      field: "services",
      type: "checkbox",
      placeholder: "",
      value: selectedServices.join(', '),
      setValue: () => {},
      icon: Settings,
      isMultiSelect: true
    }
  ];

  const currentStepData = steps[currentStep];

  const handleNext = () => {
    // For services step, allow proceeding even if no service is selected
    if (currentStepData.field === 'services') {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
      return;
    }

    if (!currentStepData.value.trim()) {
      toast({
        title: "Campo requerido",
        description: "Por favor completa este campo para continuar",
        variant: "destructive",
      });
      return;
    }

    if (currentStepData.field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast({
          title: "Email inválido",
          description: "Por favor ingresa un email válido",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
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
      const response = await fetch('https://hook.us2.make.com/8l8pyxyd40p52sqed6mdqhekarmzadaw', {
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
          services: selectedServices,
          submissionDate: formattedDate,
          submissionTime: formattedTime,
          submissionDateTime: isoDateTime,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      console.log('Form submitted successfully');
      setIsSubmitted(true);
      setIsSubmitting(false);
      
    } catch (error) {
      console.error("Error sending form:", error);
      toast({
        title: "Error",
        description: "No pudimos procesar tu solicitud. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

  // Success section after form submission
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <NovativaLogo size="large" />
          </div>

          {/* Success message */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              ¡Tu información ha sido enviada exitosamente!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Ahora solo debes agendar tu videollamada en la fecha y hora de tu preferencia.
            </p>
            
            {/* Countdown */}
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-700 font-medium">
                Serás redireccionado en {countdown} segundos
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const IconComponent = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <NovativaLogo size="large" />
        </div>

        {/* Description */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            ¡Felicidades por dar el primer paso hacia la automatización!
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Agenda una videollamada con nuestros expertos en una videollamada 1:1 completando este formulario.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Paso {currentStep + 1} de {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main form card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
              {currentStepData.question}
            </h2>
          </div>

          <div className="space-y-6">
            {currentStepData.isMultiSelect ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceOptions.map((service) => (
                  <div key={service} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Checkbox
                      id={service}
                      checked={selectedServices.includes(service)}
                      onCheckedChange={() => handleServiceToggle(service)}
                      className="h-5 w-5"
                    />
                    <label 
                      htmlFor={service} 
                      className="text-gray-700 cursor-pointer flex-1 text-sm font-medium"
                    >
                      {service}
                    </label>
                  </div>
                ))}
              </div>
            ) : currentStepData.hasCountrySelect ? (
              <div className="space-y-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código de país
                  </label>
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[280px] bg-white border border-gray-200">
                      {countries.map((country) => (
                        <SelectItem key={`${country.code}-${country.name}`} value={country.code} className="hover:bg-gray-100">
                          <span className="flex items-center gap-2">
                            <span className="text-lg">{country.flag}</span>
                            <span>+{country.code}</span>
                            <span className="text-gray-600">{country.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de teléfono
                  </label>
                  <div className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                    <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-500 font-medium">+{countryCode}</span>
                    <input
                      type="tel"
                      placeholder={currentStepData.placeholder}
                      value={currentStepData.value}
                      onChange={(e) => currentStepData.setValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 outline-none bg-transparent text-gray-800 placeholder:text-gray-400 text-lg"
                      autoFocus
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                <IconComponent className="h-6 w-6 text-gray-400 flex-shrink-0" />
                <input
                  type={currentStepData.type}
                  placeholder={currentStepData.placeholder}
                  value={currentStepData.value}
                  onChange={(e) => currentStepData.setValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 outline-none bg-transparent text-gray-800 placeholder:text-gray-400 text-lg"
                  autoFocus
                />
              </div>
            )}

            <Button 
              onClick={handleNext}
              disabled={isSubmitting || (!currentStepData.isMultiSelect && !currentStepData.value.trim())}
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                "Enviando..."
              ) : currentStep === steps.length - 1 ? (
                <span className="flex items-center gap-2">
                  <Send size={20} /> 
                  Enviar y Agendar Demo
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Continuar 
                  <ArrowRight size={20} />
                </span>
              )}
            </Button>

            {currentStep > 0 && (
              <Button 
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="w-full h-12 border-gray-300 text-gray-600 hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Regresar
              </Button>
            )}
          </div>

          {/* Summary of filled data */}
          {currentStep > 0 && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Información ingresada:</h3>
              <div className="space-y-1 text-sm text-gray-800">
                {firstName && <p><strong>Nombre:</strong> {firstName}</p>}
                {lastName && <p><strong>Apellido:</strong> {lastName}</p>}
                {email && <p><strong>Email:</strong> {email}</p>}
                {phone && currentStep >= 3 && <p><strong>Teléfono:</strong> +{countryCode} {phone}</p>}
                {selectedServices.length > 0 && currentStep >= 4 && <p><strong>Servicios:</strong> {selectedServices.join(', ')}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationalForm;
