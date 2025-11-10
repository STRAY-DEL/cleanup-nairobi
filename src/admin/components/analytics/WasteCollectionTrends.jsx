import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', 'Zone A': 4000, 'Zone B': 2400, 'Zone C': 2400 },
  { name: 'Feb', 'Zone A': 3000, 'Zone B': 1398, 'Zone C': 2210 },
  { name: 'Mar', 'Zone A': 2000, 'Zone B': 9800, 'Zone C': 2290 },
  { name: 'Apr', 'Zone A': 2780, 'Zone B': 3908, 'Zone C': 2000 },
  { name: 'May', 'Zone A': 1890, 'Zone B': 4800, 'Zone C': 2181 },
  { name: 'Jun', 'Zone A': 2390, 'Zone B': 3800, 'Zone C': 2500 },
  { name: 'Jul', 'Zone A': 3490, 'Zone B': 4300, 'Zone C': 2100 },
];

const WasteCollectionTrends = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Waste Collection Trends</h3>
      <div className="h-64">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Zone A" stroke="#8884d8" />
            <Line type="monotone" dataKey="Zone B" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Zone C" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WasteCollectionTrends;