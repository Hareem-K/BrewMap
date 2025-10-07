export interface Cafe {
  id: string;
  google_place_id?: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  website?: string;
  hours?: Record<string, unknown>;
  photos?: string[];
  google_rating?: number;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Profile {
  id: string;
  email: string;
  display_name?: string;
  tier_level: number;
  cafes_visited: number;
  created_at: string;
  updated_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  cafe_id: string;
  visited: boolean;
  notes?: string;
  created_at: string;
  cafe?: Cafe;
}

export interface Review {
  id: string;
  user_id: string;
  cafe_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface Feedback {
  name: string;
  email: string;
  message: string;
}

export type TierLevel = 1 | 2 | 3 | 4 | 5;

export const TIER_NAMES: Record<TierLevel, string> = {
  1: 'Apprentice Brewer',
  2: 'Bean Connoisseur',
  3: 'Latte Lover',
  4: 'Espresso Expert',
  5: 'Master Roaster'
};

export const TIER_REQUIREMENTS: Record<TierLevel, { min: number; max: number }> = {
  1: { min: 1, max: 9 },
  2: { min: 10, max: 19 },
  3: { min: 20, max: 39 },
  4: { min: 40, max: 59 },
  5: { min: 60, max: Infinity }
};
