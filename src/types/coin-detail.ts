export interface CoinDetail {
  id: string;
  name: string;
  symbol: string;
  parent: {
    id: string;
    name: string;
    symbol: string;
  };
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: Array<{
    id: string;
    name: string;
    coin_counter: number;
    ico_counter: number;
  }>;
  team: Array<{
    id: string;
    name: string;
    position: string;
  }>;
  description: string;
  message: string;
  open_source: boolean;
  hardware_wallet: boolean;
  started_at: string;
  development_status: string;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  contract: string;
  platform: string;
  contracts: Array<{
    contract: string;
    platform: string;
    type: string;
  }>;
  links: {
    explorer: string[];
    facebook: string[];
    reddit: string[];
    source_code: string[];
    website: string[];
    youtube: string[];
    medium: string | null;
  };
  links_extended: Array<{
    url: string;
    type: string;
    stats?: {
      subscribers?: number;
      contributors?: number;
      stars?: number;
    };
  }>;
  whitepaper: {
    link: string;
    thumbnail: string;
  };
  first_data_at: string;
  last_data_at: string;
}
