import React from 'react';
import { Filter, FileDown } from 'lucide-react';

import KeyMetrics from '../components/analytics/KeyMetrics';
import WasteCollectionTrends from '../components/analytics/WasteCollectionTrends';
import CollectionsByZone from '../components/analytics/CollectionsByZone';
import VehicleUtilization from '../components/analytics/VehicleUtilization';
import ReportsByCategory from '../components/analytics/ReportsByCategory';
import ReportStatusDistribution from '../components/analytics/ReportStatusDistribution';
import PeakActivityTimes from '../components/analytics/PeakActivityTimes';
import ZoneComparison from '../components/analytics/ZoneComparison';
import TrendAnalysis from '../components/analytics/TrendAnalysis';
import TopPerformingZones from '../components/analytics/TopPerformingZones';
import TopPerformingOperators from '../components/analytics/TopPerformingOperators';
import ChoroplethMap from '../components/analytics/ChoroplethMap';
import ReportBuilder from '../components/analytics/ReportBuilder';
import Insights from '../components/analytics/Insights';

const AnalyticsPage = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Analytics & Reports</h1>
        <div className="flex items-center space-x-2">
          <select className="p-2 border border-gray-300 rounded-md">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Custom</option>
          </select>
          <select className="p-2 border border-gray-300 rounded-md">
            <option>All Zones</option>
          </select>
          <button className="p-2 border border-gray-300 rounded-md flex items-center">
            <Filter size={16} className="mr-2" />
            Compare
          </button>
          <button className="p-2 bg-blue-500 text-white rounded-md flex items-center">
            <FileDown size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KeyMetrics title="Total Waste Collected" value="1,234 kg" trend="+5.4%" breakdown="Zone A, Zone B, Zone C" />
        <KeyMetrics title="Collection Efficiency" value="92.1%" trend="-1.2%" breakdown="On-time: 85%" />
        <KeyMetrics title="Report Resolution Rate" value="85.7%" trend="+2.1%" breakdown="Pending: 15" />
        <KeyMetrics title="User Engagement" value="1,234" trend="+10.2%" breakdown="New: 50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <WasteCollectionTrends />
        <CollectionsByZone />
        <VehicleUtilization />
        <ReportsByCategory />
        <ReportStatusDistribution />
        <PeakActivityTimes />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <ZoneComparison />
        <TrendAnalysis />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <TopPerformingZones />
        <TopPerformingOperators />
      </div>

      <div className="mt-6">
        <ChoroplethMap />
      </div>

      <div className="mt-6">
        <ReportBuilder />
      </div>

      <div className="mt-6">
        <Insights />
      </div>
    </div>
  );
};

export default AnalyticsPage;
