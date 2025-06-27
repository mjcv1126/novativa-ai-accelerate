
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Contact, ContactWithStage, CrmStage, ContactActivity, CrmFilters } from '@/types/crm';
import { toast } from '@/components/ui/use-toast';

export const useCRM = () => {
  const [contacts, setContacts] = useState<ContactWithStage[]>([]);
  const [stages, setStages] = useState<CrmStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<CrmFilters>({ search: '' });

  const fetchStages = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('crm_stages')
        .select('*')
        .eq('is_active', true)
        .order('position');

      if (error) throw error;
      setStages(data || []);
    } catch (error) {
      console.error('Error fetching stages:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las etapas",
        variant: "destructive",
      });
    }
  }, []);

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
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
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los contactos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchContactActivities = useCallback(async (contactId: string) => {
    try {
      const { data, error } = await supabase
        .from('contact_activities')
        .select('*')
        .eq('contact_id', contactId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching contact activities:', error);
      return [];
    }
  }, []);

  const createStage = useCallback(async (stageData: Omit<CrmStage, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('crm_stages')
        .insert([stageData])
        .select()
        .single();

      if (error) throw error;

      await fetchStages();
      toast({
        title: "Éxito",
        description: "Etapa creada correctamente",
      });

      return data;
    } catch (error) {
      console.error('Error creating stage:', error);
      toast({
        title: "Error",
        description: "No se pudo crear la etapa",
        variant: "destructive",
      });
      return null;
    }
  }, [fetchStages]);

  const updateStage = useCallback(async (id: string, updates: Partial<CrmStage>) => {
    try {
      const { error } = await supabase
        .from('crm_stages')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      await fetchStages();
      toast({
        title: "Éxito",
        description: "Etapa actualizada correctamente",
      });
    } catch (error) {
      console.error('Error updating stage:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la etapa",
        variant: "destructive",
      });
    }
  }, [fetchStages]);

  const deleteStage = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('crm_stages')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      await fetchStages();
      await fetchContacts();
      toast({
        title: "Éxito",
        description: "Etapa eliminada correctamente",
      });
    } catch (error) {
      console.error('Error deleting stage:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la etapa",
        variant: "destructive",
      });
    }
  }, [fetchStages, fetchContacts]);

  const updateContact = useCallback(async (id: string, updates: Partial<Contact>) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      await fetchContacts();
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
  }, [fetchContacts]);

  const moveContactToStage = useCallback(async (contactId: string, stageId: string) => {
    try {
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

      await fetchContacts();
    } catch (error) {
      console.error('Error moving contact:', error);
      toast({
        title: "Error",
        description: "No se pudo mover el contacto",
        variant: "destructive",
      });
    }
  }, [fetchContacts]);

  const createActivity = useCallback(async (activityData: Omit<ContactActivity, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('contact_activities')
        .insert([activityData]);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Actividad creada correctamente",
      });
    } catch (error) {
      console.error('Error creating activity:', error);
      toast({
        title: "Error",
        description: "No se pudo crear la actividad",
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

      await fetchContacts();
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
  }, [fetchContacts]);

  useEffect(() => {
    fetchStages();
  }, [fetchStages]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return {
    contacts,
    stages,
    loading,
    filters,
    setFilters,
    fetchContacts,
    fetchContactActivities,
    createStage,
    updateStage,
    deleteStage,
    updateContact,
    moveContactToStage,
    createActivity,
    deleteContact,
  };
};
