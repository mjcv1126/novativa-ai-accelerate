
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { CrmStage, ContactWithStage } from '@/types/crm';
import { ExistingContactDialog } from './ExistingContactDialog';
import { countries } from '@/components/schedule/countryData';

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
    country_code: '506',
    country_name: '',
    stage_id: '',
    notes: '',
    // Nuevos campos
    secondary_phone: '',
    secondary_country_code: '506',
    secondary_email: ''
  });

  const selectedCountry = countries.find(c => c.code === formData.country_code);
  const selectedSecondaryCountry = countries.find(c => c.code === formData.secondary_country_code);

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

      // Preparar teléfonos adicionales
      const additionalPhones = [];
      if (formData.secondary_phone.trim()) {
        additionalPhones.push(`+${formData.secondary_country_code}${formData.secondary_phone.trim()}`);
      }

      // Preparar correos adicionales
      const additionalEmails = [];
      if (formData.secondary_email.trim()) {
        additionalEmails.push(formData.secondary_email.trim());
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
          country_name: selectedCountry?.name || formData.country_name,
          stage_id: formData.stage_id || null,
          notes: formData.notes || null,
          additional_phones: additionalPhones.length > 0 ? additionalPhones : null,
          additional_emails: additionalEmails.length > 0 ? additionalEmails : null
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
        country_code: '506',
        country_name: '',
        stage_id: '',
        notes: '',
        secondary_phone: '',
        secondary_country_code: '506',
        secondary_email: ''
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
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
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
                <Label htmlFor="email">Email Principal</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="secondary_email">Email Secundario</Label>
                <Input
                  id="secondary_email"
                  type="email"
                  value={formData.secondary_email}
                  onChange={(e) => setFormData(prev => ({ ...prev, secondary_email: e.target.value }))}
                />
              </div>
            </div>

            {/* Teléfono Principal */}
            <div>
              <Label>Teléfono Principal *</Label>
              <div className="flex gap-2">
                <div className="w-[140px]">
                  <Select 
                    value={formData.country_code} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, country_code: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[280px]">
                      {countries.map((country) => (
                        <SelectItem key={`primary-${country.code}-${country.name}`} value={country.code}>
                          <span className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>+{country.code}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Input
                    type="tel"
                    placeholder={`Número (${selectedCountry?.minLength} dígitos)`}
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Teléfono Secundario */}
            <div>
              <Label>Teléfono Secundario</Label>
              <div className="flex gap-2">
                <div className="w-[140px]">
                  <Select 
                    value={formData.secondary_country_code} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, secondary_country_code: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[280px]">
                      {countries.map((country) => (
                        <SelectItem key={`secondary-${country.code}-${country.name}`} value={country.code}>
                          <span className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>+{country.code}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Input
                    type="tel"
                    placeholder={`Número opcional (${selectedSecondaryCountry?.minLength} dígitos)`}
                    value={formData.secondary_phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, secondary_phone: e.target.value }))}
                  />
                </div>
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
                  value={selectedCountry?.name || formData.country_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, country_name: e.target.value }))}
                  placeholder="Se llenará automáticamente"
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
