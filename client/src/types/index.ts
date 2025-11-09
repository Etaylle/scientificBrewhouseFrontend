// Types für das Brewhouse Dashboard
export interface SensorData {
  id: number;
  sensorType: string;
  temperature: number;
  humidity: number | null;
  ph: number | null;
  alcohol: number | null;
  pressure: number | null;
  timestamp: Date;
}

export interface Beer {
  id: number;
  name: string;
  type: string;
  description: string;
  abv: number;
  ibu: number;
  og: number;
  fg: number;
  ingredients: string[];
  imageUrl: string;
  isActive: boolean;
  brewStartTime: Date | null;
  brewStage: string | null;
  brewProgress: number | null;
}

export interface BeerRating {
  id: number;
  beerId: number;
  rating: number;
  comment: string | null;
  createdAt: Date;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: { en: string; de: string };
  excerpt: { en: string; de: string };
  content: { en: string; de: string };
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  images: string[];
  brewingData: {
    originalGravity: number;
    finalGravity: number;
    abv: number;
    ibu: number;
    srm: number;
    efficiency: number;
  };
  // Professional rating system for finished beers (BeerTasting.com style)
  ratings?: {
    overall: number;        // Overall rating (0-5)
    count: number;          // Number of ratings
    categories: {
      appearance: number;   // Aussehen: Color, clarity, foam (0-5)
      aroma: number;        // Geruch: Hops, malt, fruit notes (0-5)
      taste: number;        // Geschmack: Flavor profile (0-5)
      mouthfeel: number;    // Mundgefühl: Body, carbonation (0-5)
      overall: number;      // Gesamteindruck (0-5)
    };
    distribution: { 1: number; 2: number; 3: number; 4: number; 5: number };
  };
};