import React, { useState } from "react";

import { addCity } from "../../redux/features/cityList/cityListSlice";
import { useAppSelector, useAppDispatch } from "../../redux/utils/hooks";
import { fetchWeather } from "../../redux/utils/getWeather";

import Notiflix from "notiflix";

import { Form, Input, Submit, Label, Hide } from "./CityInputForm.styled";

export function CityInputForm() {
  const [cityName, setCityName] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const values = useAppSelector((state) => state.weather.values);
  const dispatch = useAppDispatch();

  function handleInput(e: React.FormEvent<HTMLDivElement>) {
    if (e.target) {
      const target = e.target as HTMLInputElement;
      setCityName(target.value);
    }
  }

  function saveCity(e: React.FormEvent) {
    e.preventDefault();
    if (cityName.length === 0) {
      Notiflix.Notify.failure("Enter Something!");
      return;
    }

    const cityCapitalized =
      cityName.length > 1
        ? cityName.toLowerCase()[0].toUpperCase() +
          cityName
            .toLowerCase()
            .slice(1)
            .replace(/(\s.)/g, (letter) => letter.toUpperCase())
        : cityName;

    if (values.find((value) => value.name === cityCapitalized)) {
      Notiflix.Notify.failure("City already in the list!");
    } else {
      dispatch(addCity(cityCapitalized));
      dispatch(fetchWeather(cityCapitalized));
      setCityName("");
    }
  }

  return (
    <Form
      onSubmit={(e: React.FormEvent) => saveCity(e)}
      aria-label="search city form"
      className={isHidden ? "hidden-form" : ""}
    >
      <Hide onClick={() => setIsHidden((prev) => !prev)}>
        {isHidden ? "▶" : "◀"}
      </Hide>
      <Input
        id="cityName"
        value={cityName}
        onInput={(e: React.FormEvent<HTMLDivElement>) => handleInput(e)}
        role="input"
        placeholder=" "
        data-testid="content-input"
      />
      <Label htmlFor="cityName">Enter city name</Label>
      <Submit type="submit">Save</Submit>
    </Form>
  );
}
