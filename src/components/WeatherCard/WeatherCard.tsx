import { Card, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CachedIcon from "@mui/icons-material/Cached";
import { useAppDispatch, useAppSelector } from "../../redux/utils/hooks";
import { useNavigate } from "react-router";
import { fetchWeather } from "../../redux/utils/getWeather";

export function WeatherCard({ cityName }: { cityName: string }) {
  const values = useAppSelector((state) => state.weather.values);
  const weather = values.find((el) => el.name === cityName);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handleOnClick(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.nodeName === "svg") {
      dispatch(fetchWeather(cityName));
      console.log("hi");
    } else {
      navigate(`details/${cityName}`);
    }
  }

  let imgUrl = "";
  let temp = 0;

  if (weather) {
    imgUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    temp = Math.round(weather.main.temp);
  }

  return (
    <Card onClick={handleOnClick}>
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
      <Grid2 container justifyContent="center">
        <CachedIcon fontSize="large" />
        <Typography variant="h5" component="p" textAlign="center" pb={3} ml={2}>
          {cityName}
        </Typography>
      </Grid2>
    </Card>
  );
}
