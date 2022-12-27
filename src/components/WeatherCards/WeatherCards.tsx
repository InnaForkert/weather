import { Card, Grid } from "@mui/material";

export function WeatherCards() {
  return (
    <Grid container spacing={5}>
      <Grid item xs={3}>
        <Card>
          <span>icon</span>
          <p>15C</p>
          <p>Kyiv</p>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card>
          <span>icon</span>
          <p>15C</p>
          <p>Kyiv</p>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card>
          <span>icon</span>
          <p>15C</p>
          <p>Kyiv</p>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card>
          <span>icon</span>
          <p>15C</p>
          <p>Kyiv</p>
        </Card>
      </Grid>
    </Grid>
  );
}
