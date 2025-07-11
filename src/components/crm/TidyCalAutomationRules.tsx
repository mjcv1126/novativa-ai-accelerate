import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, Edit, Trash, MoreHorizontal, Calendar, User, Activity, Copy } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CrmStage } from '@/types/crm';

interface TidyCalRule {
  id: string;
  name: string;
  description: string;
  trigger_condition: 'contact_exists_future_call' | 'contact_exists_past_call' | 'contact_not_exists_past_call' | 'new_contact_future_call' | 'booking_cancelled' | 'booking_rescheduled';
  target_stage_id: string;
  create_activity: boolean;
  activity_title?: string;
  activity_description?: string;
  contact_action: 'none' | 'create' | 'update' | 'delete';
  contact_action_data?: string;
  cancel_previous_activity: boolean;
  is_active: boolean;
  created_at: string;
}

export const TidyCalAutomationRules = () => {
  const [rules, setRules] = useState<TidyCalRule[]>([]);
  const [stages, setStages] = useState<CrmStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<TidyCalRule | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    trigger_condition: 'contact_exists_future_call' as 'contact_exists_future_call' | 'contact_exists_past_call' | 'contact_not_exists_past_call' | 'new_contact_future_call' | 'booking_cancelled' | 'booking_rescheduled',
    target_stage_id: '',
    create_activity: true,
    activity_title: '',
    activity_description: '',
    contact_action: 'none' as 'none' | 'create' | 'update' | 'delete',
    contact_action_data: '',
    cancel_previous_activity: false,
    is_active: true
  });

  useEffect(() => {
    loadStages();
    loadRules();
  }, []);

  const loadStages = async () => {
    try {
      const { data, error } = await supabase
        .from('crm_stages')
        .select('*')
        .eq('is_active', true)
        .order('position');

      if (error) throw error;
      setStages(data || []);
    } catch (error) {
      console.error('Error loading stages:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las etapas",
        variant: "destructive",
      });
    }
  };

  const loadRules = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tidycal_automation_rules')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Properly cast the database results to match our interface
      const typedRules: TidyCalRule[] = (data || []).map(rule => ({
        id: rule.id,
        name: rule.name || '',
        description: rule.description || '',
        trigger_condition: rule.trigger_condition as TidyCalRule['trigger_condition'],
        target_stage_id: rule.target_stage_id || '',
        create_activity: rule.create_activity || false,
        activity_title: rule.activity_title || '',
        activity_description: rule.activity_description || '',
        contact_action: (rule.contact_action || 'none') as TidyCalRule['contact_action'],
        contact_action_data: rule.contact_action_data || '',
        cancel_previous_activity: rule.cancel_previous_activity || false,
        is_active: rule.is_active || false,
        created_at: rule.created_at || ''
      }));
      
      setRules(typedRules);
    } catch (error) {
      console.error('Error loading rules:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las reglas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      trigger_condition: 'contact_exists_future_call',
      target_stage_id: '',
      create_activity: true,
      activity_title: '',
      activity_description: '',
      contact_action: 'none',
      contact_action_data: '',
      cancel_previous_activity: false,
      is_active: true
    });
    setEditingRule(null);
  };

  const handleOpenDialog = (rule?: TidyCalRule) => {
    if (rule) {
      setEditingRule(rule);
      setFormData({
        name: rule.name,
        description: rule.description,
        trigger_condition: rule.trigger_condition,
        target_stage_id: rule.target_stage_id,
        create_activity: rule.create_activity,
        activity_title: rule.activity_title || '',
        activity_description: rule.activity_description || '',
        contact_action: rule.contact_action,
        contact_action_data: rule.contact_action_data || '',
        cancel_previous_activity: rule.cancel_previous_activity,
        is_active: rule.is_active
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleDuplicateRule = async (rule: TidyCalRule) => {
    try {
      const duplicatedRule = {
        name: `${rule.name} (Copia)`,
        description: rule.description,
        trigger_condition: rule.trigger_condition,
        target_stage_id: rule.target_stage_id,
        create_activity: rule.create_activity,
        activity_title: rule.activity_title,
        activity_description: rule.activity_description,
        contact_action: rule.contact_action,
        contact_action_data: rule.contact_action_data,
        cancel_previous_activity: rule.cancel_previous_activity,
        is_active: false // Start duplicated rules as inactive
      };

      const { error } = await supabase
        .from('tidycal_automation_rules')
        .insert([duplicatedRule]);

      if (error) throw error;

      toast({
        title: "Regla duplicada",
        description: "La regla se ha duplicado correctamente. Se ha creado como inactiva.",
      });

      await loadRules();
    } catch (error) {
      console.error('Error duplicating rule:', error);
      toast({
        title: "Error",
        description: "No se pudo duplicar la regla",
        variant: "destructive",
      });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleSaveRule = async () => {
    if (!formData.name || !formData.target_stage_id) {
      toast({
        title: "Error",
        description: "Nombre y etapa objetivo son obligatorios",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingRule) {
        const { error } = await supabase
          .from('tidycal_automation_rules')
          .update({
            name: formData.name,
            description: formData.description,
            trigger_condition: formData.trigger_condition,
            target_stage_id: formData.target_stage_id,
            create_activity: formData.create_activity,
            activity_title: formData.activity_title,
            activity_description: formData.activity_description,
            contact_action: formData.contact_action,
            contact_action_data: formData.contact_action_data,
            cancel_previous_activity: formData.cancel_previous_activity,
            is_active: formData.is_active
          })
          .eq('id', editingRule.id);

        if (error) throw error;

        toast({
          title: "Regla actualizada",
          description: "La regla de automatización se ha actualizado correctamente",
        });
      } else {
        const { error } = await supabase
          .from('tidycal_automation_rules')
          .insert([{
            name: formData.name,
            description: formData.description,
            trigger_condition: formData.trigger_condition,
            target_stage_id: formData.target_stage_id,
            create_activity: formData.create_activity,
            activity_title: formData.activity_title,
            activity_description: formData.activity_description,
            contact_action: formData.contact_action,
            contact_action_data: formData.contact_action_data,
            cancel_previous_activity: formData.cancel_previous_activity,
            is_active: formData.is_active
          }]);

        if (error) throw error;

        toast({
          title: "Regla creada",
          description: "La nueva regla de automatización se ha creado correctamente",
        });
      }

      await loadRules();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving rule:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar la regla",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRule = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta regla?')) return;

    try {
      const { error } = await supabase
        .from('tidycal_automation_rules')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Regla eliminada",
        description: "La regla de automatización se ha eliminado correctamente",
      });

      await loadRules();
    } catch (error) {
      console.error('Error deleting rule:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la regla",
        variant: "destructive",
      });
    }
  };

  const toggleRuleStatus = async (id: string) => {
    try {
      const rule = rules.find(r => r.id === id);
      if (!rule) return;

      const { error } = await supabase
        .from('tidycal_automation_rules')
        .update({ is_active: !rule.is_active })
        .eq('id', id);

      if (error) throw error;

      await loadRules();
    } catch (error) {
      console.error('Error toggling rule status:', error);
      toast({
        title: "Error",
        description: "No se pudo cambiar el estado de la regla",
        variant: "destructive",
      });
    }
  };

  const getTriggerLabel = (condition: string) => {
    switch (condition) {
      case 'contact_exists_future_call':
        return 'Contacto existe + Llamada futura';
      case 'contact_exists_past_call':
        return 'Contacto existe + Llamada pasada';
      case 'contact_not_exists_past_call':
        return 'Contacto no existe + Llamada pasada';
      case 'new_contact_future_call':
        return 'Nuevo contacto + Llamada futura';
      case 'booking_cancelled':
        return 'Reserva cancelada';
      case 'booking_rescheduled':
        return 'Reserva reprogramada';
      default:
        return condition;
    }
  };

  const getContactActionLabel = (action: string) => {
    switch (action) {
      case 'create':
        return 'Crear contacto';
      case 'update':
        return 'Actualizar contacto';
      case 'delete':
        return 'Eliminar contacto';
      case 'none':
      default:
        return 'Sin acción';
    }
  };

  const getStageLabel = (stageId: string) => {
    const stage = stages.find(s => s.id === stageId);
    return stage ? stage.name : 'Etapa no encontrada';
  };

  if (loading) {
    return <div className="p-6">Cargando reglas...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Reglas de Automatización TidyCal</h3>
          <p className="text-sm text-gray-600">Configura cómo se procesan automáticamente las reservas de TidyCal</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nueva Regla
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRule ? 'Editar Regla' : 'Nueva Regla de Automatización'}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre de la Regla</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej: Llamada programada"
                  />
                </div>

                <div>
                  <Label htmlFor="trigger">Condición de Activación</Label>
                  <Select 
                    value={formData.trigger_condition} 
                    onValueChange={(value: any) => setFormData(prev => ({ ...prev, trigger_condition: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contact_exists_future_call">Contacto existe + Llamada futura</SelectItem>
                      <SelectItem value="contact_exists_past_call">Contacto existe + Llamada pasada</SelectItem>
                      <SelectItem value="contact_not_exists_past_call">Contacto no existe + Llamada pasada</SelectItem>
                      <SelectItem value="new_contact_future_call">Nuevo contacto + Llamada futura</SelectItem>
                      <SelectItem value="booking_cancelled">Reserva cancelada</SelectItem>
                      <SelectItem value="booking_rescheduled">Reserva reprogramada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe cuándo se debe aplicar esta regla"
                />
              </div>

              <div>
                <Label htmlFor="target_stage">Etapa Objetivo</Label>
                <Select 
                  value={formData.target_stage_id} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, target_stage_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la etapa" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((stage) => (
                      <SelectItem key={stage.id} value={stage.id}>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: stage.color }}
                          />
                          {stage.name} (ID: {stage.id.slice(0, 8)}...)
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4 border-t pt-4">
                <h4 className="font-medium">Acciones sobre Contacto</h4>
                
                <div>
                  <Label htmlFor="contact_action">Acción del Contacto</Label>
                  <Select 
                    value={formData.contact_action} 
                    onValueChange={(value: any) => setFormData(prev => ({ ...prev, contact_action: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sin acción</SelectItem>
                      <SelectItem value="create">Crear contacto</SelectItem>
                      <SelectItem value="update">Actualizar contacto</SelectItem>
                      <SelectItem value="delete">Eliminar contacto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.contact_action !== 'none' && (
                  <div>
                    <Label htmlFor="contact_action_data">Datos de la Acción</Label>
                    <Textarea
                      id="contact_action_data"
                      value={formData.contact_action_data}
                      onChange={(e) => setFormData(prev => ({ ...prev, contact_action_data: e.target.value }))}
                      placeholder="Describe qué hacer con el contacto (ej: campos a actualizar, criterios, etc.)"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-3 border-t pt-4">
                <h4 className="font-medium">Acciones sobre Actividades</h4>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="create_activity"
                    checked={formData.create_activity}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, create_activity: checked }))}
                  />
                  <Label htmlFor="create_activity">Crear actividad automáticamente</Label>
                </div>

                {formData.create_activity && (
                  <div className="space-y-3 ml-6">
                    <div>
                      <Label htmlFor="activity_title">Título de la Actividad</Label>
                      <Input
                        id="activity_title"
                        value={formData.activity_title}
                        onChange={(e) => setFormData(prev => ({ ...prev, activity_title: e.target.value }))}
                        placeholder="Ej: Llamada programada desde TidyCal"
                      />
                    </div>

                    <div>
                      <Label htmlFor="activity_description">Descripción de la Actividad</Label>
                      <Textarea
                        id="activity_description"
                        value={formData.activity_description}
                        onChange={(e) => setFormData(prev => ({ ...prev, activity_description: e.target.value }))}
                        placeholder="Descripción adicional para la actividad"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="is_active">Regla activa</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveRule} className="flex-1">
                  {editingRule ? 'Actualizar' : 'Crear'} Regla
                </Button>
                <Button variant="outline" onClick={handleCloseDialog}>
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {rules.map((rule) => (
          <Card key={rule.id}>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{rule.name}</h4>
                    <Badge variant={rule.is_active ? 'default' : 'secondary'}>
                      {rule.is_active ? 'Activa' : 'Inactiva'}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600">{rule.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      <span>Trigger: {getTriggerLabel(rule.trigger_condition)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>Etapa: {getStageLabel(rule.target_stage_id)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Edit className="h-3 w-3" />
                      <span>Contacto: {getContactActionLabel(rule.contact_action)}</span>
                    </div>
                    {rule.create_activity && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Crea actividad</span>
                      </div>
                    )}
                    {rule.cancel_previous_activity && (
                      <div className="flex items-center gap-1">
                        <span>Cancela actividades previas</span>
                      </div>
                    )}
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleOpenDialog(rule)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicateRule(rule)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleRuleStatus(rule.id)}>
                      <Switch className="h-4 w-4 mr-2" />
                      {rule.is_active ? 'Desactivar' : 'Activar'}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDeleteRule(rule.id)}
                      className="text-red-600"
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}

        {rules.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Activity className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No hay reglas configuradas</p>
            <p className="text-sm">Crea tu primera regla para automatizar el procesamiento de TidyCal</p>
          </div>
        )}
      </div>
    </div>
  );
};
