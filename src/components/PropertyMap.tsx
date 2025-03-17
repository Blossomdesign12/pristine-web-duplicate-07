import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/lib/data';
import { formatPrice } from '@/lib/data';

interface PropertyMapProps {
  properties: Property[];
  selectedPropertyId?: string;
  onPropertySelect?: (propertyId: string) => void;
}

const PropertyMap = ({ properties, selectedPropertyId, onPropertySelect }: PropertyMapProps) => {
  return (
    <div className="w-full h-full rounded-lg" style={{ minHeight: '400px' }}>
      <MapContainer center={[19.0760, 72.8777]} zoom={10} className="w-full h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {properties.map(property => {
          const { lat, lng, city, state } = property.location || {};
          if (!lat || !lng) return null; // Ensure lat/lng are valid

          return (
            <Marker
              key={property.id}
              position={[lat, lng]}
              eventHandlers={{
                click: () => onPropertySelect && onPropertySelect(property.id),
              }}
            >
              <Popup>
                <div>
                  <h3 className="font-bold text-sm">{property.title}</h3>
                  <p className="text-xs">{formatPrice(property.price)}</p>
                  <p className="text-xs">{city}, {state}</p>
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
