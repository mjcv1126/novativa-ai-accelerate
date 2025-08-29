
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const LLAMADA_PROGRAMADA_STAGE_ID = 'b9b4d1b9-461e-4fac-bebd-e3af2d527a97';

export const useTidyCalAutoSync = () => {
  const processBookingToContactAndActivity = useCallback(async (booking: any) => {
    try {
      console.log('🔄 Processing booking to contact and activity:', booking.id);

      // 1. Verificar si ya existe un contacto con este email
      const { data: existingContact } = await supabase
        .from('contacts')
        .select('*')
        .eq('email', booking.contact?.email)
        .single();

      // 2. Verificar si ya existe una actividad con este booking_id
      const { data: existingActivity } = await supabase
        .from('contact_activities')
        .select('*')
        .eq('tidycal_booking_id', booking.id)
        .single();

      // Si ya existe la actividad, no hacer nada
      if (existingActivity) {
        console.log('⏭️ Activity already exists for booking:', booking.id);
        return { skipped: true, reason: 'Activity already exists' };
      }

      let contactId: string;

      // 3. Crear o actualizar contacto
      if (!existingContact) {
        console.log('👤 Creating new contact for booking:', booking.id);
        
        const nameParts = booking.contact?.name?.split(' ') || ['', ''];
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        const { data: newContact, error: contactError } = await supabase
          .from('contacts')
          .insert([{
            first_name: firstName,
            last_name: lastName,
            email: booking.contact?.email || '',
            phone: booking.contact?.phone_number || '',
            country_code: '',
            country_name: '',
            stage_id: LLAMADA_PROGRAMADA_STAGE_ID, // Set to "Llamada programada" stage
            notes: `Contacto creado automáticamente desde TidyCal booking #${booking.id}`,
            last_contact_date: new Date().toISOString(),
            org_id: 'a7b8c9d0-e1f2-3456-7890-123456789abc' // Org ID fijo temporal
          }])
          .select()
          .single();

        if (contactError) {
          console.error('❌ Error creating contact:', contactError);
          throw contactError;
        }

        contactId = newContact.id;
        console.log('✅ New contact created:', contactId);
      } else {
        contactId = existingContact.id;
        console.log('✅ Using existing contact:', contactId);
        
        // Actualizar contacto existente y moverlo a "Llamada programada"
        await supabase
          .from('contacts')
          .update({ 
            stage_id: LLAMADA_PROGRAMADA_STAGE_ID,
            last_contact_date: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', contactId);
      }

      // 4. Crear actividad
      console.log('📅 Creating activity for booking:', booking.id);
      
      const startDate = new Date(booking.starts_at);
      const now = new Date();
      const isPast = startDate < now;
      
      let activityData = {
        contact_id: contactId,
        activity_type: 'call',
        title: `${booking.booking_type?.name || 'Llamada'} desde TidyCal`,
        description: `Booking ID: ${booking.id}\nContacto: ${booking.contact?.name}\nEmail: ${booking.contact?.email}`,
        tidycal_booking_id: booking.id,
        tidycal_booking_reference: `${booking.id}`,
        is_completed: isPast,
        status: isPast ? 'completed' : 'pending',
        due_date: booking.starts_at,
        org_id: 'a7b8c9d0-e1f2-3456-7890-123456789abc' // Org ID fijo temporal
      };

      const { error: activityError } = await supabase
        .from('contact_activities')
        .insert([activityData]);

      if (activityError) {
        console.error('❌ Error creating activity:', activityError);
        throw activityError;
      }

      console.log('✅ Activity created successfully for booking:', booking.id);
      return { processed: true, contactId, activityCreated: true };

    } catch (error) {
      console.error('💥 Error processing booking to contact and activity:', error);
      throw error;
    }
  }, []);

  const syncAllBookings = useCallback(async () => {
    try {
      console.log('🔄 Starting automatic sync of all TidyCal bookings...');

      // 1. Obtener todos los bookings de TidyCal
      const { data: bookingsResponse, error: bookingsError } = await supabase.functions.invoke('tidycal-api', {
        body: { 
          action: 'get_bookings',
          starts_at: new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)).toISOString(), // 30 días atrás
          ends_at: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString()    // 30 días adelante
        }
      });

      if (bookingsError) {
        console.error('❌ Error fetching bookings from TidyCal:', bookingsError);
        throw bookingsError;
      }

      const bookings = bookingsResponse?.data || [];
      console.log(`📊 Found ${bookings.length} bookings to process`);

      let processed = 0;
      let skipped = 0;
      let failed = 0;

      // 2. Procesar cada booking
      for (const booking of bookings) {
        try {
          const result = await processBookingToContactAndActivity(booking);
          
          if (result.skipped) {
            skipped++;
          } else if (result.processed) {
            processed++;
          }
        } catch (error) {
          console.error(`❌ Failed to process booking ${booking.id}:`, error);
          failed++;
        }
      }

      console.log(`✅ Sync completed: ${processed} processed, ${skipped} skipped, ${failed} failed`);

      toast({
        title: "Sincronización completada",
        description: `Procesados: ${processed}, Omitidos: ${skipped}, Fallidos: ${failed}`,
      });

      return { processed, skipped, failed, total: bookings.length };

    } catch (error) {
      console.error('💥 Error in automatic sync:', error);
      toast({
        title: "Error en sincronización",
        description: "No se pudo completar la sincronización automática",
        variant: "destructive",
      });
      throw error;
    }
  }, [processBookingToContactAndActivity]);

  return {
    syncAllBookings,
    processBookingToContactAndActivity
  };
};
