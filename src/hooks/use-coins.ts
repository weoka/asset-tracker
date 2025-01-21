import { useState, useEffect } from "react";
import { getAllCoins } from "../services/coinpaprika-service";
import { Coin } from "../types/Coin";

export const UseCoins = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await getAllCoins();
        setCoins(data);
      } catch (err) {
        console.log(err);
        setError("Failed to load coins");
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  return { coins, loading, error };
};
