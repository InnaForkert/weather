import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./redux/utils/hooks";
import { addCitiesFromLocalStorage } from "./redux/features/cityList/cityListSlice";
import { fetchWeather } from "./redux/utils/getWeather";

import { HashRouter, Outlet } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { CityInputForm } from "./components/CityInputForm/CityInputForm";
import { SavedCityList } from "./components/SavedCityList/SavedCityList";

function App() {
  const cityList = useAppSelector((state) => state.cityList.list);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const citiesFromStorage = localStorage.getItem("savedCities");
    if (citiesFromStorage) {
      dispatch(addCitiesFromLocalStorage);
    }
  }, [dispatch, cityList]);

  useEffect(() => {
    cityList.forEach((city) => {
      dispatch(fetchWeather(city));
    });
  }, [cityList, dispatch]);

  return (
    <HashRouter basename="/">
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
    </HashRouter>
  );
}

export default App;
