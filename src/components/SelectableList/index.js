import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";

const SelectableList = ({ items, selectedIndexes, onItemClicked, classes }) => {
  const isSelected = i => selectedIndexes.includes(i);
  console.log();
  return (
    <List variant="div" disablePadding>
      {items.map((item, i) => (
        <ListItem
          button
          onClick={event => onItemClicked(i)}
          key={i}
          selected={isSelected(i)}
        >
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
};

export default SelectableList;
