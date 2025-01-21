import { CacheService } from "./cache-service";
const BASE_URL = "https://api.coinpaprika.com/v1";

import { Coin } from "../types/coin";
import { CoinDetail } from "../types/coin-detail";
import { MarketData } from "../types/market-data";

// General API request method
async function apiRequest<T>(endpoint: string, cacheKey?: string): Promise<T> {
  if (cacheKey) {
    const cachedData = CacheService.getItem<T>(cacheKey);
    if (cachedData) {
      console.log(`Returning cached data for ${endpoint}`);
      return cachedData;
    }
  }

  try {
    console.log(`Fetching fresh data from API: ${endpoint}`);
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`API request failed: ${response.status}`);

    const data: T = await response.json();

    if (cacheKey) {
      CacheService.setItem(cacheKey, data);
    }

    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

// Service Functions

/**
 * Fetch all available coins.
 */
export const getAllCoins = (): Promise<Coin[]> => {
  return apiRequest<Coin[]>("/coins");
};

/**
 * Fetch details of a specific coin.
 * @param coinId The coin ID (e.g., "btc-bitcoin").
 */
export const getCoinDetails = (coinId: string): Promise<CoinDetail> => {
  return apiRequest<CoinDetail>(
    `/coins/${coinId}`,
    `coinPaprika_coin_${coinId}`
  );
};

/**
 * Fetch market data for a specific coin.
 * @param coinId The coin ID.
 */
export const getCoinMarketData = (coinId: string): Promise<MarketData> => {
  return apiRequest<MarketData>(
    `/tickers/${coinId}`,
    `coinPaprika_market_${coinId}`
  );
};
