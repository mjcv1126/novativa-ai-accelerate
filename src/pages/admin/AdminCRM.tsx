
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, TrendingUp, DollarSign, Activity, List, LayoutGrid, Wifi, WifiOff, Table } from 'lucide-react';
import { useCRM } from '@/hooks/useCRM';
import { useCRMRealtime } from '@/hooks/crm/useCRMRealtime';
import { useTidyCalRealtime } from '@/hooks/crm/useTidyCalRealtime';
import { CRMFilters } from '@/components/crm/CRMFilters';
import { ListView } from '@/components/crm/ListView';
import { KanbanView } from '@/components/crm/KanbanView';
import { TableView } from '@/components/crm/TableView';
import { ContactDetailDialog } from '@/components/crm/ContactDetailDialog';
import { AddContactDialog } from '@/components/crm/AddContactDialog';
import { StageManagement } from '@/components/crm/StageManagement';
import { LeadValueDialog } from '@/components/crm/LeadValueDialog';
import { LossReasonDialog } from '@/components/crm/LossReasonDialog';
import { TidyCalRealtimeStatus } from '@/components/crm/TidyCalRealtimeStatus';
import { ExportContactsButton } from '@/components/crm/ExportContactsButton';
import { ViewMode } from '@/types/crm';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

export default function AdminCRM() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [showContactDetail, setShowContactDetail] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const { user } = useAdminAuth();
  const currentUser = user || JSON.parse(localStorage.getItem('admin_user') || '{}');
  const userRole = currentUser?.role || 'admin';

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

  // Estado de TidyCal real-time (permanent connection)
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
    <div className="space-y-4 p-4">
      {/* Compact Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-gray-900 truncate">CRM</h1>
          <p className="text-sm text-gray-600 truncate">Gestiona tus contactos y oportunidades</p>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <TidyCalRealtimeStatus 
            isConnected={syncStatus.connected}
            onConnect={triggerManualSync}
          />
          <AddContactDialog stages={stages} onContactAdded={fetchContacts} />
          <ExportContactsButton contacts={contacts} />
        </div>
      </div>

      {/* Compact Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Contactos</p>
              <p className="text-lg font-bold">{totalContacts}</p>
            </div>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Con Valor</p>
              <p className="text-lg font-bold text-green-600">{contactsWithValue.length}</p>
            </div>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Valor Total</p>
              <p className="text-lg font-bold text-green-600">${totalValue.toFixed(0)}</p>
            </div>
            <DollarSign className="h-4 w-4 text-green-500" />
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Sync</p>
              <p className="text-sm font-semibold">
                {syncStatus.connected ? (
                  <span className="text-green-600">Activo</span>
                ) : (
                  <span className="text-red-600">Inactivo</span>
                )}
              </p>
            </div>
            {syncStatus.connected ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
          </div>
        </Card>
      </div>

      {/* Main Content Tabs - Only show Stages tab for super_admin */}
      <Tabs defaultValue="contacts" className="space-y-3">
        <TabsList className={userRole === 'super_admin' ? 'grid w-full grid-cols-2' : 'grid w-full grid-cols-1'}>
          <TabsTrigger value="contacts" className="text-sm">Contactos</TabsTrigger>
          {userRole === 'super_admin' && (
            <TabsTrigger value="stages" className="text-sm">Etapas</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="contacts" className="space-y-3">
          {/* Compact Filters */}
          <CRMFilters 
            filters={filters} 
            onFiltersChange={setFilters}
            stages={stages}
            contacts={contacts}
          />

          {/* View Mode Selector */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="text-xs px-3"
            >
              <Table className="h-3 w-3 mr-1" />
              Tabla
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className="text-xs px-3"
            >
              <LayoutGrid className="h-3 w-3 mr-1" />
              Kanban
            </Button>
          </div>

          {/* Contact Views */}
          {loading ? (
            <div className="text-center py-8">Cargando contactos...</div>
          ) : viewMode === 'list' ? (
            <TableView
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

        {userRole === 'super_admin' && (
          <TabsContent value="stages" className="space-y-3">
            <StageManagement
              stages={stages}
              onCreateStage={createStage}
              onUpdateStage={updateStage}
              onDeleteStage={deleteStage}
            />
          </TabsContent>
        )}
      </Tabs>

      {/* Dialogs - keep existing code */}
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
