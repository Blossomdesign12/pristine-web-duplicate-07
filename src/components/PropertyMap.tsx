import { useEffect, useState } from 'react';
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
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  if (!mapLoaded) return <div>Loading map...</div>;

  return (
    <MapContainer
      center={[19.0760, 72.8777]}
      zoom={10}
      className="w-full h-full rounded-lg"
      style={{ minHeight: '400px' }}
    >
      <TileLayer 
       url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" 
         
      />

      {properties.map(property => (
        <Marker 
          key={property.id} 
          position={[property.location.lat || 0, property.location.lng || 0]}
          eventHandlers={{
            click: () => onPropertySelect && onPropertySelect(property.id),
          }}
        >
          <Popup>
            <div>
              <h3 className="font-bold text-sm">{property.title}</h3>
              <p className="text-xs">{formatPrice(property.price)}</p>
              <p className="text-xs">{property.location.city}, {property.location.state}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default PropertyMap;
