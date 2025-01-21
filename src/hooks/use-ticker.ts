import { useState, useEffect } from "react";
import { getCoinTicker } from "../services/coinpaprika-service";
import { Ticker } from "../types/ticker";

export const useTicker = (coinId: string) => {
  const [ticker, setTicker] = useState<Ticker | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const details = await getCoinTicker(coinId);
        setTicker(details);
      } catch (err) {
        setError((err as Error).message || "Failed to fetch coin details.");
      } finally {
        setLoading(false);
      }
    };

    if (coinId) {
      fetchDetails();
    }
  }, [coinId]);

  return { ticker, loading, error };
};
