import React from "react";
import { Paper, Typography } from "@material-ui/core";
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
      color: "white"
    }
  };
});

interface TeamViewProps {
  teamName: string;
  winner: boolean;
}

const TeamView = ({ teamName, winner }: TeamViewProps) => {
  const classes = useStyles({ winner });

  return (
    <Paper className={classes.teams}>
      <Typography variant="h5">{teamName}</Typography>
      {winner && <Typography variant="h6">Winner</Typography>}
    </Paper>
  );
};

export default TeamView;
