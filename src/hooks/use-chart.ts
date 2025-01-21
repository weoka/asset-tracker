import { useState, useEffect } from "react";
import { getCoinChart } from "../services/coinpaprika-service";
import { Time } from "lightweight-charts";
export const useChart = (coinId: string) => {
  const [chart, setChart] = useState<{ time: Time; value: number }[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const details = await getCoinChart(coinId);

        const formattedData = details[0].price
          .map(([timestamp, value]) => ({
            time: new Date(timestamp).toISOString().split("T")[0],
            value: value,
          }))
          .slice(0, -1);

        setChart(formattedData);
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
