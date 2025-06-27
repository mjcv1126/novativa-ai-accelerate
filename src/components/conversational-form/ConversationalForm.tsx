import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { User, UserRound, Phone, Send, Mail, ArrowRight, Settings, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { countries } from '@/components/schedule/countryData';
import { useContactSync } from '@/hooks/crm/useContactSync';
import NovativaLogo from '@/components/shared/NovativaLogo';

const ConversationalForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('506');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { syncContactFromForm } = useContactSync();
  
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
  
  const serviceOptions = ['Agentes IA', 'NovaMedic', 'NovaFitness', 'Creación de App Personalizada', 'Clon Avatar', 'Creación de Jingle', 'Manejo de Redes Sociales'];

  const getBudgetOptions = (service: string) => {
    const budgetOptions = [];
    
    if (service === 'Creación de Jingle') {
      return [
        'Cuento con $100 (USD) para realizar un Jingle.',
        'Cuento con $300 (USD) para realizar un Jingle.',
        'Cuento con $500 (USD) para realizar un Jingle.',
        'Cuento con +$600 (USD) para realizar un Jingle.',
        'No cuento con la inversión necesaria.'
      ];
    }

    // Special budget options for NovaMedic, NovaFitness, and Creación de App Personalizada
    if (['Creación de App Personalizada', 'NovaFitness', 'NovaMedic'].includes(service)) {
      return [
        'Cuento con $500 (USD) de pago inicial y luego $100 (USD) al mes para dicha inversión',
        'Cuento con $500 (USD) de pago inicial y luego $200 (USD) al mes para dicha inversión',
        'Cuento con $500 (USD) de pago inicial y luego $300 (USD) al mes para dicha inversión',
        'Cuento con $500 (USD) de pago inicial y luego $500 (USD) al mes para dicha inversión',
        'Cuento con $500 (USD) de pago inicial y luego $800 (USD) al mes para dicha inversión',
        'Cuento con $500 (USD) de pago inicial y luego $1,000 (USD) al mes para dicha inversión',
        'Cuento con $500 (USD) de pago inicial y luego $1,500 (USD) al mes para dicha inversión',
        'Cuento con $500 (USD) de pago inicial y luego $1,500 (USD) para realizar un solo pago.',
        'Cuento con $500 (USD) de pago inicial y luego +$3,000 (USD) para realizar un solo pago.',
        'No cuento con la inversión necesaria.'
      ];
    }

    // $49 monthly - only for Agentes IA
    if (service === 'Agentes IA') {
      budgetOptions.push('Cuento con $49 (USD) al mes para dicha inversión');
    }

    // $100 monthly - for Agentes IA only (since other services now have different options)
    if (service === 'Agentes IA') {
      budgetOptions.push('Cuento con $100 (USD) al mes para dicha inversión');
    }

    // $200 monthly - for Agentes IA only
    if (service === 'Agentes IA') {
      budgetOptions.push('Cuento con $200 (USD) al mes para dicha inversión');
    }

    // $300 monthly - for Agentes IA only
    if (service === 'Agentes IA') {
      budgetOptions.push('Cuento con $300 (USD) al mes para dicha inversión');
    }

    // $500 monthly - for specific services
    if (['Agentes IA', 'Manejo de Redes Sociales'].includes(service)) {
      budgetOptions.push('Cuento con $500 (USD) al mes para dicha inversión');
    }

    // $800 monthly - for specific services
    if (['Agentes IA', 'Manejo de Redes Sociales', 'Clon Avatar'].includes(service)) {
      budgetOptions.push('Cuento con $800 (USD) al mes para dicha inversión');
    }

    // $1,000 monthly - for specific services
    if (['Agentes IA', 'Manejo de Redes Sociales', 'Clon Avatar'].includes(service)) {
      budgetOptions.push('Cuento con $1,000 (USD) al mes para dicha inversión');
    }

    // $1,500 monthly - for specific services
    if (['Agentes IA', 'Manejo de Redes Sociales', 'Clon Avatar'].includes(service)) {
      budgetOptions.push('Cuento con $1,500 (USD) al mes para dicha inversión');
    }

    // $3,000 monthly - for specific services
    if (['Manejo de Redes Sociales', 'Clon Avatar'].includes(service)) {
      budgetOptions.push('Cuento con $3,000 (USD) al mes para dicha inversión');
    }

    // Always show "no budget" option
    budgetOptions.push('No cuento con la inversión necesaria.');
    
    return budgetOptions;
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
      question: "¿Qué solución o servicio buscas?",
      field: "services",
      type: "select",
      placeholder: "Selecciona una opción",
      value: selectedService,
      setValue: setSelectedService,
      icon: Settings,
      isDropdown: true
    },
    {
      question: "¿Con cuánto presupuesto cuentas?",
      field: "budget",
      type: "radio",
      placeholder: "Selecciona tu presupuesto",
      value: selectedBudget,
      setValue: setSelectedBudget,
      icon: DollarSign,
      isRadioGroup: true,
      isBudgetStep: true
    }
  ];

  const currentStepData = steps[currentStep];

  const handleNext = () => {
    // For services step, require a selection
    if (currentStepData.field === 'services' && !selectedService) {
      toast({
        title: "Campo requerido",
        description: "Por favor selecciona una opción para continuar",
        variant: "destructive"
      });
      return;
    }

    // For budget step, require a selection
    if (currentStepData.field === 'budget' && !selectedBudget) {
      toast({
        title: "Campo requerido",
        description: "Por favor selecciona una opción para continuar",
        variant: "destructive"
      });
      return;
    }

    if (!currentStepData.value.trim() && !currentStepData.isDropdown && !currentStepData.isRadioGroup) {
      toast({
        title: "Campo requerido",
        description: "Por favor completa este campo para continuar",
        variant: "destructive"
      });
      return;
    }

    if (currentStepData.field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast({
          title: "Email inválido",
          description: "Por favor ingresa un email válido",
          variant: "destructive"
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
    
    console.log('=== WEBHOOK SUBMISSION DEBUG v2 ===');
    console.log('Starting form submission...');
    
    // Check if user selected "No cuento con la inversión necesaria"
    if (selectedBudget === 'No cuento con la inversión necesaria.') {
      console.log('User selected no budget option, redirecting to alternative page...');
      
      // Still sync to CRM for tracking purposes
      const syncResult = await syncContactFromForm({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.replace(/\D/g, ''),
        countryCode,
        countryName: selectedCountry?.name || '',
        services: selectedService,
        budget: selectedBudget,
        formType: 'Formulario conversacional - Sin presupuesto'
      });

      if (syncResult.success) {
        console.log('Contact synced to CRM:', syncResult.contactId);
      }
      
      // Still submit the basic data to webhook for tracking purposes
      const basicSubmissionData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: `${countryCode}${phone.replace(/\D/g, '')}`,
        services: selectedService,
        budget: selectedBudget,
        submissionDate: new Date().toLocaleDateString('es-ES'),
        submissionTime: new Date().toLocaleTimeString('es-ES'),
        form_type: 'conversational_form_no_budget',
        form_version: '2.0'
      };

      try {
        await fetch('https://hook.us2.make.com/8l8pyxyd40p52sqed6mdqhekarmzadaw', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'ConversationalForm/2.0'
          },
          body: JSON.stringify(basicSubmissionData)
        });
        console.log('✅ No budget data submitted to webhook');
      } catch (error) {
        console.error('Error submitting no budget data:', error);
      }
      
      // Redirect to alternative thank you page
      window.location.href = '/formulario-sin-inversion';
      return;
    }
    
    // Log all form values before processing
    console.log('Raw form values:', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      countryCode: countryCode,
      selectedService: selectedService,
      selectedBudget: selectedBudget
    });

    // Validate all required fields
    if (!firstName.trim()) {
      console.error('Missing firstName');
      toast({ title: "Error", description: "Nombre requerido", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    
    if (!lastName.trim()) {
      console.error('Missing lastName');
      toast({ title: "Error", description: "Apellido requerido", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    
    if (!email.trim()) {
      console.error('Missing email');
      toast({ title: "Error", description: "Email requerido", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    
    if (!phone.trim()) {
      console.error('Missing phone');
      toast({ title: "Error", description: "Teléfono requerido", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    
    if (!selectedService) {
      console.error('Missing selectedService');
      toast({ title: "Error", description: "Servicio requerido", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    
    if (!selectedBudget) {
      console.error('Missing selectedBudget');
      toast({ title: "Error", description: "Presupuesto requerido", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

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

    // Log specifically the budget data
    console.log('=== BUDGET DATA DEBUG ===');
    console.log('selectedBudget value:', selectedBudget);
    console.log('selectedBudget type:', typeof selectedBudget);
    console.log('selectedBudget length:', selectedBudget?.length);
    console.log('Budget is empty?:', !selectedBudget);

    // Sync contact to CRM first
    const syncResult = await syncContactFromForm({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: digitsOnly,
      countryCode,
      countryName: selectedCountry?.name || '',
      services: selectedService,
      budget: selectedBudget,
      formType: 'Formulario conversacional'
    });

    if (syncResult.success) {
      console.log('Contact synced to CRM:', syncResult.contactId);
      toast({
        title: syncResult.isNew ? "Nuevo lead agregado al CRM" : "Lead actualizado en CRM",
        description: `Contacto ${syncResult.isNew ? 'creado' : 'actualizado'} correctamente`,
      });
    }

    // Prepare submission data with multiple budget field variations
    const submissionData = {
      // Basic contact info
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: formattedPhone,
      countryCode: countryCode,
      countryName: selectedCountry?.name || '',
      
      // Service info
      services: selectedService,
      service: selectedService,
      servicio: selectedService,
      service_selected: selectedService,
      
      // Budget info - multiple field names to ensure webhook receives it
      budget: selectedBudget,
      presupuesto: selectedBudget,
      inversion: selectedBudget,
      investment: selectedBudget,
      budget_selected: selectedBudget,
      presupuesto_seleccionado: selectedBudget,
      
      // Date/time info
      submissionDate: formattedDate,
      submissionTime: formattedTime,
      submissionDateTime: isoDateTime,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      
      // Additional fields for webhook compatibility
      full_name: `${firstName.trim()} ${lastName.trim()}`,
      contact_phone: formattedPhone,
      contact_email: email.trim(),
      
      // Form identifier
      form_type: 'conversational_form',
      form_version: '2.0'
    };

    console.log('=== FINAL SUBMISSION DATA ===');
    console.log('Data being sent to webhook:');
    console.log(JSON.stringify(submissionData, null, 2));
    
    // Log specific budget fields being sent
    console.log('=== BUDGET FIELDS IN SUBMISSION ===');
    console.log('budget:', submissionData.budget);
    console.log('presupuesto:', submissionData.presupuesto);
    console.log('inversion:', submissionData.inversion);
    console.log('investment:', submissionData.investment);
    console.log('budget_selected:', submissionData.budget_selected);

    try {
      console.log('Sending POST request to webhook...');
      const response = await fetch('https://hook.us2.make.com/8l8pyxyd40p52sqed6mdqhekarmzadaw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'ConversationalForm/2.0'
        },
        body: JSON.stringify(submissionData)
      });

      console.log('Webhook response status:', response.status);
      console.log('Webhook response ok:', response.ok);
      
      // Log response headers
      const responseHeaders = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });
      console.log('Webhook response headers:', responseHeaders);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Webhook error response:', errorText);
        throw new Error(`Webhook error: ${response.status} - ${errorText}`);
      }

      const responseData = await response.text();
      console.log('Webhook success response:', responseData);
      console.log('✅ Form submitted successfully to webhook');
      console.log('✅ Budget data sent with multiple field names for compatibility');
      
      // Redirect to confirmation page
      console.log('Redirecting to confirmation page...');
      window.location.href = '/formulario-confirmacion';
      
    } catch (error) {
      console.error("❌ Error sending form to webhook:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack
      });
      
      toast({
        title: "Error",
        description: "No pudimos procesar tu solicitud. Por favor, intenta de nuevo.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

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
              <currentStepData.icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
              {currentStepData.question}
            </h2>
            
            {/* Show budget description only on budget step */}
            {currentStepData.isBudgetStep && (
              <>
                <p className="text-sm text-gray-600 mt-2">
                  Todos nuestros servicios son servicios recurrentes que se pagan mensualmente un fee fijo. (Excepción: Jingles)
                </p>
                
                {/* Additional text for specific services */}
                {['NovaFitness', 'Creación de App Personalizada', 'NovaMedic'].includes(selectedService) && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 leading-relaxed">
                      Adicional al pago mensual que debes hacer por mantener la plataforma activa mes a mes también hay un cobro inicial. Para desarrollar la solución se necesita una inversión inicial de implementación y desarrollo de $500. Una vez finalizado el desarrollo y entregada la solución se empieza con la suscripción mensual.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="space-y-6">
            {currentStepData.isRadioGroup ? (
              <div className="w-full">
                <RadioGroup 
                  value={selectedBudget} 
                  onValueChange={setSelectedBudget}
                  className="space-y-3"
                >
                  {getBudgetOptions(selectedService).map((option) => (
                    <div key={option} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="flex-1 cursor-pointer text-sm leading-relaxed">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ) : currentStepData.isDropdown ? (
              <div className="w-full">
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="h-12 text-base bg-white border border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    <SelectValue placeholder={currentStepData.placeholder} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-50 max-h-[300px]">
                    {serviceOptions.map((service) => (
                      <SelectItem 
                        key={service} 
                        value={service}
                        className="hover:bg-gray-100 cursor-pointer py-3 px-4"
                      >
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                        <SelectItem 
                          key={`${country.code}-${country.name}`} 
                          value={country.code}
                          className="hover:bg-gray-100"
                        >
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
                <currentStepData.icon className="h-6 w-6 text-gray-400 flex-shrink-0" />
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
              disabled={
                isSubmitting || 
                (!currentStepData.isDropdown && !currentStepData.isRadioGroup && !currentStepData.value.trim()) ||
                (currentStepData.isDropdown && !selectedService) ||
                (currentStepData.isRadioGroup && !selectedBudget)
              }
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
                {phone && currentStep >= 3 && (
                  <p><strong>Teléfono:</strong> +{countryCode} {phone}</p>
                )}
                {selectedService && currentStep >= 4 && (
                  <p><strong>Servicio:</strong> {selectedService}</p>
                )}
                {selectedBudget && currentStep >= 5 && (
                  <p><strong>Presupuesto:</strong> {selectedBudget}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationalForm;
