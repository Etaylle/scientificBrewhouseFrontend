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
};