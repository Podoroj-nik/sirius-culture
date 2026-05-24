import { useState } from 'react';
import type { Category, ActiveLayers } from '../../types';
import LayerToggle from './LayerToggle';
import { useObjectCounts, useFilteredObjects } from '../../hooks/useFilteredObjects';
import { getCategoryColor } from '../../utils/mapHelpers';

function Sidebar({ activeLayers, onToggleLayer, onToggleAll }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const allEnabled = Object.values(activeLayers).every(v => v);
  const categories: Category[] = ['park', 'museum', 'architecture', 'sport', 'education', 'entertainment'];

  const objectCounts = useObjectCounts();
  const filteredObjects = useFilteredObjects(activeLayers);

  const categoryIcons: Record<Category, string> = {
    park: '🌳',
    museum: '🏛️',
    architecture: '🏗️',
    sport: '🏟️',
    education: '📚',
    entertainment: '🎪',
  };

  return (
    <>
      <div className="sidebar sidebar-desktop">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Слои карты</h2>
        </div>

        <div className="sidebar-content">
          <div className="layers-list">
            {categories.map((category) => (
              <LayerToggle
                key={category}
                category={category}
                isActive={activeLayers[category]}
                onChange={onToggleLayer}
              />
            ))}
          </div>

          <button
            className="toggle-all-button"
            onClick={onToggleAll}
          >
            {allEnabled ? 'Скрыть все' : 'Показать всё'}
          </button>
        </div>

        <div className="sidebar-footer">
          <div className="objects-count">
            <div>
              <div className="objects-count-main">
                Отображается: {filteredObjects.length} из {objectCounts.total}
              </div>
              <div className="objects-count-detail">
                <span className="count-item">
                  <span className="count-dot" style={{ backgroundColor: getCategoryColor('park') }}></span>
                  {objectCounts.park} парков
                </span>
                <span className="count-separator">·</span>
                <span className="count-item">
                  <span className="count-dot" style={{ backgroundColor: getCategoryColor('museum') }}></span>
                  {objectCounts.museum} музеев
                </span>
                <span className="count-separator">·</span>
                <span className="count-item">
                  <span className="count-dot" style={{ backgroundColor: getCategoryColor('architecture') }}></span>
                  {objectCounts.architecture} арх.
                </span>
              </div>
              <div className="objects-count-detail">
                <span className="count-item">
                  <span className="count-dot" style={{ backgroundColor: getCategoryColor('sport') }}></span>
                  {objectCounts.sport} спорт
                </span>
                <span className="count-separator">·</span>
                <span className="count-item">
                  <span className="count-dot" style={{ backgroundColor: getCategoryColor('education') }}></span>
                  {objectCounts.education} образ.
                </span>
                <span className="count-separator">·</span>
                <span className="count-item">
                  <span className="count-dot" style={{ backgroundColor: getCategoryColor('entertainment') }}></span>
                  {objectCounts.entertainment} развл.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`mobile-panel ${isMobileOpen ? 'open' : ''}`}>
        <div
          className="mobile-panel-header"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <div className="mobile-panel-handle" />
          <div className="mobile-panel-title">
            <span>Слои карты</span>
            <span className="mobile-panel-badge">
              {filteredObjects.length}/{objectCounts.total}
            </span>
          </div>
          <button
            className="mobile-panel-toggle"
            onClick={(e) => {
              e.stopPropagation();
              onToggleAll();
            }}
          >
            {allEnabled ? 'Скрыть' : 'Показать'}
          </button>
        </div>

        <div className="mobile-panel-content">
          <div className="layers-list">
            {categories.map((category) => (
              <LayerToggle
                key={category}
                category={category}
                isActive={activeLayers[category]}
                onChange={onToggleLayer}
              />
            ))}
          </div>

          <div className="mobile-panel-info">
            <span className="count-item">
              <span className="count-dot" style={{ backgroundColor: getCategoryColor('park') }}></span>
              {objectCounts.park} парков
            </span>
            <span className="count-separator">·</span>
            <span className="count-item">
              <span className="count-dot" style={{ backgroundColor: getCategoryColor('museum') }}></span>
              {objectCounts.museum} музеев
            </span>
            <span className="count-separator">·</span>
            <span className="count-item">
              <span className="count-dot" style={{ backgroundColor: getCategoryColor('architecture') }}></span>
              {objectCounts.architecture} арх.
            </span>
          </div>
          <div className="mobile-panel-info">
            <span className="count-item">
              <span className="count-dot" style={{ backgroundColor: getCategoryColor('sport') }}></span>
              {objectCounts.sport} спорт
            </span>
            <span className="count-separator">·</span>
            <span className="count-item">
              <span className="count-dot" style={{ backgroundColor: getCategoryColor('education') }}></span>
              {objectCounts.education} образ.
            </span>
            <span className="count-separator">·</span>
            <span className="count-item">
              <span className="count-dot" style={{ backgroundColor: getCategoryColor('entertainment') }}></span>
              {objectCounts.entertainment} развл.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;