import { nanoid } from "nanoid";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { useAppSelector } from "../../redux/utils/hooks";

import { WeatherCard } from "../WeatherCard/WeatherCard";
import { Typography } from "@mui/material";

export function WeatherCards() {
  const cityList = useAppSelector((state) => state.cityList.list);
  const values = useAppSelector((state) => state.weather.values);

  return (
    <>
      {values.length ? (
        <Grid2 container spacing={2}>
          {cityList.map((el) => {
            if (values.find((value) => value.name === el)) {
              return (
                <Grid2 xs={12} md={6} lg={4} key={nanoid()}>
                  <WeatherCard cityName={el} />
                </Grid2>
              );
            }
            return "";
          })}
        </Grid2>
      ) : (
        <Typography> No saved cities yet 😥 </Typography>
      )}
    </>
  );
}
