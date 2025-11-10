import React from 'react';
import { Bell } from 'lucide-react';

const Notifications = () => {
  // Mock data for notifications
  const notifications = [
    { id: 1, text: 'Route updated: New collection point added in Parklands.', time: '10m ago' },
    { id: 2, text: 'Heavy traffic reported on Waiyaki Way. Consider an alternative route.', time: '30m ago' },
    { id: 3, text: 'Vehicle maintenance scheduled for tomorrow at 8:00 AM.', time: '1h ago' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Bell size={22} className="mr-3 text-emerald-600" />
        Notifications
      </h2>
      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li key={notification.id} className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <Bell size={16} className="text-emerald-600" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">{notification.text}</p>
              <p className="text-xs text-gray-400">{notification.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
