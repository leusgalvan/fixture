import React, { useState } from "react";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Team } from "../../types";
import TeamMemberListItem from "./TeamMemberListItem";

export interface TeamListItemProps {
  team: Team;
}

const TeamListItem = ({ team }: TeamListItemProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={team.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          {team.members.map(member => (
            <TeamMemberListItem member={member} />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default TeamListItem;
