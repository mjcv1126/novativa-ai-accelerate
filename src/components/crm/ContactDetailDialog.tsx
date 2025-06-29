import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContactWithStage, CrmStage, ContactActivity } from '@/types/crm';
import { Phone, Mail, Building, MapPin, Calendar, Plus, CheckCircle, Clock, User, X } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLeadAssignments } from '@/hooks/crm/useLeadAssignments';
import { useActivityOperations } from '@/hooks/crm/useActivityOperations';

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
  fetchActivities
}: ContactDetailDialogProps) => {
  const [editMode, setEditMode] = useState(false);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [activities, setActivities] = useState<ContactActivity[]>([]);
  const [assignedUser, setAssignedUser] = useState<string>('unassigned');
  const [newActivity, setNewActivity] = useState({
    title: '',
    description: '',
    activity_type: 'note' as ContactActivity['activity_type'],
    scheduled_date: '',
    scheduled_time: ''
  });
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    stage_id: '',
    notes: ''
  });

  const { getContactAssignment, assignLead, getAvailableUsers } = useLeadAssignments();
  const { markActivityComplete } = useActivityOperations();
  const availableUsers = getAvailableUsers();

  const loadContactAssignment = useCallback(async () => {
    if (contact) {
      try {
        const assignment = await getContactAssignment(contact.id);
        console.log('Assignment loaded:', assignment);
        if (assignment && assignment.assigned_user_email) {
          setAssignedUser(assignment.assigned_user_email);
        } else {
          setAssignedUser('unassigned');
        }
      } catch (error) {
        console.error('Error fetching assignment:', error);
        setAssignedUser('unassigned');
      }
    }
  }, [contact, getContactAssignment]);

  const loadActivities = useCallback(async () => {
    if (contact) {
      try {
        const activitiesData = await fetchActivities(contact.id);
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    }
  }, [contact, fetchActivities]);

  const handleMarkActivityComplete = async (activityId: string) => {
    try {
      await markActivityComplete(activityId);
      // Refresh activities immediately
      await loadActivities();
      console.log('Activity marked as complete and timeline refreshed');
    } catch (error) {
      console.error('Error marking activity as complete:', error);
    }
  };

  useEffect(() => {
    if (contact) {
      console.log('Contact changed:', contact);
      setFormData({
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email || '',
        phone: contact.phone,
        company: contact.company || '',
        stage_id: contact.stage_id || '',
        notes: contact.notes || ''
      });
      
      // Load activities
      loadActivities();
      
      // Load assignment
      loadContactAssignment();
    }
  }, [contact, loadActivities, loadContactAssignment]);

  const handleSave = () => {
    if (contact) {
      onUpdate(contact.id, formData);
      setEditMode(false);
    }
  };

  const handleAssignUser = async (userEmail: string) => {
    if (contact) {
      console.log('Assigning lead to:', userEmail);
      
      if (userEmail === 'unassigned') {
        setAssignedUser('unassigned');
        console.log('Lead unassigned');
        return;
      }
      
      const success = await assignLead(contact.id, userEmail, 'Reasignación manual desde la ficha del contacto');
      if (success) {
        await loadContactAssignment();
        console.log('Lead assigned successfully to:', userEmail);
      } else {
        console.error('Failed to assign lead');
      }
    }
  };

  const handleAddActivity = async () => {
    if (contact && newActivity.title) {
      const activityData = {
        contact_id: contact.id,
        ...newActivity,
        status: 'pending' as const,
        is_completed: false,
        scheduled_date: newActivity.scheduled_date || undefined,
        scheduled_time: newActivity.scheduled_time || undefined
      };
      
      try {
        await onCreateActivity(activityData);
        
        setNewActivity({
          title: '',
          description: '',
          activity_type: 'note',
          scheduled_date: '',
          scheduled_time: ''
        });
        
        setShowActivityForm(false);
        
        // Refresh activities immediately
        await loadActivities();
        
        console.log('Activity created and timeline refreshed');
      } catch (error) {
        console.error('Error creating activity:', error);
      }
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'meeting': return <Calendar className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getActivityTypeLabel = (type: string) => {
    const labels = {
      call: 'Llamada',
      email: 'Email',
      meeting: 'Reunión',
      note: 'Nota',
      reminder: 'Recordatorio',
      status_change: 'Cambio de etapa'
    };
    return labels[type as keyof typeof labels] || type;
  };

  // Separate activities into future and past
  const now = new Date();
  const futureActivities = activities.filter(activity => {
    if (!activity.scheduled_date) return false;
    const activityDate = new Date(activity.scheduled_date);
    return activityDate >= now;
  }).sort((a, b) => new Date(a.scheduled_date!).getTime() - new Date(b.scheduled_date!).getTime());

  const pastActivities = activities.filter(activity => {
    if (!activity.scheduled_date) return true; // Activities without date go to past
    const activityDate = new Date(activity.scheduled_date);
    return activityDate < now;
  }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  if (!contact) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div>
              <span>{contact.first_name} {contact.last_name}</span>
              <div className="text-sm text-gray-500 font-mono mt-1">
                ID: {contact.id}
              </div>
            </div>
            <div className="flex gap-2">
              {editMode ? (
                <>
                  <Button onClick={handleSave} size="sm">Guardar</Button>
                  <Button onClick={() => setEditMode(false)} variant="outline" size="sm">
                    Cancelar
                  </Button>
                </>
              ) : (
                <Button onClick={() => setEditMode(true)} size="sm">
                  Editar
                </Button>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información del Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editMode ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first_name">Nombre</Label>
                      <Input
                        id="first_name"
                        value={formData.first_name}
                        onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="last_name">Apellido</Label>
                      <Input
                        id="last_name"
                        value={formData.last_name}
                        onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                      />
                    </div>
                  </div>
                  
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
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="company">Empresa</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    />
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
                      rows={3}
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{contact.phone}</span>
                  </div>

                  {/* Mostrar teléfonos adicionales */}
                  {contact.additional_phones && contact.additional_phones.length > 0 && (
                    <div className="ml-6 space-y-1">
                      <Label className="text-xs text-gray-500">Teléfonos adicionales:</Label>
                      {contact.additional_phones.map((phone, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span>{phone}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {contact.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{contact.email}</span>
                    </div>
                  )}
                  
                  {contact.company && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span>{contact.company}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{contact.country_name}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Creado {format(new Date(contact.created_at), 'dd MMM yyyy', { locale: es })}</span>
                  </div>
                  
                  {contact.stage && (
                    <Badge 
                      style={{ 
                        backgroundColor: `${contact.stage.color}20`,
                        color: contact.stage.color,
                        border: `1px solid ${contact.stage.color}40`
                      }}
                    >
                      {contact.stage.name}
                    </Badge>
                  )}
                  
                  {contact.notes && (
                    <div className="mt-4">
                      <Label>Notas</Label>
                      <p className="text-sm text-gray-600 mt-1">{contact.notes}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Lead Assignment Section - Always visible */}
              <div className="border-t pt-4 mt-4">
                <div>
                  <Label htmlFor="assigned_user">Lead Asignado a</Label>
                  <Select 
                    value={assignedUser} 
                    onValueChange={handleAssignUser}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Seleccionar usuario">
                        {assignedUser === 'unassigned' ? (
                          "Sin asignar"
                        ) : (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{assignedUser}</span>
                          </div>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      <SelectItem value="unassigned">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Sin asignar
                        </div>
                      </SelectItem>
                      {availableUsers.map((user) => (
                        <SelectItem key={user.email} value={user.email}>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {user.name} ({user.email})
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activities Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Timeline de Actividades</span>
                <Button
                  onClick={() => setShowActivityForm(!showActivityForm)}
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  {showActivityForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  {showActivityForm ? 'Cancelar' : 'Nueva Actividad'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add new activity form - only visible when toggled */}
              {showActivityForm && (
                <div className="border rounded-lg p-4 mb-6 bg-blue-50">
                  <h4 className="font-medium mb-3">Nueva Actividad</h4>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Select 
                        value={newActivity.activity_type} 
                        onValueChange={(value) => setNewActivity(prev => ({ ...prev, activity_type: value as ContactActivity['activity_type'] }))}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="note">Nota</SelectItem>
                          <SelectItem value="call">Llamada</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="meeting">Reunión</SelectItem>
                          <SelectItem value="reminder">Recordatorio</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Título de la actividad"
                        value={newActivity.title}
                        onChange={(e) => setNewActivity(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="date"
                        placeholder="Fecha"
                        value={newActivity.scheduled_date}
                        onChange={(e) => setNewActivity(prev => ({ ...prev, scheduled_date: e.target.value }))}
                      />
                      <Input
                        type="time"
                        placeholder="Hora"
                        value={newActivity.scheduled_time}
                        onChange={(e) => setNewActivity(prev => ({ ...prev, scheduled_time: e.target.value }))}
                      />
                    </div>
                    
                    <Textarea
                      placeholder="Descripción (opcional)"
                      value={newActivity.description}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
                      rows={2}
                    />
                    <Button onClick={handleAddActivity} size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Actividad
                    </Button>
                  </div>
                </div>
              )}

              {/* Próximas Actividades Section */}
              {futureActivities.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-sm text-blue-600 mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Próximas Actividades ({futureActivities.length})
                  </h4>
                  <div className="space-y-3 max-h-40 overflow-y-auto">
                    {futureActivities.map((activity) => (
                      <div key={activity.id} className="flex gap-3 p-3 border rounded-lg bg-blue-50">
                        <div className="flex-shrink-0 mt-1">
                          {getActivityIcon(activity.activity_type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{activity.title}</span>
                            <Badge variant="outline" className="text-xs">
                              {getActivityTypeLabel(activity.activity_type)}
                            </Badge>
                          </div>
                          {activity.description && (
                            <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                          )}
                          <p className="text-xs text-blue-600 mb-1">
                            📅 {activity.scheduled_date} {activity.scheduled_time}
                          </p>
                          {/* Complete button - only for activities with scheduled date and not completed */}
                          {activity.scheduled_date && !activity.is_completed && (
                            <div className="mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleMarkActivityComplete(activity.id)}
                                className="text-green-600 hover:text-green-700 hover:border-green-300 text-xs px-2 py-1 h-7"
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Completar
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actividades Anteriores Section */}
              <div>
                <h4 className="font-medium text-sm text-gray-600 mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Actividades Anteriores ({pastActivities.length})
                </h4>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {pastActivities.map((activity) => (
                    <div key={activity.id} className="flex gap-3 p-3 border rounded-lg">
                      <div className="flex-shrink-0 mt-1">
                        {getActivityIcon(activity.activity_type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{activity.title}</span>
                          <Badge variant="outline" className="text-xs">
                            {getActivityTypeLabel(activity.activity_type)}
                          </Badge>
                          {activity.is_completed && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              Completada
                            </Badge>
                          )}
                        </div>
                        {activity.description && (
                          <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                        )}
                        {(activity.scheduled_date || activity.scheduled_time) && (
                          <p className="text-xs text-blue-600 mb-1">
                            Programada: {activity.scheduled_date} {activity.scheduled_time}
                          </p>
                        )}
                        <p className="text-xs text-gray-400">
                          {format(new Date(activity.created_at), 'dd MMM yyyy HH:mm', { locale: es })}
                        </p>
                        {/* Complete button - only for activities with scheduled date and not completed */}
                        {activity.scheduled_date && !activity.is_completed && (
                          <div className="mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkActivityComplete(activity.id)}
                              className="text-green-600 hover:text-green-700 hover:border-green-300 text-xs px-2 py-1 h-7"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completar
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {pastActivities.length === 0 && futureActivities.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <Clock className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">No hay actividades registradas</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
