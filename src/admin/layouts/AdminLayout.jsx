
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, BarChart3, Calendar, Users, Truck, MapPin, PieChart, Bell, Settings, FileText, ChevronLeft, ChevronRight, Search, Sun, Moon } from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { to: '/admin/dashboard', icon: <Home size={20} />, text: 'Dashboard' },
    { to: '/admin/reports', icon: <BarChart3 size={20} />, text: 'Reports' },
    { to: '/admin/collections', icon: <Calendar size={20} />, text: 'Collections' },
    { to: '/admin/users', icon: <Users size={20} />, text: 'Users' },
    { to: '/admin/vehicles', icon: <Truck size={20} />, text: 'Vehicles' },
    { to: '/admin/zones', icon: <MapPin size={20} />, text: 'Zones' },
    { to: '/admin/analytics', icon: <PieChart size={20} />, text: 'Analytics' },
    { to: '/admin/notifications', icon: <Bell size={20} />, text: 'Notifications' },
    { to: '/admin/settings', icon: <Settings size={20} />, text: 'Settings' },
    { to: '/admin/audit-logs', icon: <FileText size={20} />, text: 'Audit Logs' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-white shadow-md transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="flex items-center justify-between p-4">
          {!isSidebarCollapsed && <h1 className="text-2xl font-bold text-emerald-900">Nairobi Waste</h1>}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 rounded-full hover:bg-gray-200">
            {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        <nav className="mt-10">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 ${
                location.pathname === item.to ? 'bg-emerald-100 text-gray-700' : ''
              }`}
            >
              {item.icon}
              {!isSidebarCollapsed && <span className="mx-4 font-medium">{item.text}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="flex justify-between items-center p-4 bg-white border-b">
          <div className="flex items-center">
            <div className="relative">
              <Search size={20} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search reports, users, vehicles..." className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md" />
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full hover:bg-gray-100">
                <Sun size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 ml-2">
              <Bell size={20} />
            </button>
            <div className="ml-4">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" className="w-8 h-8 rounded-full" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
