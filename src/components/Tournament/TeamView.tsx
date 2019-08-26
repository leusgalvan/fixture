import React from "react";
import {
  Paper,
  Typography,
  ButtonBase,
  Tooltip,
  List,
  ListItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "../../theme";
import { Team } from "../../types";

const useStyles = makeStyles<Theme, Pick<TeamViewProps, "winner">>(theme => {
  return {
    teams: {
      padding: "5%",
      textAlign: "center",
      backgroundColor: ({ winner }) =>
        winner ? "green" : theme.palette.secondary.dark,
      color: "white",
    },
  };
});

interface TeamViewProps {
  team: Team;
  winner: boolean;
  onTeamSelected: () => void;
}

const TeamView = ({ team, winner, onTeamSelected }: TeamViewProps) => {
  const classes = useStyles({ winner });

  const membersName = team.members.map(m => m.displayName);
  return (
    <Paper className={classes.teams}>
      <ButtonBase onClick={onTeamSelected}>
        <Tooltip
          title={
            <List>
              {membersName.map(name => (
                <ListItem>{name}</ListItem>
              ))}
            </List>
          }
        >
          <Typography variant="h5">{team.name}</Typography>
        </Tooltip>
      </ButtonBase>
      {winner && <Typography variant="h6">Winner</Typography>}
    </Paper>
  );
};

export default TeamView;
