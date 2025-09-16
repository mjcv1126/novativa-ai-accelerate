import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PenTool, FileText, Users, TrendingUp, LogOut, Calendar, Activity, Phone, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { formatDate } from '@/utils/dateUtils';

interface DashboardStats {
  totalContacts: number;
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalActivities: number;
  completedActivities: number;
  pendingActivities: number;
  overdueActivities: number;
  totalBookings: number;
  futureBookings: number;
  pastBookings: number;
  cancelledBookings: number;
}

interface RecentActivity {
  id: string;
  title: string;
  type: string;
  contact_name?: string;
  created_at: string;
}

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

const AdminDashboard = () => {
  const { logout, user } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalActivities: 0,
    completedActivities: 0,
    pendingActivities: 0,
    overdueActivities: 0,
    totalBookings: 0,
    futureBookings: 0,
    pastBookings: 0,
    cancelledBookings: 0
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [leadsLoading, setLeadsLoading] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      console.log('🔄 Loading dashboard data...');
      
      // Load contacts stats
      const { data: contacts, error: contactsError } = await supabase
        .from('contacts')
        .select('id');
      
      // Load blog stats
      const { data: blogs, error: blogsError } = await supabase
        .from('blog_posts')
        .select('id, published');
      
      // Load activities stats (solo actividades pendientes/no completadas)
      const { data: activities, error: activitiesError } = await supabase
        .from('contact_activities')
        .select('id, is_completed, due_date, scheduled_date, status')
        .eq('is_completed', false); // Solo actividades no completadas
      
      // Load bookings stats from TidyCal processed bookings
      const { data: bookings, error: bookingsError } = await supabase
        .from('tidycal_processed_bookings')
        .select('id, booking_starts_at, sync_status');
      
      // Load recent activities (solo no completadas)
      const { data: recentActivitiesData, error: recentError } = await supabase
        .from('contact_activities')
        .select(`
          id,
          title,
          activity_type,
          created_at,
          contact_id,
          contacts!inner(first_name, last_name)
        `)
        .eq('is_completed', false) // Solo actividades no completadas
        .order('created_at', { ascending: false })
        .limit(10);

      if (contactsError) {
        console.error('Error loading contacts:', contactsError);
        throw contactsError;
      }
      if (blogsError) {
        console.error('Error loading blogs:', blogsError);
        throw blogsError;
      }
      if (activitiesError) {
        console.error('Error loading activities:', activitiesError);
        throw activitiesError;
      }
      if (bookingsError) {
        console.error('Error loading bookings:', bookingsError);
        throw bookingsError;
      }
      if (recentError) {
        console.error('Error loading recent activities:', recentError);
        throw recentError;
      }

      console.log('📊 Dashboard data loaded:', {
        contacts: contacts?.length || 0,
        blogs: blogs?.length || 0,
        activities: activities?.length || 0,
        bookings: bookings?.length || 0
      });

      // Calculate stats
      const now = new Date();
      const publishedBlogs = blogs?.filter(b => b.published) || [];
      const draftBlogs = blogs?.filter(b => !b.published) || [];
      
      const overdueActivities = activities?.filter(a => {
        const dueDate = a.due_date || a.scheduled_date;
        return dueDate && new Date(dueDate) < now;
      }) || [];

      // Filtrar bookings para excluir completados y cancelados
      const activeBookings = bookings?.filter(b => 
        b.sync_status !== 'cancelled' && 
        b.sync_status !== 'completed'
      ) || [];
      
      const futureBookings = activeBookings.filter(b => new Date(b.booking_starts_at) > now) || [];
      const pastBookings = activeBookings.filter(b => new Date(b.booking_starts_at) < now) || [];
      const cancelledBookings = bookings?.filter(b => b.sync_status === 'cancelled') || [];

      setStats({
        totalContacts: contacts?.length || 0,
        totalBlogs: blogs?.length || 0,
        publishedBlogs: publishedBlogs.length,
        draftBlogs: draftBlogs.length,
        totalActivities: activities?.length || 0,
        completedActivities: 0, // No mostramos completadas
        pendingActivities: activities?.length || 0,
        overdueActivities: overdueActivities.length,
        totalBookings: activeBookings.length,
        futureBookings: futureBookings.length,
        pastBookings: pastBookings.length,
        cancelledBookings: cancelledBookings.length
      });

      // Format recent activities
      const formattedActivities: RecentActivity[] = (recentActivitiesData || []).map(activity => ({
        id: activity.id,
        title: activity.title,
        type: activity.activity_type,
        contact_name: `${activity.contacts.first_name} ${activity.contacts.last_name}`,
        created_at: activity.created_at
      }));

      setRecentActivities(formattedActivities);
      
    } catch (error) {
      console.error('❌ Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadLeads = async () => {
    try {
      setLeadsLoading(true);
      console.log('🔄 Loading leads data...');
      
      const { data: leadsData, error: leadsError } = await supabase
        .rpc('get_icom_leads');

      if (leadsError) {
        console.error('Error loading leads:', leadsError);
        // Fallback to direct query
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('contacts')
          .select('*')
          .limit(0); // Get structure
        
        if (!fallbackError) {
          // Use SQL query as fallback
          const { data: sqlData, error: sqlError } = await supabase
            .from('contacts')
            .select('id, first_name, last_name, email, phone, country_code, country_name, created_at, updated_at')
            .limit(1)
            .single();
          
          if (!sqlError) {
            setLeads([]);
          }
        }
      } else {
        console.log('📋 Leads data loaded:', leadsData?.length || 0);
        setLeads(leadsData || []);
      }
      
    } catch (error) {
      console.error('❌ Error loading leads data:', error);
      // Set empty array as fallback
      setLeads([]);
    } finally {
      setLeadsLoading(false);
    }
  };

  const handleLogout = async () => {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      await logout();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-novativa-teal mx-auto mb-4"></div>
          <p>Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard | Panel Admin Novativa</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Bienvenido al panel de administración de Novativa</p>
          </div>
          <div className="flex items-center gap-4">
            {user?.email && (
              <span className="text-sm text-gray-600">
                {user.email}
              </span>
            )}
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="leads" onClick={() => leads.length === 0 && loadLeads()}>Leads</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6 mt-6">

        {/* Main Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Contactos Totales</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalContacts}</div>
              <p className="text-xs text-muted-foreground">
                En el CRM
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Bookings Activos</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">
                {stats.futureBookings} próximos, {stats.cancelledBookings} cancelados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Actividades Pendientes</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingActivities}</div>
              <p className="text-xs text-muted-foreground">
                {stats.overdueActivities} vencidas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Blog Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBlogs}</div>
              <p className="text-xs text-muted-foreground">
                {stats.publishedBlogs} publicados, {stats.draftBlogs} borradores
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actividades Vencidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{stats.overdueActivities}</div>
              <p className="text-sm text-muted-foreground">Requieren atención inmediata</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Llamadas Futuras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.futureBookings}</div>
              <p className="text-sm text-muted-foreground">Programadas en TidyCal</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actividades Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.pendingActivities}</div>
              <p className="text-sm text-muted-foreground">Por completar</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>
                Gestiona tu contenido y contactos fácilmente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full bg-novativa-teal hover:bg-novativa-lightTeal">
                <Link to="/admin/crm">
                  <Users className="mr-2 h-4 w-4" />
                  Gestionar CRM
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/admin/activities">
                  <Activity className="mr-2 h-4 w-4" />
                  Ver Actividades
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/admin/blog/new">
                  <PenTool className="mr-2 h-4 w-4" />
                  Crear Nuevo Post
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/admin/automations">
                  <Calendar className="mr-2 h-4 w-4" />
                  Automatizaciones
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>
                Últimas acciones en el sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentActivities.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <Activity className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No hay actividad reciente</p>
                  <p className="text-sm">Las nuevas actividades aparecerán aquí</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentActivities.slice(0, 6).map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div className="flex items-center gap-3">
                        <div className="p-1 bg-gray-100 rounded">
                          {activity.type === 'call' ? <Phone className="h-3 w-3" /> : 
                           activity.type === 'meeting' ? <Calendar className="h-3 w-3" /> : 
                           <Activity className="h-3 w-3" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-gray-500">
                            {activity.contact_name}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatDate(activity.created_at)}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                    <Link to="/admin/activities">
                      Ver todas las actividades
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
          </TabsContent>

          <TabsContent value="leads" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Leads del Formulario
                </CardTitle>
                <CardDescription>
                  Contactos que completaron el formulario en novativa.org/formulario
                </CardDescription>
              </CardHeader>
              <CardContent>
                {leadsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-novativa-teal"></div>
                  </div>
                ) : leads.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <UserPlus className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No hay leads disponibles</p>
                    <p className="text-sm">Los nuevos leads aparecerán aquí</p>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Teléfono</TableHead>
                          <TableHead>País</TableHead>
                          <TableHead>Asistirá</TableHead>
                          <TableHead>Fecha</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leads.map((lead) => (
                          <TableRow key={lead.id}>
                            <TableCell className="font-medium">
                              {lead.first_name} {lead.last_name}
                            </TableCell>
                            <TableCell>{lead.email}</TableCell>
                            <TableCell>{lead.phone}</TableCell>
                            <TableCell>{lead.country_name}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                lead.will_attend 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {lead.will_attend ? 'Sí' : 'No'}
                              </span>
                            </TableCell>
                            <TableCell className="text-sm text-gray-500">
                              {formatDate(lead.created_at)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminDashboard;
