import { List, ListItem } from "@mui/material";
import { nanoid } from "nanoid";

import type { RootState } from "../../redux/store";
import {
  removeCity,
  addCitiesFromLocalStorage,
} from "../../redux/features/cityList/cityListSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export function SavedCityList() {
  useEffect(() => {
    const cities = localStorage.getItem("savedCities");
    if (cities) {
      dispatch(addCitiesFromLocalStorage(JSON.parse(cities)));
    }
  }, []);

  const cityList = useSelector((state: RootState) => state.cityList.list);
  const dispatch = useDispatch();

  return (
    <List>
      {cityList.map((el) => (
        <ListItem key={nanoid()} onClick={() => dispatch(removeCity(el))}>
          {el}
        </ListItem>
      ))}
    </List>
  );
}
