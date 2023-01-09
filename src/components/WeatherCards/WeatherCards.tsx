import { useAppSelector } from "../../redux/utils/hooks";

import { WeatherCard } from "../WeatherCard/WeatherCard";
import { WeatherObj } from "../../redux/features/weather/weatherSlice";
import { CardsContainer, Empty } from "./WeatherCards.styled";

export function WeatherCards() {
  const cityList = useAppSelector((state) => state.cityList.list);
  const values = useAppSelector((state) => state.weather.values);

  return (
    <>
      {values.length ? (
        <CardsContainer>
          {cityList.map((el: string) => {
            if (values.find((value: WeatherObj) => value.name === el)) {
              return <WeatherCard cityName={el} />;
            }
            return "";
          })}
        </CardsContainer>
      ) : (
        <Empty> No saved cities yet 😥 </Empty>
      )}
    </>
  );
}
