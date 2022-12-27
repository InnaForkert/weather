import { Grid } from "@mui/material";
import { nanoid } from "nanoid";

import { useEffect } from "react";

import { WeatherCard } from "../WeatherCard/WeatherCard";
import { fetchWeather } from "../../redux/utils/getWeather";
import { useAppSelector, useAppDispatch } from "../../redux/utils/hooks";

export function WeatherCards() {
  const cityList = useAppSelector((state) => state.cityList.list);
  const dispatch = useAppDispatch();

  useEffect(() => {
    cityList.forEach((city) => {
      dispatch(fetchWeather(city));
    });
  }, [dispatch, cityList]);

  return (
    <Grid container spacing={5}>
      {cityList.map((el) => (
        <WeatherCard key={nanoid()} cityName={el} />
      ))}
    </Grid>
  );
}
