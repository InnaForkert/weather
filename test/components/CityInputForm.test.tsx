import { renderWithProviders } from "../utils/testUtils";
import { screen } from "@testing-library/react";
import { CityInputForm } from "../../src/components/CityInputForm";

test("renders input form", () => {
  renderWithProviders(<CityInputForm />);
  const input = screen.getByRole("input");
  const button = screen.getByRole("button");

  expect(input).toBeInTheDocument();
  expect(input).toHaveTextContent("Enter city name");

  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("Save");
});
