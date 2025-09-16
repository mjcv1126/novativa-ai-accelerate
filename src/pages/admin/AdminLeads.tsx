import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Download, RefreshCw, Calendar, Users, CheckCircle, Clock, Eye, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { LeadDetailsDialog } from '@/components/admin/leads/LeadDetailsDialog';

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country_code: string;
  country_name: string;
  services_of_interest: string;
  investment_budget: string;
  submission_datetime: string;
  created_at: string;
}

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    withBudget: 0,
    withoutBudget: 0,
    today: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      setLoading(true);
      console.log('🔄 Loading conversational form leads...');
      
      const { data: leadsData, error: leadsError } = await supabase
        .from('conversational_form_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (leadsError) {
        console.error('Error loading leads:', leadsError);
        throw leadsError;
      }

      console.log('📋 Conversational form leads loaded:', leadsData?.length || 0);
      
      const leadsArray = leadsData || [];
      setLeads(leadsArray);
      
      // Calculate stats
      const today = new Date().toDateString();
      const todayLeads = leadsArray.filter(lead => 
        new Date(lead.created_at).toDateString() === today
      ).length;
      
      const withBudgetCount = leadsArray.filter(lead => 
        !lead.investment_budget.includes('No cuento con la inversión')
      ).length;
      
      setStats({
        total: leadsArray.length,
        withBudget: withBudgetCount,
        withoutBudget: leadsArray.length - withBudgetCount,
        today: todayLeads
      });
      
    } catch (error) {
      console.error('❌ Error loading leads data:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los leads",
        variant: "destructive"
      });
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const exportLeads = () => {
    if (leads.length === 0) return;
    
    const csvContent = [
      ['Nombre', 'Apellido', 'Email', 'WhatsApp', 'Hora', 'País', 'Asunto', 'Inversión Necesaria'].join(','),
      ...leads.map(lead => [
        lead.first_name,
        lead.last_name,
        lead.email,
        lead.phone,
        new Date(lead.submission_datetime).toLocaleString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }).replace(/,/g, ' |'),
        lead.country_name,
        `"${lead.services_of_interest}"`,
        `"${lead.investment_budget}"`
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_formulario_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDialogOpen(true);
  };

  const handleCreateProspect = async (lead: Lead) => {
    try {
      // Crear un nuevo contacto en el CRM
      const { data: contact, error } = await supabase
        .from('contacts')
        .insert({
          first_name: lead.first_name,
          last_name: lead.last_name,
          email: lead.email,
          phone: lead.phone,
          country_code: lead.country_code,
          country_name: lead.country_name,
          service_of_interest: lead.services_of_interest,
          notes: `Lead convertido desde formulario conversacional. Presupuesto: ${lead.investment_budget}`,
          org_id: '00000000-0000-0000-0000-000000000000' // Default org ID
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Éxito",
        description: `Prospecto creado exitosamente para ${lead.first_name} ${lead.last_name}`,
      });
      setIsDialogOpen(false);
      
    } catch (error) {
      console.error('Error creating prospect:', error);
      toast({
        title: "Error",
        description: "Error al crear el prospecto",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-novativa-teal mx-auto mb-4"></div>
          <p>Cargando leads...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Leads | Panel Admin Novativa</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <UserPlus className="h-8 w-8" />
              Leads del Formulario
            </h1>
            <p className="text-gray-600">Contactos recolectados en novativa.org/formulario</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={exportLeads} 
              disabled={leads.length === 0}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Exportar CSV
            </Button>
            <Button 
              onClick={loadLeads}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Actualizar
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                Formularios completados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Con Presupuesto</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.withBudget}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.withBudget / stats.total) * 100) : 0}% del total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sin Presupuesto</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.withoutBudget}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.withoutBudget / stats.total) * 100) : 0}% del total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Hoy</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.today}</div>
              <p className="text-xs text-muted-foreground">
                Nuevos leads hoy
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Lista de Leads
            </CardTitle>
            <CardDescription>
              Todos los contactos que completaron el formulario en novativa.org/formulario
            </CardDescription>
          </CardHeader>
          <CardContent>
            {leads.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <UserPlus className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No hay leads disponibles</h3>
                <p className="text-sm">Los nuevos leads del formulario aparecerán aquí</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Ver</TableHead>
                      <TableHead className="min-w-[140px]">Nombre</TableHead>
                      <TableHead className="min-w-[200px]">Email</TableHead>
                      <TableHead className="min-w-[120px]">Teléfono</TableHead>
                      <TableHead className="min-w-[100px]">País</TableHead>
                      <TableHead className="min-w-[180px]">Servicios</TableHead>
                      <TableHead className="min-w-[160px]">Presupuesto</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => {
                      const getBudgetBadgeVariant = (budget: string) => {
                        if (budget.includes('$500') || budget.includes('pago inicial')) return 'default';
                        if (budget.includes('$100')) return 'secondary'; 
                        if (budget.includes('$49')) return 'outline';
                        if (budget.includes('No cuento')) return 'destructive';
                        return 'default';
                      };

                      const getWhatsAppLink = (phone: string) => {
                        const cleanPhone = phone.replace(/\D/g, '');
                        return `https://wa.me/${cleanPhone}`;
                      };

                      const truncateText = (text: string, maxLength: number = 30) => {
                        if (text.length <= maxLength) return text;
                        return text.substring(0, maxLength) + '...';
                      };

                      return (
                        <TableRow key={lead.id}>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewLead(lead)}
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                          <TableCell className="font-medium">
                            <div className="max-w-[140px] truncate" title={`${lead.first_name} ${lead.last_name}`}>
                              {lead.first_name} {lead.last_name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline flex items-center">
                              <Mail className="w-4 h-4 mr-1 flex-shrink-0" />
                              <span className="truncate max-w-[160px]" title={lead.email}>{lead.email}</span>
                            </a>
                          </TableCell>
                          <TableCell>
                            <a 
                              href={getWhatsAppLink(lead.phone)} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-green-600 hover:underline flex items-center"
                            >
                              <MessageCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                              <span className="truncate">{lead.phone}</span>
                            </a>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-[100px] truncate">{lead.country_name}</div>
                          </TableCell>
                          <TableCell>
                            <div 
                              className="max-w-[180px] truncate cursor-help" 
                              title={lead.services_of_interest}
                            >
                              {truncateText(lead.services_of_interest, 25)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={getBudgetBadgeVariant(lead.investment_budget)}
                              className="max-w-[160px] truncate cursor-help"
                              title={lead.investment_budget}
                            >
                              {truncateText(lead.investment_budget, 20)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <LeadDetailsDialog
        lead={selectedLead}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCreateProspect={handleCreateProspect}
      />
    </>
  );
};

export default AdminLeads;