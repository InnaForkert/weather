import { Button, Grid, Paper, TextField } from "@mui/material";
import React, { useState } from "react";

import { addCity } from "../../redux/features/cityList/cityListSlice";
import { useAppSelector, useAppDispatch } from "../../redux/utils/hooks";
import { fetchWeather } from "../../redux/utils/getWeather";
import Notiflix from "notiflix";
import { stat } from "fs";

export function CityInputForm() {
  const [cityName, setCityName] = useState("");
  const cityList = useAppSelector((state) => state.cityList.list);
  const values = useAppSelector((state) => state.weather.values);

  const dispatch = useAppDispatch();

  function handleInput(e: React.FormEvent<HTMLDivElement>) {
    if (e.target) {
      const target = e.target as HTMLInputElement;
      setCityName(target.value);
    }
  }

  function saveCity(e: React.FormEvent) {
    e.preventDefault();
    if (cityName.length === 0) {
      Notiflix.Notify.failure("Enter Something!");
      return;
    }
    const cityCapitalized =
      cityName.length > 1
        ? cityName.toLowerCase()[0].toUpperCase() +
          cityName
            .toLowerCase()
            .slice(1)
            .replace(/(\s.)/g, (letter) => letter.toUpperCase())
        : cityName;

    if (values.find((value) => value.name === cityCapitalized)) {
      Notiflix.Notify.failure("City already in the list!");
    } else {
      dispatch(addCity(cityCapitalized));
      dispatch(fetchWeather(cityCapitalized));
      setCityName("");
    }
  }

  return (
    <Paper sx={{ position: "fixed", right: "5%", top: "11%" }} elevation={3}>
      <form onSubmit={(e) => saveCity(e)}>
        <Grid container direction="column" spacing={2} p={2}>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Enter city name"
              variant="outlined"
              value={cityName}
              onInput={(e) => handleInput(e)}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
