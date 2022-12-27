import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

import {
  addCity,
  saveCitiesToLocalStorage,
} from "../../redux/features/cityList/cityListSlice";
import { useDispatch } from "react-redux";

export function CityInputForm() {
  const [cityName, setCityName] = useState("");

  const dispatch = useDispatch();

  function handleInput(e: React.FormEvent<HTMLDivElement>) {
    if (e.target) {
      const target = e.target as HTMLInputElement;
      setCityName(target.value);
    }
  }

  function saveCity(e: React.FormEvent) {
    e.preventDefault();
    dispatch(addCity(cityName));
    dispatch(saveCitiesToLocalStorage());
    setCityName("");
  }

  return (
    <form onSubmit={(e) => saveCity(e)}>
      <Grid container direction="column" spacing={2}>
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
  );
}
