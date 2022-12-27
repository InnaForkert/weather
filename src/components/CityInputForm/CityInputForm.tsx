import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

export function CityInputForm() {
  const [cityName, setCityName] = useState("");
  const [citiesList, setCitiesList] = useState<string[]>([]);

  function handleInput(e: React.FormEvent<HTMLDivElement>) {
    if (e.target) {
      const target = e.target as HTMLInputElement;
      setCityName(target.value);
    }
  }

  function saveCity(e: React.FormEvent) {
    e.preventDefault();
    setCitiesList([...citiesList, cityName]);
    setTimeout(
      () => localStorage.setItem("savedCities", JSON.stringify(citiesList)),
      0
    );
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
