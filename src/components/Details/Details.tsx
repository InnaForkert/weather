import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/utils/hooks";
import { fetchHourlyForecast } from "../../redux/utils/getWeather";

import { HourlyChart } from "../HourlyChart/HourlyChart";
import {
  DetailsContainer,
  CityName,
  WeatherIcon,
  Temp,
  Description,
  Detail,
  DetailsHeading,
} from "./Details.styled";
import { Submit } from "../CityInputForm/CityInputForm.styled";

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
    <DetailsContainer aria-label="detailed weather">
      <div>
        <DetailsHeading>
          <CityName title="city name">{cityId}</CityName>
          <WeatherIcon src={imgUrl} alt="weather icon" />
        </DetailsHeading>
        <Temp title="temperature">Temperature: {temp}°C</Temp>
        <Temp title="feels like">Feels like: {feelsLike}°C</Temp>
        <Description title="description">{description}</Description>
        <Detail title="humidity">Humidity: {humidity}%</Detail>
        <Detail title="pressure">Pressure: {pressure} mb</Detail>
        <Detail title="wind speed">Wind speed: {windSpeed} m/s</Detail>
      </div>
      <HourlyChart weather={hourlyWeather} />
      <Submit onClick={() => navigate("/")}>Back to all cities</Submit>
    </DetailsContainer>
  );
}
