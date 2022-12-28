import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const key = "4d63b34e2bfdbbcbd4d5a5f459e43328";

export const fetchWeather = createAsyncThunk(
  "weather/fetch",
  async (city: string, thunkAPI) => {
    try {
      const cityCoordsObj: { data: { lon: number; lat: number }[] } =
        await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=2&appid=${key}`
        );
      const cityLat = cityCoordsObj.data[0].lat;
      const cityLon = cityCoordsObj.data[0].lon;

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${key}&&units=metric`
      );

      const data = response.data;
      data.name = city;
      return data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
      console.log("unknown error");
    }
  }
);

export const fetchHourlyForecast = createAsyncThunk(
  "weather/fetchHourly",
  async (coord: { lon: string; lat: string }, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${key}&&units=metric`
      );

      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        return thunkAPI.rejectWithValue(e.message);
      }
      console.log("unknown error");
    }
  }
);
