
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, FileText, Tag, Users } from 'lucide-react';
import RecentPostsTable from '@/components/admin/RecentPostsTable';
import VisitorsChart from '@/components/admin/VisitorsChart';
import { Helmet } from 'react-helmet-async';

const AdminDashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard Admin | Novativa</title>
      </Helmet>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Visitas" 
            value="12,543" 
            description="+12% desde el mes pasado" 
            icon={<Eye className="h-5 w-5 text-novativa-teal" />} 
          />
          <StatCard 
            title="Posts Publicados" 
            value="36" 
            description="6 nuevos este mes" 
            icon={<FileText className="h-5 w-5 text-novativa-orange" />} 
          />
          <StatCard 
            title="Categorías" 
            value="8" 
            description="2 agregadas recientemente" 
            icon={<Tag className="h-5 w-5 text-purple-500" />} 
          />
          <StatCard 
            title="Usuarios Activos" 
            value="745" 
            description="+18% desde la última semana" 
            icon={<Users className="h-5 w-5 text-blue-500" />} 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Análisis de Tráfico</CardTitle>
              <CardDescription>Visitas del sitio en los últimos 30 días</CardDescription>
            </CardHeader>
            <CardContent>
              <VisitorsChart />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Desempeño por Categoría</CardTitle>
              <CardDescription>Visitas agrupadas por categoría</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="views">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="views">Vistas</TabsTrigger>
                  <TabsTrigger value="time">Tiempo</TabsTrigger>
                </TabsList>
                <TabsContent value="views" className="space-y-2">
                  <CategoryStat name="Inteligencia Artificial" value="34%" trend="up" />
                  <CategoryStat name="Automatización" value="28%" trend="up" />
                  <CategoryStat name="Agentes IA" value="19%" trend="down" />
                  <CategoryStat name="Marketing Digital" value="12%" trend="up" />
                  <CategoryStat name="Otros" value="7%" trend="neutral" />
                </TabsContent>
                <TabsContent value="time" className="space-y-2">
                  <CategoryStat name="Inteligencia Artificial" value="3:42" trend="up" />
                  <CategoryStat name="Automatización" value="2:54" trend="up" />
                  <CategoryStat name="Agentes IA" value="2:12" trend="neutral" />
                  <CategoryStat name="Marketing Digital" value="1:47" trend="down" />
                  <CategoryStat name="Otros" value="0:58" trend="down" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Posts Recientes</CardTitle>
            <CardDescription>Los últimos posts publicados en tu blog</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentPostsTable />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon?: React.ReactNode;
}

const StatCard = ({ title, value, description, icon }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
          <div className="bg-gray-100 p-2 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface CategoryStatProps {
  name: string;
  value: string;
  trend: "up" | "down" | "neutral";
}

const CategoryStat = ({ name, value, trend }: CategoryStatProps) => {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="font-medium">{name}</span>
      <div className="flex items-center gap-2">
        <span>{value}</span>
        {trend === "up" && (
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500">
            <path d="M7.5 1L14 7.5L7.5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {trend === "down" && (
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500">
            <path d="M7.5 14L1 7.5L7.5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {trend === "neutral" && (
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
            <path d="M1 7.5H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
