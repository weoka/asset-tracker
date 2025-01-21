import { CacheData } from "../types/CacheData";

const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000; // Cache expires in 24 hours

export const CacheService = {
  setItem: <T>(key: string, data: T): void => {
    const cacheData: CacheData<T> = { data, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(cacheData));
  },

  getItem: <T>(key: string): T | null => {
    const cachedItem = localStorage.getItem(key);
    if (!cachedItem) return null;

    const { data, timestamp }: CacheData<T> = JSON.parse(cachedItem);
    if (Date.now() - timestamp > CACHE_EXPIRATION_MS) {
      localStorage.removeItem(key);
      return null; // Expired cache
    }

    return data;
  },

  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  }
};