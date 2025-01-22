import { render, screen } from "@testing-library/react";
import Footer from "./footer";
import "@testing-library/jest-dom";

describe("Footer Component", () => {
  test("renders the footer text", () => {
    render(<Footer />);
    expect(screen.getByText("Data provided by")).toBeInTheDocument();
  });

  test("renders the Coinpaprika link correctly", () => {
    render(<Footer />);

    const linkElement = screen.getByRole("link", { name: "Coinpaprika" });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "https://coinpaprika.com");
    expect(linkElement).toHaveAttribute("target", "_blank");
  });
});
