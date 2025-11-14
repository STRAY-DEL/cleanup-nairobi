import React, { useState } from 'react';
import NotificationList from '../components/NotificationList';
import NotificationDetail from '../components/NotificationDetail';
import NotificationSettingsModal from '../components/NotificationSettingsModal';
import BroadcastNotificationModal from '../components/BroadcastNotificationModal';
import { Settings, MessageSquare } from 'lucide-react';

const NotificationsPage = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);

  return (
    <div className="flex h-full relative">
      <div className="w-1/2 border-r border-gray-200">
        <NotificationList onSelectNotification={setSelectedNotification} />
      </div>
      <div className="w-1/2">
        <NotificationDetail notification={selectedNotification} />
      </div>
      <div className="absolute top-4 right-4 flex space-x-2">
        <button onClick={() => setIsBroadcastModalOpen(true)} className="p-2 hover:bg-gray-100 rounded-full">
          <MessageSquare size={20} />
        </button>
        <button onClick={() => setIsSettingsModalOpen(true)} className="p-2 hover:bg-gray-100 rounded-full">
          <Settings size={20} />
        </button>
      </div>
      {isSettingsModalOpen && (
        <NotificationSettingsModal onClose={() => setIsSettingsModalOpen(false)} />
      )}
      {isBroadcastModalOpen && (
        <BroadcastNotificationModal onClose={() => setIsBroadcastModalOpen(false)} />
      )}
    </div>
  );
};

export default NotificationsPage;
