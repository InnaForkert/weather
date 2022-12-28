import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/utils/hooks";
import { addCitiesFromLocalStorage } from "./redux/features/cityList/cityListSlice";
import { fetchWeather } from "./redux/utils/getWeather";
import { Outlet, Route, Routes } from "react-router-dom";
import { SideMenu } from "./pages/SideMenu";
import { Details } from "./pages/Details";
import CssBaseline from "@mui/material/CssBaseline";
import { WeatherCards } from "./components/WeatherCards/WeatherCards";
import { CityInputForm } from "./components/CityInputForm/CityInputForm";
import { Grid } from "@mui/material";
import { SavedCityList } from "./components/SavedCityList/SavedCityList";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

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
    <>
      <CssBaseline enableColorScheme />
      <Grid2 container spacing={5}>
        <Grid2 xs={6} md={9}>
          <Outlet />
        </Grid2>
        <Grid2 xs={6} md={3}>
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
