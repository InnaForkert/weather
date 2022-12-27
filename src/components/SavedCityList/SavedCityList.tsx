import { List, ListItem } from "@mui/material";
import { nanoid } from "nanoid";

export function SavedCityList({ cityList }: { cityList: string[] }) {
  return (
    <List>
      {cityList.map((el) => (
        <ListItem key={nanoid()}>{el}</ListItem>
      ))}
      {/*       
      <ListItem>Kyiv</ListItem>
      <ListItem>Kyiv</ListItem>
      <ListItem>Kyiv</ListItem> */}
    </List>
  );
}
