import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useTicker } from "../../hooks/use-ticker";
import Coin from "./coin";
import "@testing-library/jest-dom";

// Mock `useParams`
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

// Mock `useTicker` hook
jest.mock("../../hooks/use-ticker", () => ({
  useTicker: jest.fn(),
}));

// Mock child components
jest.mock("../../components/market-table/market-table", () => () => (
  <div data-testid="market-table" />
));
jest.mock("../../components/price-chart/price-chart", () => () => (
  <div data-testid="price-chart" />
));

describe("Coin Component", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: "btc-bitcoin" });
  });

  test("renders loading message when data is loading", () => {
    (useTicker as jest.Mock).mockReturnValue({
      ticker: null,
      loading: true,
      error: null,
    });

    render(
      <BrowserRouter>
        <Coin />
      </BrowserRouter>
    );

    expect(screen.getByText("Loading coin details...")).toBeInTheDocument();
  });

  test("renders error message when an error occurs", () => {
    (useTicker as jest.Mock).mockReturnValue({
      ticker: null,
      loading: false,
      error: "Failed to fetch data",
    });

    render(
      <BrowserRouter>
        <Coin />
      </BrowserRouter>
    );

    expect(screen.getByText("Error: Failed to fetch data")).toBeInTheDocument();
  });

  test("renders no details message if ticker is null", () => {
    (useTicker as jest.Mock).mockReturnValue({
      ticker: null,
      loading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <Coin />
      </BrowserRouter>
    );

    expect(
      screen.getByText("No details available for this coin.")
    ).toBeInTheDocument();
  });

  test("renders MarketTable and PriceChart components", () => {
    (useTicker as jest.Mock).mockReturnValue({
      ticker: {
        id: "btc-bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
      },
      loading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <Coin />
      </BrowserRouter>
    );

    expect(screen.getByTestId("market-table")).toBeInTheDocument();
    expect(screen.getByTestId("price-chart")).toBeInTheDocument();
  });
});
