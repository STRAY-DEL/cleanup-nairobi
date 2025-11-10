import React from 'react';
import { Truck } from 'lucide-react';

const VehicleStatus = ({ vehicleInfo }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Truck size={22} className="mr-3 text-emerald-600" />
        Vehicle Status
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500">Model</p>
          <p className="font-semibold text-gray-900">{vehicleInfo.model}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Plate</p>
          <p className="font-semibold text-gray-900">{vehicleInfo.plate}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className="font-semibold text-green-600">{vehicleInfo.status}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Load</p>
          <p className="font-semibold text-gray-900">{vehicleInfo.capacity}</p>
        </div>
      </div>
    </div>
  );
};

export default VehicleStatus;
