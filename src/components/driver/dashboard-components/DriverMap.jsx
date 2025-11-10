import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Mock data for collection points
const collectionPoints = [
  { id: 1, position: [-1.286389, 36.817223], name: 'Westlands CBD' },
  { id: 2, position: [-1.2833, 36.8167], name: 'Sarit Center' },
  { id: 3, position: [-1.2921, 36.8219], name: 'Lavington Mall' },
  { id: 4, position: [-1.300, 36.7833], name: 'Kilimani Primary' },
];

// Custom icon for markers
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const DriverMap = () => {
  const nairobiPosition = [-1.292066, 36.821945]; // Nairobi's coordinates

  return (
    <div className="h-96 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
      <MapContainer center={nairobiPosition} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {collectionPoints.map(point => (
          <Marker key={point.id} position={point.position} icon={customIcon}>
            <Popup>
              {point.name}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default DriverMap;
