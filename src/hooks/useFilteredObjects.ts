import { useMemo } from 'react';
import type { CulturalObjectFeature, ActiveLayers } from '../types';
import objectsData from '../data/objects.geo.json';

export function useFilteredObjects(activeLayers: ActiveLayers): CulturalObjectFeature[] {
  return useMemo(() => {
    const data = objectsData as { features: CulturalObjectFeature[] };

    return data.features.filter((feature) => {
      const category = feature.properties.category;
      return activeLayers[category];
    });
  }, [activeLayers]);
}

export function useAllObjects(): CulturalObjectFeature[] {
  return useMemo(() => {
    const data = objectsData as { features: CulturalObjectFeature[] };
    return data.features;
  }, []);
}

export function useObjectCounts(): Record<string, number> {
  return useMemo(() => {
    const data = objectsData as { features: CulturalObjectFeature[] };

    const counts: Record<string, number> = {
      total: data.features.length,
      park: 0,
      museum: 0,
      architecture: 0,
      sport: 0,
      education: 0,
      entertainment: 0,
    };

    data.features.forEach((feature) => {
      const category = feature.properties.category;
      if (counts[category] !== undefined) {
        counts[category]++;
      }
    });

    return counts;
  }, []);
}