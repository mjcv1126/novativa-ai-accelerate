import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Calendar, 
  Webhook, 
  Settings, 
  Play, 
  Pause, 
  Edit, 
  Trash,
  Plus,
  ExternalLink,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { TidyCalIntegration } from '@/components/crm/TidyCalIntegration';
import { TidyCalAutomationRules } from '@/components/crm/TidyCalAutomationRules';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { createDefaultAutomationRules } from '@/utils/automationSetup';

interface Automation {
  id: string;
  name: string;
  description: string;
  type: 'webhook' | 'tidycal' | 'email' | 'sms';
  status: 'active' | 'inactive';
  trigger: string;
  action: string;
  lastRun?: string;
  nextRun?: string;
  runCount: number;
}

const AdminAutomations = () => {
  const [automations, setAutomations] = useState<Automation[]>([
    {
      id: '1',
      name: 'TidyCal - CRM Sync',
      description: 'Sincronización automática de bookings de TidyCal al CRM cada 15 minutos',
      type: 'tidycal',
      status: 'active',
      trigger: 'Cron: */15 * * * *',
      action: 'Sincronizar contactos y actividades',
      lastRun: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      nextRun: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      runCount: 247
    }
  ]);
  
  const [newWebhook, setNewWebhook] = useState({
    name: '',
    description: '',
    url: '',
    method: 'POST',
    headers: '',
    trigger: 'contact_created',
    active: true
  });

  const [showNewWebhookForm, setShowNewWebhookForm] = useState(false);

  const handleCreateWebhook = () => {
    if (!newWebhook.name || !newWebhook.url) {
      toast({
        title: "Error",
        description: "Nombre y URL son obligatorios",
        variant: "destructive",
      });
      return;
    }

    const webhook: Automation = {
      id: Date.now().toString(),
      name: newWebhook.name,
      description: newWebhook.description,
      type: 'webhook',
      status: newWebhook.active ? 'active' : 'inactive',
      trigger: `Evento: ${newWebhook.trigger}`,
      action: `${newWebhook.method} ${newWebhook.url}`,
      runCount: 0
    };

    setAutomations(prev => [...prev, webhook]);
    setNewWebhook({
      name: '',
      description: '',
      url: '',
      method: 'POST',
      headers: '',
      trigger: 'contact_created',
      active: true
    });
    setShowNewWebhookForm(false);

    toast({
      title: "Webhook creado",
      description: "El webhook se ha configurado correctamente",
    });
  };

  const toggleAutomation = (id: string) => {
    setAutomations(prev => prev.map(auto => 
      auto.id === id 
        ? { ...auto, status: auto.status === 'active' ? 'inactive' : 'active' }
        : auto
    ));
  };

  const deleteAutomation = (id: string) => {
    setAutomations(prev => prev.filter(auto => auto.id !== id));
    toast({
      title: "Automatización eliminada",
      description: "La automatización se ha eliminado correctamente",
    });
  };

  const getStatusIcon = (status: string) => {
    return status === 'active' ? 
      <CheckCircle className="h-4 w-4 text-green-500" /> : 
      <AlertCircle className="h-4 w-4 text-gray-400" />;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tidycal':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case 'webhook':
        return <Webhook className="h-4 w-4 text-purple-500" />;
      case 'email':
        return <Activity className="h-4 w-4 text-green-500" />;
      case 'sms':
        return <Activity className="h-4 w-4 text-orange-500" />;
      default:
        return <Zap className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleCreateDefaultRules = async () => {
    try {
      await createDefaultAutomationRules();
      // Refresh the page to show the new rules
      window.location.reload();
    } catch (error) {
      console.error('Error creating default rules:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Automatizaciones | Panel Admin Novativa</title>
      </Helmet>
      
      <div className="space-y-6 max-w-full">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Automatizaciones</h1>
            <p className="text-gray-600 text-sm">Administra todas las automatizaciones del CRM y sistema</p>
          </div>
          
          {/* Quick Setup Button */}
          <div className="flex gap-2">
            <Button 
              onClick={handleCreateDefaultRules}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear Reglas Predeterminadas
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Resumen
            </TabsTrigger>
            <TabsTrigger value="tidycal" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              TidyCal
            </TabsTrigger>
            <TabsTrigger value="tidycal-rules" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Reglas TidyCal
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="flex items-center gap-2">
              <Webhook className="h-4 w-4" />
              Webhooks
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Programadas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Automatizaciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{automations.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Activas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {automations.filter(a => a.status === 'active').length}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Ejecuciones Hoy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">96</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Tasa de Éxito
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">98.5%</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Todas las Automatizaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {automations.map((automation) => (
                    <div key={automation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {getTypeIcon(automation.type)}
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{automation.name}</h4>
                            <Badge variant={automation.status === 'active' ? 'default' : 'secondary'}>
                              {automation.status === 'active' ? 'Activa' : 'Inactiva'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">{automation.description}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                            <span>Trigger: {automation.trigger}</span>
                            <span>Ejecuciones: {automation.runCount}</span>
                            {automation.lastRun && (
                              <span>Última: {new Date(automation.lastRun).toLocaleString()}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleAutomation(automation.id)}
                        >
                          {automation.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteAutomation(automation.id)}
                          className="text-red-600"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tidycal" className="space-y-4">
            <TidyCalIntegration />
          </TabsContent>

          <TabsContent value="tidycal-rules" className="space-y-4">
            <TidyCalAutomationRules />
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Webhooks Configurados</h3>
              <Button onClick={() => setShowNewWebhookForm(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nuevo Webhook
              </Button>
            </div>

            {showNewWebhookForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Configurar Nuevo Webhook</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="webhook-name">Nombre</Label>
                      <Input
                        id="webhook-name"
                        value={newWebhook.name}
                        onChange={(e) => setNewWebhook(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Ej: Notificación Slack"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="webhook-method">Método HTTP</Label>
                      <Select value={newWebhook.method} onValueChange={(value) => setNewWebhook(prev => ({ ...prev, method: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="POST">POST</SelectItem>
                          <SelectItem value="PUT">PUT</SelectItem>
                          <SelectItem value="PATCH">PATCH</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="webhook-url">URL del Webhook</Label>
                    <Input
                      id="webhook-url"
                      value={newWebhook.url}
                      onChange={(e) => setNewWebhook(prev => ({ ...prev, url: e.target.value }))}
                      placeholder="https://hooks.slack.com/services/..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="webhook-trigger">Evento Trigger</Label>
                    <Select value={newWebhook.trigger} onValueChange={(value) => setNewWebhook(prev => ({ ...prev, trigger: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contact_created">Contacto Creado</SelectItem>
                        <SelectItem value="contact_updated">Contacto Actualizado</SelectItem>
                        <SelectItem value="stage_changed">Etapa Cambiada</SelectItem>
                        <SelectItem value="activity_completed">Actividad Completada</SelectItem>
                        <SelectItem value="booking_confirmed">Booking Confirmado</SelectItem>
                        <SelectItem value="booking_cancelled">Booking Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="webhook-description">Descripción</Label>
                    <Textarea
                      id="webhook-description"
                      value={newWebhook.description}
                      onChange={(e) => setNewWebhook(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe qué hace este webhook..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="webhook-headers">Headers (JSON)</Label>
                    <Textarea
                      id="webhook-headers"
                      value={newWebhook.headers}
                      onChange={(e) => setNewWebhook(prev => ({ ...prev, headers: e.target.value }))}
                      placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="webhook-active"
                      checked={newWebhook.active}
                      onCheckedChange={(checked) => setNewWebhook(prev => ({ ...prev, active: checked }))}
                    />
                    <Label htmlFor="webhook-active">Activar webhook inmediatamente</Label>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleCreateWebhook}>
                      Crear Webhook
                    </Button>
                    <Button variant="outline" onClick={() => setShowNewWebhookForm(false)}>
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              {automations.filter(a => a.type === 'webhook').map((webhook) => (
                <Card key={webhook.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Webhook className="h-5 w-5 text-purple-500" />
                        <div>
                          <h4 className="font-medium">{webhook.name}</h4>
                          <p className="text-sm text-gray-500">{webhook.description}</p>
                          <div className="text-xs text-gray-400 mt-1">
                            {webhook.action}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getStatusIcon(webhook.status)}
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteAutomation(webhook.id)}
                          className="text-red-600"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {automations.filter(a => a.type === 'webhook').length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Webhook className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No hay webhooks configurados</p>
                  <p className="text-sm">Crea tu primer webhook para automatizar procesos</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Automatizaciones Programadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Próximamente</p>
                  <p className="text-sm">Funcionalidad de automatizaciones programadas en desarrollo</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminAutomations;
