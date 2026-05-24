import { Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import type { CulturalObjectFeature, ActiveLayers } from '../../types';
import { useFilteredObjects } from '../../hooks/useFilteredObjects';
import { createMarkerIcon } from '../../utils/mapHelpers';
import ObjectPopup from '../Popup/ObjectPopup';

function FitBounds({ objects }: { objects: CulturalObjectFeature[] }) {
  const map = useMap();

  useEffect(() => {
    if (objects.length > 0) {
      const bounds = objects.map((obj) => {
        const [lng, lat] = obj.geometry.coordinates;
        return [lat, lng] as [number, number];
      });

      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      }
    }
  }, [objects, map]);

  return null;
}

interface MarkersLayerProps {
  activeLayers: ActiveLayers;
  userLocation?: { latitude: number; longitude: number } | null;
}

function MarkersLayer({ activeLayers, userLocation }: MarkersLayerProps) {
  const filteredObjects = useFilteredObjects(activeLayers);

  return (
    <>
      <FitBounds objects={filteredObjects} />
      {filteredObjects.map((object) => {
        const [lng, lat] = object.geometry.coordinates;
        const { id, category } = object.properties;

        return (
          <Marker
            key={id}
            position={[lat, lng]}
            icon={createMarkerIcon(category)}
          >
            <Popup maxWidth={350} minWidth={280}>
              <ObjectPopup
                properties={object.properties}
                userLocation={userLocation}
              />
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default MarkersLayer;