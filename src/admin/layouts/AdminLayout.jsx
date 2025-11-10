
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { Home, BarChart3, Calendar, Users, Truck, MapPin, PieChart, Bell, Settings, FileText, ChevronLeft, ChevronRight, Search, Sun, Moon, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (!user) {
    // This case should now be handled by ProtectedContent in App.jsx
    return null;
  }

  if (user.role !== 'Admin') {
    return <Navigate to="/dashboard" />;
  }

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

  const SidebarContent = ({ isCollapsed }) => (
    <>
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <h1 className="text-2xl font-bold text-emerald-900">CleanUp Nairobi</h1>}
        <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 rounded-full hover:bg-gray-200 hidden md:block">
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-200 md:hidden">
          <X size={20} />
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
            {!isCollapsed && <span className="mx-4 font-medium">{item.text}</span>}
          </Link>
        ))}
      </nav>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className={`bg-white shadow-md transition-all duration-300 hidden md:flex flex-col ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <SidebarContent isCollapsed={isSidebarCollapsed} />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 w-64 transform transition-transform md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent isCollapsed={false} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="flex justify-between items-center p-4 bg-white border-b">
          <div className="flex items-center">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-full hover:bg-gray-100 md:hidden mr-2">
              <Menu size={24} />
            </button>
            <div className="relative hidden md:block">
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
