import { Grid } from "@mui/material";
import { nanoid } from "nanoid";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { WeatherCard } from "../WeatherCard/WeatherCard";
import { useAppSelector } from "../../redux/utils/hooks";
import { Link } from "react-router-dom";

export function WeatherCards() {
  const cityList = useAppSelector((state) => state.cityList.list);
  const { isLoading, values } = useAppSelector((state) => state.weather);

  return (
    <Grid2 container spacing={4}>
      {cityList.map((el, i) => (
        <Link to={"details/el"}>
          <WeatherCard
            key={nanoid()}
            cityName={el}
            isLoading={isLoading}
            value={values[i]}
          />
        </Link>
      ))}
    </Grid2>
  );
}
