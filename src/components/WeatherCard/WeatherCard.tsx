import { Card, Typography } from "@mui/material";
import { WeatherObj } from "../../redux/features/weather/weatherSlice";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useAppSelector } from "../../redux/utils/hooks";

export function WeatherCard({ cityName }: { cityName: string }) {
  const values = useAppSelector((state) => state.weather.values);
  const weather = values.find((el) => el.name === cityName);

  let imgUrl = "";
  let temp = 0;

  if (weather) {
    imgUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    temp = Math.round(weather.main.temp);
  }

  return (
    <Card>
      <Grid2
        container
        alignItems="center"
        spacing={2}
        justifyContent="space-around"
      >
        <Grid2>
          <img src={imgUrl} alt="" />
        </Grid2>

        <Grid2>
          <Typography variant="h4" component="p">
            {temp}°C
          </Typography>
        </Grid2>
      </Grid2>
      <Typography variant="h5" component="p" textAlign="center" pb={3}>
        {cityName}
      </Typography>
    </Card>
  );
}
