
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UserManagement } from '@/components/admin/UserManagement';

const AdminUsers = () => {
  return (
    <>
      <Helmet>
        <title>Usuarios | Panel Admin Novativa</title>
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
          <p className="text-gray-600">Administra los usuarios con acceso al panel de administración</p>
        </div>

        <UserManagement />
      </div>
    </>
  );
};

export default AdminUsers;
