import { useState, useEffect } from "react";
import { getTokenBalances } from "../services/moralis-service";
import { TokenBalance } from "../types/token-balance";
import { ethers } from "ethers";

export const useBalances = (address: string, chainId: string) => {
  const [balances, setBalances] = useState<TokenBalance[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const balances = await getTokenBalances(address, chainId);

        balances.forEach((balance, index) => {
          balances[index].balance = ethers.formatUnits(
            balance.balance as bigint,
            balance.decimals
          );
        });

        console.log(balances);

        setBalances(balances);
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
