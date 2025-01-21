import { RootState, AppDispatch } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setWallet, disconnectWallet } from "../store/slices/wallet-slice";
import { WalletState } from "../types/wallet-state";

export const useWallet = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { address, chainId, balance } = useSelector(
    (state: RootState) => state.wallet as WalletState
  );

  const connectWallet = (walletInfo: WalletState) => {
    dispatch(setWallet(walletInfo));
  };

  const disconnect = () => {
    dispatch(disconnectWallet());
  };

  return { address, chainId, balance, connectWallet, disconnect };
};
