
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: '1', visits: 400, uniqueVisitors: 240 },
  { name: '5', visits: 300, uniqueVisitors: 139 },
  { name: '10', visits: 500, uniqueVisitors: 280 },
  { name: '15', visits: 550, uniqueVisitors: 304 },
  { name: '20', visits: 400, uniqueVisitors: 218 },
  { name: '25', visits: 600, uniqueVisitors: 362 },
  { name: '30', visits: 700, uniqueVisitors: 439 },
];

const VisitorsChart = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="visits" 
            name="Total visitas"
            stroke="#10B981" 
            activeDot={{ r: 8 }} 
            strokeWidth={2} 
          />
          <Line 
            type="monotone" 
            dataKey="uniqueVisitors" 
            name="Visitantes únicos"
            stroke="#6366F1" 
            strokeWidth={2} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitorsChart;
