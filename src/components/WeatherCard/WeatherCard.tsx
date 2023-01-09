import { useAppDispatch, useAppSelector } from "../../redux/utils/hooks";
import { useNavigate } from "react-router";
import { fetchWeather } from "../../redux/utils/getWeather";
import { useState } from "react";
import { removeCityFromList } from "../../redux/features/cityList/cityListSlice";
import { removeCityFromValues } from "../../redux/features/weather/weatherSlice";
import { Submit } from "../CityInputForm/CityInputForm.styled";
import {
  CardContainer,
  WeatherIcon,
  Temp,
  CityName,
  Delete,
} from "./WeatherCard.styled";

export function WeatherCard({ cityName }: { cityName: string }) {
  const values = useAppSelector((state) => state.weather.values);
  const weather = values.find((el) => el.name === cityName);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleCardClick(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.nodeName !== "BUTTON") {
      navigate(`details/${cityName}`);
    }
  }

  async function refreshWeather() {
    await dispatch(fetchWeather(cityName));
  }

  function onDelete() {
    dispatch(removeCityFromList(cityName));
    dispatch(removeCityFromValues(cityName));
  }

  let imgUrl = "";
  let temp = 0;

  if (weather) {
    imgUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    temp = Math.round(weather.main.temp);
  }

  return (
    <CardContainer onClick={handleCardClick} aria-label="weather card">
      <WeatherIcon src={imgUrl} alt="weather icon" />
      <Temp title="temperature">{temp}°C</Temp>
      <CityName title="city name">{cityName}</CityName>
      <Submit onClick={refreshWeather} name="refresh data">
        Refresh
      </Submit>
      <Delete onClick={onDelete}>Delete</Delete>
    </CardContainer>
  );
}
