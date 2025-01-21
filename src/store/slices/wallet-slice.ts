import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WalletState } from "../../types/wallet-state";

const initialState: WalletState = {
  address: null,
  chainId: null,
  balance: "0",
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<WalletState>) => {
      state.address = action.payload.address;
      state.chainId = action.payload.chainId;
      state.balance = action.payload.balance;
    },
    disconnectWallet: (state) => {
      state.address = null;
      state.chainId = null;
      state.balance = 0;
    },
  },
});

export const { setWallet, disconnectWallet } = walletSlice.actions;

export default walletSlice.reducer;
