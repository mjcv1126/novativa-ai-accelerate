import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TypingAnimation from '@/components/shared/TypingAnimation';
import { LoginModal } from '@/components/solicitud/LoginModal';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload, LogIn, User } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  // Contacto
  company_name: z.string().min(2, 'Nombre de empresa requerido'),
  applicant_name: z.string().min(2, 'Nombre del solicitante requerido'),
  applicant_role: z.string().min(2, 'Cargo requerido'),
  applicant_email: z.string().email('Email inválido'),
  applicant_phone: z.string().min(8, 'Teléfono requerido'),
  
  // Solicitud
  request_type: z.string().min(1, 'Tipo de solicitud requerido'),
  request_type_other: z.string().optional(),
  content_objective: z.string().min(10, 'Objetivo del contenido requerido'),
  
  // Especificaciones técnicas
  dimensions: z.string().optional(),
  delivery_format: z.string().optional(),
  final_use: z.string().optional(),
  delivery_date: z.date().optional(),
  
  // Referencias visuales
  concept_description: z.string().min(20, 'Descripción del concepto requerida'),
  reference_url: z.string().url().optional().or(z.literal('')),
  reference_feedback: z.string().min(10, 'Describe qué te gusta de los ejemplos'),
  
  // Urgencia
  priority_level: z.string().min(1, 'Nivel de urgencia requerido'),
  
  // Aprobaciones
  confirm_final_info: z.boolean().refine(val => val === true, 'Debes confirmar la información'),
  understand_changes: z.boolean().refine(val => val === true, 'Debes entender las condiciones'),
});

type FormData = z.infer<typeof formSchema>;

const Solicitud = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showOtherField, setShowOtherField] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Check if user is authenticated
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        // Load user profile
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .maybeSingle();
        
        if (profile) {
          setUserProfile(profile);
          // Auto-populate form fields from profile
          setValue('company_name', profile.company_name || '');
          setValue('applicant_role', profile.applicant_role || '');
          setValue('applicant_phone', profile.phone || '');
        }
        
        // Always populate email and name from auth user
        setValue('applicant_email', session.user.email || '');
        setValue('applicant_name', session.user.user_metadata?.full_name || '');
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setValue('applicant_email', session.user.email || '');
        setValue('applicant_name', session.user.user_metadata?.full_name || '');
      } else {
        setUser(null);
        setUserProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [setValue]);

  const requestType = watch('request_type');
  const deliveryDate = watch('delivery_date');

  React.useEffect(() => {
    if (requestType === 'otro') {
      setShowOtherField(true);
    } else {
      setShowOtherField(false);
    }
  }, [requestType]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedImages(prev => [...prev, ...filesArray]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      let currentUser = user;

      // If no user, create account automatically
      if (!currentUser) {
        const tempPassword = Math.random().toString(36).slice(-12) + 'Aa1!';
        
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email: data.applicant_email,
          password: tempPassword,
          options: {
            emailRedirectTo: `${window.location.origin}/solicitud`,
            data: {
              full_name: data.applicant_name,
            }
          }
        });

        if (signUpError) {
          console.error('Error creating account:', signUpError);
        } else if (authData.user) {
          currentUser = authData.user;
          
          // Create user profile
          await supabase.from('user_profiles').insert({
            user_id: authData.user.id,
            company_name: data.company_name,
            applicant_role: data.applicant_role,
            phone: data.applicant_phone,
          });

          toast.success('Cuenta creada automáticamente', {
            description: 'Se ha enviado un email para verificar tu cuenta',
          });
        }
      }

      // Upload reference images to Supabase Storage
      const referenceImagesData = [];
      for (const file of uploadedImages) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${currentUser?.id}/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('reference-images')
          .upload(filePath, file);

        if (!uploadError && uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from('reference-images')
            .getPublicUrl(filePath);

          referenceImagesData.push({
            name: file.name,
            url: publicUrl,
            path: filePath,
          });
        }
      }

      // Upload attached files to Supabase Storage
      const attachedFilesData = [];
      for (const file of uploadedFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${currentUser?.id}/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('ticket-attachments')
          .upload(filePath, file);

        if (!uploadError && uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from('ticket-attachments')
            .getPublicUrl(filePath);

          attachedFilesData.push({
            name: file.name,
            url: publicUrl,
            path: filePath,
          });
        }
      }

      // Save ticket to database
      const { data: ticketData, error: ticketError } = await supabase
        .from('tickets')
        .insert([{
          ticket_number: '', // Will be auto-generated by trigger
          user_id: currentUser?.id,
          company_name: data.company_name,
          applicant_name: data.applicant_name,
          applicant_role: data.applicant_role,
          applicant_email: data.applicant_email,
          applicant_phone: data.applicant_phone,
          request_type: data.request_type as any,
          request_type_other: data.request_type_other,
          content_objective: data.content_objective,
          dimensions: data.dimensions,
          delivery_format: data.delivery_format,
          final_use: data.final_use,
          delivery_date: data.delivery_date?.toISOString().split('T')[0],
          concept_description: data.concept_description,
          reference_url: data.reference_url,
          reference_feedback: data.reference_feedback,
          reference_images: referenceImagesData as any,
          attached_files: attachedFilesData as any,
          priority_level: data.priority_level as any,
          confirmed_final_info: data.confirm_final_info,
          understands_changes: data.understand_changes,
        }])
        .select()
        .single();

      if (ticketError) throw ticketError;

      // Preparar FormData para enviar al webhook (mantener funcionalidad existente)
      const formData = new FormData();
      
      // Add ticket number
      formData.append('ticket_number', ticketData.ticket_number);
      formData.append('ticket_id', ticketData.id);
      
      // Agregar todos los campos del formulario
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof Date) {
            formData.append(key, value.toISOString());
          } else if (typeof value === 'boolean') {
            formData.append(key, value.toString());
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      // Agregar imágenes de referencia
      uploadedImages.forEach((file, index) => {
        formData.append(`reference_image_${index}`, file);
      });

      // Agregar archivos adjuntos
      uploadedFiles.forEach((file, index) => {
        formData.append(`attached_file_${index}`, file);
      });

      // Enviar al webhook de Make
      const response = await fetch('https://hook.us2.make.com/4djxrbykonaph2phn1gf2jco5qdjw51n', {
        method: 'POST',
        body: formData,
      });

      if (response.ok || ticketData) {
        toast.success('Solicitud enviada exitosamente', {
          description: `Número de ticket: ${ticketData.ticket_number}. Nuestro equipo la revisará pronto.`,
          duration: 5000,
        });
        
        // Limpiar formulario
        reset();
        setUploadedImages([]);
        setUploadedFiles([]);
      } else {
        throw new Error('Error al enviar la solicitud');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al enviar la solicitud', {
        description: 'Por favor intenta nuevamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginSuccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user);
      
      // Load profile and populate fields
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle();
      
      if (profile) {
        setUserProfile(profile);
        setValue('company_name', profile.company_name || '');
        setValue('applicant_role', profile.applicant_role || '');
        setValue('applicant_phone', profile.phone || '');
      }
      
      // Always populate email and name
      setValue('applicant_email', session.user.email || '');
      setValue('applicant_name', session.user.user_metadata?.full_name || '');
      
      toast.success('Datos cargados automáticamente', {
        description: 'Tus datos han sido completados desde tu perfil',
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-background via-background to-primary/5 py-12 pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header con efecto typing */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <TypingAnimation
              phrases={[
                { text: 'Diseño', emoji: '🎨' },
                { text: 'Video', emoji: '🎬' },
                { text: 'Arte', emoji: '🖼️' },
                { text: 'Automatización', emoji: '🤖' },
                { text: 'Banner', emoji: '📢' },
              ]}
              staticPrefix="Solicitud de"
              typingSpeed={100}
              deletingSpeed={50}
              delayBetweenPhrases={2000}
              className="text-4xl md:text-5xl font-bold text-primary"
            />
          </div>
          <p className="text-muted-foreground text-lg">
            Completa el formulario con los detalles de tu proyecto
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* 1. Contacto */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>1. Información de Contacto</span>
                {!user ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsLoginModalOpen(true)}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Iniciar Sesión
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="company_name">Nombre de Empresa/Marca *</Label>
                <Input
                  id="company_name"
                  {...register('company_name')}
                  placeholder="Ej: Novativa"
                />
                {errors.company_name && (
                  <p className="text-sm text-destructive mt-1">{errors.company_name.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="applicant_name">Nombre del Solicitante *</Label>
                  <Input
                    id="applicant_name"
                    {...register('applicant_name')}
                    placeholder="Juan Pérez"
                  />
                  {errors.applicant_name && (
                    <p className="text-sm text-destructive mt-1">{errors.applicant_name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="applicant_role">Cargo o Rol *</Label>
                  <Input
                    id="applicant_role"
                    {...register('applicant_role')}
                    placeholder="Gerente de Marketing"
                  />
                  {errors.applicant_role && (
                    <p className="text-sm text-destructive mt-1">{errors.applicant_role.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="applicant_email">Correo Electrónico *</Label>
                  <Input
                    id="applicant_email"
                    type="email"
                    {...register('applicant_email')}
                    placeholder="correo@empresa.com"
                  />
                  {errors.applicant_email && (
                    <p className="text-sm text-destructive mt-1">{errors.applicant_email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="applicant_phone">Teléfono *</Label>
                  <Input
                    id="applicant_phone"
                    {...register('applicant_phone')}
                    placeholder="+504 9999-9999"
                  />
                  {errors.applicant_phone && (
                    <p className="text-sm text-destructive mt-1">{errors.applicant_phone.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Solicitud */}
          <Card>
            <CardHeader>
              <CardTitle>2. Detalles de la Solicitud</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="request_type">Tipo de Solicitud *</Label>
                <Select
                  onValueChange={(value) => setValue('request_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo de contenido" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="banner">Banner o arte publicitario</SelectItem>
                    <SelectItem value="post">Post para redes sociales</SelectItem>
                    <SelectItem value="video">Video o reel</SelectItem>
                    <SelectItem value="otro">Otro (especificar)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.request_type && (
                  <p className="text-sm text-destructive mt-1">{errors.request_type.message}</p>
                )}
              </div>

              {showOtherField && (
                <div>
                  <Label htmlFor="request_type_other">Especifica el tipo de solicitud</Label>
                  <Input
                    id="request_type_other"
                    {...register('request_type_other')}
                    placeholder="Describe el tipo de contenido"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="content_objective">Objetivo del Contenido *</Label>
                <Textarea
                  id="content_objective"
                  {...register('content_objective')}
                  placeholder="Describe el objetivo principal de este contenido..."
                  rows={4}
                />
                {errors.content_objective && (
                  <p className="text-sm text-destructive mt-1">{errors.content_objective.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 3. Especificaciones Técnicas */}
          <Card>
            <CardHeader>
              <CardTitle>3. Especificaciones Técnicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="dimensions">Tamaño o Dimensiones</Label>
                <Input
                  id="dimensions"
                  {...register('dimensions')}
                  placeholder="Ej: 1080x1080 px, 16:9, etc."
                />
              </div>

              <div>
                <Label htmlFor="delivery_format">Formato de Entrega</Label>
                <Input
                  id="delivery_format"
                  {...register('delivery_format')}
                  placeholder="JPG, PNG, MP4, PDF, etc."
                />
              </div>

              <div>
                <Label htmlFor="final_use">Uso Final</Label>
                <Input
                  id="final_use"
                  {...register('final_use')}
                  placeholder="Redes sociales, web, impresión, etc."
                />
              </div>

              <div>
                <Label>Plazo de Entrega Deseado</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !deliveryDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deliveryDate ? format(deliveryDate, "PPP") : "Selecciona una fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={deliveryDate}
                      onSelect={(date) => setValue('delivery_date', date)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          {/* 4. Referencias Visuales */}
          <Card>
            <CardHeader>
              <CardTitle>4. Referencias Visuales o Ejemplos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="concept_description">Descripción Profunda del Concepto *</Label>
                <Textarea
                  id="concept_description"
                  {...register('concept_description')}
                  placeholder="Describe detalladamente tu idea, concepto, colores, estilo, ambiente..."
                  rows={6}
                />
                {errors.concept_description && (
                  <p className="text-sm text-destructive mt-1">{errors.concept_description.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="reference_images">Imágenes de Referencia (mínimo 1) *</Label>
                <div className="mt-2">
                  <label
                    htmlFor="reference_images"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                  >
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Haz clic para subir imágenes de referencia
                      </p>
                    </div>
                    <input
                      id="reference_images"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                {uploadedImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                    {uploadedImages.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Reference ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="reference_url">URL de Referencia (opcional)</Label>
                <Input
                  id="reference_url"
                  {...register('reference_url')}
                  placeholder="Ejemplo: https://instagram.com/p/..."
                />
              </div>

              <div>
                <Label htmlFor="reference_feedback">¿Qué te gusta de estos ejemplos? *</Label>
                <Textarea
                  id="reference_feedback"
                  {...register('reference_feedback')}
                  placeholder="Describe colores, estilo, tipografía, energía, composición..."
                  rows={4}
                />
                {errors.reference_feedback && (
                  <p className="text-sm text-destructive mt-1">{errors.reference_feedback.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 5. Archivos Adjuntos */}
          <Card>
            <CardHeader>
              <CardTitle>5. Archivos Adjuntos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Logos oficiales, manual de marca, fotos de producto</Label>
                <div className="mt-2">
                  <label
                    htmlFor="attached_files"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                  >
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Haz clic para subir archivos
                      </p>
                    </div>
                    <input
                      id="attached_files"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-accent rounded"
                      >
                        <span className="text-sm truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 6. Nivel de Urgencia */}
          <Card>
            <CardHeader>
              <CardTitle>6. Nivel de Urgencia / Prioridad</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={(value) => setValue('priority_level', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el nivel de urgencia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alta">Alta (24 a 48 horas)</SelectItem>
                  <SelectItem value="media">Media (3-7 días)</SelectItem>
                  <SelectItem value="baja">Baja (más de una semana)</SelectItem>
                </SelectContent>
              </Select>
              {errors.priority_level && (
                <p className="text-sm text-destructive mt-1">{errors.priority_level.message}</p>
              )}
            </CardContent>
          </Card>

          {/* 7. Aprobaciones */}
          <Card>
            <CardHeader>
              <CardTitle>7. Aprobaciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="confirm_final_info"
                  onCheckedChange={(checked) =>
                    setValue('confirm_final_info', checked === true)
                  }
                />
                <label
                  htmlFor="confirm_final_info"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Confirmo que la información proporcionada es final y autorizada por el
                  responsable del área. *
                </label>
              </div>
              {errors.confirm_final_info && (
                <p className="text-sm text-destructive">{errors.confirm_final_info.message}</p>
              )}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="understand_changes"
                  onCheckedChange={(checked) =>
                    setValue('understand_changes', checked === true)
                  }
                />
                <label
                  htmlFor="understand_changes"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Entiendo que cambios posteriores pueden modificar la fecha de entrega. *
                </label>
              </div>
              {errors.understand_changes && (
                <p className="text-sm text-destructive">{errors.understand_changes.message}</p>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="min-w-[200px]"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
            </Button>
          </div>

          {/* Mensaje informativo */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-center text-sm text-muted-foreground">
                <strong>Gracias por tu solicitud.</strong> Nuestro equipo la revisará y te
                confirmará el cronograma de trabajo y presupuesto si aplica.
                <br />
                <br />
                Recuerda: entre más clara sea tu descripción, más preciso será el resultado.
              </p>
            </CardContent>
          </Card>
        </form>

        {/* Login Modal */}
        <LoginModal
          open={isLoginModalOpen}
          onOpenChange={setIsLoginModalOpen}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    </div>
  );
};

export default Solicitud;