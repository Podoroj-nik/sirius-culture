import type { Category } from '../../types';
import { getCategoryName, getCategoryColor } from '../../utils/mapHelpers';

interface LayerToggleProps {
  category: Category;
  isActive: boolean;
  onChange: (category: Category) => void;
}

function LayerToggle({ category, isActive, onChange }: LayerToggleProps) {
  const color = getCategoryColor(category);

  return (
    <label
      className={`layer-toggle ${isActive ? 'active' : ''}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        margin: '4px 0',
        borderRadius: '8px',
        cursor: 'pointer',
        backgroundColor: isActive ? `${color}20` : 'transparent',
        border: `2px solid ${isActive ? color : '#e0e0e0'}`,
        transition: 'all 0.3s ease',
      }}
    >
      <input
        type="checkbox"
        checked={isActive}
        onChange={() => onChange(category)}
        style={{ display: 'none' }}
      />
      <span
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: isActive ? color : '#e0e0e0',
          marginRight: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          flexShrink: 0,
        }}
      >
        {isActive && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </span>
      <span style={{
        fontSize: '14px',
        fontWeight: isActive ? '600' : '400',
        color: isActive ? '#333' : '#888',
        userSelect: 'none',
      }}>
        {getCategoryName(category)}
      </span>
      {isActive && (
        <span
          style={{
            marginLeft: 'auto',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: color,
          }}
        />
      )}
    </label>
  );
}

export default LayerToggle;