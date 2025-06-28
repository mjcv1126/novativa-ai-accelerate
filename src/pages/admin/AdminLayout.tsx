
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import AdminDashboard from './AdminDashboard';
import AdminBlog from './AdminBlog';
import AdminBlogEdit from './AdminBlogEdit';
import AdminCRM from './AdminCRM';
import AdminActivities from './AdminActivities';
import AdminUsers from './AdminUsers';
import AdminCustomCSS from './AdminCustomCSS';
import AdminScripts from './AdminScripts';
import FileUpload from '../FileUpload';
import TranscriptionPage from '../TranscriptionPage';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="blog/new" element={<AdminBlogEdit />} />
            <Route path="blog/edit/:id" element={<AdminBlogEdit />} />
            <Route path="crm" element={<AdminCRM />} />
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
      </div>
    </div>
  );
};

export default AdminLayout;
