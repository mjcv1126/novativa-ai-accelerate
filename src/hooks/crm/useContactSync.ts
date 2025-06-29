
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
      console.log('🔄 Syncing contact from form:', formData);

      // Format phone number properly
      const formattedPhone = `+${formData.countryCode}${formData.phone.replace(/\D/g, '')}`;
      console.log('📱 Formatted phone:', formattedPhone);

      // Check for existing contact by phone or email
      let existingContactQuery = supabase
        .from('contacts')
        .select('*');

      // First priority: exact phone match
      const { data: phoneMatches, error: phoneError } = await supabase
        .from('contacts')
        .select('*')
        .eq('phone', formattedPhone);

      if (phoneError) {
        console.error('❌ Error querying by phone:', phoneError);
        throw phoneError;
      }

      // Second priority: email match (if email provided)
      let emailMatches: any[] = [];
      if (formData.email) {
        const { data: emailData, error: emailError } = await supabase
          .from('contacts')
          .select('*')
          .eq('email', formData.email);

        if (emailError) {
          console.error('❌ Error querying by email:', emailError);
          throw emailError;
        }
        emailMatches = emailData || [];
      }

      console.log('🔍 Phone matches found:', phoneMatches?.length || 0);
      console.log('📧 Email matches found:', emailMatches?.length || 0);

      // Get the first stage for new contacts
      const { data: firstStage, error: stageError } = await supabase
        .from('crm_stages')
        .select('id')
        .eq('is_active', true)
        .order('position')
        .limit(1)
        .single();

      if (stageError) {
        console.error('❌ Error fetching first stage:', stageError);
      }

      console.log('🎯 First stage:', firstStage);

      let contactId: string;

      // Priority 1: Phone number match (exact contact)
      if (phoneMatches && phoneMatches.length > 0) {
        const existingContact = phoneMatches[0];
        contactId = existingContact.id;
        
        console.log('🔄 Updating existing contact (phone match):', contactId);

        const updateData: any = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          country_code: formData.countryCode,
          country_name: formData.countryName,
          last_contact_date: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        // Update email if provided and different
        if (formData.email && formData.email !== existingContact.email) {
          updateData.email = formData.email;
        }

        // Update notes
        const newNotes = buildNotesFromForm(formData);
        if (newNotes) {
          updateData.notes = existingContact.notes ? 
            `${existingContact.notes}\n\n--- Actualización ${new Date().toLocaleDateString('es-ES')} ---\n${newNotes}` : 
            newNotes;
        }

        const { error: updateError } = await supabase
          .from('contacts')
          .update(updateData)
          .eq('id', contactId);

        if (updateError) {
          console.error('❌ Error updating contact:', updateError);
          throw updateError;
        }

        console.log('✅ Updated existing contact:', contactId);

      // Priority 2: Email match but different phone (add additional phone)
      } else if (emailMatches && emailMatches.length > 0) {
        const existingContact = emailMatches[0];
        contactId = existingContact.id;
        
        console.log('📞 Adding additional phone to existing contact:', contactId);

        // Add phone to additional_phones array
        const currentAdditionalPhones = existingContact.additional_phones || [];
        const updatedAdditionalPhones = [...currentAdditionalPhones];
        
        // Only add if not already in additional phones
        if (!updatedAdditionalPhones.includes(formattedPhone)) {
          updatedAdditionalPhones.push(formattedPhone);
        }

        const updateData: any = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          country_code: formData.countryCode,
          country_name: formData.countryName,
          additional_phones: updatedAdditionalPhones,
          last_contact_date: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        // Update notes
        const newNotes = buildNotesFromForm(formData);
        if (newNotes) {
          updateData.notes = existingContact.notes ? 
            `${existingContact.notes}\n\n--- Teléfono adicional ${new Date().toLocaleDateString('es-ES')} ---\n${newNotes}\nTeléfono adicional: ${formattedPhone}` : 
            `${newNotes}\nTeléfono adicional: ${formattedPhone}`;
        }

        const { error: updateError } = await supabase
          .from('contacts')
          .update(updateData)
          .eq('id', contactId);

        if (updateError) {
          console.error('❌ Error updating contact with additional phone:', updateError);
          throw updateError;
        }

        console.log('✅ Added additional phone to existing contact:', contactId);

      } else {
        // Create new contact
        console.log('➕ Creating new contact');

        const contactData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email || null,
          phone: formattedPhone,
          country_code: formData.countryCode,
          country_name: formData.countryName,
          stage_id: firstStage?.id || null,
          notes: buildNotesFromForm(formData),
          last_contact_date: new Date().toISOString()
        };

        console.log('📋 Contact data prepared:', contactData);

        const { data: newContact, error: insertError } = await supabase
          .from('contacts')
          .insert([contactData])
          .select()
          .single();

        if (insertError) {
          console.error('❌ Error creating contact:', insertError);
          throw insertError;
        }

        contactId = newContact.id;
        console.log('✅ Created new contact:', contactId);
      }

      // Create activity record
      console.log('📝 Creating activity record');

      const { error: activityError } = await supabase
        .from('contact_activities')
        .insert([{
          contact_id: contactId,
          activity_type: 'note',
          title: `Contacto registrado desde formulario web`,
          description: `Nuevo contacto registrado desde ${formData.formType || 'formulario web'}${formData.services ? ` con interés en: ${formData.services}` : ''}${formData.budget ? ` - Presupuesto: ${formData.budget}` : ''}`
        }]);

      if (activityError) {
        console.error('⚠️ Error creating activity (non-critical):', activityError);
      } else {
        console.log('✅ Activity record created');
      }

      console.log('🎉 Contact sync completed successfully');

      return { success: true, contactId, isNew: !phoneMatches?.length && !emailMatches?.length };
    } catch (error) {
      console.error('💥 Error syncing contact:', error);
      return { success: false, error };
    }
  }, []);

  const syncContactFromTidyCal = useCallback(async (tidyCalContact: {
    name: string;
    email: string;
    phone_number?: string;
    timezone?: string;
  }, bookingData?: {
    starts_at: string;
    ends_at: string;
    cancelled_at?: string;
    booking_id: number;
  }) => {
    try {
      console.log('🔄 Syncing contact from TidyCal:', tidyCalContact);

      // Parse the name into first and last name
      const nameParts = tidyCalContact.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Check for existing contact by email or phone
      let existingContactQuery = supabase
        .from('contacts')
        .select('*');

      if (tidyCalContact.email) {
        existingContactQuery = existingContactQuery.eq('email', tidyCalContact.email);
      }

      if (tidyCalContact.phone_number) {
        existingContactQuery = existingContactQuery.or(`phone.eq.${tidyCalContact.phone_number}`);
      }

      const { data: existingContacts, error: queryError } = await existingContactQuery;
      
      if (queryError) {
        console.error('❌ Error querying existing contacts:', queryError);
        throw queryError;
      }

      console.log('🔍 Existing contacts found:', existingContacts?.length || 0);

      let targetStageId: string | null = null;

      if (bookingData) {
        const now = new Date();
        const bookingStart = new Date(bookingData.starts_at);

        if (bookingData.cancelled_at) {
          // Cancelled booking - move to "No Contesta" (position 4)
          const { data: noAnswerStage } = await supabase
            .from('crm_stages')
            .select('id')
            .eq('position', 4)
            .eq('is_active', true)
            .single();
          
          targetStageId = noAnswerStage?.id || null;
        } else if (bookingStart < now) {
          // Past booking - move to "Contactado" (position 3) only if contact doesn't exist
          if (!existingContacts || existingContacts.length === 0) {
            const { data: contactedStage } = await supabase
              .from('crm_stages')
              .select('id')
              .eq('position', 3)
              .eq('is_active', true)
              .single();
            
            targetStageId = contactedStage?.id || null;
          }
        } else {
          // Future booking - move to "Llamada Programada" (position 2)
          const { data: programmedCallStage } = await supabase
            .from('crm_stages')
            .select('id')
            .eq('position', 2)
            .eq('is_active', true)
            .single();
          
          targetStageId = programmedCallStage?.id || null;
        }
      }

      // If no suitable stage found, use the first stage
      if (!targetStageId) {
        const { data: firstStage } = await supabase
          .from('crm_stages')
          .select('id')
          .eq('is_active', true)
          .order('position')
          .limit(1)
          .single();
        
        targetStageId = firstStage?.id;
      }

      const contactData = {
        first_name: firstName,
        last_name: lastName,
        email: tidyCalContact.email,
        phone: tidyCalContact.phone_number || '',
        country_code: '', // TidyCal doesn't provide this
        country_name: '', // TidyCal doesn't provide this
        stage_id: targetStageId,
        notes: `Contacto creado/actualizado desde TidyCal. Timezone: ${tidyCalContact.timezone || 'N/A'}`,
        last_contact_date: new Date().toISOString()
      };

      let contactId: string;

      if (existingContacts && existingContacts.length > 0) {
        // Update existing contact only if needed
        const existingContact = existingContacts[0];
        contactId = existingContact.id;
        
        console.log('🔄 Existing contact found:', contactId);

        // Only update if this is a cancelled booking or future booking
        if (bookingData && (bookingData.cancelled_at || new Date(bookingData.starts_at) > new Date())) {
          const { error: updateError } = await supabase
            .from('contacts')
            .update({
              stage_id: targetStageId,
              last_contact_date: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('id', contactId);

          if (updateError) {
            console.error('❌ Error updating contact:', updateError);
            throw updateError;
          }

          console.log('✅ Updated existing contact:', contactId);
        }
      } else {
        // Create new contact only if it doesn't exist
        console.log('➕ Creating new contact from TidyCal');

        const { data: newContact, error: insertError } = await supabase
          .from('contacts')
          .insert([contactData])
          .select()
          .single();

        if (insertError) {
          console.error('❌ Error creating contact:', insertError);
          throw insertError;
        }

        contactId = newContact.id;
        console.log('✅ Created new contact from TidyCal:', contactId);
      }

      // Handle activity creation/cancellation based on booking status
      if (bookingData) {
        if (bookingData.cancelled_at) {
          // Cancel existing call activities for this contact
          const { data: existingActivities } = await supabase
            .from('contact_activities')
            .select('*')
            .eq('contact_id', contactId)
            .eq('activity_type', 'call')
            .eq('is_completed', false);

          if (existingActivities && existingActivities.length > 0) {
            for (const activity of existingActivities) {
              await supabase
                .from('contact_activities')
                .update({ 
                  is_completed: true,
                  completed_at: new Date().toISOString(),
                  title: 'Llamada Cancelada',
                  description: `${activity.description}\n\nCancelada en TidyCal - Booking ID: ${bookingData.booking_id}`
                })
                .eq('id', activity.id);
            }
          }
        } else {
          // Check for duplicate activities before creating new ones
          const startDate = new Date(bookingData.starts_at);
          const { data: duplicateCheck } = await supabase
            .from('contact_activities')
            .select('*')
            .eq('contact_id', contactId)
            .eq('activity_type', 'call')
            .eq('scheduled_date', startDate.toISOString().split('T')[0])
            .eq('scheduled_time', startDate.toTimeString().split(' ')[0].substring(0, 5));

          if (!duplicateCheck || duplicateCheck.length === 0) {
            // Create new activity only if no duplicate exists
            const isPastBooking = new Date(bookingData.starts_at) < new Date();
            
            const activityData: any = {
              contact_id: contactId,
              activity_type: 'call' as const,
              title: `Llamada TidyCal - Booking #${bookingData.booking_id}`,
              description: `Llamada programada desde TidyCal\nBooking ID: ${bookingData.booking_id}\nTimezone: ${tidyCalContact.timezone || 'N/A'}`,
              scheduled_date: startDate.toISOString().split('T')[0],
              scheduled_time: startDate.toTimeString().split(' ')[0].substring(0, 5),
              is_completed: isPastBooking
            };

            if (isPastBooking) {
              activityData.completed_at = new Date().toISOString();
            }

            await supabase
              .from('contact_activities')
              .insert([activityData]);

            console.log('✅ Activity created for booking:', bookingData.booking_id);
          } else {
            console.log('⚠️ Duplicate activity found, skipping creation');
          }
        }
      }

      return { success: true, contactId, isNew: !existingContacts?.length };
    } catch (error) {
      console.error('💥 Error syncing TidyCal contact:', error);
      return { success: false, error };
    }
  }, []);

  return { syncContactFromForm, syncContactFromTidyCal };
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
