
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Tag } from 'lucide-react';
import RecentPostsTable from '@/components/admin/RecentPostsTable';
import { Helmet } from 'react-helmet-async';

const AdminDashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard Admin | Novativa</title>
      </Helmet>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard 
            title="Posts Publicados" 
            value="30" 
            description="Posts disponibles en el blog" 
            icon={<FileText className="h-5 w-5 text-novativa-orange" />} 
          />
          <StatCard 
            title="Categorías" 
            value="7" 
            description="Categorías principales" 
            icon={<Tag className="h-5 w-5 text-purple-500" />} 
          />
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

export default AdminDashboard;
