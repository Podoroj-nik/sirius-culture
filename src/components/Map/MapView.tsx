import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarkersLayer from './MarkersLayer';
import LocationButton from './LocationButton';
import { createLocationMarkerIcon } from '../../utils/mapHelpers';
import type { ActiveLayers } from '../../types';

interface MapViewProps {
  center: [number, number];
  zoom: number;
  activeLayers: ActiveLayers;
  userLocation?: { latitude: number; longitude: number } | null;
  onLocateMe: () => void;
  locationLoading?: boolean;
}

function MapView({
  center,
  zoom,
  activeLayers,
  userLocation,
  onLocateMe,
  locationLoading
}: MapViewProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100vh', width: '100%' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://2gis.ru">2ГИС</a>'
        url="https://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}"
      />

      <MarkersLayer
        activeLayers={activeLayers}
        userLocation={userLocation}
      />

      {userLocation && (
        <Marker
          position={[userLocation.latitude, userLocation.longitude]}
          icon={createLocationMarkerIcon()}
        >
          <Popup>
            <div style={{
              textAlign: 'center',
              padding: '8px 12px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#1976D2',
              whiteSpace: 'nowrap',
              minWidth: '100px',
            }}>
              Вы здесь
            </div>
          </Popup>
        </Marker>
      )}

      <LocationButton
        userLocation={userLocation}
        onLocateMe={onLocateMe}
        loading={locationLoading}
      />
    </MapContainer>
  );
}

export default MapView;