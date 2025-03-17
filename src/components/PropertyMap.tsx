
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Property } from '@/lib/data';

// Default mapbox token - in a real app, this would be in an environment variable
const MAPBOX_TOKEN = 'pk.eyJ1IjoianVneWFoLW1hcHMiLCJhIjoiY2xzcnEyaWM5MWM5aDJrcWtvNmxqcXg2aCJ9.jQI8aeCsYeR13MAExcBi2Q';

interface PropertyMapProps {
  properties: Property[];
  selectedPropertyId?: string;
  onPropertySelect?: (propertyId: string) => void;
  className?: string;
}

const PropertyMap = ({ 
  properties, 
  selectedPropertyId, 
  onPropertySelect,
  className = "h-full w-full"
}: PropertyMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const markers = useRef<{ [key: string]: mapboxgl.Marker }>({});

  useEffect(() => {
    // Initialize mapbox
    mapboxgl.accessToken = MAPBOX_TOKEN;

    if (!mapContainer.current || map.current) return;

    // Create new map instance
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11', // light style for black and white theme
      center: [-74.5, 40], // Default center
      zoom: 9
    });

    // Wait for map to load before adding markers
    map.current.on('load', () => {
      setMapReady(true);
    });

    // Cleanup function
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update markers when properties change
  useEffect(() => {
    if (!map.current || !mapReady) return;

    // Remove existing markers
    Object.values(markers.current).forEach(marker => marker.remove());
    markers.current = {};

    // Add bounds object to fit map to markers
    const bounds = new mapboxgl.LngLatBounds();
    
    // If no properties, don't continue
    if (properties.length === 0) return;

    // Add markers for all properties
    properties.forEach(property => {
      // For demo purposes: generate random coordinates near New York
      // In a real app, you would use the property's actual coordinates
      const longitude = property.location.longitude || (-74.5 + (Math.random() * 0.5));
      const latitude = property.location.latitude || (40 + (Math.random() * 0.5));
      
      const lngLat = [longitude, latitude] as [number, number];
      
      // Create HTML element for marker
      const el = document.createElement('div');
      el.className = 'property-marker';
      el.style.backgroundSize = "contain";
      el.style.width = "36px";
      el.style.height = "36px";
      el.style.backgroundImage = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"36\" height=\"36\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"black\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m3 21 9-9 9 9\"/><path d=\"m9 12 3-8l3 8\"/><path d=\"M14 8h5\"/><path d=\"M5 12h5\"/></svg>')";
      el.style.cursor = "pointer";
      
      if (property.id === selectedPropertyId) {
        el.style.backgroundImage = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"36\" height=\"36\" viewBox=\"0 0 24 24\" fill=\"black\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m3 21 9-9 9 9\"/><path d=\"m9 12 3-8l3 8\"/><path d=\"M14 8h5\"/><path d=\"M5 12h5\"/></svg>')";
      }
      
      // Create popup for marker
      const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
        .setHTML(`
          <div class="p-2">
            <div class="font-bold">${property.title}</div>
            <div class="text-sm">${property.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
          </div>
        `);

      // Create and add the marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat(lngLat)
        .setPopup(popup)
        .addTo(map.current!);
      
      // Add click handler
      el.addEventListener('click', () => {
        if (onPropertySelect) {
          onPropertySelect(property.id);
        }
      });
      
      // Save marker reference
      markers.current[property.id] = marker;
      
      // Extend bounds to include this marker
      bounds.extend(lngLat);
    });
    
    // Fit map to bounds with padding
    map.current.fitBounds(bounds, {
      padding: { top: 50, bottom: 50, left: 50, right: 50 },
      maxZoom: 15
    });
  }, [properties, mapReady, selectedPropertyId, onPropertySelect]);

  return (
    <div className={className}>
      {!MAPBOX_TOKEN && (
        <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
          <div className="text-center p-4">
            <p className="text-red-500 font-bold">Mapbox token required</p>
            <p className="text-sm text-gray-600 mt-2">
              Add your Mapbox token to display the map
            </p>
          </div>
        </div>
      )}
      <div 
        ref={mapContainer} 
        className="h-full w-full rounded-md overflow-hidden border border-gray-200"
      />
    </div>
  );
};

export default PropertyMap;
