import { Card, Grid } from "@mui/material";

export function WeatherCard({ cityName }: { cityName: string }) {
  return (
    <Grid item xs={3}>
      <Card>
        <span>icon</span>
        <p>15C</p>
        <p>{cityName}</p>
      </Card>
    </Grid>
  );
}
