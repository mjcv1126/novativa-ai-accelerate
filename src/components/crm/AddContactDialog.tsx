import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus } from 'lucide-react';
import { Contact, CrmStage } from '@/types/crm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useLeadAssignments } from '@/hooks/crm/useLeadAssignments';

interface AddContactDialogProps {
  stages: CrmStage[];
  onContactAdded: () => void;
}

const SERVICES = [
  { id: 'ai-agents', name: 'Agentes de IA' },
  { id: 'web-development', name: 'Desarrollo Web' },
  { id: 'mobile-development', name: 'Desarrollo Móvil' },
  { id: 'ia-development', name: 'Desarrollo de IA' },
  { id: 'content-generation', name: 'Generación de Contenido' },
  { id: 'contact-center', name: 'Contact Center' },
  { id: 'nova-channel', name: 'Nova Channel' },
  { id: 'social-media-ai', name: 'Social Media AI' },
  { id: 'consultation', name: 'Consultoría' }
];

export const AddContactDialog = ({ stages, onContactAdded }: AddContactDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getCurrentUserEmail, getAvailableUsers } = useLeadAssignments();
  const availableUsers = getAvailableUsers();
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    country_code: '',
    country_name: '',
    stage_id: '',
    notes: '',
    primary_service: '',
    secondary_services: [] as string[],
    assigned_user_email: getCurrentUserEmail()
  });

  const handleSecondaryServiceChange = (serviceId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      secondary_services: checked 
        ? [...prev.secondary_services, serviceId]
        : prev.secondary_services.filter(id => id !== serviceId)
    }));
  };

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

      // Create notes with service information
      let serviceNotes = '';
      if (formData.primary_service) {
        const primaryServiceName = SERVICES.find(s => s.id === formData.primary_service)?.name;
        serviceNotes += `Servicio principal: ${primaryServiceName}\n`;
      }
      if (formData.secondary_services.length > 0) {
        const secondaryServiceNames = formData.secondary_services
          .map(id => SERVICES.find(s => s.id === id)?.name)
          .filter(Boolean);
        serviceNotes += `Servicios secundarios: ${secondaryServiceNames.join(', ')}\n`;
      }
      
      const finalNotes = serviceNotes + (formData.notes ? `\nNotas adicionales: ${formData.notes}` : '');

      const { data: newContact, error } = await supabase
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
          notes: finalNotes || null
        }])
        .select()
        .single();

      if (error) throw error;

      // Create initial activity
      await supabase
        .from('contact_activities')
        .insert([{
          contact_id: newContact.id,
          activity_type: 'note',
          title: 'Contacto creado manualmente',
          description: `Contacto agregado desde el CRM${serviceNotes ? ` con interés en: ${formData.primary_service}` : ''} - Asignado a: ${formData.assigned_user_email}`
        }]);

      // Manually create lead assignment since we want to assign to specific user
      await supabase
        .from('lead_assignments')
        .insert([{
          contact_id: newContact.id,
          assigned_user_email: formData.assigned_user_email,
          assigned_by_email: getCurrentUserEmail(),
          notes: 'Asignado manualmente al crear el lead'
        }]);

      toast({
        title: "Éxito",
        description: `Contacto creado y asignado a ${formData.assigned_user_email}`,
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
        notes: '',
        primary_service: '',
        secondary_services: [],
        assigned_user_email: getCurrentUserEmail()
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
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
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

          <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="assigned_user">Asignar a</Label>
              <Select 
                value={formData.assigned_user_email} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, assigned_user_email: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar usuario" />
                </SelectTrigger>
                <SelectContent>
                  {availableUsers.map((user) => (
                    <SelectItem key={user.email} value={user.email}>
                      {user.name} ({user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-medium">Servicios de Interés</h3>
            
            <div>
              <Label htmlFor="primary_service">Servicio Principal</Label>
              <Select value={formData.primary_service} onValueChange={(value) => setFormData(prev => ({ ...prev, primary_service: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar servicio principal" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Servicios Secundarios (Opcional)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {SERVICES.filter(service => service.id !== formData.primary_service).map((service) => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={service.id}
                      checked={formData.secondary_services.includes(service.id)}
                      onCheckedChange={(checked) => handleSecondaryServiceChange(service.id, checked as boolean)}
                    />
                    <Label
                      htmlFor={service.id}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {service.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notas Adicionales</Label>
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
