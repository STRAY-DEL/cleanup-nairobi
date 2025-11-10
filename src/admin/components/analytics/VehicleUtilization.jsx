import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'KCA 123A', utilization: 40 },
  { name: 'KCB 456B', utilization: 30 },
  { name: 'KCC 789C', utilization: 20 },
  { name: 'KCD 012D', utilization: 27 },
  { name: 'KCE 345E', utilization: 18 },
];

const VehicleUtilization = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Vehicle Utilization</h3>
      <div className="h-64">
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="utilization" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VehicleUtilization;