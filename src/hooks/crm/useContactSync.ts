
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Contact } from '@/types/crm';
import { toast } from '@/components/ui/use-toast';

export const useContactSync = () => {
  const syncContactFromForm = useCallback(async (formData: {
    firstName: string;
    lastName: string;
    email?: string;
    phone: string;
    countryCode: string;
    countryName: string;
    services?: string;
    budget?: string;
    formType?: string;
  }) => {
    try {
      console.log('Syncing contact from form:', formData);

      // Check for existing contact by phone or email
      let existingContactQuery = supabase
        .from('contacts')
        .select('*')
        .eq('phone', `+${formData.countryCode}${formData.phone.replace(/\D/g, '')}`);

      if (formData.email) {
        existingContactQuery = existingContactQuery.or(`email.eq.${formData.email}`);
      }

      const { data: existingContacts } = await existingContactQuery;
      
      // Get the first stage for new contacts
      const { data: firstStage } = await supabase
        .from('crm_stages')
        .select('id')
        .eq('is_active', true)
        .order('position')
        .limit(1)
        .single();

      // Prepare contact data
      const contactData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email || null,
        phone: `+${formData.countryCode}${formData.phone.replace(/\D/g, '')}`,
        country_code: formData.countryCode,
        country_name: formData.countryName,
        stage_id: firstStage?.id || null,
        notes: buildNotesFromForm(formData),
        last_contact_date: new Date().toISOString()
      };

      let contactId: string;

      if (existingContacts && existingContacts.length > 0) {
        // Update existing contact with most recent data
        const existingContact = existingContacts[0];
        contactId = existingContact.id;
        
        const { error: updateError } = await supabase
          .from('contacts')
          .update({
            ...contactData,
            updated_at: new Date().toISOString()
          })
          .eq('id', contactId);

        if (updateError) throw updateError;

        console.log('Updated existing contact:', contactId);
      } else {
        // Create new contact
        const { data: newContact, error: insertError } = await supabase
          .from('contacts')
          .insert([contactData])
          .select()
          .single();

        if (insertError) throw insertError;
        contactId = newContact.id;

        console.log('Created new contact:', contactId);
      }

      // Create activity record
      await supabase
        .from('contact_activities')
        .insert([{
          contact_id: contactId,
          activity_type: 'note',
          title: `Contacto registrado desde formulario web`,
          description: `Nuevo contacto registrado desde ${formData.formType || 'formulario web'}${formData.services ? ` con interés en: ${formData.services}` : ''}${formData.budget ? ` - Presupuesto: ${formData.budget}` : ''}`
        }]);

      return { success: true, contactId, isNew: !existingContacts?.length };
    } catch (error) {
      console.error('Error syncing contact:', error);
      return { success: false, error };
    }
  }, []);

  return { syncContactFromForm };
};

const buildNotesFromForm = (formData: {
  services?: string;
  budget?: string;
  formType?: string;
}) => {
  let notes = '';
  
  if (formData.services) {
    notes += `Servicio de interés: ${formData.services}\n`;
  }
  
  if (formData.budget) {
    notes += `Presupuesto disponible: ${formData.budget}\n`;
  }
  
  if (formData.formType) {
    notes += `Origen: ${formData.formType}\n`;
  }
  
  notes += `Fecha de registro: ${new Date().toLocaleDateString('es-ES')}\n`;
  
  return notes.trim() || null;
};
