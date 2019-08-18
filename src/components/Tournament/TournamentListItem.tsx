import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import { Tournament } from "../../types";
import Delete from "@material-ui/icons/Delete";

export interface TournamentListItemProps {
  tournament: Tournament;
  onDelete(tournament: Tournament): void;
}

const TournamentListItem = ({
  tournament,
  onDelete
}: TournamentListItemProps) => {
  return (
    <>
      <ListItem button>
        <ListItemText primary={tournament.name} />
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={_ => onDelete(tournament)}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

export default TournamentListItem;
