import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Calendar, FileText, Settings, Megaphone, TrendingUp, 
  Users, BookOpen, MapPin, Bell, LogOut, Leaf, Plus,
  BarChart3, LineChart, User, AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('today');
  const [activeEventTab, setActiveEventTab] = useState('attending');
  const [userName, setUserName] = useState('Sarah K.');

  useEffect(() => {
    // Get user data from localStorage or context
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      setUserName(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/');
  };

  // Mock data
  const stats = {
    eventsAttended: 25,
    wasteCollected: 150,
    upcomingEvents: 3
  };

  const upcomingEvents = [
    {
      id: 1,
      title: 'Karura Forest Clean-up',
      daysLeft: 2,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400'
    }
  ];

  const recentReports = [
    {
      id: 1,
      title: 'Safety Guidelines',
      code: '1 331 - 20',
      status: 'Reattributed',
      time: '10 M',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: 2,
      title: 'Recycling Centers Map',
      code: '1 331 - 30',
      status: 'Status',
      time: '00',
      avatar: 'https://i.pravatar.cc/150?img=2'
    }
  ];

  const resources = [
    {
      id: 1,
      title: 'Traffic jam on Waiyaki Way - litter reported',
      status: 'Resolved',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
      id: 2,
      title: 'Event Toolkit',
      subtitle: 'Event Toolkit',
      status: 'Status'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800/50 backdrop-blur-sm border-r border-slate-700/50 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">cleanup</h1>
              <p className="text-sm text-emerald-400">Nairobi</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-white bg-emerald-600 rounded-lg transition-all">
            <Leaf className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 rounded-lg transition-all">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Events</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 rounded-lg transition-all">
            <FileText className="w-5 h-5" />
            <span className="font-medium">Reports</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 rounded-lg transition-all">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Reports</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-emerald-400 bg-emerald-500/10 rounded-lg transition-all">
            <Megaphone className="w-5 h-5" />
            <span className="font-medium">Smpact</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 rounded-lg transition-all">
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">Impact</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 rounded-lg transition-all">
            <Users className="w-5 h-5" />
            <span className="font-medium">Community</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 rounded-lg transition-all">
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">Resources</span>
          </button>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700/50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 space-y-6">
          {/* Top Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Welcome back, {userName}!</h2>
              
              {/* Circular Stats */}
              <div className="flex justify-between items-center">
                <div className="relative">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="#1e293b" strokeWidth="8" fill="none" />
                    <circle cx="48" cy="48" r="40" stroke="#10b981" strokeWidth="8" fill="none"
                      strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white">{stats.eventsAttended}</span>
                    <span className="text-xs text-slate-400">Events Attended</span>
                  </div>
                </div>

                <div className="relative">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="#1e293b" strokeWidth="8" fill="none" />
                    <circle cx="48" cy="48" r="40" stroke="#10b981" strokeWidth="8" fill="none"
                      strokeDasharray="251.2" strokeDashoffset="50" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white">{stats.wasteCollected}kg</span>
                    <span className="text-xs text-slate-400">Waste Collected</span>
                  </div>
                </div>

                <div className="relative">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="#1e293b" strokeWidth="8" fill="none" />
                    <circle cx="48" cy="48" r="40" stroke="#10b981" strokeWidth="8" fill="none"
                      strokeDasharray="251.2" strokeDashoffset="188.4" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-white">Join Ntro</span>
                    <span className="text-xs text-slate-400">Colmads Event</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105">
                  Report Dotation
                </button>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105">
                  Join Upcoming
                </button>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105">
                  Create Event
                </button>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105">
                  Invite Friends
                </button>
              </div>
            </div>
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Events with Map */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Upcoming Clean-up Events</h3>
              
              {/* Tabs */}
              <div className="flex space-x-2 mb-4">
                <button 
                  onClick={() => setActiveTab('today')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'today' ? 'bg-emerald-500 text-white' : 'bg-slate-700/50 text-slate-300'
                  }`}
                >
                  Today
                </button>
                <button 
                  onClick={() => setActiveTab('week')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'week' ? 'bg-emerald-500 text-white' : 'bg-slate-700/50 text-slate-300'
                  }`}
                >
                  This Week
                </button>
              </div>

              {/* Map */}
              <div className="relative h-64 bg-emerald-900/20 rounded-xl overflow-hidden mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-emerald-400" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-sm text-white font-medium">Nairobi Natural Area</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Events Attending */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Events Clear up Attending</h3>
              </div>

              {/* Event Tabs */}
              <div className="flex space-x-2 mb-4">
                <button className="px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg text-sm">So Ater</button>
                <button className="px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg text-sm">My Area</button>
              </div>

              <div className="space-y-4">
                <div className="flex space-x-2 mb-4">
                  <button 
                    onClick={() => setActiveEventTab('attending')}
                    className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${
                      activeEventTab === 'attending' ? 'bg-emerald-500 text-white' : 'bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    Events I'm Hosting
                  </button>
                  <button 
                    onClick={() => setActiveEventTab('recommended')}
                    className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${
                      activeEventTab === 'recommended' ? 'bg-emerald-500 text-white' : 'bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    Recommended Events
                  </button>
                </div>

                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-center space-x-4 bg-slate-700/30 p-4 rounded-xl">
                    <img src={event.image} alt={event.title} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{event.title}</h4>
                      <p className="text-slate-400 text-sm">{event.daysLeft} days left</p>
                    </div>
                    <span className="text-emerald-400 text-sm font-medium">{event.daysLeft} days left ▸</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Events Management */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Events Managment</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-48 bg-slate-700/30 rounded-xl p-4">
                  <LineChart className="w-full h-full text-emerald-400 opacity-50" />
                </div>
                <div className="h-48 bg-slate-700/30 rounded-xl p-4 relative">
                  <MapPin className="w-full h-full text-emerald-400 opacity-30" />
                  <div className="absolute bottom-4 left-4 text-white text-sm">2 IN (month)</div>
                </div>
              </div>
            </div>

            {/* Recent Reports Feed */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recent Reports Feed</h3>
              <div className="space-y-4">
                {recentReports.map(report => (
                  <div key={report.id} className="flex items-center justify-between bg-slate-700/30 p-4 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <img src={report.avatar} alt="User" className="w-10 h-10 rounded-full" />
                      <div>
                        <h4 className="text-white font-medium text-sm">{report.title}</h4>
                        <p className="text-slate-400 text-xs">{report.code}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-400 text-xs font-medium">{report.status}</span>
                      <p className="text-slate-400 text-xs">{report.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Final Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Community Impact Metrics */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Community Impact Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-48 bg-slate-700/30 rounded-xl p-4">
                  <LineChart className="w-full h-full text-emerald-400 opacity-50" />
                  <p className="text-slate-400 text-xs mt-2">Waste Collected (KG)</p>
                </div>
                <div className="h-48 bg-slate-700/30 rounded-xl p-4">
                  <BarChart3 className="w-full h-full text-emerald-400 opacity-50" />
                  <p className="text-slate-400 text-xs mt-2">Top Cleaning Areas</p>
                </div>
              </div>
            </div>

            {/* Resource Center */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Resource Center</h3>
              <div className="space-y-4">
                {resources.map(resource => (
                  <div key={resource.id} className="flex items-center justify-between bg-slate-700/30 p-4 rounded-xl">
                    <div className="flex items-center space-x-3">
                      {resource.avatar ? (
                        <img src={resource.avatar} alt="User" className="w-10 h-10 rounded-full" />
                      ) : (
                        <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-emerald-400" />
                        </div>
                      )}
                      <div>
                        <h4 className="text-white font-medium text-sm">{resource.title}</h4>
                        {resource.subtitle && <p className="text-slate-400 text-xs">{resource.subtitle}</p>}
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      resource.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-600 text-slate-300'
                    }`}>
                      {resource.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
