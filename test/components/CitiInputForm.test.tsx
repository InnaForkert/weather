import React from "react";
import { renderWithProviders } from "../utils/testUtils";
import { screen } from "@testing-library/react";
import { CityInputForm } from "../../src/components/CityInputForm";

test("renders input form", () => {
  renderWithProviders(<CityInputForm />);
  expect(screen.getByRole("input")).toBeInTheDocument();
});
