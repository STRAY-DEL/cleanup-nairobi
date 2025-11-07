
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaBell } from 'react-icons/fa';
import UserMenu from './UserMenu';

const Topbar = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Good Morning, {user?.username || 'Guest'}!</h1>
        <p className="text-gray-500">Let's make a difference today.</p>
      </div>
      <div className="flex items-center">
        <FaBell className="text-gray-500 text-2xl mr-4" />
        <UserMenu />
      </div>
    </header>
  );
};

export default Topbar;
