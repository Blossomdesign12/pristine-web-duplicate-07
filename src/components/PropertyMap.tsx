import { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';
import { fromLonLat } from 'ol/proj';
import { Property } from '@/lib/data';
import { formatPrice } from '@/lib/data';

interface PropertyMapProps {
  properties: Property[];
  selectedPropertyId?: string;
  onPropertySelect?: (propertyId: string) => void;
}

const PropertyMap = ({ properties, selectedPropertyId, onPropertySelect }: PropertyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [popup, setPopup] = useState<Overlay | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize OpenLayers Map
    const olMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([72.8777, 19.0760]), // Mumbai default center
        zoom: 10,
      }),
    });

    // Initialize Popup Overlay
    const olPopup = new Overlay({
      element: popupRef.current!,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -15],
    });
    olMap.addOverlay(olPopup);

    setMap(olMap);
    setPopup(olPopup);

    return () => olMap.setTarget('');
  }, []);

  useEffect(() => {
    if (!map || !popup) return;

    // Remove existing markers
    popup.setPosition(undefined);

    properties.forEach((property) => {
      const { lat, lng } = property.location || {};
      if (!lat || !lng) return;

      const markerElement = document.createElement('div');
      markerElement.className = 'marker';
      markerElement.innerHTML = '📍';
      markerElement.style.cursor = 'pointer';
      markerElement.style.fontSize = '24px';

      const markerOverlay = new Overlay({
        element: markerElement,
        position: fromLonLat([lng, lat]),
        positioning: 'center-center',
      });

      map.addOverlay(markerOverlay);

      markerElement.addEventListener('click', () => {
        popupRef.current!.innerHTML = `
          <div class="p-2 bg-white rounded shadow-md text-sm">
            <h3 class="font-bold">${property.title}</h3>
            <p class="font-medium">${formatPrice(property.price)}</p>
            <p>${property.location.city}, ${property.location.state}</p>
          </div>
        `;
        popup.setPosition(fromLonLat([lng, lat]));

        if (onPropertySelect) {
          onPropertySelect(property.id);
        }
      });
    });
  }, [map, properties, popup, onPropertySelect]);

  return (
    <div className="w-full h-full rounded-lg relative" style={{ minHeight: '400px' }}>
      <div ref={mapRef} className="w-full h-full rounded-lg" style={{ height: '100%', minHeight: '400px' }} />
      <div ref={popupRef} className="absolute bg-white p-2 rounded shadow-md hidden" />
    </div>
  );
};

export default PropertyMap;
