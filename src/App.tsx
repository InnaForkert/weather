import { useEffect } from "react";

import { useAppDispatch } from "./redux/utils/hooks";
import { addCitiesFromLocalStorage } from "./redux/features/cityList/cityListSlice";
import { fetchWeather } from "./redux/utils/getWeather";

import { Outlet, useLocation } from "react-router-dom";

import { CityInputForm } from "./components/CityInputForm/CityInputForm";

export const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const citiesFromStorage = localStorage.getItem("savedCities");
    if (citiesFromStorage) {
      const parsedCities = JSON.parse(citiesFromStorage);
      dispatch(addCitiesFromLocalStorage(parsedCities));
      parsedCities.forEach((city: string) => {
        dispatch(fetchWeather(city));
      });
    }
  }, [dispatch]);

  return (
    <>
      <h1>Welcome!</h1>
      <Outlet />
      <CityInputForm />
    </>
  );
}

export default App;
