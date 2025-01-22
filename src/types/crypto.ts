export interface CryptoData {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
  }
  
  export interface TimeseriesData {
    timestamp: number;
    price: number;
  }
  
  export interface CryptoState {
    selectedCrypto: string | null;
    cryptoList: CryptoData[];
    timeseriesData: {
      [key: string]: {
        week: TimeseriesData[];
        month: TimeseriesData[];
        year: TimeseriesData[];
      };
    };
    loading: boolean;
    error: string | null;
    lastUpdated: number | null;
  }