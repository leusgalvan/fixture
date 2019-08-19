import React from "react";
import { User } from "../../types";
import { ListItem, ListItemText } from "@material-ui/core";

interface TeamMemberListItemProps {
  member: User;
}
const TeamMemberListItem = ({ member }: TeamMemberListItemProps) => {
  return (
    <ListItem button>
      <ListItemText primary={member.displayName} />
    </ListItem>
  );
};

export default TeamMemberListItem;
