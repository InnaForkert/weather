import { Alert, Button, Grid, Paper, Snackbar, TextField } from "@mui/material";
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
      setCityName(target.value);
    }
  }

  function saveCity(e: React.FormEvent) {
    e.preventDefault();
    const cityCapitalized =
      cityName.length > 1
        ? cityName.toLowerCase()[0].toUpperCase() +
          cityName
            .toLowerCase()
            .slice(1)
            .replace(/(\s.)/g, (letter) => letter.toUpperCase())
        : cityName;

    if (cityList.includes(cityCapitalized)) {
      setSnackBarOpen(true);
    } else {
      dispatch(addCity(cityCapitalized));
      dispatch(saveCitiesToLocalStorage());
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
    </Paper>
  );
}
