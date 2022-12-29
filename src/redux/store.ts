import {
  PreloadedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import cityListReducer from "./features/cityList/cityListSlice";
import weatherReducer from "./features/weather/weatherSlice";

const rootReducer = combineReducers({
  cityList: cityListReducer,
  weather: weatherReducer,
});

export const store = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
