import { nanoid } from "nanoid";

// import Grid from "@mui/material/Unstable_Grid/Grid";

import { useAppSelector } from "../redux/utils/hooks";

import { WeatherCard } from "./WeatherCard";
import { Grid, Typography } from "@mui/material";
import { WeatherObj } from "../redux/features/weather/weatherSlice";

export function WeatherCards() {
  const cityList = useAppSelector((state) => state.cityList.list);
  const values = useAppSelector((state) => state.weather.values);

  return (
    <>
      {values.length ? (
        <Grid container spacing={2} p={2}>
          {cityList.map((el: string) => {
            if (values.find((value: WeatherObj) => value.name === el)) {
              return (
                <Grid item xs={11} md={5} lg={3} key={nanoid()} m={1}>
                  <WeatherCard cityName={el} />
                </Grid>
              );
            }
            return "";
          })}
        </Grid>
      ) : (
        <Typography> No saved cities yet 😥 </Typography>
      )}
    </>
  );
}
