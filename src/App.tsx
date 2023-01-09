import { useEffect } from "react";

import { useAppDispatch } from "./redux/utils/hooks";
import { addCitiesFromLocalStorage } from "./redux/features/cityList/cityListSlice";
import { fetchWeather } from "./redux/utils/getWeather";

import { Outlet, useLocation } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";

import { CityInputForm } from "./components/CityInputForm/CityInputForm";
import { Grid, Typography } from "@mui/material";

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
      <CssBaseline enableColorScheme />
      <Typography variant="h4" component="h1" p={2} color="transparent">
        Welcome!
      </Typography>
      <Grid container pl={4}>
        <Grid item xs={11} md={9} lg={11}>
          <Outlet />
        </Grid>
        <Grid item xs={5} md={3}>
          <CityInputForm />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
