import { Alert, Button, Grid, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";

import {
  addCity,
  saveCitiesToLocalStorage,
} from "../../redux/features/cityList/cityListSlice";
import { useAppSelector, useAppDispatch } from "../../redux/utils/hooks";
import { fetchWeather } from "../../redux/utils/getWeather";

export function CityInputForm() {
  const [cityName, setCityName] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const cityList = useAppSelector((state) => state.cityList.list);

  const dispatch = useAppDispatch();

  function handleInput(e: React.FormEvent<HTMLDivElement>) {
    if (e.target) {
      const target = e.target as HTMLInputElement;
      setCityName(target.value.toLowerCase());
    }
  }

  function saveCity(e: React.FormEvent) {
    e.preventDefault();
    if (cityList.includes(cityName)) {
      setSnackBarOpen(true);
    } else {
      dispatch(addCity(cityName));
      dispatch(saveCitiesToLocalStorage());
      dispatch(fetchWeather(cityName));
      setCityName("");
    }
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
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBarOpen(false)}
      >
        <Alert
          onClose={() => setSnackBarOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          City already in the list!
        </Alert>
      </Snackbar>
    </form>
  );
}
