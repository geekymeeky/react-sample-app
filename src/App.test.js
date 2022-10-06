import { render, screen } from "@testing-library/react";
import App from "./App";

test("Companies", () => {
  render(<App />);
  const linkElement = screen.getByText(/Companies/i);
  expect(linkElement).toBeInTheDocument();
});
