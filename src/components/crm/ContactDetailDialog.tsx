import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContactWithStage, CrmStage } from '@/types/crm';
import { User, Phone, Mail, Building, MapPin, Calendar, Clock, Plus, X, Edit2, Save } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from '@/components/ui/use-toast';
import { countries } from '@/components/schedule/countryData';

interface ContactDetailDialogProps {
  contact: ContactWithStage | null;
  isOpen: boolean;
  onClose: () => void;
  stages: CrmStage[];
  onUpdate: (id: string, updates: Partial<ContactWithStage>) => void;
  onCreateActivity: (data: any) => Promise<any>;
  fetchActivities: (contactId: string) => Promise<any[]>;
}

export const ContactDetailDialog = ({
  contact,
  isOpen,
  onClose,
  stages,
  onUpdate,
  onCreateActivity,
  fetchActivities
}: ContactDetailDialogProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activities, setActivities] = useState<any[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    country_code: '506',
    country_name: '',
    stage_id: '',
    notes: '',
    service_of_interest: '',
    additional_phones: [] as string[],
    additional_emails: [] as string[]
  });

  useEffect(() => {
    if (contact && isOpen) {
      setEditForm({
        first_name: contact.first_name || '',
        last_name: contact.last_name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        company: contact.company || '',
        country_code: contact.country_code || '506',
        country_name: contact.country_name || '',
        stage_id: contact.stage_id || '',
        notes: contact.notes || '',
        service_of_interest: contact.service_of_interest || '',
        additional_phones: contact.additional_phones || [],
        additional_emails: contact.additional_emails || []
      });
      loadActivities();
    }
  }, [contact, isOpen]);

  const loadActivities = async () => {
    if (!contact) return;
    setLoadingActivities(true);
    try {
      const activitiesData = await fetchActivities(contact.id);
      setActivities(activitiesData || []);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoadingActivities(false);
    }
  };

  useEffect(() => {
    if (contact && isOpen) {
      setEditForm({
        first_name: contact.first_name || '',
        last_name: contact.last_name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        company: contact.company || '',
        country_code: contact.country_code || '506',
        country_name: contact.country_name || '',
        stage_id: contact.stage_id || '',
        notes: contact.notes || '',
        service_of_interest: contact.service_of_interest || '',
        additional_phones: contact.additional_phones || [],
        additional_emails: contact.additional_emails || []
      });
      loadActivities();
    }
  }, [contact, isOpen]);

  const handleSave = async () => {
    if (!contact) return;
    
    try {
      const selectedCountry = countries.find(c => c.code === editForm.country_code);
      
      await onUpdate(contact.id, {
        ...editForm,
        country_name: selectedCountry?.name || editForm.country_name,
        additional_phones: editForm.additional_phones.filter(phone => phone.trim()),
        additional_emails: editForm.additional_emails.filter(email => email.trim())
      });
      
      setIsEditing(false);
      toast({
        title: "Éxito",
        description: "Contacto actualizado correctamente",
      });
    } catch (error) {
      console.error('Error updating contact:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el contacto",
        variant: "destructive",
      });
    }
  };

  const addAdditionalPhone = () => {
    setEditForm(prev => ({
      ...prev,
      additional_phones: [...prev.additional_phones, '']
    }));
  };

  const removeAdditionalPhone = (index: number) => {
    setEditForm(prev => ({
      ...prev,
      additional_phones: prev.additional_phones.filter((_, i) => i !== index)
    }));
  };

  const updateAdditionalPhone = (index: number, value: string) => {
    setEditForm(prev => ({
      ...prev,
      additional_phones: prev.additional_phones.map((phone, i) => i === index ? value : phone)
    }));
  };

  const addAdditionalEmail = () => {
    setEditForm(prev => ({
      ...prev,
      additional_emails: [...prev.additional_emails, '']
    }));
  };

  const removeAdditionalEmail = (index: number) => {
    setEditForm(prev => ({
      ...prev,
      additional_emails: prev.additional_emails.filter((_, i) => i !== index)
    }));
  };

  const updateAdditionalEmail = (index: number, value: string) => {
    setEditForm(prev => ({
      ...prev,
      additional_emails: prev.additional_emails.map((email, i) => i === index ? value : email)
    }));
  };

  if (!contact) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {contact.first_name} {contact.last_name}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
              {isEditing ? 'Guardar' : 'Editar'}
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="activities">Actividades</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            {/* Información Personal */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Información Personal</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nombre</Label>
                  {isEditing ? (
                    <Input
                      value={editForm.first_name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, first_name: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm mt-1">{contact.first_name}</p>
                  )}
                </div>
                <div>
                  <Label>Apellido</Label>
                  {isEditing ? (
                    <Input
                      value={editForm.last_name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, last_name: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm mt-1">{contact.last_name}</p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Información de Contacto */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Información de Contacto</h3>
              
              {/* Email Principal */}
              <div>
                <Label className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Principal
                </Label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  />
                ) : (
                  <p className="text-sm mt-1">{contact.email || 'No especificado'}</p>
                )}
              </div>

              {/* Emails Adicionales */}
              <div>
                <Label className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Emails Adicionales
                </Label>
                {isEditing ? (
                  <div className="space-y-2">
                    {editForm.additional_emails.map((email, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => updateAdditionalEmail(index, e.target.value)}
                          placeholder="email@ejemplo.com"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeAdditionalEmail(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addAdditionalEmail}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Email
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {contact.additional_emails && contact.additional_emails.length > 0 ? (
                      contact.additional_emails.map((email, index) => (
                        <p key={index} className="text-sm">{email}</p>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No especificados</p>
                    )}
                  </div>
                )}
              </div>

              {/* Teléfono Principal */}
              <div>
                <Label className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Teléfono Principal
                </Label>
                {isEditing ? (
                  <div className="flex gap-2">
                    <Select 
                      value={editForm.country_code} 
                      onValueChange={(value) => setEditForm(prev => ({ ...prev, country_code: value }))}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.flag} +{country.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      value={editForm.phone}
                      onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                ) : (
                  <p className="text-sm mt-1">+{contact.country_code} {contact.phone}</p>
                )}
              </div>

              {/* Teléfonos Adicionales */}
              <div>
                <Label className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Teléfonos Adicionales
                </Label>
                {isEditing ? (
                  <div className="space-y-2">
                    {editForm.additional_phones.map((phone, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={phone}
                          onChange={(e) => updateAdditionalPhone(index, e.target.value)}
                          placeholder="+506 1234 5678"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeAdditionalPhone(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addAdditionalPhone}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Teléfono
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {contact.additional_phones && contact.additional_phones.length > 0 ? (
                      contact.additional_phones.map((phone, index) => (
                        <p key={index} className="text-sm">{phone}</p>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No especificados</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Información Empresarial */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Información Empresarial</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Empresa
                  </Label>
                  {isEditing ? (
                    <Input
                      value={editForm.company}
                      onChange={(e) => setEditForm(prev => ({ ...prev, company: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm mt-1">{contact.company || 'No especificada'}</p>
                  )}
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    País
                  </Label>
                  {isEditing ? (
                    <Input
                      value={editForm.country_name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, country_name: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm mt-1">{contact.country_name}</p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Información del CRM */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Información del CRM</h3>
              <div className="space-y-4">
                <div>
                  <Label>Etapa</Label>
                  {isEditing ? (
                    <Select value={editForm.stage_id} onValueChange={(value) => setEditForm(prev => ({ ...prev, stage_id: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar etapa" />
                      </SelectTrigger>
                      <SelectContent>
                        {stages.map((stage) => (
                          <SelectItem key={stage.id} value={stage.id}>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
                              {stage.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="mt-1">
                      {contact.stage ? (
                        <Badge style={{ backgroundColor: contact.stage.color + '20', color: contact.stage.color }}>
                          {contact.stage.name}
                        </Badge>
                      ) : (
                        <span className="text-sm text-gray-500">Sin etapa</span>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Servicio de Interés</Label>
                  {isEditing ? (
                    <Input
                      value={editForm.service_of_interest}
                      onChange={(e) => setEditForm(prev => ({ ...prev, service_of_interest: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm mt-1">{contact.service_of_interest || 'No especificado'}</p>
                  )}
                </div>

                <div>
                  <Label>Notas</Label>
                  {isEditing ? (
                    <Textarea
                      value={editForm.notes}
                      onChange={(e) => setEditForm(prev => ({ ...prev, notes: e.target.value }))}
                      rows={4}
                    />
                  ) : (
                    <p className="text-sm mt-1 whitespace-pre-wrap">{contact.notes || 'Sin notas'}</p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Información de Fechas */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Información de Fechas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Fecha de Creación
                  </Label>
                  <p className="text-sm mt-1">
                    {format(new Date(contact.created_at), 'dd/MM/yyyy HH:mm', { locale: es })}
                  </p>
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Último Contacto
                  </Label>
                  <p className="text-sm mt-1">
                    {contact.last_contact_date 
                      ? format(new Date(contact.last_contact_date), 'dd/MM/yyyy HH:mm', { locale: es })
                      : 'Sin contacto registrado'
                    }
                  </p>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSave}>
                  Guardar Cambios
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="activities">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Actividades</h3>
              {loadingActivities ? (
                <p>Cargando actividades...</p>
              ) : (
                <div className="space-y-2">
                  {activities.length > 0 ? (
                    activities.map((activity) => (
                      <div key={activity.id} className="border rounded-md p-4">
                        <h4 className="font-semibold">{activity.title}</h4>
                        <p className="text-sm">{activity.description}</p>
                      </div>
                    ))
                  ) : (
                    <p>No hay actividades registradas.</p>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
