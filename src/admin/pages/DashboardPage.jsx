
import React from 'react';
import StatCard from '../components/StatCard';
import { Trash2, AlertTriangle, Truck, Target } from 'lucide-react';
import MapView from '../components/MapView';
import RecentActivityFeed from '../components/RecentActivityFeed';
import QuickActions from '../components/QuickActions';
import CollectionTrendsChart from '../components/CollectionTrendsChart';
import ReportsByCategoryChart from '../components/ReportsByCategoryChart';

const DashboardPage = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Trash2 size={24} className="text-emerald-500" />}
          title="Total Waste Collected"
          value="2,450 kg today"
          change="+15% vs yesterday"
          changeType="increase"
        />
        <StatCard
          icon={<AlertTriangle size={24} className="text-amber-500" />}
          title="Pending Reports"
          value="43 pending"
          change="12 urgent, 31 normal"
        />
        <StatCard
          icon={<Truck size={24} className="text-blue-500" />}
          title="Active Vehicles"
          value="8 of 12 active"
          change="4 in maintenance"
        />
        <StatCard
          icon={<Target size={24} className="text-green-500" />}
          title="Collection Rate"
          value="94% completed this week"
          change="+3% vs last week"
          changeType="increase"
        />
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md h-96">
          <MapView />
        </div>
        <div className="lg:col-span-1">
          <RecentActivityFeed />
        </div>
      </div>
      <div className="mt-8">
        <QuickActions />
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CollectionTrendsChart />
        <ReportsByCategoryChart />
      </div>
    </>
  );
};

export default DashboardPage;
