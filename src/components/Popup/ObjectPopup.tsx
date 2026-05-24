import { useState } from 'react';
import type { CulturalObjectProperties, Category } from '../../types';
import { getCategoryName, getCategoryColor } from '../../utils/mapHelpers';
import { buildRouteUrl } from '../../utils/routeHelpers';

interface ObjectPopupProps {
  properties: CulturalObjectProperties;
  userLocation?: { latitude: number; longitude: number } | null;
}

function ObjectPopup({ properties, userLocation }: ObjectPopupProps) {
  const { name, category, description, photo, workingHours } = properties;
  const [imageError, setImageError] = useState(false);

  const color = getCategoryColor(category);

  const handleRouteClick = () => {
    const url = buildRouteUrl(
      properties,
      userLocation?.latitude || undefined,
      userLocation?.longitude || undefined
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="object-popup" style={{ minWidth: '280px', maxWidth: '350px' }}>
      {!imageError && photo && (
        <div style={{
          width: '100%',
          height: '160px',
          overflow: 'hidden',
          borderRadius: '8px',
          marginBottom: '12px',
        }}>
          <img
            src={photo}
            alt={name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onError={() => setImageError(true)}
          />
        </div>
      )}

      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '500',
        marginBottom: '8px',
        backgroundColor: `${color}20`,
        color: color,
        gap: '4px',
      }}>
        <span>{getCategoryName(category)}</span>
      </div>

      <h3 style={{
        margin: '0 0 8px 0',
        fontSize: '18px',
        fontWeight: '700',
        color: '#1a1a1a',
        lineHeight: '1.3',
      }}>
        {name}
      </h3>

      <p style={{
        margin: '0 0 12px 0',
        fontSize: '14px',
        color: '#666',
        lineHeight: '1.5',
      }}>
        {description}
      </p>

      {workingHours && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          marginBottom: '12px',
          fontSize: '13px',
          color: '#555',
        }}>
          <span style={{ fontSize: '16px' }}>🕒</span>
          <span>{workingHours}</span>
        </div>
      )}

      <button
        onClick={handleRouteClick}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: color,
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.filter = 'brightness(0.9)';
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = `0 4px 12px ${color}40`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.filter = 'none';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <span>Проложить маршрут</span>
        <span style={{ fontSize: '12px', opacity: 0.9 }}>
          {userLocation ? '(от меня)' : '(Яндекс.Карты)'}
        </span>
      </button>

      {!userLocation && (
        <p style={{
          margin: '8px 0 0 0',
          fontSize: '11px',
          color: '#999',
          textAlign: 'center',
        }}>
          💡 Разрешите геолокацию для маршрутов
        </p>
      )}
    </div>
  );
}

export default ObjectPopup;