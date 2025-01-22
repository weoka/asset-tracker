import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./header";
import "@testing-library/jest-dom";

// Mock child components
jest.mock("../search/search", () => () => (
  <div data-testid="search-component" />
));
jest.mock("../connect-wallet/connect-wallet", () => () => (
  <div data-testid="connect-wallet-component" />
));

describe("Header Component", () => {
  test("renders the title with a home link", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const titleElement = screen.getByRole("heading", { name: "Asset Tracker" });
    expect(titleElement).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: "Asset Tracker" });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  test("renders the Search component", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByTestId("search-component")).toBeInTheDocument();
  });

  test("renders the ConnectWallet component", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByTestId("connect-wallet-component")).toBeInTheDocument();
  });
});
