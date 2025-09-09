import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronLeft, ChevronRight, User, Mail, Phone, DollarSign, MessageSquare, CheckCircle } from 'lucide-react';
import NovativaLogo from '@/components/shared/NovativaLogo';
import { useToast } from '@/hooks/use-toast';
import { useContactSync } from '@/hooks/crm/useContactSync';

const FormAgentForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { syncContactFromForm } = useContactSync();
  
  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [service, setService] = useState('');
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Hide Botsify widget on this page
    const style = document.createElement('style');
    style.innerHTML = '.botsify-chat-button { display: none !important; }';
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const getBudgetOptions = (service: string) => {
    switch (service) {
      case 'Agente Virtual':
        return ['$500 - $1,000', '$1,000 - $2,500', '$2,500 - $5,000', '$5,000+'];
      case 'Desarrollo de App Móvil':
        return ['$2,000 - $5,000', '$5,000 - $10,000', '$10,000 - $20,000', '$20,000+'];
      case 'Sistema CRM Personalizado':
        return ['$1,500 - $3,000', '$3,000 - $6,000', '$6,000 - $12,000', '$12,000+'];
      case 'Automatización de Procesos':
        return ['$800 - $2,000', '$2,000 - $4,000', '$4,000 - $8,000', '$8,000+'];
      case 'Integración de IA':
        return ['$1,000 - $2,500', '$2,500 - $5,000', '$5,000 - $10,000', '$10,000+'];
      default:
        return ['$500 - $1,500', '$1,500 - $3,000', '$3,000 - $6,000', '$6,000+'];
    }
  };

  const steps = [
    {
      question: "¿Cuál es tu nombre?",
      field: "firstName",
      type: "text",
      placeholder: "Ingresa tu nombre",
      value: firstName,
      setter: setFirstName,
      icon: <User className="w-6 h-6 text-primary" />
    },
    {
      question: "¿Cuál es tu apellido?",
      field: "lastName",
      type: "text",
      placeholder: "Ingresa tu apellido",
      value: lastName,
      setter: setLastName,
      icon: <User className="w-6 h-6 text-primary" />
    },
    {
      question: "¿Cuál es tu correo electrónico?",
      field: "email",
      type: "email",
      placeholder: "ejemplo@correo.com",
      value: email,
      setter: setEmail,
      icon: <Mail className="w-6 h-6 text-primary" />
    },
    {
      question: "¿Cuál es tu número de teléfono?",
      field: "phone",
      type: "phone",
      placeholder: "Ingresa tu número",
      value: phone,
      setter: setPhone,
      icon: <Phone className="w-6 h-6 text-primary" />
    },
    {
      question: "¿Qué servicio te interesa?",
      field: "service",
      type: "select",
      options: [
        "Agente Virtual",
        "Desarrollo de App Móvil",
        "Sistema CRM Personalizado",
        "Automatización de Procesos",
        "Integración de IA",
        "Otro"
      ],
      value: service,
      setter: setService,
      icon: <MessageSquare className="w-6 h-6 text-primary" />
    },
    {
      question: "¿Cuál es tu presupuesto aproximado?",
      field: "budget",
      type: "radio",
      options: getBudgetOptions(service),
      value: budget,
      setter: setBudget,
      icon: <DollarSign className="w-6 h-6 text-primary" />
    },
    {
      question: "Cuéntanos más sobre tu proyecto",
      field: "description",
      type: "textarea",
      placeholder: "Describe brevemente tu proyecto o necesidades...",
      value: description,
      setter: setDescription,
      icon: <MessageSquare className="w-6 h-6 text-primary" />
    }
  ];

  const handleNext = () => {
    const currentStepData = steps[currentStep];
    
    // Validation
    if (currentStepData.field === 'firstName' && !firstName.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu nombre",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStepData.field === 'lastName' && !lastName.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu apellido",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStepData.field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim() || !emailRegex.test(email)) {
        toast({
          title: "Error",
          description: "Por favor ingresa un email válido",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (currentStepData.field === 'phone' && !phone.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu número de teléfono",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStepData.field === 'service' && !service.trim()) {
      toast({
        title: "Error",
        description: "Por favor selecciona un servicio",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStepData.field === 'budget' && !budget.trim()) {
      toast({
        title: "Error",
        description: "Por favor selecciona un presupuesto",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      toast({
        title: "Error",
        description: "Por favor describe tu proyecto",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const fullPhone = `${countryCode}${phone}`;
      
      // Sync with CRM
      await syncContactFromForm({
        firstName,
        lastName,
        email,
        phone: fullPhone,
        source: 'Form Agent',
        service,
        budget,
        description
      });
      
      // Send to webhook
      const webhookData = {
        firstName,
        lastName,
        email,
        phone: fullPhone,
        service,
        budget,
        description,
        source: 'Form Agent',
        timestamp: new Date().toISOString()
      };
      
      await fetch('https://hook.us2.make.com/8l8pyxyd40p52sqed6mdqhekarmzadaw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      });
      
      toast({
        title: "¡Éxito!",
        description: "Tu información ha sido enviada correctamente",
      });
      
      // Redirect to confirmation page
      window.location.href = '/formagent-confirmacion';
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar el formulario. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSubmitting) {
      handleNext();
    }
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-2xl border-0 bg-card/95 backdrop-blur">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <NovativaLogo />
            </div>
            <p className="text-muted-foreground">
              Completa este formulario y nuestro equipo se contactará contigo para ayudarte con tu proyecto
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Progreso</span>
              <span className="text-sm text-muted-foreground">{currentStep + 1} de {steps.length}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              {currentStepData.icon}
              <h2 className="text-2xl font-bold text-foreground">
                {currentStepData.question}
              </h2>
            </div>

            {/* Input Field */}
            {currentStepData.type === 'text' && (
              <Input
                type="text"
                placeholder={currentStepData.placeholder}
                value={currentStepData.value}
                onChange={(e) => currentStepData.setter(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-lg py-6"
                autoFocus
              />
            )}

            {currentStepData.type === 'email' && (
              <Input
                type="email"
                placeholder={currentStepData.placeholder}
                value={currentStepData.value}
                onChange={(e) => currentStepData.setter(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-lg py-6"
                autoFocus
              />
            )}

            {currentStepData.type === 'phone' && (
              <div className="flex gap-2">
                <Select value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+1">+1</SelectItem>
                    <SelectItem value="+52">+52</SelectItem>
                    <SelectItem value="+34">+34</SelectItem>
                    <SelectItem value="+57">+57</SelectItem>
                    <SelectItem value="+54">+54</SelectItem>
                    <SelectItem value="+56">+56</SelectItem>
                    <SelectItem value="+51">+51</SelectItem>
                    <SelectItem value="+593">+593</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="tel"
                  placeholder={currentStepData.placeholder}
                  value={currentStepData.value}
                  onChange={(e) => currentStepData.setter(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-lg py-6 flex-1"
                  autoFocus
                />
              </div>
            )}

            {currentStepData.type === 'select' && (
              <Select value={currentStepData.value} onValueChange={currentStepData.setter}>
                <SelectTrigger className="text-lg py-6">
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  {currentStepData.options?.map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {currentStepData.type === 'radio' && (
              <RadioGroup value={currentStepData.value} onValueChange={currentStepData.setter}>
                <div className="grid gap-4">
                  {currentStepData.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {currentStepData.type === 'textarea' && (
              <textarea
                placeholder={currentStepData.placeholder}
                value={currentStepData.value}
                onChange={(e) => currentStepData.setter(e.target.value)}
                className="w-full min-h-32 p-4 border border-border rounded-lg text-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                autoFocus
              />
            )}
          </div>

          {/* Summary */}
          {currentStep > 0 && (
            <div className="mb-6 p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2 text-foreground">Resumen de tu información:</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                {firstName && <p><span className="font-medium">Nombre:</span> {firstName} {lastName}</p>}
                {email && <p><span className="font-medium">Email:</span> {email}</p>}
                {phone && <p><span className="font-medium">Teléfono:</span> {countryCode}{phone}</p>}
                {service && <p><span className="font-medium">Servicio:</span> {service}</p>}
                {budget && <p><span className="font-medium">Presupuesto:</span> {budget}</p>}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </Button>

            <Button
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90"
            >
              {currentStep === steps.length - 1 ? (
                isSubmitting ? (
                  <>
                    <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Enviar
                  </>
                )
              ) : (
                <>
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormAgentForm;