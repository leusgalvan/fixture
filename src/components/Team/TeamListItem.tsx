import React, { useState } from "react";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Team } from "../../types";
import TeamMemberListItem from "./TeamMemberListItem";
import Delete from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

export interface TeamListItemProps {
  team: Partial<Team>;
  onDelete?(team: Partial<Team>): void;
}

const TeamListItem = ({ team, onDelete }: TeamListItemProps) => {
  const [open, setOpen] = useState(false);
  const members = team.members || [];
  const handleExpand = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={handleExpand}>
        {open ? <ExpandLess /> : <ExpandMore />}
        <ListItemText primary={team.name} />
        {onDelete && (
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={_ => onDelete(team)}>
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          {members.map(
            member =>
              member && (
                <TeamMemberListItem
                  member={member.displayName}
                  key={`team_member_list_item_${member.id}`}
                />
              )
          )}
        </List>
      </Collapse>
    </>
  );
};

export default TeamListItem;
