import React from 'react';
import { Bell, AlertTriangle, Info, CheckCircle, Clock, X } from 'lucide-react';

const Notifications = () => {
  // Mock data for notifications with different types and priorities
  const notifications = [
    { 
      id: 1, 
      type: 'urgent',
      title: 'Emergency Cleanup Required',
      text: 'Immediate response needed at Uhuru Park - large waste spill reported.', 
      time: '5m ago',
      unread: true
    },
    { 
      id: 2, 
      type: 'warning',
      title: 'Route Update',
      text: 'Heavy traffic on Waiyaki Way. Alternative route suggested via Riverside Drive.', 
      time: '15m ago',
      unread: true
    },
    { 
      id: 3, 
      type: 'info',
      title: 'Maintenance Reminder',
      text: 'Vehicle maintenance scheduled for tomorrow at 8:00 AM. Please arrive 15 minutes early.', 
      time: '1h ago',
      unread: false
    },
    { 
      id: 4, 
      type: 'success',
      title: 'Task Completed',
      text: 'Westlands collection successfully completed. Great work!', 
      time: '2h ago',
      unread: false
    },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'warning': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      default: return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getNotificationBg = (type, unread) => {
    const baseClasses = unread ? 'border-l-4' : 'border-l-2';
    switch (type) {
      case 'urgent': return `${baseClasses} border-red-500 bg-red-50`;
      case 'warning': return `${baseClasses} border-yellow-500 bg-yellow-50`;
      case 'success': return `${baseClasses} border-green-500 bg-green-50`;
      default: return `${baseClasses} border-blue-500 bg-blue-50`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-emerald-600" />
            Notifications
          </h3>
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
            {notifications.filter(n => n.unread).length} New
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-3 rounded-lg transition-all duration-200 hover:shadow-sm ${getNotificationBg(notification.type, notification.unread)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {notification.title}
                      </h4>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {notification.text}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {notification.time}
                    </p>
                  </div>
                </div>
                <button className="flex-shrink-0 ml-2 p-1 text-gray-400 hover:text-gray-600 rounded">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium">
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
