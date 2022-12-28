import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/utils/hooks";
import { fetchHourlyForecast } from "../redux/utils/getWeather";
import { Card, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { HourlyChart } from "../components/HourlyChart/HourlyChart";

export function Details() {
  const { cityId } = useParams();
  const weather = useAppSelector((state) => state.weather.values);
  const hourlyWeather = useAppSelector((state) => state.weather.currentWeather);
  const dispatch = useAppDispatch();

  const currentCityWeather = weather.find((el) => el.name === cityId);

  useEffect(() => {
    if (currentCityWeather) {
      dispatch(fetchHourlyForecast(currentCityWeather.coord));
    }
  }, [currentCityWeather, dispatch]);

  console.log(currentCityWeather);

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
    <Card>
      <Grid2 container>
        <Grid2>
          <Typography>{cityId}</Typography>
          <Typography>Temperature: {temp}°C</Typography>
          <Typography>Feels like: {feelsLike}°C</Typography>
          <Typography>{description}</Typography>
        </Grid2>
        <Grid2>
          <img src={imgUrl} alt="" />
        </Grid2>
      </Grid2>
      <Typography>Humidity: {humidity}%</Typography>
      <Typography>Pressure: {pressure} mb</Typography>
      <Typography>Wind speed: {windSpeed} m/s</Typography>
      <HourlyChart weather={hourlyWeather} />
    </Card>
  );
}
