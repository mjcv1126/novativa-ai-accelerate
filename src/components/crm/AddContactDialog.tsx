
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { Contact, CrmStage } from '@/types/crm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface AddContactDialogProps {
  stages: CrmStage[];
  onContactAdded: () => void;
}

export const AddContactDialog = ({ stages, onContactAdded }: AddContactDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    country_code: '',
    country_name: '',
    stage_id: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      if (!formData.first_name || !formData.last_name || !formData.phone) {
        toast({
          title: "Error",
          description: "Nombre, apellido y teléfono son campos obligatorios",
          variant: "destructive",
        });
        return;
      }

      // Set default stage if not selected
      const stageId = formData.stage_id || stages[0]?.id;

      const { error } = await supabase
        .from('contacts')
        .insert([{
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email || null,
          phone: formData.phone,
          company: formData.company || null,
          country_code: formData.country_code || 'ES',
          country_name: formData.country_name || 'España',
          stage_id: stageId,
          notes: formData.notes || null
        }]);

      if (error) throw error;

      // Create initial activity
      await supabase
        .from('contact_activities')
        .insert([{
          contact_id: (await supabase
            .from('contacts')
            .select('id')
            .eq('phone', formData.phone)
            .single()).data?.id,
          activity_type: 'note',
          title: 'Contacto creado manualmente',
          description: 'Contacto agregado desde el CRM'
        }]);

      toast({
        title: "Éxito",
        description: "Contacto creado correctamente",
      });

      // Reset form and close dialog
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company: '',
        country_code: '',
        country_name: '',
        stage_id: '',
        notes: ''
      });
      setIsOpen(false);
      onContactAdded();
    } catch (error) {
      console.error('Error creating contact:', error);
      toast({
        title: "Error",
        description: "No se pudo crear el contacto",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Agregar Lead
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first_name">Nombre *</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="last_name">Apellido *</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="phone">Teléfono *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="country">País</Label>
              <Input
                id="country"
                value={formData.country_name}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  country_name: e.target.value,
                  country_code: e.target.value === 'España' ? 'ES' : 'XX'
                }))}
                placeholder="España"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="stage">Etapa</Label>
            <Select value={formData.stage_id} onValueChange={(value) => setFormData(prev => ({ ...prev, stage_id: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar etapa" />
              </SelectTrigger>
              <SelectContent>
                {stages.map((stage) => (
                  <SelectItem key={stage.id} value={stage.id}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: stage.color }}
                      />
                      {stage.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Notas</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Información adicional sobre el contacto..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creando...' : 'Crear Contacto'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
