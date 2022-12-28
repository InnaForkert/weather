import { nanoid } from "nanoid";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { useAppSelector } from "../../redux/utils/hooks";

import { NavLink } from "react-router-dom";

import { WeatherCard } from "../WeatherCard/WeatherCard";
import { Link } from "@mui/material";

export function WeatherCards() {
  const cityList = useAppSelector((state) => state.cityList.list);
  const { values } = useAppSelector((state) => state.weather);

  return (
    <Grid2 container spacing={2}>
      {cityList.map((el, i) => (
        <Grid2 xs={12} md={6} lg={4} key={nanoid()}>
          <Link underline="none" component={NavLink} to={`details/${el}`}>
            <WeatherCard value={values[i]} />
          </Link>
        </Grid2>
      ))}
    </Grid2>
  );
}
