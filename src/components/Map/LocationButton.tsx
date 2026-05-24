import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

interface LocationButtonProps {
  userLocation?: { latitude: number; longitude: number } | null;
  onLocateMe: () => void;
  loading?: boolean;
}

function LocationButton({ userLocation, onLocateMe, loading }: LocationButtonProps) {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.setView(
        [userLocation.latitude, userLocation.longitude],
        15,
        { animate: true }
      );
    }
  }, [userLocation, map]);

  return (
    <div className="location-button-container">
      <button
        onClick={onLocateMe}
        className={`location-button ${loading ? 'loading' : ''}`}
        title="Найти меня"
        aria-label="Определить моё местоположение"
        disabled={loading}
      >
        {loading ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" strokeDasharray="31.4 31.4" strokeLinecap="round">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 12 12"
                to="360 12 12"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" />
            <line x1="12" y1="2" x2="12" y2="6" />
            <line x1="12" y1="18" x2="12" y2="22" />
            <line x1="2" y1="12" x2="6" y2="12" />
            <line x1="18" y1="12" x2="22" y2="12" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default LocationButton;