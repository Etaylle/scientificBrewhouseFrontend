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
  id: number;
  category?: string;
  title: {
    de: string;
    en: string;
  };
  shortText: {
    de: string;
    en: string;
  };
  fullText: {
    de: string;
    en: string;
  };
  image: string;
}
