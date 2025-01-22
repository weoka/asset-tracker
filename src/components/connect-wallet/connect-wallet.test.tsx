import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import walletReducer, { setWallet } from "../../store/slices/wallet-slice";
import ConnectWallet from "./connect-wallet";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("ConnectWallet Component", () => {
  let store = configureStore({
    reducer: { wallet: walletReducer },
  });

  beforeEach(() => {
    store = configureStore({
      reducer: { wallet: walletReducer },
    });
  });

  test("renders Connect Wallet button when not connected", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ConnectWallet />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Connect wallet")).toBeInTheDocument();
  });

  test("renders wallet address button when connected", () => {
    store.dispatch(
      setWallet({ address: "0x123456789abcdef", chainId: 1, balance: "1.0" })
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ConnectWallet />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("0x1234...cdef")).toBeInTheDocument();
  });

  test("displays alert when MetaMask is not installed", () => {
    window.ethereum = undefined;
    window.alert = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ConnectWallet />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Connect wallet"));
    expect(window.alert).toHaveBeenCalledWith(
      "MetaMask not detected. Please install it."
    );
  });
});
