import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WalletState } from "../../types/wallet-state";

const initialState: WalletState = {
  address: null,
  chainId: null,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWallet: (
      state,
      action: PayloadAction<{ address: string; chainId: string }>
    ) => {
      state.address = action.payload.address;
      state.chainId = action.payload.chainId;
    },
    disconnectWallet: (state) => {
      state.address = null;
      state.chainId = null;
    },
  },
});

export const { setWallet, disconnectWallet } = walletSlice.actions;

export default walletSlice.reducer;
