
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CrmStage } from '@/types/crm';
import { toast } from '@/components/ui/use-toast';

export const useStageOperations = () => {
  const fetchStages = useCallback(async (): Promise<CrmStage[]> => {
    try {
      const { data, error } = await supabase
        .from('crm_stages')
        .select('*')
        .eq('is_active', true)
        .order('position');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching stages:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las etapas",
        variant: "destructive",
      });
      return [];
    }
  }, []);

  const createStage = useCallback(async (stageData: Omit<CrmStage, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('crm_stages')
        .insert([{
          ...stageData,
          org_id: 'a7b8c9d0-e1f2-3456-7890-123456789abc' // Org ID fijo temporal
        }])
        .select()
        .single();

      if (error) throw error;

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
  }, []);

  const updateStage = useCallback(async (id: string, updates: Partial<CrmStage>) => {
    try {
      const { error } = await supabase
        .from('crm_stages')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

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
  }, []);

  const deleteStage = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('crm_stages')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

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
  }, []);

  return {
    fetchStages,
    createStage,
    updateStage,
    deleteStage,
  };
};
