import React from "react";
import { Paper, Typography, ButtonBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "../../theme";

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
  teamName: string;
  winner: boolean;
  onTeamSelected: () => void;
}

const TeamView = ({ teamName, winner, onTeamSelected }: TeamViewProps) => {
  const classes = useStyles({ winner });

  return (
    <Paper className={classes.teams}>
      <ButtonBase onClick={onTeamSelected}>
        <Typography variant="h5">{teamName}</Typography>
      </ButtonBase>
      {winner && <Typography variant="h6">Winner</Typography>}
    </Paper>
  );
};

export default TeamView;
