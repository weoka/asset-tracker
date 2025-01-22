import { render, screen } from "@testing-library/react";
import CoinsTable from "./coins-table";
import { useCoins } from "../../hooks/use-coins";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import { TextEncoder, TextDecoder } from "text-encoding";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock the `useCoins` hook
jest.mock("../../hooks/use-coins");

describe("CoinsTable Component", () => {
  test("renders loading spinner when data is loading", () => {
    (useCoins as jest.Mock).mockReturnValue({
      coins: [],
      loading: true,
      error: null,
    });

    render(
      <BrowserRouter>
        <CoinsTable />
      </BrowserRouter>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders error message when an error occurs", () => {
    (useCoins as jest.Mock).mockReturnValue({
      coins: [],
      loading: false,
      error: "Failed to load coins",
    });

    render(
      <BrowserRouter>
        <CoinsTable />
      </BrowserRouter>
    );

    expect(screen.getByText("Failed to load coins")).toBeInTheDocument();
  });

  test("renders coins table with data", () => {
    (useCoins as jest.Mock).mockReturnValue({
      coins: [
        {
          id: "btc-bitcoin",
          rank: 1,
          name: "Bitcoin",
          symbol: "BTC",
          type: "coin",
        },
        {
          id: "eth-ethereum",
          rank: 2,
          name: "Ethereum",
          symbol: "ETH",
          type: "coin",
        },
      ],
      loading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <CoinsTable />
      </BrowserRouter>
    );

    // Check if coin names are rendered
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("Ethereum")).toBeInTheDocument();

    // Check if coin symbol is displayed
    expect(screen.getByText("BTC")).toBeInTheDocument();
    expect(screen.getByText("ETH")).toBeInTheDocument();
  });

  test("renders coin links correctly", () => {
    (useCoins as jest.Mock).mockReturnValue({
      coins: [
        {
          id: "btc-bitcoin",
          rank: 1,
          name: "Bitcoin",
          symbol: "BTC",
          type: "coin",
        },
      ],
      loading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <CoinsTable />
      </BrowserRouter>
    );

    const link = screen.getByRole("link", { name: "Bitcoin" });
    expect(link).toHaveAttribute("href", "/coin/btc-bitcoin");
  });
});
