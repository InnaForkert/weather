import { List, Typography, ListItemButton } from "@mui/material";
import { nanoid } from "nanoid";

import type { RootState } from "../../redux/store";
import { addCitiesFromLocalStorage } from "../../redux/features/cityList/cityListSlice";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import React from "react";

import { NavLink as RouterLink } from "react-router-dom";

export function SavedCityList() {
  const cityList = useSelector((state: RootState) => state.cityList.list);
  const dispatch = useDispatch();

  useEffect(() => {
    const cities = localStorage.getItem("savedCities");
    if (cities) {
      dispatch(addCitiesFromLocalStorage(JSON.parse(cities)));
    }
  }, [dispatch]);

  return (
    <List>
      {cityList.map((el) => (
        <ListItemButton
          color="inherit"
          component={RouterLink}
          to={`details/${el}`}
          key={nanoid()}
        >
          <Typography color="black" p={1}>
            {el}
          </Typography>
        </ListItemButton>
      ))}
    </List>
  );
}
