import { getTokenBalances } from "../services/moralis-service";
import { CacheService } from "../services/cache-service";

// Mock fetch and CacheService
global.fetch = jest.fn();
jest.mock("../services/cache-service", () => ({
  CacheService: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
}));

describe("Moralis API Service - getTokenBalances", () => {
  const mockAddress = "0x123456789abcdef";
  const mockChain = "eth";
  const baseUrl = "https://deep-index.moralis.io/api/v2.2";
  const endpoint = `/${mockAddress}/erc20?chain=${mockChain}`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns cached token balances if available", async () => {
    const mockBalances = [
      { symbol: "DAI", balance: "1000000000000000000", decimals: 18 },
      { symbol: "USDT", balance: "5000000", decimals: 6 },
    ];

    (CacheService.getItem as jest.Mock).mockReturnValue(mockBalances);

    const balances = await getTokenBalances(mockAddress, mockChain);

    expect(CacheService.getItem).toHaveBeenCalledWith(
      `${mockChain}_${mockAddress}_token_balances`
    );
    expect(fetch).not.toHaveBeenCalled();
    expect(balances).toEqual(mockBalances);
  });

  test("fetches fresh token balances if cache is empty", async () => {
    const mockBalances = [
      { symbol: "DAI", balance: "1000000000000000000", decimals: 18 },
      { symbol: "USDT", balance: "5000000", decimals: 6 },
    ];

    (CacheService.getItem as jest.Mock).mockReturnValue(null);
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockBalances),
    });

    const balances = await getTokenBalances(mockAddress, mockChain);

    expect(CacheService.getItem).toHaveBeenCalledWith(
      `${mockChain}_${mockAddress}_token_balances`
    );
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}${endpoint}`, {
      headers: { "X-API-Key": expect.any(String) },
    });
    expect(CacheService.setItem).toHaveBeenCalledWith(
      `${mockChain}_${mockAddress}_token_balances`,
      mockBalances
    );
    expect(balances).toEqual(mockBalances);
  });

  test("throws an error when API request fails", async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: false, status: 500 });

    await expect(getTokenBalances(mockAddress, mockChain)).rejects.toThrow(
      "API request failed: 500"
    );
  });

  test("logs error when API request fails", async () => {
    console.error = jest.fn();
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    await expect(getTokenBalances(mockAddress, mockChain)).rejects.toThrow(
      "Network error"
    );
    expect(console.error).toHaveBeenCalledWith(
      `Error fetching ${endpoint}:`,
      expect.any(Error)
    );
  });
});
