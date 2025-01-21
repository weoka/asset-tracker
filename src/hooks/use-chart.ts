import { useState, useEffect } from "react";
import { getCoinChart } from "../services/coinpaprika-service";
import { ChartData } from "../types/chart-data";

export const useChart = (coinId: string) => {
  const [chart, setChart] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const details = await getCoinChart(coinId);
        setChart(details);
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

  return { chart, loading, error };
};
