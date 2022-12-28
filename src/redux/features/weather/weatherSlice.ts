import { createSlice } from "@reduxjs/toolkit";
import { fetchWeather, fetchHourlyForecast } from "../../utils/getWeather";

export interface WeatherObj {
  weather: [{ icon: string; description: string }];
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  coord: {
    lon: string;
    lat: string;
  };
  wind: {
    speed: number;
  };
}

export interface CurrentWeatherObj {}

export interface Weather {
  values: WeatherObj[];
  isLoading: boolean;
  error: unknown;
  currentWeather: CurrentWeatherObj;
}

const initialState: Weather = {
  values: [],
  isLoading: false,
  error: null,
  currentWeather: {},
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.values.push(action.payload);
    });
    builder.addCase(fetchWeather.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as object;
    });

    builder.addCase(fetchHourlyForecast.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHourlyForecast.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.currentWeather = action.payload;
    });
    builder.addCase(fetchHourlyForecast.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as object;
    });
  },
});

export default weatherSlice.reducer;
