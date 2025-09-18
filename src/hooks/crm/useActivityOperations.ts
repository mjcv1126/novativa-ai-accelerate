
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ContactActivity } from '@/types/crm';
import { toast } from '@/components/ui/use-toast';

// Extended type that includes contact information
export interface ActivityWithContact extends ContactActivity {
  contact: {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email?: string;
  };
  tidycal_booking_id?: number;
  scheduled_date?: string;
}

export const useActivityOperations = () => {
  const fetchContactActivities = useCallback(async (contactId: string): Promise<ContactActivity[]> => {
    try {
      const { data, error } = await supabase
        .from('contact_activities')
        .select('*')
        .eq('contact_id', contactId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return (data || []).map(activity => ({
        ...activity,
        activity_type: activity.activity_type as ContactActivity['activity_type'],
        status: (activity.status || 'pending') as ContactActivity['status']
      }));
    } catch (error) {
      console.error('Error fetching contact activities:', error);
      return [];
    }
  }, []);

  const fetchAllActivities = useCallback(async (): Promise<ActivityWithContact[]> => {
    try {
      const { data, error } = await supabase
        .from('contact_activities')
        .select(`
          *,
          contact:contacts(
            id,
            first_name,
            last_name,
            phone,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return (data || []).map(activity => ({
        ...activity,
        activity_type: activity.activity_type as ContactActivity['activity_type'],
        status: (activity.status || 'pending') as ContactActivity['status'],
        contact: activity.contact || {
          id: '',
          first_name: '',
          last_name: '',
          phone: '',
          email: ''
        }
      })) as ActivityWithContact[];
    } catch (error) {
      console.error('Error fetching all activities:', error);
      return [];
    }
  }, []);

  const createActivity = useCallback(async (activityData: Omit<ContactActivity, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('contact_activities')
        .insert([{
          ...activityData,
          status: activityData.status || 'pending',
          org_id: 'd010fb06-7e97-4cef-90b6-be84942ac1d1' // Org ID donde están las etapas existentes
        }])
        .select()
        .single();

      if (error) throw error;

      console.log('Activity created successfully:', data);

      toast({
        title: "Éxito",
        description: "Actividad creada correctamente",
      });

      return data;
    } catch (error) {
      console.error('Error creating activity:', error);
      toast({
        title: "Error",
        description: "No se pudo crear la actividad",
        variant: "destructive",
      });
      throw error;
    }
  }, []);

  const updateActivity = useCallback(async (activityId: string, updates: Partial<ContactActivity>) => {
    try {
      const { error } = await supabase
        .from('contact_activities')
        .update(updates)
        .eq('id', activityId);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Actividad actualizada correctamente",
      });
    } catch (error) {
      console.error('Error updating activity:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la actividad",
        variant: "destructive",
      });
      throw error;
    }
  }, []);

  const markActivityComplete = useCallback(async (activityId: string) => {
    try {
      const { error } = await supabase
        .from('contact_activities')
        .update({ 
          is_completed: true,
          status: 'completed',
          completed_at: new Date().toISOString() 
        })
        .eq('id', activityId);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Actividad marcada como completada",
      });
    } catch (error) {
      console.error('Error marking activity as complete:', error);
      toast({
        title: "Error",
        description: "No se pudo marcar la actividad como completada",
        variant: "destructive",
      });
      throw error;
    }
  }, []);

  const cancelActivity = useCallback(async (activityId: string) => {
    try {
      const { error } = await supabase
        .from('contact_activities')
        .update({ 
          status: 'cancelled'
        })
        .eq('id', activityId);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Actividad cancelada correctamente",
      });
    } catch (error) {
      console.error('Error cancelling activity:', error);
      toast({
        title: "Error",
        description: "No se pudo cancelar la actividad",
        variant: "destructive",
      });
      throw error;
    }
  }, []);

  return {
    fetchContactActivities,
    fetchAllActivities,
    createActivity,
    updateActivity,
    markActivityComplete,
    cancelActivity,
  };
};
