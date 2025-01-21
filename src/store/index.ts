import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./slices/coins-slice";
import walletReducer from "./slices/wallet-slice";

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    wallet: walletReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
