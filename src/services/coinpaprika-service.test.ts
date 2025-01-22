import {
  getAllCoins,
  getCoinTicker,
  getCoinChart,
} from "./coinpaprika-service";

import { CacheService } from "../services/cache-service";

global.fetch = jest.fn();
jest.mock("../services/cache-service", () => ({
  CacheService: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
}));

describe("API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetches all coins successfully", async () => {
    const mockCoins = [
      { id: "btc-bitcoin", name: "Bitcoin", symbol: "BTC" },
      { id: "eth-ethereum", name: "Ethereum", symbol: "ETH" },
    ];

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockCoins),
    });

    const coins = await getAllCoins();

    expect(fetch).toHaveBeenCalledWith("https://api.coinpaprika.com/v1/coins");
    expect(coins).toEqual(mockCoins);
  });

  test("returns cached ticker data when available", async () => {
    const mockTicker = { id: "btc-bitcoin", price_usd: 45000 };

    (CacheService.getItem as jest.Mock).mockReturnValue(mockTicker);

    const ticker = await getCoinTicker("btc-bitcoin");

    expect(CacheService.getItem).toHaveBeenCalledWith("ticker_btc-bitcoin");
    expect(fetch).not.toHaveBeenCalled();
    expect(ticker).toEqual(mockTicker);
  });

  test("fetches fresh ticker data if cache is empty", async () => {
    const mockTicker = { id: "btc-bitcoin", price_usd: 45000 };

    (CacheService.getItem as jest.Mock).mockReturnValue(null);
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockTicker),
    });

    const ticker = await getCoinTicker("btc-bitcoin");

    expect(CacheService.getItem).toHaveBeenCalledWith("ticker_btc-bitcoin");
    expect(fetch).toHaveBeenCalledWith(
      "https://api.coinpaprika.com/v1/tickers/btc-bitcoin"
    );
    expect(CacheService.setItem).toHaveBeenCalledWith(
      "ticker_btc-bitcoin",
      mockTicker
    );
    expect(ticker).toEqual(mockTicker);
  });

  test("fetches coin chart data with correct API and caching", async () => {
    const mockChartData = [{ time: 1700000000, value: 45000 }];

    (CacheService.getItem as jest.Mock).mockReturnValue(null);
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockChartData),
    });

    const chartData = await getCoinChart("btc-bitcoin", "7d");

    expect(CacheService.getItem).toHaveBeenCalledWith("chart_7d_btc-bitcoin");
    expect(fetch).toHaveBeenCalledWith(
      "https://graphsv2.coinpaprika.com/currency/data/btc-bitcoin/7d/?quote=usd"
    );
    expect(CacheService.setItem).toHaveBeenCalledWith(
      "chart_7d_btc-bitcoin",
      mockChartData
    );
    expect(chartData).toEqual(mockChartData);
  });

  test("throws an error when API request fails", async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: false, status: 500 });

    await expect(getAllCoins()).rejects.toThrow("API request failed: 500");
  });

  test("logs error when API request fails", async () => {
    console.error = jest.fn();
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    await expect(getAllCoins()).rejects.toThrow("Network error");
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching /coins:",
      expect.any(Error)
    );
  });
});
