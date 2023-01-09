import { useAppDispatch, useAppSelector } from "../../redux/utils/hooks";
import { useNavigate } from "react-router";
import { fetchWeather } from "../../redux/utils/getWeather";
import { useState } from "react";
import { removeCityFromList } from "../../redux/features/cityList/cityListSlice";
import { removeCityFromValues } from "../../redux/features/weather/weatherSlice";

export function WeatherCard({ cityName }: { cityName: string }) {
  const isLoading = useAppSelector((state) => state.weather.isLoading);
  const values = useAppSelector((state) => state.weather.values);
  const weather = values.find((el) => el.name === cityName);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [id, setId] = useState("");

  function handleCardClick(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.nodeName !== "button") {
      navigate(`details/${cityName}`);
    }
  }

  async function refreshWeather() {
    setId(cityName);
    await dispatch(fetchWeather(cityName));
    setId("");
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
    <>
      <div onClick={handleCardClick} aria-label="weather card">
        <img src={imgUrl} alt="" />
        <h4 title="temperature">{temp}°C</h4>
        <p title="city name">{cityName}</p>
      </div>
      <button
        // loading={isLoading && id === cityName}
        // loadingIndicator="Loading…"
        onClick={refreshWeather}
        name="refresh data"
      >
        Refresh
      </button>
      <button onClick={onDelete}>Delete</button>
    </>
  );
}
