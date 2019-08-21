import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Checkbox
} from "@material-ui/core";
import EmptyFeedbackImage from "../Common/EmptyFeedbackImage";

interface SelectableListProps {
  items?: React.ReactNode[];
  selectedIndexes?: number[];
  onItemClicked?: (index: number) => void;
}

const SelectableList = ({
  items = [],
  selectedIndexes = [],
  onItemClicked = () => {}
}: SelectableListProps) => {
  const isSelected = (i: number) => selectedIndexes.includes(i);

  return items && items.length > 0 ? (
    <List component="div" disablePadding>
      {items.map((item, i) => (
        <ListItem
          button
          onClick={() => onItemClicked(i)}
          key={i}
          selected={isSelected(i)}
        >
          <Checkbox checked={isSelected(i)} onChange={() => onItemClicked(i)}
              color="primary"/>
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
