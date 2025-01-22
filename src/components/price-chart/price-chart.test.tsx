import { render, screen } from "@testing-library/react";
import PriceChart from "./price-chart";
import { useChart } from "../../hooks/use-chart";
import "@testing-library/jest-dom";

// Mock the `useChart` hook
jest.mock("../../hooks/use-chart", () => ({
  useChart: jest.fn(),
}));

// Mock `TradingviewChart` component
jest.mock("../tradingview-chart/tradingview-chart", () => () => (
  <div data-testid="tradingview-chart" />
));

describe("PriceChart Component", () => {
  test("renders loading message when chart data is loading", () => {
    (useChart as jest.Mock).mockReturnValue({
      chart: [],
      loading: true,
    });

    render(<PriceChart id="btc-bitcoin" />);

    expect(screen.getByText("Loading chart details...")).toBeInTheDocument();
  });

  test("renders the Market Chart heading", () => {
    (useChart as jest.Mock).mockReturnValue({
      chart: [{ price: 45000, time: 1700000000 }],
      loading: false,
    });

    render(<PriceChart id="btc-bitcoin" />);

    expect(
      screen.getByRole("heading", { name: "Market Chart" })
    ).toBeInTheDocument();
  });

  test("renders the TradingviewChart component when data is available", () => {
    (useChart as jest.Mock).mockReturnValue({
      chart: [{ price: 45000, time: 1700000000 }],
      loading: false,
    });

    render(<PriceChart id="btc-bitcoin" />);

    expect(screen.getByTestId("tradingview-chart")).toBeInTheDocument();
  });

  test("renders default chart for btc-bitcoin if id is not provided", () => {
    (useChart as jest.Mock).mockImplementation((id) => {
      expect(id).toBe("btc-bitcoin"); // Ensures default value is used
      return { chart: [], loading: false };
    });

    render(<PriceChart id={undefined as unknown as string} />); // Force test to check the default behavior
  });
});
