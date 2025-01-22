import { CacheService } from "../services/cache-service";
import { CacheData } from "../types/cache-data";

const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000;

describe("CacheService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("sets and retrieves an item successfully", () => {
    const key = "testKey";
    const data = { message: "Hello, world!" };

    CacheService.setItem(key, data);
    const retrievedData = CacheService.getItem<typeof data>(key);

    expect(retrievedData).toEqual(data);
  });

  test("returns null if the item does not exist", () => {
    expect(CacheService.getItem("nonExistentKey")).toBeNull();
  });

  test("removes an item from the cache", () => {
    const key = "removableKey";
    CacheService.setItem(key, { test: "data" });

    CacheService.removeItem(key);
    expect(CacheService.getItem(key)).toBeNull();
  });

  test("clears all cache items", () => {
    CacheService.setItem("key1", { a: 1 });
    CacheService.setItem("key2", { b: 2 });

    CacheService.clear();
    expect(CacheService.getItem("key1")).toBeNull();
    expect(CacheService.getItem("key2")).toBeNull();
  });

  test("removes expired cache items", () => {
    const key = "expiredKey";
    const expiredTimestamp = Date.now() - CACHE_EXPIRATION_MS - 1000;

    const expiredData: CacheData<{ test: string }> = {
      data: { test: "expired" },
      timestamp: expiredTimestamp,
    };

    localStorage.setItem(key, JSON.stringify(expiredData));

    expect(CacheService.getItem<typeof expiredData.data>(key)).toBeNull();
    expect(localStorage.getItem(key)).toBeNull();
  });

  test("retrieves a valid cached item", () => {
    const key = "validKey";
    const validTimestamp = Date.now() - CACHE_EXPIRATION_MS + 1000;

    const validData: CacheData<{ value: number }> = {
      data: { value: 42 },
      timestamp: validTimestamp,
    };

    localStorage.setItem(key, JSON.stringify(validData));

    expect(CacheService.getItem<typeof validData.data>(key)).toEqual({
      value: 42,
    });
  });
});
