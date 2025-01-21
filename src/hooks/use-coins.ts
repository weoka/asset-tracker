import { useEffect } from "react";
import { Coin } from "../types/coin";
import { RootState, AppDispatch } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins } from "../store/slices/coins-slice";

export const useCoins = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { coins, loading, error } = useSelector(
    (state: RootState) => state.coins as { coins: Coin[]; loading: boolean; error: string | null }
  );

  useEffect(() => {
    if (coins.length === 0) {
      dispatch(fetchCoins());
    }
  }, [coins, dispatch]);

  return { coins, loading, error };
};