import { RootState, AppDispatch } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setWallet, disconnectWallet } from "../store/slices/wallet-slice";
import { WalletState } from "../types/wallet-state";

export const useWallet = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { address, chainId } = useSelector(
    (state: RootState) => state.wallet as WalletState
  );

  const connectWallet = (walletInfo: { address: string; chainId: string }) => {
    dispatch(setWallet(walletInfo));
  };

  const disconnect = () => {
    dispatch(disconnectWallet());
  };

  return { address, chainId, connectWallet, disconnect };
};
