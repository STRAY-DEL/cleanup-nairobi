import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Zone A', waste: 4000 },
  { name: 'Zone B', waste: 3000 },
  { name: 'Zone C', waste: 2000 },
  { name: 'Zone D', waste: 2780 },
  { name: 'Zone E', waste: 1890 },
  { name: 'Zone F', waste: 2390 },
  { name: 'Zone G', waste: 3490 },
];

const CollectionsByZone = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Collections by Zone</h3>
      <div className="h-64">
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="waste" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CollectionsByZone;