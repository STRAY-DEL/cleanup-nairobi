import React from 'react';
import { Truck, Fuel, Wrench, CheckCircle, AlertTriangle } from 'lucide-react';

const VehicleStatus = ({ vehicleInfo }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'operational': return 'text-green-600 bg-green-100';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'operational': return <CheckCircle className="w-4 h-4" />;
      case 'maintenance': return <Wrench className="w-4 h-4" />;
      case 'offline': return <AlertTriangle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Truck className="w-5 h-5 mr-2 text-emerald-600" />
          Vehicle Status
        </h3>
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(vehicleInfo.status)}`}>
          {getStatusIcon(vehicleInfo.status)}
          <span>{vehicleInfo.status}</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Vehicle Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Vehicle Model</p>
            <p className="font-medium text-gray-900">{vehicleInfo.model}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">License Plate</p>
            <p className="font-medium text-gray-900">{vehicleInfo.plate}</p>
          </div>
        </div>

        {/* Capacity & Fuel */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Load Capacity</span>
              <span className="text-sm font-medium text-gray-900">{vehicleInfo.capacity}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-emerald-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: vehicleInfo.capacity }}
              ></div>
            </div>
          </div>

          {vehicleInfo.fuelLevel && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 flex items-center">
                  <Fuel className="w-4 h-4 mr-1" />
                  Fuel Level
                </span>
                <span className="text-sm font-medium text-gray-900">{vehicleInfo.fuelLevel}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: vehicleInfo.fuelLevel }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Maintenance Info */}
        {vehicleInfo.lastMaintenance && (
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 flex items-center">
                <Wrench className="w-4 h-4 mr-1" />
                Last Maintenance
              </span>
              <span className="text-sm font-medium text-gray-900">{vehicleInfo.lastMaintenance}</span>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="pt-4 border-t border-gray-200">
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
            Request Maintenance
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleStatus;
