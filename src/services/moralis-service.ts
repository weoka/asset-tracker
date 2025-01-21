import { CacheService } from "./cache-service";
import { TokenBalance } from "../types/token-balance";

const BASE_URL = "https://deep-index.moralis.io/api/v2.2";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjRjZjE3NGFkLTY5YWMtNGE1YS05ZDg0LTQ2NjdkOTJmYTc0MSIsIm9yZ0lkIjoiNDI2OTE2IiwidXNlcklkIjoiNDM5MTIwIiwidHlwZUlkIjoiOTgyOTFlY2EtNTJjNC00YTFiLWFmMTUtYWY0OGQzN2JkYWY4IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3Mzc0OTM4MjgsImV4cCI6NDg5MzI1MzgyOH0.vb-sntDKH2GWQ1H21dXTYu2Zz18FzmQJvf02usDsrA0";

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
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "X-API-Key": API_KEY,
      },
    });
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
export const getTokenBalances = (
  address: string,
  chain: string
): Promise<TokenBalance[]> => {
  return apiRequest<TokenBalance[]>(
    `/${address}/erc20?chain=${chain}`,
    `${chain}_${address}_token_balances`
  );
};
