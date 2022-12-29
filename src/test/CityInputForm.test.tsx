import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../redux/utils/testUtils";

import { CityInputForm } from "../components/CityInputForm";

test("render input form", () => {
  renderWithProviders(<CityInputForm />);
  const input = screen.getByRole("input");
  expect(input).toBeInTheDocument();
});
