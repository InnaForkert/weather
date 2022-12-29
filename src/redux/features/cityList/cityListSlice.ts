import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CityList {
  list: string[];
}

const initialState: CityList = {
  list: [],
};

export const cityListSlice = createSlice({
  name: "cityList",
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<string>) => {
      state.list.push(action.payload);
    },
    removeCityFromList: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((el) => el !== action.payload);
    },
    addCitiesFromLocalStorage: (state, action: PayloadAction<string[]>) => {
      state.list = [...action.payload];
    },
  },
});

export const { addCity, removeCityFromList, addCitiesFromLocalStorage } =
  cityListSlice.actions;

export default cityListSlice.reducer;
