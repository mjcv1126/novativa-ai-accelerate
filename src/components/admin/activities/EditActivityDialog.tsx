
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ActivityWithContact } from '@/hooks/crm/useActivityOperations';

interface EditActivityDialogProps {
  activity: ActivityWithContact | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (activityData: any) => void;
}

export const EditActivityDialog = ({ activity, isOpen, onClose, onSave }: EditActivityDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    activity_type: '',
    scheduled_date: '',
    scheduled_time: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activity) {
      setFormData({
        title: activity.title,
        description: activity.description || '',
        activity_type: activity.activity_type,
        scheduled_date: activity.scheduled_date || '',
        scheduled_time: activity.scheduled_time || '',
      });
    }
  }, [activity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity) return;

    setLoading(true);
    try {
      const updateData = {
        title: formData.title,
        description: formData.description || null,
        activity_type: formData.activity_type,
        scheduled_date: formData.scheduled_date || null,
        scheduled_time: formData.scheduled_time || null,
      };

      await onSave(updateData);
    } catch (error) {
      console.error('Error updating activity:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la actividad",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Actividad</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="activity_type">Tipo de Actividad</Label>
            <Select value={formData.activity_type} onValueChange={(value) => setFormData({ ...formData, activity_type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="call">Llamada</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="meeting">Reunión</SelectItem>
                <SelectItem value="reminder">Recordatorio</SelectItem>
                <SelectItem value="note">Nota</SelectItem>
                <SelectItem value="status_change">Cambio de Estado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="scheduled_date">Fecha</Label>
              <Input
                id="scheduled_date"
                type="date"
                value={formData.scheduled_date}
                onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="scheduled_time">Hora</Label>
              <Input
                id="scheduled_time"
                type="time"
                value={formData.scheduled_time}
                onChange={(e) => setFormData({ ...formData, scheduled_time: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
