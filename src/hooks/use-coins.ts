import { useEffect } from "react";
import { RootState, AppDispatch } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins } from "../store/slices/coins-slice";
import { CoinsState } from "../types/coins-state";

export const useCoins = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { coins, loading, error } = useSelector(
    (state: RootState) => state.coins as CoinsState
  );

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  return { coins, loading, error };
};