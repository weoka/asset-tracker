import { useState, useEffect } from "react";
import { getCoinDetails } from "../services/coinpaprika-service";
import { CoinDetail } from "../types/coin-detail";

export const useCoinDetails = (coinId: string) => {
  const [coinDetails, setCoinDetails] = useState<CoinDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const details = await getCoinDetails(coinId);
        setCoinDetails(details);
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

  return { coinDetails, loading, error };
};
