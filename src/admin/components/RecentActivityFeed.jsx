
import React from 'react';

const RecentActivityFeed = () => {
  const activities = [
    { action: 'John Doe reported plastic waste', location: 'Westlands', time: '5 minutes ago' },
    { action: 'Collection completed in Kilimani', location: 'Kilimani', time: '15 minutes ago' },
    { action: 'New user registered: Jane Doe', location: 'Kasarani', time: '30 minutes ago' },
    { action: 'Vehicle assigned to route 7', location: 'CBD', time: '1 hour ago' },
    { action: 'Urgent report in Embakasi', location: 'Embakasi', time: '2 hours ago' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                {/* Add icon based on activity type */}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{activity.action}</p>
              <p className="text-sm text-gray-500">{activity.location} &middot; {activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityFeed;
