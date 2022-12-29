import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/utils/hooks";
import { fetchHourlyForecast } from "../redux/utils/getWeather";

import { Button, Card, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import { HourlyChart } from "../components/HourlyChart/HourlyChart";

export function Details() {
  const { cityId } = useParams();
  const weather = useAppSelector((state) => state.weather.values);
  const hourlyWeather = useAppSelector((state) => state.weather.currentWeather);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentCityWeather = weather.find((el) => el.name === cityId);

  useEffect(() => {
    if (currentCityWeather) {
      dispatch(fetchHourlyForecast(currentCityWeather.coord));
    }
  }, [currentCityWeather, dispatch]);

  let imgUrl = "";
  let temp = 0;
  let feelsLike = 0;
  let humidity = 0;
  let pressure = 0;
  let description = "";
  let windSpeed = 0;
  let cityName = cityId;

  if (currentCityWeather) {
    imgUrl = `http://openweathermap.org/img/wn/${currentCityWeather.weather[0].icon}@2x.png`;
    temp = Math.round(currentCityWeather.main.temp);
    feelsLike = Math.round(currentCityWeather.main.feels_like);
    humidity = Math.round(currentCityWeather.main.humidity);
    pressure = Math.round(currentCityWeather.main.pressure);
    description = currentCityWeather.weather[0].description;
    windSpeed = Math.round(currentCityWeather.wind.speed);
    cityName =
      currentCityWeather.name[0].toUpperCase() +
      currentCityWeather.name.slice(1).toLowerCase();
  }

  return (
    <>
      <Card>
        <Grid2 container alignItems="center">
          <Grid2 sm={12} md={5}>
            <Grid2 container alignItems="center">
              <Typography variant="h3" component="h1" mb={2}>
                {cityId}
              </Typography>
              <img src={imgUrl} alt="" />
            </Grid2>
            <Typography variant="h5" component="p" mb={1}>
              Temperature: {temp}°C
            </Typography>
            <Typography variant="h5" component="p" mb={1}>
              Feels like: {feelsLike}°C
            </Typography>
            <Typography fontStyle="italic" mb={2}>
              {description}
            </Typography>
            <Typography>Humidity: {humidity}%</Typography>
            <Typography>Pressure: {pressure} mb</Typography>
            <Typography>Wind speed: {windSpeed} m/s</Typography>
          </Grid2>
          <Grid2 sm={11} md={7}>
            <HourlyChart weather={hourlyWeather} />
          </Grid2>
          <Grid2>
            <Button
              variant="contained"
              startIcon={<ArrowCircleLeftIcon />}
              onClick={() => navigate("/")}
            >
              Back to all cities
            </Button>
          </Grid2>
        </Grid2>
      </Card>
    </>
  );
}
