import React, { useState, useEffect } from 'react';
import { 
  Navigation, MapPin, Clock, CheckCircle, AlertTriangle, 
  TrendingUp, Route, Package, Users, Star, Fuel
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import DriverMap from '../dashboard-components/DriverMap';
import VehicleStatus from '../dashboard-components/VehicleStatus';
import Notifications from '../dashboard-components/Notifications';

const DashboardPage = () => {
  const { user } = useAuth();
  const [isOnDuty, setIsOnDuty] = useState(false);

  // Mock data - in real app, this would come from API
  const todayStats = {
    assignedTasks: 8,
    completedTasks: 5,
    pendingTasks: 3,
    totalDistance: '47.2 km',
    workingHours: '6h 15m',
    efficiency: 92,
  };

  const currentAssignments = [
    {
      id: 1,
      type: 'waste_collection',
      location: 'Westlands Shopping Mall',
      address: 'Waiyaki Way, Westlands',
      priority: 'high',
      estimatedTime: '15 min',
      status: 'in_progress',
      reportedBy: 'Mall Management',
      description: 'Large waste accumulation near food court',
      coordinates: { lat: -1.2634, lng: 36.8047 }
    },
    {
      id: 2,
      type: 'scheduled_pickup',
      location: 'Kilimani Residential Area',
      address: 'Kindaruma Road, Kilimani',
      priority: 'medium',
      estimatedTime: '25 min',
      status: 'pending',
      scheduledTime: '2:30 PM',
      description: 'Weekly residential waste collection',
      coordinates: { lat: -1.2921, lng: 36.7872 }
    },
    {
      id: 3,
      type: 'emergency_cleanup',
      location: 'Uhuru Park',
      address: 'Uhuru Highway, CBD',
      priority: 'urgent',
      estimatedTime: '30 min',
      status: 'assigned',
      reportedBy: 'City Council',
      description: 'Post-event cleanup required',
      coordinates: { lat: -1.2921, lng: 36.8219 }
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in_progress': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'assigned': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl shadow-lg text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {user?.full_name?.split(' ')[0] || 'Driver'}! 👋
            </h1>
            <p className="text-emerald-100">
              Ready to make Nairobi cleaner today? You have {currentAssignments.length} tasks waiting.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{todayStats.efficiency}%</div>
              <div className="text-sm text-emerald-100">Efficiency</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{todayStats.completedTasks}/{todayStats.assignedTasks}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-emerald-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(todayStats.completedTasks / todayStats.assignedTasks) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Distance Covered</p>
              <p className="text-2xl font-bold text-gray-900">{todayStats.totalDistance}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Route className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Working Hours</p>
              <p className="text-2xl font-bold text-gray-900">{todayStats.workingHours}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Efficiency</p>
              <p className="text-2xl font-bold text-gray-900">{todayStats.efficiency}%</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Current Assignments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Assignments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Current Assignments</h2>
                <span className="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
                  {currentAssignments.length} Active
                </span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {currentAssignments.map((assignment) => (
                <div key={assignment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(assignment.status)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-gray-900">{assignment.location}</h3>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getPriorityColor(assignment.priority)}`}>
                            {assignment.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{assignment.address}</p>
                        <p className="text-sm text-gray-500">{assignment.description}</p>
                        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {assignment.estimatedTime}
                          </span>
                          {assignment.reportedBy && (
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {assignment.reportedBy}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Navigation className="w-4 h-4" />
                      </button>
                      <button className="px-3 py-1 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                        Start
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Component */}
          <DriverMap />
        </div>

        {/* Right Column: Vehicle Status, Performance, etc. */}
        <div className="space-y-6">
          {/* Vehicle Status */}
          <VehicleStatus vehicleInfo={{
            model: 'Mercedes-Benz Actros',
            plate: 'KDE 359Z',
            status: 'Operational',
            capacity: '65%',
            fuelLevel: '78%',
            lastMaintenance: '2 days ago'
          }} />

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Driver Rating</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">4.8</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Deliveries</span>
                <span className="font-medium">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="font-medium text-emerald-600">+12%</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors">
                <Navigation className="w-5 h-5" />
                <span>Start Navigation</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                <AlertTriangle className="w-5 h-5" />
                <span>Report Issue</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors">
                <Package className="w-5 h-5" />
                <span>Mark Complete</span>
              </button>
            </div>
          </div>

          {/* Notifications */}
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;