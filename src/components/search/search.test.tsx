import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Search from "./search";
import { useCoins } from "../../hooks/use-coins";
import "@testing-library/jest-dom";

// Mock the `useCoins` hook
jest.mock("../../hooks/use-coins", () => ({
  useCoins: jest.fn(),
}));

describe("Search Component", () => {
  test("renders loading message when data is loading", () => {
    (useCoins as jest.Mock).mockReturnValue({
      coins: [],
      loading: true,
      error: null,
    });

    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error message when there is an error", () => {
    (useCoins as jest.Mock).mockReturnValue({
      coins: [],
      loading: false,
      error: "Failed to load coins",
    });

    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    expect(screen.getByText("Failed to load coins")).toBeInTheDocument();
  });

  test("renders the AutoComplete component", () => {
    (useCoins as jest.Mock).mockReturnValue({
      coins: [
        { id: "btc-bitcoin", name: "Bitcoin", symbol: "BTC" },
        { id: "eth-ethereum", name: "Ethereum", symbol: "ETH" },
      ],
      loading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("Search coin...")).toBeInTheDocument();
  });
});
