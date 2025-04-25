
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Helmet } from 'react-helmet-async';

// Sample data (replace with actual analytics data)
const pageViewsData = [
  { date: '01/04', views: 1200, sessions: 850, users: 720 },
  { date: '02/04', views: 1300, sessions: 940, users: 805 },
  { date: '03/04', views: 1150, sessions: 820, users: 700 },
  { date: '04/04', views: 1450, sessions: 1020, users: 880 },
  { date: '05/04', views: 1350, sessions: 970, users: 830 },
  { date: '06/04', views: 950, sessions: 680, users: 590 },
  { date: '07/04', views: 900, sessions: 640, users: 550 },
  { date: '08/04', views: 1500, sessions: 1080, users: 920 },
  { date: '09/04', views: 1600, sessions: 1140, users: 980 },
  { date: '10/04', views: 1400, sessions: 990, users: 860 },
  { date: '11/04', views: 1350, sessions: 950, users: 820 },
  { date: '12/04', views: 1300, sessions: 920, users: 790 },
  { date: '13/04', views: 980, sessions: 690, users: 600 },
  { date: '14/04', views: 950, sessions: 670, users: 580 },
];

const topPagesData = [
  { name: 'Página de inicio', views: 3840, percentage: 28 },
  { name: 'Cómo la IA está transformando el servicio al cliente', views: 2150, percentage: 15 },
  { name: 'Automatización de procesos', views: 1920, percentage: 14 },
  { name: 'Agentes IA: El futuro', views: 1650, percentage: 12 },
  { name: 'Servicios', views: 1480, percentage: 11 },
  { name: 'Contacto', views: 950, percentage: 7 },
  { name: 'Precios', views: 870, percentage: 6 },
  { name: 'Blog', views: 740, percentage: 5 },
  { name: 'Otros', views: 280, percentage: 2 },
];

const trafficSourcesData = [
  { name: 'Búsqueda Orgánica', value: 42 },
  { name: 'Directo', value: 28 },
  { name: 'Redes Sociales', value: 16 },
  { name: 'Referencias', value: 10 },
  { name: 'Email', value: 4 },
];

const deviceData = [
  { name: 'Móvil', value: 58 },
  { name: 'Desktop', value: 34 },
  { name: 'Tablet', value: 8 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('2w');

  return (
    <>
      <Helmet>
        <title>Analítica | Novativa</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold">Analítica</h1>
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Rango de tiempo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Últimas 24 horas</SelectItem>
              <SelectItem value="1w">Última semana</SelectItem>
              <SelectItem value="2w">Últimas 2 semanas</SelectItem>
              <SelectItem value="1m">Último mes</SelectItem>
              <SelectItem value="3m">Últimos 3 meses</SelectItem>
              <SelectItem value="6m">Últimos 6 meses</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">14,827</CardTitle>
              <CardDescription>Total de vistas de página</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-600 flex items-center">
                +8.2% <span className="ml-1">vs. período anterior</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">5,628</CardTitle>
              <CardDescription>Usuarios únicos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-600 flex items-center">
                +12.5% <span className="ml-1">vs. período anterior</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">00:02:45</CardTitle>
              <CardDescription>Tiempo promedio en el sitio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-red-500 flex items-center">
                -1.3% <span className="ml-1">vs. período anterior</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pageviews" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pageviews">Vistas de página</TabsTrigger>
            <TabsTrigger value="toppages">Páginas principales</TabsTrigger>
            <TabsTrigger value="sources">Fuentes de tráfico</TabsTrigger>
            <TabsTrigger value="devices">Dispositivos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pageviews">
            <Card>
              <CardHeader>
                <CardTitle>Vistas de página, Sesiones y Usuarios</CardTitle>
                <CardDescription>Últimas 2 semanas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={pageViewsData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="views" name="Vistas" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="sessions" name="Sesiones" stroke="#6366F1" strokeWidth={2} />
                      <Line type="monotone" dataKey="users" name="Usuarios" stroke="#F59E0B" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="toppages">
            <Card>
              <CardHeader>
                <CardTitle>Páginas más visitadas</CardTitle>
                <CardDescription>Por número de vistas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={topPagesData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={80} />
                      <Tooltip formatter={(value) => [`${value} vistas`, 'Total']} />
                      <Legend />
                      <Bar dataKey="views" name="Vistas de página" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sources">
            <Card>
              <CardHeader>
                <CardTitle>Fuentes de tráfico</CardTitle>
                <CardDescription>Distribución del origen de usuarios</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="h-[300px] w-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trafficSourcesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {trafficSourcesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {trafficSourcesData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        className="w-4 h-4 rounded-full"
                      />
                      <div className="flex gap-2">
                        <span className="font-medium">{entry.name}:</span>
                        <span className="text-gray-600">{entry.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle>Uso de dispositivos</CardTitle>
                <CardDescription>Distribución por tipo de dispositivo</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="h-[300px] w-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {deviceData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        className="w-4 h-4 rounded-full"
                      />
                      <div className="flex gap-2">
                        <span className="font-medium">{entry.name}:</span>
                        <span className="text-gray-600">{entry.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminAnalytics;
