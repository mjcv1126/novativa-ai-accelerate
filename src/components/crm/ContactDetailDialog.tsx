import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ContactWithStage, CrmStage, ContactActivity } from '@/types/crm';
import { User, Phone, Mail, Building, Globe, Calendar, MessageSquare, Paperclip, Activity, DollarSign } from 'lucide-react';
import { ContactAttachments } from './ContactAttachments';
import { ActivityTimeline } from './ActivityTimeline';
import { useActivityOperations } from '@/hooks/crm/useActivityOperations';
import { toast } from '@/hooks/use-toast';

interface ContactDetailDialogProps {
  contact: ContactWithStage | null;
  isOpen: boolean;
  onClose: () => void;
  stages: CrmStage[];
  onUpdate: (id: string, updates: Partial<ContactWithStage>) => void;
  onCreateActivity: (activity: Omit<ContactActivity, 'id' | 'created_at' | 'updated_at'>) => void;
  fetchActivities: (contactId: string) => Promise<ContactActivity[]>;
}

export const ContactDetailDialog = ({
  contact,
  isOpen,
  onClose,
  stages,
  onUpdate,
  onCreateActivity,
  fetchActivities,
}: ContactDetailDialogProps) => {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [formData, setFormData] = useState<Partial<ContactWithStage>>({});
  const [activities, setActivities] = useState<ContactActivity[]>([]);
  const [newActivity, setNewActivity] = useState({
    title: '',
    description: '',
    activity_type: 'note' as ContactActivity['activity_type'],
    due_date: '',
    scheduled_date: '',
    scheduled_time: '',
  });

  const { markActivityComplete } = useActivityOperations();

  useEffect(() => {
    if (contact) {
      setFormData(contact);
      loadActivities();
    }
  }, [contact]);

  const loadActivities = async () => {
    if (contact) {
      try {
        const contactActivities = await fetchActivities(contact.id);
        setActivities(contactActivities);
      } catch (error) {
        console.error('Error loading activities:', error);
      }
    }
  };

  const handleSave = () => {
    if (contact && formData) {
      onUpdate(contact.id, formData);
      setEditMode(false);
    }
  };

  const handleCreateActivity = async () => {
    if (!contact || !newActivity.title.trim()) return;

    try {
      await onCreateActivity({
        contact_id: contact.id,
        activity_type: newActivity.activity_type,
        title: newActivity.title,
        description: newActivity.description || undefined,
        due_date: newActivity.due_date || undefined,
        scheduled_date: newActivity.scheduled_date || undefined,
        scheduled_time: newActivity.scheduled_time || undefined,
        is_completed: false,
        status: 'pending',
      });

      setNewActivity({
        title: '',
        description: '',
        activity_type: 'note',
        due_date: '',
        scheduled_date: '',
        scheduled_time: '',
      });

      // Reload activities
      await loadActivities();

      // Cambiar automáticamente a la pestaña de timeline
      setActiveTab('timeline');

      toast({
        title: "Éxito",
        description: "Actividad creada correctamente",
      });
    } catch (error) {
      console.error('Error creating activity:', error);
      toast({
        title: "Error",
        description: "No se pudo crear la actividad",
        variant: "destructive",
      });
    }
  };

  const handleCompleteActivity = async (activityId: string) => {
    try {
      await markActivityComplete(activityId);
      await loadActivities();
    } catch (error) {
      console.error('Error completing activity:', error);
    }
  };

  const formatCurrency = (value: number, currency: string) => {
    const symbols: { [key: string]: string } = {
      USD: '$',
      EUR: '€',
      CRC: '₡'
    };
    return `${symbols[currency] || currency} ${value.toFixed(2)}`;
  };

  if (!contact) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span>{contact.first_name} {contact.last_name}</span>
            {contact.stage && (
              <Badge style={{ backgroundColor: contact.stage.color, color: 'white' }}>
                {contact.stage.name}
              </Badge>
            )}
            {contact.lead_value && (
              <Badge variant="outline" className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                {formatCurrency(contact.lead_value, contact.lead_value_currency || 'USD')}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="activities">Actividades</TabsTrigger>
            <TabsTrigger value="attachments">Adjuntos</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Información del Contacto</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditMode(!editMode)}
                  >
                    {editMode ? 'Cancelar' : 'Editar'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Nombre</Label>
                    {editMode ? (
                      <Input
                        value={formData.first_name || ''}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <User className="h-4 w-4" />
                        <span>{contact.first_name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Apellido</Label>
                    {editMode ? (
                      <Input
                        value={formData.last_name || ''}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <User className="h-4 w-4" />
                        <span>{contact.last_name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Teléfono</Label>
                    {editMode ? (
                      <Input
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="h-4 w-4" />
                        <span>{contact.phone}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Email</Label>
                    {editMode ? (
                      <Input
                        value={formData.email || ''}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="h-4 w-4" />
                        <span>{contact.email || 'No disponible'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Empresa</Label>
                    {editMode ? (
                      <Input
                        value={formData.company || ''}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Building className="h-4 w-4" />
                        <span>{contact.company || 'No disponible'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>País</Label>
                    {editMode ? (
                      <Input
                        value={formData.country_name || ''}
                        onChange={(e) => setFormData({ ...formData, country_name: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Globe className="h-4 w-4" />
                        <span>{contact.country_name}</span>
                      </div>
                    )}
                  </div>

                  {/* Campos de valor del lead */}
                  <div>
                    <Label>Valor del Lead</Label>
                    {editMode ? (
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.lead_value || ''}
                        onChange={(e) => setFormData({ ...formData, lead_value: parseFloat(e.target.value) || undefined })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <DollarSign className="h-4 w-4" />
                        <span>
                          {contact.lead_value 
                            ? formatCurrency(contact.lead_value, contact.lead_value_currency || 'USD')
                            : 'No definido'
                          }
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Tipo de Pago</Label>
                    {editMode ? (
                      <Select
                        value={formData.payment_type || ''}
                        onValueChange={(value) => setFormData({ ...formData, payment_type: value as 'one_time' | 'recurring' })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="one_time">Pago Único</SelectItem>
                          <SelectItem value="recurring">Pago Recurrente</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="mt-1">
                        <span>
                          {contact.payment_type === 'one_time' ? 'Pago Único' :
                           contact.payment_type === 'recurring' ? 'Pago Recurrente' : 'No definido'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <Label>Etapa</Label>
                    {editMode ? (
                      <Select
                        value={formData.stage_id || ''}
                        onValueChange={(value) => setFormData({ ...formData, stage_id: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar etapa" />
                        </SelectTrigger>
                        <SelectContent>
                          {stages.map((stage) => (
                            <SelectItem key={stage.id} value={stage.id}>
                              {stage.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: contact.stage?.color }}
                        />
                        <span>{contact.stage?.name || 'Sin etapa'}</span>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <Label>Notas</Label>
                    {editMode ? (
                      <Textarea
                        value={formData.notes || ''}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={3}
                      />
                    ) : (
                      <div className="mt-1 p-2 bg-gray-50 rounded">
                        <span>{contact.notes || 'Sin notas'}</span>
                      </div>
                    )}
                  </div>

                  {/* Mostrar motivo de pérdida si existe */}
                  {contact.loss_reason && (
                    <div className="md:col-span-2">
                      <Label>Motivo de Pérdida</Label>
                      <div className="mt-1 p-2 bg-red-50 border border-red-200 rounded">
                        <span className="text-red-800">{contact.loss_reason}</span>
                      </div>
                    </div>
                  )}
                </div>

                {editMode && (
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>Guardar</Button>
                    <Button variant="outline" onClick={() => setEditMode(false)}>
                      Cancelar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Nueva Actividad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Tipo</Label>
                    <Select
                      value={newActivity.activity_type}
                      onValueChange={(value) => setNewActivity({ ...newActivity, activity_type: value as ContactActivity['activity_type'] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="call">Llamada</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="meeting">Reunión</SelectItem>
                        <SelectItem value="note">Nota</SelectItem>
                        <SelectItem value="reminder">Recordatorio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Título</Label>
                    <Input
                      value={newActivity.title}
                      onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                      placeholder="Título de la actividad"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label>Descripción</Label>
                    <Textarea
                      value={newActivity.description}
                      onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                      placeholder="Descripción de la actividad"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Fecha programada</Label>
                    <Input
                      type="date"
                      value={newActivity.scheduled_date}
                      onChange={(e) => setNewActivity({ ...newActivity, scheduled_date: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Hora programada</Label>
                    <Input
                      type="time"
                      value={newActivity.scheduled_time}
                      onChange={(e) => setNewActivity({ ...newActivity, scheduled_time: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={handleCreateActivity} disabled={!newActivity.title.trim()}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Crear Actividad
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attachments" className="space-y-4">
            <ContactAttachments contactId={contact.id} />
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <ActivityTimeline
              activities={activities}
              onCompleteActivity={handleCompleteActivity}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
