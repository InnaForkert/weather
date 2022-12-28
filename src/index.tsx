import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./pages/ErrorPage";
import { Details } from "./pages/Details";
import { WeatherCards } from "./components/WeatherCards/WeatherCards";

const router = createBrowserRouter([
  {
    path: "/codica-test",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/codica-test/details/:cityId",
        element: <Details />,
      },
      {
        path: "/codica-test/",
        element: <WeatherCards />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
