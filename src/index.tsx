import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage";
import { Details } from "./components/Details";
import { WeatherCards } from "./components/WeatherCards";

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "details/:cityId",
        element: <Details />,
      },
      {
        path: "/",
        element: <WeatherCards />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  (document.getElementById("root") as HTMLElement) ||
    document.createElement("div")
); //for testing purposes
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
