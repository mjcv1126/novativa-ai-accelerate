
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Contact, ContactWithStage, CrmFilters } from '@/types/crm';
import { toast } from '@/components/ui/use-toast';

export const useContactOperations = () => {
  const getCurrentUserEmail = () => {
    const adminUser = localStorage.getItem('admin_user');
    if (adminUser) {
      try {
        const user = JSON.parse(adminUser);
        return user.email || 'soporte@novativa.org';
      } catch (error) {
        console.error('Error parsing admin user:', error);
      }
    }
    return 'soporte@novativa.org';
  };

  const setCurrentUserForTrigger = async (userEmail: string) => {
    try {
      await supabase.rpc('set_config', {
        setting_name: 'app.current_user_email',
        new_value: userEmail,
        is_local: false
      });
    } catch (error) {
      console.error('Error setting current user for trigger:', error);
    }
  };

  const fetchContacts = useCallback(async (filters: CrmFilters): Promise<ContactWithStage[]> => {
    try {
      let query = supabase
        .from('contacts')
        .select(`
          *,
          stage:crm_stages(*)
        `)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.search) {
        query = query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`);
      }

      if (filters.stage_id) {
        query = query.eq('stage_id', filters.stage_id);
      }

      if (filters.country) {
        query = query.eq('country_name', filters.country);
      }

      if (filters.date_range?.from) {
        query = query.gte('created_at', filters.date_range.from);
      }

      if (filters.date_range?.to) {
        query = query.lte('created_at', filters.date_range.to);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Obtener asignaciones para cada contacto
      const contactsWithAssignments = await Promise.all(
        (data || []).map(async (contact) => {
          const { data: assignment } = await supabase
            .from('lead_assignments')
            .select('*')
            .eq('contact_id', contact.id)
            .order('assigned_at', { ascending: false })
            .limit(1)
            .single();

          return {
            ...contact,
            assignment: assignment || null
          };
        })
      );

      return contactsWithAssignments;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los contactos",
        variant: "destructive",
      });
      return [];
    }
  }, []);

  const updateContact = useCallback(async (id: string, updates: Partial<Contact>) => {
    try {
      const currentUserEmail = getCurrentUserEmail();
      
      // Establecer el usuario actual para el trigger
      await setCurrentUserForTrigger(currentUserEmail);

      const { error } = await supabase
        .from('contacts')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Contacto actualizado correctamente",
      });
    } catch (error) {
      console.error('Error updating contact:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el contacto",
        variant: "destructive",
      });
    }
  }, []);

  const moveContactToStage = useCallback(async (contactId: string, stageId: string) => {
    try {
      const currentUserEmail = getCurrentUserEmail();
      
      // Establecer el usuario actual para el trigger
      await setCurrentUserForTrigger(currentUserEmail);

      const { error } = await supabase
        .from('contacts')
        .update({ stage_id: stageId, last_contact_date: new Date().toISOString() })
        .eq('id', contactId);

      if (error) throw error;

      // Create activity for stage change
      await supabase
        .from('contact_activities')
        .insert([{
          contact_id: contactId,
          activity_type: 'status_change',
          title: 'Cambio de etapa',
          description: `Contacto movido a nueva etapa`,
        }]);
    } catch (error) {
      console.error('Error moving contact:', error);
      toast({
        title: "Error",
        description: "No se pudo mover el contacto",
        variant: "destructive",
      });
    }
  }, []);

  const deleteContact = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Contacto eliminado correctamente",
      });
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el contacto",
        variant: "destructive",
      });
    }
  }, []);

  return {
    fetchContacts,
    updateContact,
    moveContactToStage,
    deleteContact,
  };
};
