import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const key = "4d63b34e2bfdbbcbd4d5a5f459e43328";

export const fetchWeather = createAsyncThunk(
  "weather/fetch",
  async (city: string, thunkAPI) => {
    try {
      const cityCoordsObj: { lat: number; lon: number }[] = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}}`
      );
      const cityLat = cityCoordsObj[0].lat;
      const cityLon = cityCoordsObj[0].lon;

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${key}`
      );
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);
