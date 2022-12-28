import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const key = "4d63b34e2bfdbbcbd4d5a5f459e43328";

export const fetchWeather = createAsyncThunk(
  "weather/fetch",
  async (city: string, thunkAPI) => {
    try {
      const cityCoordsObj: { data: { lat: string; lon: string }[] } =
        await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=2&appid=${key}`
        );
      console.log(cityCoordsObj.data);
      const cityLat = cityCoordsObj.data[0].lat;
      const cityLon = cityCoordsObj.data[0].lon;

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${key}`
      );
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
      console.log("unknown error");
    }
  }
);
