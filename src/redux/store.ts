import { configureStore } from "@reduxjs/toolkit";
import cityListReducer from "./features/cityList/cityListSlice";
import weatherReducer from "./features/weather/weatherSlice";

export const store = configureStore({
  reducer: {
    cityList: cityListReducer,
    weather: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
