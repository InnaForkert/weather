import CssBaseline from "@mui/material/CssBaseline";
import { WeatherCards } from "./components/WeatherCards/WeatherCards";
import { CityInputForm } from "./components/CityInputForm/CityInputForm";
import { Grid } from "@mui/material";
import { SavedCityList } from "./components/SavedCityList/SavedCityList";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/utils/hooks";
import { addCitiesFromLocalStorage } from "./redux/features/cityList/cityListSlice";
import { fetchWeather } from "./redux/utils/getWeather";

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
      <Grid container spacing={5}>
        <Grid item xs={9}>
          <WeatherCards />
        </Grid>
        <Grid item xs={3}>
          <Grid container direction="column">
            <Grid item>
              <CityInputForm />
            </Grid>
            <Grid item>
              <SavedCityList />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
