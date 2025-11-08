
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaBox, FaChartBar, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="text-2xl font-bold mb-10">CleanUp Nairobi</div>
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "flex items-center p-2 text-base font-normal text-white bg-green-500 rounded-lg" : "flex items-center p-2 text-base font-normal text-gray-300 rounded-lg hover:bg-gray-700"}>
              <FaTachometerAlt className="mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? "flex items-center p-2 text-base font-normal text-white bg-green-500 rounded-lg" : "flex items-center p-2 text-base font-normal text-gray-300 rounded-lg hover:bg-gray-700"}>
              <FaUser className="mr-3" />
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/collections" className={({ isActive }) => isActive ? "flex items-center p-2 text-base font-normal text-white bg-green-500 rounded-lg" : "flex items-center p-2 text-base font-normal text-gray-300 rounded-lg hover:bg-gray-700"}>
              <FaBox className="mr-3" />
              Collections
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/reports" className={({ isActive }) => isActive ? "flex items-center p-2 text-base font-normal text-white bg-green-500 rounded-lg" : "flex items-center p-2 text-base font-normal text-gray-300 rounded-lg hover:bg-gray-700"}>
              <FaChartBar className="mr-3" />
              Reports
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/settings" className={({ isActive }) => isActive ? "flex items-center p-2 text-base font-normal text-white bg-green-500 rounded-lg" : "flex items-center p-2 text-base font-normal text-gray-300 rounded-lg hover:bg-gray-700"}>
              <FaCog className="mr-3" />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
