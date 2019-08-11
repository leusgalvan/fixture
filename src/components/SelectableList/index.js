import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box
} from "@material-ui/core";
import EmptyFeedbackImage from "../Common/EmptyFeedbackImage";

const SelectableList = ({
  items = [],
  selectedIndexes = [],
  onItemClicked = () => {}
}) => {
  const isSelected = i => selectedIndexes.includes(i);
  return items && items.length > 0 ? (
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
  ) : (
    <Box textAlign="center" width={1}>
      <EmptyFeedbackImage />
      <Typography variant="subtitle1">No items to display</Typography>
    </Box>
  );
};

export default SelectableList;
