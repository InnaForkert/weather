import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/utils/hooks";
import { fetchHourlyForecast } from "../redux/utils/getWeather";

import { Button, Card, Typography, Grid } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import { HourlyChart } from "../components/HourlyChart";

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

  if (currentCityWeather) {
    imgUrl = `http://openweathermap.org/img/wn/${currentCityWeather.weather[0].icon}@2x.png`;
    temp = Math.round(currentCityWeather.main.temp);
    feelsLike = Math.round(currentCityWeather.main.feels_like);
    humidity = Math.round(currentCityWeather.main.humidity);
    pressure = Math.round(currentCityWeather.main.pressure);
    description = currentCityWeather.weather[0].description;
    windSpeed = Math.round(currentCityWeather.wind.speed);
  }

  return (
    <Grid item xs={11} md={11} lg={9}>
      <Card aria-label="detailed weather">
        <Grid container p={3} spacing={0}>
          <Grid item sm={11} md={5}>
            <Grid container alignItems="center">
              <Typography variant="h3" component="h1" mb={2} title="city name">
                {cityId}
              </Typography>
              <img src={imgUrl} alt="weather icon" />
            </Grid>
            <Typography variant="h5" component="p" mb={1} title="temperature">
              Temperature: {temp}°C
            </Typography>
            <Typography variant="h5" component="p" mb={1} title="feels like">
              Feels like: {feelsLike}°C
            </Typography>
            <Typography fontStyle="italic" mb={2} title="description">
              {description}
            </Typography>
            <Typography title="humidity">Humidity: {humidity}%</Typography>
            <Typography title="pressure">Pressure: {pressure} mb</Typography>
            <Typography title="wind speed">
              Wind speed: {windSpeed} m/s
            </Typography>
          </Grid>
          <Grid sm={11} md={7} item>
            <HourlyChart weather={hourlyWeather} />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<ArrowCircleLeftIcon />}
              onClick={() => navigate("/")}
            >
              Back to all cities
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
