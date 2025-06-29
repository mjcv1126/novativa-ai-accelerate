
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { CrmStage, ContactWithStage } from '@/types/crm';
import { ExistingContactDialog } from './ExistingContactDialog';

interface AddContactDialogProps {
  stages: CrmStage[];
  onContactAdded: () => void;
}

export const AddContactDialog = ({ stages, onContactAdded }: AddContactDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [existingContact, setExistingContact] = useState<ContactWithStage | null>(null);
  const [showExistingContactDialog, setShowExistingContactDialog] = useState(false);
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
      // Verificar si ya existe un contacto con el mismo email o teléfono
      const { data: existingContacts, error: checkError } = await supabase
        .from('contacts')
        .select(`
          *,
          stage:crm_stages(*)
        `)
        .or(`email.eq.${formData.email},phone.eq.${formData.phone}`);

      if (checkError) throw checkError;

      if (existingContacts && existingContacts.length > 0) {
        // Contacto ya existe, mostrar dialog
        setExistingContact(existingContacts[0] as ContactWithStage);
        setShowExistingContactDialog(true);
        setIsLoading(false);
        return;
      }

      // Crear nuevo contacto
      const { error } = await supabase
        .from('contacts')
        .insert([{
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email || null,
          phone: formData.phone,
          company: formData.company || null,
          country_code: formData.country_code,
          country_name: formData.country_name,
          stage_id: formData.stage_id || null,
          notes: formData.notes || null
        }]);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Contacto creado correctamente",
      });

      // Limpiar formulario y cerrar
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

  const handleEditExistingContact = (contact: ContactWithStage) => {
    // Aquí podrías abrir el dialog de edición o redirigir
    toast({
      title: "Información",
      description: "Funcionalidad de edición en desarrollo",
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Contacto
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Contacto</DialogTitle>
            <DialogDescription>
              Completa la información del contacto. Los campos marcados son obligatorios.
            </DialogDescription>
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
                <Label htmlFor="country_name">País *</Label>
                <Input
                  id="country_name"
                  value={formData.country_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, country_name: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="stage_id">Etapa</Label>
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
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creando...' : 'Crear Contacto'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ExistingContactDialog 
        contact={existingContact}
        isOpen={showExistingContactDialog}
        onClose={() => setShowExistingContactDialog(false)}
        onEdit={handleEditExistingContact}
      />
    </>
  );
};
