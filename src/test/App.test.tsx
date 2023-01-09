// app.test.js
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RouterProvider } from "react-router-dom";
import { renderWithProviders } from "../redux/utils/testUtils";
import { router } from "..";

test("app render", () => {
  renderWithProviders(<RouterProvider router={router} />);
  expect(screen.getByText("Welcome!")).toBeInTheDocument();
  expect(screen.getByText("No saved cities yet 😥")).toBeInTheDocument();

  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("Save");
});
