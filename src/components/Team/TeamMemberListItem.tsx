import React from "react";
import { User } from "../../types";
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
