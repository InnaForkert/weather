import { Button, Grid, TextField } from "@mui/material";

export function CityInputForm() {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <TextField
          id="outlined-basic"
          label="Enter city name"
          variant="outlined"
        />
      </Grid>
      <Grid item>
        <Button variant="contained">Contained</Button>
      </Grid>
    </Grid>
  );
}
