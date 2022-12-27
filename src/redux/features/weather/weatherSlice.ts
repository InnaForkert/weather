import { createSlice } from "@reduxjs/toolkit";
import { fetchWeather } from "../../utils/getWeather";

export interface Weather {
  values: object[];
  isLoading: boolean;
  error: unknown;
}

const initialState: Weather = {
  values: [],
  isLoading: false,
  error: null,
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
  },
});

export default weatherSlice.reducer;
