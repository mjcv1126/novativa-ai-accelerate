
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Tag } from 'lucide-react';
import RecentPostsTable from '@/components/admin/RecentPostsTable';
import { Helmet } from 'react-helmet-async';
import { useAdminData } from '@/contexts/AdminDataContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { posts, categories } = useAdminData();
  const publishedPosts = posts.filter(post => post.status === 'Publicado');

  return (
    <>
      <Helmet>
        <title>Dashboard Admin</title>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link to="/">
            <img 
              src="/lovable-uploads/9cce1d6a-72e1-493f-bb16-901571c7e858.png" 
              alt="Logo" 
              className="h-10 w-auto"
            />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard 
            title="Posts Publicados" 
            value={publishedPosts.length.toString()} 
            description="Posts disponibles en el blog" 
            icon={<FileText className="h-5 w-5 text-novativa-orange" />} 
          />
          <StatCard 
            title="Categorías" 
            value={categories.length.toString()} 
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
