import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserPlus, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { formatDate } from '@/utils/dateUtils';

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country_code: string;
  country_name: string;
  will_attend: boolean;
  created_at: string;
  updated_at: string;
}

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalLeads: 0,
    willAttend: 0,
    wontAttend: 0,
    todayLeads: 0
  });

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      setLoading(true);
      console.log('🔄 Loading leads data...');
      
      // Direct query to icom_leads table
      const { data: leadsData, error: leadsError } = await supabase
        .from('icom_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (leadsError) {
        console.error('Error loading leads:', leadsError);
        throw leadsError;
      }

      console.log('📋 Leads data loaded:', leadsData?.length || 0);
      
      const leadsArray = leadsData || [];
      setLeads(leadsArray);
      
      // Calculate stats
      const today = new Date().toDateString();
      const todayLeads = leadsArray.filter(lead => 
        new Date(lead.created_at).toDateString() === today
      ).length;
      
      const willAttendCount = leadsArray.filter(lead => lead.will_attend).length;
      
      setStats({
        totalLeads: leadsArray.length,
        willAttend: willAttendCount,
        wontAttend: leadsArray.length - willAttendCount,
        todayLeads
      });
      
    } catch (error) {
      console.error('❌ Error loading leads data:', error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const exportLeads = () => {
    if (leads.length === 0) return;
    
    const csvContent = [
      ['Nombre', 'Apellido', 'Email', 'Teléfono', 'País', 'Asistirá', 'Fecha'].join(','),
      ...leads.map(lead => [
        lead.first_name,
        lead.last_name,
        lead.email,
        lead.phone,
        lead.country_name,
        lead.will_attend ? 'Sí' : 'No',
        formatDate(lead.created_at)
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
              <Filter className="h-4 w-4" />
              Actualizar
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Leads</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLeads}</div>
              <p className="text-xs text-muted-foreground">
                Formularios completados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Asistirán</CardTitle>
              <div className="h-4 w-4 bg-green-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.willAttend}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalLeads > 0 ? Math.round((stats.willAttend / stats.totalLeads) * 100) : 0}% del total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">No Asistirán</CardTitle>
              <div className="h-4 w-4 bg-red-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.wontAttend}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalLeads > 0 ? Math.round((stats.wontAttend / stats.totalLeads) * 100) : 0}% del total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Hoy</CardTitle>
              <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.todayLeads}</div>
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
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre Completo</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead>País</TableHead>
                      <TableHead>Asistirá</TableHead>
                      <TableHead>Fecha de Registro</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">
                          {lead.first_name} {lead.last_name}
                        </TableCell>
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
                            href={`tel:${lead.phone}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {lead.phone}
                          </a>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                              {lead.country_code}
                            </span>
                            {lead.country_name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            lead.will_attend 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {lead.will_attend ? 'Sí' : 'No'}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          <div>
                            <div>{formatDate(lead.created_at)}</div>
                            <div className="text-xs text-gray-400">
                              {new Date(lead.created_at).toLocaleTimeString('es-ES', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
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