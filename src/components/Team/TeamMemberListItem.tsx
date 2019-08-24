import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";

interface TeamMemberListItemProps {
  member: string;
}
const TeamMemberListItem = ({ member }: TeamMemberListItemProps) => {
  return (
    <ListItem button>
      <ListItemText primary={member} />
    </ListItem>
  );
};

export default TeamMemberListItem;
