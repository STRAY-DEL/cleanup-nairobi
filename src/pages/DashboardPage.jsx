
import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import WasteBreakdownChart from '../components/dashboard/WasteBreakdownChart';
import MonthlyTrendChart from '../components/dashboard/MonthlyTrendChart';
import QuickActionButton from '../components/dashboard/QuickActionButton';
import NewsFeed from '../components/dashboard/NewsFeed';
import { FaLeaf, FaRecycle, FaTrophy, FaPlus, FaMapMarkerAlt, FaExclamationTriangle } from 'react-icons/fa';

const Dashboard = () => {
  const userData = {
    wasteCollected: 120, // in kg
    recyclingActions: 25,
    communityRank: 3,
    communityGoal: 2000, // in kg
    communityCollected: 1500, // in kg
  };

  const progress = (userData.communityCollected / userData.communityGoal) * 100;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <StatCard icon={<FaLeaf className="text-green-500" />} title="Total Waste Collected" value={`${userData.wasteCollected} kg`} change="+5% from last month" />
        <StatCard icon={<FaRecycle className="text-blue-500" />} title="Recycling Actions" value={userData.recyclingActions} change="+10% from last month" />
        <StatCard icon={<FaTrophy className="text-yellow-500" />} title="Community Rank" value={`#${userData.communityRank}`} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Community Goal Progress</h2>
        <div className="relative pt-1">
          <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-green-200">
            <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500"></div>
          </div>
          <p className="text-sm text-gray-500">{userData.communityCollected}kg of {userData.communityGoal}kg collected</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <WasteBreakdownChart />
        <MonthlyTrendChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <QuickActionButton icon={<FaPlus className="text-3xl text-green-500" />} label="New Collection" />
        <QuickActionButton icon={<FaMapMarkerAlt className="text-3xl text-blue-500" />} label="Find Centers" />
        <QuickActionButton icon={<FaExclamationTriangle className="text-3xl text-yellow-500" />} label="Report Issue" />
      </div>

      <NewsFeed />
    </>
  );
};

export default Dashboard;