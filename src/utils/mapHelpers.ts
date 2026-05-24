import L from 'leaflet';
import type { Category } from '../types';

export function createMarkerIcon(category: Category): L.Icon {
  const iconUrlMap: Record<Category, string> = {
    park: '/markers/park-marker.png',
    museum: '/markers/museum-marker.png',
    architecture: '/markers/architecture-marker.png',
    sport: '/markers/sport-marker.png',
    education: '/markers/education-marker.png',
    entertainment: '/markers/entertainment-marker.png',
  };

  return L.icon({
    iconUrl: iconUrlMap[category],
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    className: 'custom-marker-icon',
  });
}

export function createLocationMarkerIcon(): L.DivIcon {
  return L.divIcon({
    className: 'location-marker-wrapper',
    html: `
      <div style="position: relative; width: 32px; height: 32px;">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(25, 118, 210, 0.2);
          animation: location-pulse 2s ease-out infinite;
        "></div>
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #1976D2;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        "></div>
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: white;
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}

export function getCategoryName(category: Category): string {
  const nameMap: Record<Category, string> = {
    park: 'Парк / Сад',
    museum: 'Музей / Выставка',
    architecture: 'Архитектура',
    sport: 'Спортивный объект',
    education: 'Образование',
    entertainment: 'Развлечения',
  };
  return nameMap[category];
}

export function getCategoryColor(category: Category): string {
  const colorMap: Record<Category, string> = {
    park: '#81C784',
    museum: '#FFB74D',
    architecture: '#BA68C8',
    sport: '#64B5F6',
    education: '#4FC3F7',
    entertainment: '#F06292',
  };
  return colorMap[category];
}