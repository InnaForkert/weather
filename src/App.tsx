import { useEffect } from "react";

import { useAppDispatch } from "./redux/utils/hooks";
import { addCitiesFromLocalStorage } from "./redux/features/cityList/cityListSlice";
import { fetchWeather } from "./redux/utils/getWeather";

import { Outlet } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { CityInputForm } from "./components/CityInputForm/CityInputForm";
import { SavedCityList } from "./components/SavedCityList/SavedCityList";

function App() {
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
      <Grid2 container spacing={5}>
        <Grid2 xs={7} md={9}>
          <Outlet />
        </Grid2>
        <Grid2 xs={5} md={3}>
          <Grid2 container direction="column">
            <Grid2>
              <CityInputForm />
            </Grid2>
            <Grid2>
              <SavedCityList />
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
}

export default App;
