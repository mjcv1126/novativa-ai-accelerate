
import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminDashboard from './AdminDashboard';
import AdminBlog from './AdminBlog';
import AdminBlogEdit from './AdminBlogEdit';
import AdminCRM from './AdminCRM';
import AdminBookings from './AdminBookings';
import AdminActivities from './AdminActivities';
import AdminUsers from './AdminUsers';
import AdminCustomCSS from './AdminCustomCSS';
import AdminScripts from './AdminScripts';
import FileUpload from '../FileUpload';
import TranscriptionPage from '../TranscriptionPage';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

const AdminLayout = () => {
  const { user } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentUser = user || JSON.parse(localStorage.getItem('admin_user') || '{}');

  // Redirect /admin/ to /admin/dashboard
  useEffect(() => {
    if (location.pathname === '/admin' || location.pathname === '/admin/') {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AdminSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">Panel Admin Novativa</h1>
            </div>
            <div className="ml-auto flex items-center gap-2">
              {currentUser?.email && (
                <span className="text-sm text-gray-600 hidden sm:inline">
                  {currentUser.email}
                </span>
              )}
            </div>
          </header>
          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            <Routes>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="blog/new" element={<AdminBlogEdit />} />
              <Route path="blog/edit/:id" element={<AdminBlogEdit />} />
              <Route path="crm" element={<AdminCRM />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="activities" element={<AdminActivities />} />
              <Route 
                path="users" 
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <AdminUsers />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="files" 
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <FileUpload />
                  </ProtectedRoute>
                } 
              />
              <Route path="transcription" element={<TranscriptionPage />} />
              <Route 
                path="scripts" 
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <AdminScripts />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="custom-css" 
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <AdminCustomCSS />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
