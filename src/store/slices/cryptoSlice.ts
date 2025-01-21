// src/store/slices/cryptoSlice.ts
import { createSlice } from '@reduxjs/toolkit';

// Definimos el estado inicial
interface CryptoState {
  selectedCrypto: string | null;
  cryptoList: any[];
  historicalData: any;
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  selectedCrypto: null,
  cryptoList: [],
  historicalData: {},
  loading: false,
  error: null
};

// Creamos el slice
const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setSelectedCrypto: (state, action) => {
      state.selectedCrypto = action.payload;
    },
    setCryptoList: (state, action) => {
      state.cryptoList = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setHistoricalData: (state, action) => {
      const { crypto, data } = action.payload;
      state.historicalData[crypto] = data;
    }
  }
});

// Exportamos las acciones
export const { 
  setSelectedCrypto, 
  setCryptoList, 
  setLoading, 
  setError,
  setHistoricalData 
} = cryptoSlice.actions;

// Exportamos el reducer
export default cryptoSlice.reducer;