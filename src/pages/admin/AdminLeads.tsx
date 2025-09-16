import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserPlus, Download, RefreshCw, Calendar, Users, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Apellido</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>WhatsApp</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead>País</TableHead>
                      <TableHead>Asunto</TableHead>
                      <TableHead>Inversión Necesaria</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.first_name}</TableCell>
                        <TableCell>{lead.last_name}</TableCell>
                        <TableCell>
                          <a 
                            href={`mailto:${lead.email}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {lead.email}
                          </a>
                        </TableCell>
                        <TableCell>
                          <a 
                            href={`https://wa.me/${lead.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800 hover:underline"
                          >
                            {lead.phone}
                          </a>
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(lead.submission_datetime).toLocaleString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                          })}
                        </TableCell>
                        <TableCell>{lead.country_name}</TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate" title={lead.services_of_interest}>
                            {lead.services_of_interest}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="space-y-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              lead.investment_budget.includes('No cuento con la inversión')
                                ? 'bg-orange-100 text-orange-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {lead.investment_budget.includes('No cuento con la inversión') ? 'Sin presupuesto' : 'Con presupuesto'}
                            </span>
                            <div className="text-xs text-muted-foreground truncate" title={lead.investment_budget}>
                              {lead.investment_budget}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminLeads;