import React, { useState } from 'react';
import { 
  CheckSquare, Clock, MapPin, Navigation, Phone, AlertTriangle,
  Filter, Search, Calendar, CheckCircle, XCircle, Play, Pause
} from 'lucide-react';

const TasksPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');

  // Mock tasks data
  const tasks = [
    {
      id: 1,
      type: 'waste_collection',
      title: 'Westlands Shopping Mall Collection',
      location: 'Westlands Shopping Mall',
      address: 'Waiyaki Way, Westlands',
      priority: 'high',
      status: 'in_progress',
      estimatedTime: '15 min',
      scheduledTime: '10:30 AM',
      reportedBy: 'Mall Management',
      description: 'Large waste accumulation near food court area. Requires immediate attention.',
      assignedAt: '2024-01-15T08:30:00Z',
      dueDate: '2024-01-15T11:00:00Z'
    },
    {
      id: 2,
      type: 'scheduled_pickup',
      title: 'Kilimani Residential Collection',
      location: 'Kilimani Residential Area',
      address: 'Kindaruma Road, Kilimani',
      priority: 'medium',
      status: 'pending',
      estimatedTime: '25 min',
      scheduledTime: '2:30 PM',
      description: 'Weekly residential waste collection route',
      assignedAt: '2024-01-15T07:00:00Z',
      dueDate: '2024-01-15T15:00:00Z'
    },
    {
      id: 3,
      type: 'emergency_cleanup',
      title: 'Uhuru Park Emergency Cleanup',
      location: 'Uhuru Park',
      address: 'Uhuru Highway, CBD',
      priority: 'urgent',
      status: 'assigned',
      estimatedTime: '45 min',
      scheduledTime: '4:00 PM',
      reportedBy: 'City Council',
      description: 'Post-event cleanup required after public gathering',
      assignedAt: '2024-01-15T09:15:00Z',
      dueDate: '2024-01-15T16:30:00Z'
    },
    {
      id: 4,
      type: 'waste_collection',
      title: 'Karen Shopping Center',
      location: 'Karen Shopping Center',
      address: 'Karen Road, Karen',
      priority: 'low',
      status: 'completed',
      estimatedTime: '20 min',
      scheduledTime: '8:00 AM',
      completedAt: '2024-01-15T08:45:00Z',
      description: 'Regular morning waste collection',
      assignedAt: '2024-01-15T06:00:00Z',
      dueDate: '2024-01-15T09:00:00Z'
    },
    {
      id: 5,
      type: 'maintenance',
      title: 'Vehicle Inspection',
      location: 'CleanUp Depot',
      address: 'Industrial Area, Nairobi',
      priority: 'medium',
      status: 'scheduled',
      estimatedTime: '60 min',
      scheduledTime: '5:30 PM',
      description: 'Weekly vehicle maintenance and inspection',
      assignedAt: '2024-01-15T06:00:00Z',
      dueDate: '2024-01-15T18:00:00Z'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'assigned': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'scheduled': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in_progress': return <Play className="w-5 h-5 text-blue-500" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'assigned': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'scheduled': return <Calendar className="w-5 h-5 text-purple-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'waste_collection': return '🗑️';
      case 'scheduled_pickup': return '📅';
      case 'emergency_cleanup': return '🚨';
      case 'maintenance': return '🔧';
      default: return '📋';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesTab = activeTab === 'all' || task.status === activeTab;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    
    return matchesTab && matchesSearch && matchesPriority;
  });

  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    assigned: tasks.filter(t => t.status === 'assigned').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <CheckSquare className="w-7 h-7 mr-3 text-emerald-600" />
              My Tasks
            </h1>
            <p className="text-gray-600 mt-1">Manage your daily assignments and track progress</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{filteredTasks.length} tasks</span>
              <span>•</span>
              <span>{taskCounts.pending + taskCounts.in_progress + taskCounts.assigned} active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Priority Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'all', label: 'All Tasks', count: taskCounts.all },
              { key: 'pending', label: 'Pending', count: taskCounts.pending },
              { key: 'in_progress', label: 'In Progress', count: taskCounts.in_progress },
              { key: 'assigned', label: 'Assigned', count: taskCounts.assigned },
              { key: 'completed', label: 'Completed', count: taskCounts.completed }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                  activeTab === tab.key
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                {/* Task Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-xl">
                    {getTypeIcon(task.type)}
                  </div>
                </div>

                {/* Task Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{task.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                      {getStatusIcon(task.status)}
                      <span className="ml-1 capitalize">{task.status.replace('_', ' ')}</span>
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {task.location}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {task.estimatedTime}
                    </span>
                    {task.scheduledTime && (
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {task.scheduledTime}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-3">{task.description}</p>

                  <div className="text-sm text-gray-500">
                    <span>{task.address}</span>
                    {task.reportedBy && (
                      <>
                        <span className="mx-2">•</span>
                        <span>Reported by {task.reportedBy}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                {task.status === 'pending' || task.status === 'assigned' ? (
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>Start</span>
                  </button>
                ) : task.status === 'in_progress' ? (
                  <>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                      <Pause className="w-4 h-4" />
                      <span>Pause</span>
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Complete</span>
                    </button>
                  </>
                ) : null}
                
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Navigation className="w-5 h-5" />
                </button>
                
                {task.reportedBy && (
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-500">
            {searchTerm || filterPriority !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'All caught up! No tasks available at the moment.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default TasksPage;