
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ContactActivity } from '@/types/crm';
import { toast } from '@/components/ui/use-toast';

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

  const createActivity = useCallback(async (activityData: Omit<ContactActivity, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('contact_activities')
        .insert([{
          ...activityData,
          status: activityData.status || 'pending'
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
    createActivity,
    updateActivity,
    markActivityComplete,
    cancelActivity,
  };
};
