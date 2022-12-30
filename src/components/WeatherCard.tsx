import { Button, Card, Typography, Grid } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CachedIcon from "@mui/icons-material/Cached";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../redux/utils/hooks";
import { useNavigate } from "react-router";
import { fetchWeather } from "../redux/utils/getWeather";
import { useState } from "react";
import { removeCityFromList } from "../redux/features/cityList/cityListSlice";
import { removeCityFromValues } from "../redux/features/weather/weatherSlice";

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
      <Card>
        <Grid
          onClick={handleCardClick}
          container
          alignItems="center"
          flexDirection="column"
          aria-label="weather card"
        >
          <Grid
            container
            alignItems="center"
            justifyContent=""
            flexDirection="column"
            pt={2}
          >
            <Grid item>
              <Grid
                container
                spacing={2}
                pt={3}
                alignItems="center"
                justifyContent="center"
              >
                <img src={imgUrl} alt="" />
                <Typography variant="h4" component="p" title="temperature">
                  {temp}°C
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography
              variant="h5"
              component="p"
              textAlign="center"
              title="city name"
              pb={3}
            >
              {cityName}
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-around" pb={3}>
          <LoadingButton
            loading={isLoading && id === cityName}
            loadingIndicator="Loading…"
            variant="contained"
            startIcon={<CachedIcon />}
            onClick={refreshWeather}
            name="refresh data"
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
        </Grid>
      </Card>
    </>
  );
}
