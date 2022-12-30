import { screen } from "@testing-library/react";
import { renderWithProviders } from "../redux/utils/testUtils";
import { Details } from "../components/Details";
import { BrowserRouter } from "react-router-dom";

test("render details", () => {
  renderWithProviders(
    <BrowserRouter>
      <Details />
    </BrowserRouter>
  );

  const title = screen.getByTitle("city name");
  expect(title).toBeInTheDocument();

  const feelsLike = screen.getByTitle("feels like");
  expect(feelsLike).toBeInTheDocument();

  const temperature = screen.getByTitle("temperature");
  expect(temperature).toBeInTheDocument();

  const humidity = screen.getByTitle("humidity");
  expect(humidity).toBeInTheDocument();

  const pressure = screen.getByTitle("pressure");
  expect(pressure).toBeInTheDocument();

  const windSpeed = screen.getByTitle("wind speed");
  expect(windSpeed).toBeInTheDocument();

  const description = screen.getByTitle("description");
  expect(description).toBeInTheDocument();

  const icon = screen.getByAltText("weather icon");
  expect(icon).toBeInTheDocument();

  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("Back to all cities");
});
