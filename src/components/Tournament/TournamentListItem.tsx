import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Delete from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { Tournament } from "../../types";
import StandingsIcon from "../StandingsIcon";
import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";

export interface TournamentListItemProps {
  tournament: Tournament;
  onDelete(tournament: Tournament): void;
}

const TournamentListItem = ({
  tournament,
  onDelete
}: TournamentListItemProps) => {
  return (
    <ListItem button>
      <ListItemText primary={tournament.name} />
      <Tooltip title="Standings">
        <IconButton
          className="btn-standings"
          edge="end"
          component={Link}
          to={`/standings/${tournament.id}`}
        >
          <StandingsIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          edge="end"
          onClick={_ => onDelete(tournament)}
          className="btn-delete"
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
};

export default TournamentListItem;
