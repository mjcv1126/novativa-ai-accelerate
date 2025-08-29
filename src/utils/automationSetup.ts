
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const createDefaultAutomationRules = async () => {
  try {
    console.log('🔧 Creating default automation rules...');

    // Delete existing rules first to avoid duplicates
    await supabase
      .from('tidycal_automation_rules')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    // Rule 1: Nueva llamada programada (contacto existe)
    const rule1 = {
      name: 'Llamada Programada - Contacto Existente',
      description: 'Cuando hay una nueva llamada agendada y el contacto ya existe en el CRM',
      trigger_condition: 'contact_exists_future_call',
      target_stage_id: 'b9b4d1b9-461e-4fac-bebd-e3af2d527a97', // Llamada Programada
      create_activity: true,
      activity_title: 'Llamada programada desde TidyCal',
      activity_description: 'Llamada programada automáticamente desde TidyCal',
      contact_action: 'update',
      contact_action_data: 'Actualizar notas con información de TidyCal',
      cancel_previous_activity: false,
      is_active: true,
      org_id: 'a7b8c9d0-e1f2-3456-7890-123456789abc' // Org ID fijo temporal
    };

    // Rule 2: Nueva llamada programada (contacto no existe)
    const rule2 = {
      name: 'Llamada Programada - Contacto Nuevo',
      description: 'Cuando hay una nueva llamada agendada y el contacto no existe en el CRM',
      trigger_condition: 'new_contact_future_call',
      target_stage_id: 'b9b4d1b9-461e-4fac-bebd-e3af2d527a97', // Llamada Programada
      create_activity: true,
      activity_title: 'Llamada programada desde TidyCal',
      activity_description: 'Llamada programada automáticamente desde TidyCal para nuevo contacto',
      contact_action: 'create',
      contact_action_data: 'Crear contacto con datos de TidyCal',
      cancel_previous_activity: false,
      is_active: true,
      org_id: 'a7b8c9d0-e1f2-3456-7890-123456789abc' // Org ID fijo temporal
    };

    // Rule 3: Llamada cancelada
    const rule3 = {
      name: 'Llamada Cancelada',
      description: 'Cuando una llamada es cancelada en TidyCal',
      trigger_condition: 'booking_cancelled',
      target_stage_id: '7af3eb42-610b-4861-9429-85119b1d2693', // Cancelado
      create_activity: true,
      activity_title: 'Llamada cancelada',
      activity_description: 'Llamada cancelada desde TidyCal',
      contact_action: 'update',
      contact_action_data: 'Marcar actividades relacionadas como canceladas',
      cancel_previous_activity: true,
      is_active: true,
      org_id: 'a7b8c9d0-e1f2-3456-7890-123456789abc' // Org ID fijo temporal
    };

    // Rule 4: Llamada reprogramada
    const rule4 = {
      name: 'Llamada Reprogramada',
      description: 'Cuando una llamada es reprogramada en TidyCal',
      trigger_condition: 'booking_rescheduled',
      target_stage_id: 'b9b4d1b9-461e-4fac-bebd-e3af2d527a97', // Llamada Programada
      create_activity: true,
      activity_title: 'Llamada reprogramada',
      activity_description: 'Llamada reprogramada desde TidyCal',
      contact_action: 'update',
      contact_action_data: 'Actualizar actividad existente con nuevos datos',
      cancel_previous_activity: false,
      is_active: true,
      org_id: 'a7b8c9d0-e1f2-3456-7890-123456789abc' // Org ID fijo temporal
    };

    const rules = [rule1, rule2, rule3, rule4];

    const { data, error } = await supabase
      .from('tidycal_automation_rules')
      .insert(rules)
      .select();

    if (error) throw error;

    console.log('✅ Default automation rules created:', data?.length);
    
    toast({
      title: "Reglas creadas",
      description: `Se crearon ${data?.length || 0} reglas de automatización predeterminadas`,
    });

    return data;
  } catch (error) {
    console.error('❌ Error creating automation rules:', error);
    toast({
      title: "Error",
      description: "No se pudieron crear las reglas de automatización",
      variant: "destructive",
    });
    throw error;
  }
};
