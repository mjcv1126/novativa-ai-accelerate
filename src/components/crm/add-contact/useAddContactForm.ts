
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { ContactWithStage } from '@/types/crm';
import { countries } from '@/components/schedule/countryData';

export const useAddContactForm = (onContactAdded: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [existingContact, setExistingContact] = useState<ContactWithStage | null>(null);
  const [showExistingContactDialog, setShowExistingContactDialog] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    country_code: '506',
    country_name: '',
    stage_id: '',
    notes: '',
    secondary_phone: '',
    secondary_country_code: '506',
    secondary_email: '',
    lead_value: '',
    lead_value_currency: 'USD',
    payment_type: '',
    service_of_interest: '',
    rtn: '',
    address: ''
  });

  const selectedCountry = countries.find(c => c.code === formData.country_code);
  const selectedSecondaryCountry = countries.find(c => c.code === formData.secondary_country_code);

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      company: '',
      country_code: '506',
      country_name: '',
      stage_id: '',
      notes: '',
      secondary_phone: '',
      secondary_country_code: '506',
      secondary_email: '',
      lead_value: '',
      lead_value_currency: 'USD',
      payment_type: '',
      service_of_interest: '',
      rtn: '',
      address: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Preparar teléfonos adicionales
      const additionalPhones = [];
      if (formData.secondary_phone.trim()) {
        additionalPhones.push(`+${formData.secondary_country_code}${formData.secondary_phone.trim()}`);
      }

      // Preparar correos adicionales
      const additionalEmails = [];
      if (formData.secondary_email.trim()) {
        additionalEmails.push(formData.secondary_email.trim());
      }

      // Obtener un stage por defecto
      const { data: defaultStage } = await supabase
        .from('crm_stages')
        .select('id')
        .eq('is_active', true)
        .order('position', { ascending: true })
        .limit(1)
        .maybeSingle();

      // Crear nuevo contacto
      const { error } = await supabase
        .from('contacts')
        .insert([{
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email || null,
          phone: formData.phone,
          company: formData.company || null,
          country_code: formData.country_code,
          country_name: selectedCountry?.name || formData.country_name,
          stage_id: defaultStage?.id || formData.stage_id || null,
          notes: formData.notes || null,
          additional_phones: additionalPhones.length > 0 ? additionalPhones : null,
          additional_emails: additionalEmails.length > 0 ? additionalEmails : null,
          lead_value: formData.lead_value ? parseFloat(formData.lead_value) : null,
          lead_value_currency: formData.lead_value_currency || 'USD',
          payment_type: formData.payment_type || null,
          service_of_interest: formData.service_of_interest || null,
          rtn: formData.rtn || null,
          address: formData.address || null,
          org_id: 'd010fb06-7e97-4cef-90b6-be84942ac1d1' // Org ID válido existente
        }]);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Contacto creado correctamente",
      });

      resetForm();
      onContactAdded();
    } catch (error) {
      console.error('Error creating contact:', error);
      toast({
        title: "Error",
        description: "No se pudo crear el contacto",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    existingContact,
    showExistingContactDialog,
    selectedCountry,
    selectedSecondaryCountry,
    updateFormData,
    handleSubmit,
    setShowExistingContactDialog
  };
};
