import React from 'react';
import { Navigation, Bell, User, Award } from 'lucide-react';
import DriverMap from './dashboard-components/DriverMap';
import TaskList from './dashboard-components/TaskList';
import VehicleStatus from './dashboard-components/VehicleStatus';
import DriverStats from './dashboard-components/DriverStats';
import Notifications from './dashboard-components/Notifications';

const DriverDashboard = () => {
  // Mock data for demonstration
  const driver = {
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    ecoWarriorScore: 85,
  };

  const dailySummary = {
    collections: 12,
    pending: 3,
    distance: '25 km',
    time: '4h 30m',
  };

  const vehicleInfo = {
    model: 'Mercedes-Benz Actros',
    plate: 'KDE 359Z',
    status: 'Operational',
    capacity: '85%',
  };

  const upcomingStops = [
    { id: 1, location: 'Westlands CBD', time: '10:30 AM', status: 'Completed' },
    { id: 2, location: 'Sarit Center', time: '11:15 AM', status: 'Upcoming' },
    { id: 3, location: 'Lavington Mall', time: '12:00 PM', status: 'Upcoming' },
    { id: 4, location: 'Kilimani Primary', time: '01:30 PM', status: 'Upcoming' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src={driver.avatar} alt="Driver" className="w-12 h-12 rounded-full border-2 border-emerald-500" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Driver's Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back, {driver.name}!</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative text-gray-500 hover:text-gray-700">
              <Bell size={24} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-emerald-700 transition duration-300 flex items-center space-x-2 shadow-sm">
              <Navigation size={18} />
              <span>Start Route</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Map and Tasks */}
          <div className="lg:col-span-8 space-y-8">
            <DriverMap />
            <TaskList stops={upcomingStops} />
          </div>

          {/* Right Column: Profile, Stats, Vehicle, Notifications */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <img src={driver.avatar} alt="Driver" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-emerald-200" />
              <h2 className="text-2xl font-bold text-gray-800">{driver.name}</h2>
              <div className="mt-4 flex items-center justify-center text-emerald-600">
                <Award size={24} className="mr-2" />
                <span className="text-lg font-semibold">Eco-Warrior Score: {driver.ecoWarriorScore}</span>
              </div>
            </div>
            <DriverStats summary={dailySummary} />
            <VehicleStatus vehicleInfo={vehicleInfo} />
            <Notifications />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DriverDashboard;
