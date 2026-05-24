export type Category = 'park' | 'museum' | 'architecture' | 'sport' | 'education' | 'entertainment';

export interface CulturalObjectProperties {
  id: number;
  name: string;
  category: Category;
  description: string;
  photo: string;
  workingHours: string;
  externalMapUrl: string;
}

export interface CulturalObjectFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  properties: CulturalObjectProperties;
}

export interface CulturalObjectCollection {
  type: 'FeatureCollection';
  features: CulturalObjectFeature[];
}

export interface ActiveLayers {
  park: boolean;
  museum: boolean;
  architecture: boolean;
  sport: boolean;
  education: boolean;
  entertainment: boolean;
}