import CssBaseline from "@mui/material/CssBaseline";
import { WeatherCards } from "./components/WeatherCards/WeatherCards";
import { CityInputForm } from "./components/CityInputForm/CityInputForm";
import { Grid } from "@mui/material";
import { SavedCityList } from "./components/SavedCityList/SavedCityList";
import { useEffect, useRef } from "react";

function App() {
  const cityList = useRef([]);

  useEffect(() => {
    const citiesFromStorage = localStorage.getItem("savedCities");
    if (citiesFromStorage) {
      cityList.current = JSON.parse(citiesFromStorage);
    }
  }, []);

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
              <SavedCityList cityList={cityList.current} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
