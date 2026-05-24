import { useState } from 'react';
import MapView from './components/Map/MapView';
import Sidebar from './components/Sidebar/Sidebar';
import { useGeolocation } from './hooks/useGeolocation';
import './App.css';

function App() {
  const SIRIUS_CENTER: [number, number] = [43.4056, 39.9573];
  const DEFAULT_ZOOM = 14;

  const [activeLayers, setActiveLayers] = useState({
    park: true,
    museum: true,
    architecture: true,
    sport: true,
    education: true,
    entertainment: true,
  });

  const { latitude, longitude, error, getPosition } = useGeolocation();

  const userLocation = latitude && longitude
    ? { latitude, longitude }
    : null;

  const handleToggleLayer = (category) => {
    setActiveLayers((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleToggleAll = () => {
    const allEnabled = Object.values(activeLayers).every(v => v);

    if (allEnabled) {
      setActiveLayers({
        park: false,
        museum: false,
        architecture: false,
        sport: false,
        education: false,
        entertainment: false,
      });
    } else {
      setActiveLayers({
        park: true,
        museum: true,
        architecture: true,
        sport: true,
        education: true,
        entertainment: true,
      });
    }
  };

  return (
    <div className="app">
      <Sidebar
        activeLayers={activeLayers}
        onToggleLayer={handleToggleLayer}
        onToggleAll={handleToggleAll}
      />
      <MapView
        center={SIRIUS_CENTER}
        zoom={DEFAULT_ZOOM}
        activeLayers={activeLayers}
        userLocation={userLocation}
        onLocateMe={getPosition}
      />

      {error && (
        <div className="geolocation-error">
          <span>⚠️ {error}</span>
          <button onClick={getPosition}>Повторить</button>
        </div>
      )}
    </div>
  );
}

export default App;