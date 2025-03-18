
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/lib/data';
import { formatPrice } from '@/lib/data';
import L from 'leaflet';
import { useEffect } from 'react';

interface PropertyMapProps {
  properties: Property[];
  selectedPropertyId?: string;
  onPropertySelect?: (propertyId: string) => void;
}

// Fix icon paths for Leaflet markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const PropertyMap = ({ properties, selectedPropertyId, onPropertySelect }: PropertyMapProps) => {
  // Center on Mumbai coordinates by default
  const defaultCenter: [number, number] = [19.0760, 72.8777];
  
  return (
    <div className="w-full h-full rounded-lg" style={{ minHeight: '400px' }}>
      <MapContainer 
        center={defaultCenter}
        zoom={10}
        className="w-full h-full rounded-lg" 
        style={{ height: '100%', minHeight: '400px' }}
      >
        <TileLayer 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {properties.map(property => {
          const { lat, lng } = property.location || {};
          if (!lat || !lng) return null;

          return (
            <Marker
              key={property.id}
              position={[lat, lng]}
              eventHandlers={{
                click: () => onPropertySelect && onPropertySelect(property.id),
              }}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold text-sm">{property.title}</h3>
                  <p className="text-xs font-medium">{formatPrice(property.price)}</p>
                  <p className="text-xs">{property.location?.city}, {property.location?.state}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
