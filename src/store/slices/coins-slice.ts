import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCoins } from "../../services/coinpaprika-service";
import { CoinsState } from "../../types/coins-state";
import { RootState } from "..";

export const fetchCoins = createAsyncThunk(
  "coins/fetchCoins",
  async () => {
    const coins = await getAllCoins();
    return coins;
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      if (state.coins.isFetching) {
        return false;
      }
    }
  }
);

const initialState: CoinsState = {
  coins: [],
  loading: false,
  error: null,
  isFetching: false
};

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
        state.isFetching = true;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load coins";
      });
  },
});

export default coinsSlice.reducer;
