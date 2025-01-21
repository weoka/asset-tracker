import { render, screen } from "@testing-library/react";
import Home from "./home";
import "@testing-library/jest-dom";

jest.mock("../../components/coins-table/coins-table", () => () => (
  <div data-testid="coins-table-mock" />
));

describe("Home Component", () => {
  test("renders the heading correctly", () => {
    render(<Home />);
    const headingElement = screen.getByText(/Coins/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("renders the CoinsTable component", () => {
    render(<Home />);
    const coinsTable = screen.getByTestId("coins-table-mock");
    expect(coinsTable).toBeInTheDocument();
  });
});
