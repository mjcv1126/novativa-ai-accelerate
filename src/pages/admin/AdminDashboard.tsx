
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PenTool, FileText, Users, TrendingUp, LogOut, Calendar, Activity, Phone, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { formatDateForDisplay } from '@/utils/dateUtils';

interface DashboardStats {
  totalContacts: number;
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalActivities: number;
  completedActivities: number;
  pendingActivities: number;
  overdue Activities: number;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load contacts stats
      const { data: contacts, error: contactsError } = await supabase
        .from('contacts')
        .select('id');
      
      // Load blog stats
      const { data: blogs, error: blogsError } = await supabase
        .from('blog_posts')
        .select('id, published');
      
      // Load activities stats
      const { data: activities, error: activitiesError } = await supabase
        .from('contact_activities')
        .select('id, is_completed, due_date, scheduled_date');
      
      // Load bookings stats
      const { data: bookings, error: bookingsError } = await supabase
        .from('tidycal_processed_bookings')
        .select('id, booking_starts_at, sync_status');
      
      // Load recent activities
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
        .order('created_at', { ascending: false })
        .limit(10);

      if (contactsError) throw contactsError;
      if (blogsError) throw blogsError;
      if (activitiesError) throw activitiesError;
      if (bookingsError) throw bookingsError;
      if (recentError) throw recentError;

      // Calculate stats
      const now = new Date();
      const publishedBlogs = blogs?.filter(b => b.published) || [];
      const draftBlogs = blogs?.filter(b => !b.published) || [];
      
      const completedActivities = activities?.filter(a => a.is_completed) || [];
      const pendingActivities = activities?.filter(a => !a.is_completed) || [];
      const overdueActivities = activities?.filter(a => {
        if (a.is_completed) return false;
        const dueDate = a.due_date || a.scheduled_date;
        return dueDate && new Date(dueDate) < now;
      }) || [];

      const futureBookings = bookings?.filter(b => new Date(b.booking_starts_at) > now) || [];
      const pastBookings = bookings?.filter(b => new Date(b.booking_starts_at) < now) || [];
      const cancelledBookings = bookings?.filter(b => b.sync_status === 'cancelled') || [];

      setStats({
        totalContacts: contacts?.length || 0,
        totalBlogs: blogs?.length || 0,
        publishedBlogs: publishedBlogs.length,
        draftBlogs: draftBlogs.length,
        totalActivities: activities?.length || 0,
        completedActivities: completedActivities.length,
        pendingActivities: pendingActivities.length,
        overdueActivities: overdueActivities.length,
        totalBookings: bookings?.length || 0,
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
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
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

        {/* Main Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contactos Totales</CardTitle>
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
              <CardTitle className="text-sm font-medium">Bookings</CardTitle>
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
              <CardTitle className="text-sm font-medium">Actividades</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalActivities}</div>
              <p className="text-xs text-muted-foreground">
                {stats.pendingActivities} pendientes, {stats.overdueActivities} vencidas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
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
              <CardTitle className="text-lg">Completadas Hoy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.completedActivities}</div>
              <p className="text-sm text-muted-foreground">Actividades finalizadas</p>
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
                        {formatDateForDisplay(activity.created_at)}
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
      </div>
    </>
  );
};

export default AdminDashboard;
