import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage";
import { Details } from "./components/Details";
import { WeatherCards } from "./components/WeatherCards";

const router = createHashRouter([
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
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);

// <React.StrictMode>
// {/* </React.StrictMode> */}
