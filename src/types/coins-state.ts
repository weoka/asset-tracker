import { Coin } from "./coin";

export interface CoinsState {
  coins: Coin[];
  loading: boolean;
  error: string | null;
}
