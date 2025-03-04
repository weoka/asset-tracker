import { CacheService } from "./cache-service";
const BASE_URL = "https://api.coinpaprika.com/v1";
const CHARTS_API = "https://graphsv2.coinpaprika.com";

import { Coin } from "../types/coin";
import { Ticker } from "../types/ticker";
import { ChartData } from "../types/chart-data";

// General API request method
async function apiRequest<T>(
  endpoint: string,
  cacheKey?: string,
  chartsAPI = false
): Promise<T> {
  if (cacheKey) {
    const cachedData = CacheService.getItem<T>(cacheKey);
    if (cachedData) {
      console.log(`Returning cached data for ${endpoint}`);
      return cachedData;
    }
  }

  try {
    console.log(`Fetching fresh data from API: ${endpoint}`);
    const response = await fetch(
      `${chartsAPI ? CHARTS_API : BASE_URL}${endpoint}`
    );
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
export const getCoinTicker = (coinId: string): Promise<Ticker> => {
  return apiRequest<Ticker>(`/tickers/${coinId}`, `ticker_${coinId}`);
};

/**
 * Fetch market data for a specific coin.
 * @param coinId The coin ID.
 */
export const getCoinChart = (
  coinId: string,
  period: "1d" | "7d" | "30d" | "1y" = "1y"
): Promise<ChartData[]> => {
  return apiRequest<ChartData[]>(
    `/currency/data/${coinId}/${period}/?quote=usd`,
    `chart_${period}_${coinId}`,
    true
  );
};
