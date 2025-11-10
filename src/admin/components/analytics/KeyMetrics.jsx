import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const KeyMetrics = ({ title, value, trend, breakdown }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <div className="flex justify-between items-center mt-2">
        <span className={`text-sm font-medium ${trend.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
          {trend}
        </span>
        <div className="w-1/2 h-10">
          <ResponsiveContainer>
            <LineChart data={data}>
              <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-2">{breakdown}</p>
    </div>
  );
};

export default KeyMetrics;