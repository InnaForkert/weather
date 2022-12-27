import { configureStore } from "@reduxjs/toolkit";
import cityListReducer from "./features/cityList/cityListSlice";
import weatherReducer from "./features/weather/weatherSlice";

export const store = configureStore({
  reducer: {
    cityList: cityListReducer,
    weather: weatherReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
