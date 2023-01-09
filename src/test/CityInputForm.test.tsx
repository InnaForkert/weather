import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../redux/utils/testUtils";

import { CityInputForm } from "../components/CityInputForm/CityInputForm";

type TestElement = Document | Element | Window | Node;

function hasInputValue(e: TestElement, inputValue: string) {
  return screen.getByDisplayValue(inputValue) === e;
}

test("render input form", () => {
  renderWithProviders(<CityInputForm />);
  const input = screen.getByRole("input");
  expect(input).toBeInTheDocument();

  const label = screen.getByText("Enter city name");
  expect(label).toBeInTheDocument();

  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("Save");
});

test("input", () => {
  renderWithProviders(<CityInputForm />);
  const input = screen.getByTestId("content-input");

  fireEvent.input(input, { target: { value: "some text" } });
  expect(hasInputValue(input, "some text")).toBe(true);
});

test("form reset", () => {
  renderWithProviders(<CityInputForm />);
  const input = screen.getByTestId("content-input");
  const form = screen.getByLabelText("search city form");

  fireEvent.input(input, { target: { value: "some text" } });
  fireEvent.submit(form);
  expect(hasInputValue(input, "")).toBe(true);
});

test("nonempty input", () => {
  renderWithProviders(<CityInputForm />);
  const input = screen.getByTestId("content-input");
  const form = screen.getByLabelText("search city form");

  fireEvent.input(input, { target: { value: "city" } });
  fireEvent.submit(form);
  expect(screen.queryByText("Enter Something!")).not.toBeInTheDocument();
});

test("empty input", () => {
  renderWithProviders(<CityInputForm />);
  const input = screen.getByTestId("content-input");
  const form = screen.getByLabelText("search city form");

  fireEvent.input(input, { target: { value: "" } });
  fireEvent.submit(form);
  expect(screen.getByText("Enter Something!")).toBeInTheDocument();
});
