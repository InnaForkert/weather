import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5/weather";

const key = "5594fc1d85d0401b513dc15c2ba32cba";

export const fetchWeather = createAsyncThunk(
  "weather/fetch",
  async (city: string, thunkAPI) => {
    try {
      const response = await axios.get(`?q=${city}&appid=${key}`);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);
