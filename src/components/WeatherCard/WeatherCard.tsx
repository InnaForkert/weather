import { Button, Card, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CachedIcon from "@mui/icons-material/Cached";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../redux/utils/hooks";
import { useNavigate } from "react-router";
import { fetchWeather } from "../../redux/utils/getWeather";
import { useState } from "react";
import {
  removeCity,
  saveCitiesToLocalStorage,
} from "../../redux/features/cityList/cityListSlice";

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
    console.log("hi");
    dispatch(removeCity(cityName));
    dispatch(saveCitiesToLocalStorage());
  }

  let imgUrl = "";
  let temp = 0;

  if (weather) {
    imgUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    temp = Math.round(weather.main.temp);
  }

  return (
    <Card>
      <Grid2
        onClick={handleCardClick}
        container
        alignItems="center"
        spacing={2}
        flexDirection="column"
      >
        <Grid2 container alignItems="center">
          <img src={imgUrl} alt="" />
          <Typography variant="h4" component="p">
            {temp}°C
          </Typography>
        </Grid2>
        <Typography variant="h5" component="p" textAlign="center" ml={2}>
          {cityName}
        </Typography>
      </Grid2>
      <Grid2 container justifyContent="space-around">
        <LoadingButton
          loading={isLoading && id === cityName}
          loadingIndicator="Loading…"
          variant="contained"
          startIcon={<CachedIcon />}
          onClick={refreshWeather}
        >
          Refresh
        </LoadingButton>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={onDelete}
        >
          Delete
        </Button>
      </Grid2>
    </Card>
  );
}
