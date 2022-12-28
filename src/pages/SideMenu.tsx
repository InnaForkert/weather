import CssBaseline from "@mui/material/CssBaseline";
import { WeatherCards } from "../components/WeatherCards/WeatherCards";
import { CityInputForm } from "../components/CityInputForm/CityInputForm";
import { Grid } from "@mui/material";
import { SavedCityList } from "../components/SavedCityList/SavedCityList";

export function SideMenu() {
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
