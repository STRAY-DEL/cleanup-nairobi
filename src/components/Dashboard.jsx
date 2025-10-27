import React from 'react';
import { Home, Trash2, User, Bell, PlusCircle, ChevronDown, Search } from 'lucide-react';

// Mock Data
const user = {
  name: 'John Doe',
  avatar: 'https://placehold.co/100x100/4ade80/ffffff?text=JD',
};

const stats = [
  { label: 'Active Reports', value: '3' },
  { label: 'Next Pickup', value: 'Oct 30, 2025' },
  { label: 'Total Reports', value: '12' },
];

const recentReports = [
  { id: 'CN-001', type: 'General Waste', status: 'Collected', date: 'Oct 25, 2025' },
  { id: 'CN-002', type: 'Recycling', status: 'Pending', date: 'Oct 26, 2025' },
  { id: 'CN-003', type: 'Hazardous', status: 'Missed', date: 'Oct 27, 2025' },
];

const StatusBadge = ({ status }) => {
  const baseClasses = 'px-2 py-1 text-xs font-semibold rounded-full';
  const statusClasses = {
    Collected: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Missed: 'bg-red-100 text-red-800',
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 text-center border-b">
          <h1 className="text-2xl font-bold text-green-600">CleanUp Nairobi</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center px-4 py-2 text-gray-700 bg-green-50 rounded-lg font-semibold">
            <Home size={20} className="mr-3" /> Dashboard
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Trash2 size={20} className="mr-3" /> My Reports
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <User size={20} className="mr-3" /> Profile Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome back, {user.name}!</h2>
            <p className="text-gray-500">Here's what's happening with your reports today.</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Bell size={24} />
            </button>
            <div className="flex items-center space-x-2">
              <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Reports */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Recent Reports</h3>
            <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
              <PlusCircle size={20} className="mr-2" /> Report New Case
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waste Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentReports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <StatusBadge status={report.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
