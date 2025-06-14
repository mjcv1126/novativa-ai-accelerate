
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, UserRound, Phone, Send, Mail, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { countries } from '@/components/schedule/countryData';
import NovativaLogo from '@/components/shared/NovativaLogo';
import TidyCalEmbed from '@/components/schedule/TidyCalEmbed';

const ConversationalForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('506');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const selectedCountry = countries.find(c => c.code === countryCode);

  const steps = [
    {
      question: "¡Hola! 👋 Para comenzar, ¿cuál es tu nombre?",
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
    }
  ];

  const currentStepData = steps[currentStep];

  const handleNext = () => {
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
          submissionDate: formattedDate,
          submissionTime: formattedTime,
          submissionDateTime: isoDateTime,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      // Show success section instead of redirecting
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
        <div className="w-full max-w-4xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <NovativaLogo size="large" />
          </div>

          {/* Success message */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              ¡Listo! Ahora solo debes agendar tu llamada en la fecha y horario que más te convenga.
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Selecciona el horario que mejor se adapte a tu agenda para tu consulta gratuita con nuestros expertos.
            </p>
          </div>

          {/* Calendar embed */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <TidyCalEmbed path="demo-gratis" className="min-h-[600px]" />
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
            {currentStepData.hasCountrySelect ? (
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
              disabled={isSubmitting || !currentStepData.value.trim()}
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationalForm;
