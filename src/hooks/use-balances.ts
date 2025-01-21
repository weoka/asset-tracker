import { useState, useEffect } from "react";
import { getTokenBalances } from "../services/moralis-service";
import { TokenBalance } from "../types/token-balance";

export const useBalances = (address: string, chainId: string) => {
  const [balances, setBalances] = useState<TokenBalance[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const details = await getTokenBalances(address, chainId);
        setBalances(details);
      } catch (err) {
        setError((err as Error).message || "Failed to fetch coin details.");
      } finally {
        setLoading(false);
      }
    };

    if (address && chainId) {
      fetchDetails();
    }
  }, [address, chainId]);

  return { balances, loading, error };
};
