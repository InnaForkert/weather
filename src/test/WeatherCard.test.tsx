import { screen } from "@testing-library/react";
import { renderWithProviders } from "../redux/utils/testUtils";

import { WeatherCard } from "../components/WeatherCard";
import { BrowserRouter } from "react-router-dom";

test("render weather card", () => {
  renderWithProviders(
    <BrowserRouter>
      <WeatherCard cityName="Sumy" />
    </BrowserRouter>
  );

  const temperature = screen.getByTitle("temperature");
  expect(temperature).toBeInTheDocument();

  const title = screen.getByTitle("city name");
  expect(title).toBeInTheDocument();

  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(2);

  const refresh = screen.getByText("Refresh");
  expect(refresh).toBeInTheDocument();

  const deleteBtn = screen.getByText("Delete");
  expect(deleteBtn).toBeInTheDocument();
});
