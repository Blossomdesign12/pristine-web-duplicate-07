import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Property } from '@/lib/data';
import { formatPrice } from '@/lib/data';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface PropertyMapProps {
  properties: Property[];
  selectedPropertyId?: string;
  onPropertySelect?: (propertyId: string) => void;
}

const PropertyMap = ({ 
  properties, 
  selectedPropertyId, 
  onPropertySelect 
}: PropertyMapProps) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;
    
    // Remove existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
  }, [properties]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [72.8777, 19.0760],
      zoom: 10,
      interactive: true,
    });

    const map = mapRef.current;

    map.on('load', () => {
      map.resize();
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    
    const map = mapRef.current;

    // Add markers for each property
    properties.forEach(property => {
      // Create a marker element
      const el = document.createElement('div');
      el.className = 'property-marker';
      el.innerHTML = `
        <div class="${selectedPropertyId === property.id ? 'bg-black text-white' : 'bg-white text-black'} 
          shadow-lg rounded-full w-8 h-8 flex items-center justify-center border-2 
          border-gray-200 cursor-pointer transition-all hover:scale-110"
        >
          ${formatPrice(property.price).split(' ')[0]}
        </div>
      `;
      
      // Add click event to the marker
      el.addEventListener('click', () => {
        if (onPropertySelect) {
          onPropertySelect(property.id);
        }
      });
      
      // Add the marker to the map at the property's location
      const marker = new mapboxgl.Marker(el)
        .setLngLat([
          property.location.lng || 0, 
          property.location.lat || 0
        ])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(
              `<div>
                <h3 class="font-bold text-sm">${property.title}</h3>
                <p class="text-xs">${formatPrice(property.price)}</p>
                <p class="text-xs">${property.location.city}, ${property.location.state}</p>
              </div>`
            )
        )
        .addTo(map.current!);
      
      markers.current.push(marker);
    });

    return () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
    };
  }, [properties, selectedPropertyId, onPropertySelect]);

  return (
    <div ref={mapContainerRef} className="map-container w-full h-full rounded-lg" style={{ minHeight: '400px' }} />
  );
};

export default PropertyMap;
