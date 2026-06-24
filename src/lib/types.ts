export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ConflictEvent {
  id: string;
  type: string;
  category: "kinetic" | "ground" | "diplomacy";
  location: string;
  timestamp: string;
  confidence?: string;
  summary: string;
  sourceUrl: string;
  casualties?: number;
  coordinates?: Coordinates;
  actor?: string;
  significance?: string;
  ceasefireImpact?: string;
}

export interface FeedItem {
  event_id: string;
  type?: string;
  event_type?: string;
  location?: string;
  timestamp: string;
  confidence?: string;
  event_summary?: string;
  statement_summary?: string;
  source_url: string;
  actor?: string;
  significance?: string;
  ceasefire_impact?: string;
  _osint_meta?: {
    casualties?: number;
    coordinates?: Coordinates;
  };
}

export interface KineticFeed {
  version?: string;
  last_updated: string;
  items: FeedItem[];
  window_hours?: number;
}

export interface DiplomacyFeed {
  last_updated: string;
  ceasefire_expires: string | null;
  items: FeedItem[];
}

export interface HormuzFeed {
  last_updated: string;
  today: string;
  current_status: string;
  ships_today: number;
  oil_transit_mbpd: number;
  incident_count: number;
  insurance_rate: number;
  notes: string;
}

export interface FactionCasualty {
  name: string;
  killed: number;
  killed_range?: [number, number];
  wounded?: number;
  military_killed?: number;
  civilian_killed?: number;
  source: string;
}

export interface CasualtiesData {
  last_updated: string;
  factions: FactionCasualty[];
  total_range: [number, number];
  notes?: string;
}

export interface MilitaryAsset {
  id: string;
  name: string;
  faction: string;
  type: string;
  location: string;
  coordinates: Coordinates;
  status: string;
  last_confirmed: string;
  source_url: string;
}

export interface MilitaryData {
  last_updated: string;
  assets: MilitaryAsset[];
}

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

export interface OilPricePoint {
  date: string;
  price: number;
}

export interface EconomyData {
  hormuz: HormuzFeed;
  oil_prices: OilPricePoint[];
  oil_current?: number;
  milestones: Array<{
    date: string;
    title: string;
    description: string;
  }>;
}

export interface ApiMeta {
  last_updated: string;
  stale?: boolean;
  source?: string;
}
