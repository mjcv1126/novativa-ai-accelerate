
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, TrendingUp, DollarSign, Activity, List, LayoutGrid, Wifi, WifiOff } from 'lucide-react';
import { useCRM } from '@/hooks/useCRM';
import { useCRMRealtime } from '@/hooks/crm/useCRMRealtime';
import { useTidyCalRealtime } from '@/hooks/crm/useTidyCalRealtime';
import { CRMFilters } from '@/components/crm/CRMFilters';
import { ListView } from '@/components/crm/ListView';
import { KanbanView } from '@/components/crm/KanbanView';
import { ContactDetailDialog } from '@/components/crm/ContactDetailDialog';
import { AddContactDialog } from '@/components/crm/AddContactDialog';
import { StageManagement } from '@/components/crm/StageManagement';
import { LeadValueDialog } from '@/components/crm/LeadValueDialog';
import { LossReasonDialog } from '@/components/crm/LossReasonDialog';
import { TidyCalRealtimeStatus } from '@/components/crm/TidyCalRealtimeStatus';
import { ExportContactsButton } from '@/components/crm/ExportContactsButton';
import { ViewMode } from '@/types/crm';

export default function AdminCRM() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [showContactDetail, setShowContactDetail] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const {
    contacts,
    stages,
    loading,
    filters,
    setFilters,
    fetchContacts,
    fetchContactActivities,
    createStage,
    updateStage,
    deleteStage,
    updateContact,
    moveContactToStage,
    createActivity,
    deleteContact,
    // Diálogos
    showLeadValueDialog,
    setShowLeadValueDialog,
    showLossReasonDialog,
    setShowLossReasonDialog,
    pendingContactMove,
    handleSaveLeadValue,
    handleSaveLossReason,
  } = useCRM();

  // Configurar real-time updates
  useCRMRealtime({
    onContactUpdate: fetchContacts,
    onActivityUpdate: fetchContacts,
  });

  // Estado de TidyCal real-time
  const { syncStatus, triggerManualSync } = useTidyCalRealtime();

  // Estadísticas
  const totalContacts = contacts.length;
  const contactsWithValue = contacts.filter(c => c.lead_value && c.lead_value > 0);
  const totalValue = contactsWithValue.reduce((sum, c) => sum + (c.lead_value || 0), 0);
  const avgValue = contactsWithValue.length > 0 ? totalValue / contactsWithValue.length : 0;

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setShowContactDetail(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CRM</h1>
          <p className="text-gray-600">Gestiona tus contactos y oportunidades de venta</p>
        </div>
        
        <div className="flex items-center gap-2">
          <TidyCalRealtimeStatus 
            isConnected={syncStatus.connected}
            onConnect={triggerManualSync}
          />
          <AddContactDialog stages={stages} onContactAdded={fetchContacts} />
          <ExportContactsButton contacts={contacts} />
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contactos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalContacts}</div>
            <p className="text-xs text-muted-foreground">
              {contacts.filter(c => new Date(c.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length} nuevos esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads con Valor</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contactsWithValue.length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((contactsWithValue.length / totalContacts) * 100)}% del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Promedio: ${avgValue.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sincronización</CardTitle>
            {syncStatus.connected ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {syncStatus.connected ? 'Activo' : 'Inactivo'}
            </div>
            <p className="text-xs text-muted-foreground">
              {syncStatus.lastSync ? `Última: ${syncStatus.lastSync.toLocaleTimeString()}` : 'Sin sincronizar'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs principales */}
      <Tabs defaultValue="contacts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contacts">Contactos</TabsTrigger>
          <TabsTrigger value="stages">Etapas</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="space-y-4">
          {/* Filtros */}
          <CRMFilters 
            filters={filters} 
            onFiltersChange={setFilters}
            stages={stages}
            contacts={contacts}
          />

          {/* Selector de vista */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4 mr-2" />
              Lista
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('kanban')}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Kanban
            </Button>
          </div>

          {/* Vista de contactos */}
          {loading ? (
            <div className="text-center py-8">Cargando contactos...</div>
          ) : viewMode === 'list' ? (
            <ListView
              contacts={contacts}
              stages={stages}
              onMoveContact={moveContactToStage}
              onEditContact={handleEditContact}
              onDeleteContact={deleteContact}
            />
          ) : (
            <KanbanView
              contacts={contacts}
              stages={stages}
              onMoveContact={moveContactToStage}
              onEditContact={handleEditContact}
              onDeleteContact={deleteContact}
            />
          )}
        </TabsContent>

        <TabsContent value="stages" className="space-y-4">
          <StageManagement
            stages={stages}
            onCreateStage={createStage}
            onUpdateStage={updateStage}
            onDeleteStage={deleteStage}
          />
        </TabsContent>
      </Tabs>

      {/* Diálogos */}
      <ContactDetailDialog
        contact={selectedContact}
        isOpen={showContactDetail}
        onClose={() => {
          setShowContactDetail(false);
          setSelectedContact(null);
        }}
        stages={stages}
        onUpdate={updateContact}
        onCreateActivity={createActivity}
        fetchActivities={fetchContactActivities}
      />

      <LeadValueDialog
        isOpen={showLeadValueDialog}
        onClose={() => setShowLeadValueDialog(false)}
        onSave={handleSaveLeadValue}
        contactName={pendingContactMove ? `${pendingContactMove.contact.first_name} ${pendingContactMove.contact.last_name}` : ''}
      />

      <LossReasonDialog
        isOpen={showLossReasonDialog}
        onClose={() => setShowLossReasonDialog(false)}  
        onSave={handleSaveLossReason}
        contactName={pendingContactMove ? `${pendingContactMove.contact.first_name} ${pendingContactMove.contact.last_name}` : ''}
      />
    </div>
  );
}
