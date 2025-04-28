
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Activity } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const AdminDashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | Admin Panel</title>
      </Helmet>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Usuarios Totales</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">120</div>
              <p className="text-xs text-gray-500">+10% del mes anterior</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Sesiones Esta Semana</CardTitle>
              <Activity className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">432</div>
              <p className="text-xs text-gray-500">+5% de la semana anterior</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Eventos Próximos</CardTitle>
              <Calendar className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-gray-500">Para los próximos 30 días</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>
                Resumen de las acciones más recientes en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <p className="font-medium">Actualización de sistema</p>
                  <p className="text-sm text-gray-500">Nueva versión implementada: 2.4.0</p>
                  <p className="text-xs text-gray-400">Hace 2 días</p>
                </div>
                <div className="border-b pb-4">
                  <p className="font-medium">Reporte mensual generado</p>
                  <p className="text-sm text-gray-500">El reporte de Mayo está disponible</p>
                  <p className="text-xs text-gray-400">Hace 5 días</p>
                </div>
                <div>
                  <p className="font-medium">Nueva configuración</p>
                  <p className="text-sm text-gray-500">Se habilitó la integración con WhatsApp</p>
                  <p className="text-xs text-gray-400">Hace 1 semana</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
