import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import TeamView from "./TeamView";
import { Match } from "../../types";

const useStyles = makeStyles(theme => {
  return {
    root: { padding: "5%" },
    matchTitle: { textAlign: "center" },
  };
});

interface MatchViewProps {
  match: Match;
}

const MatchView = ({ match }: MatchViewProps) => {
  const classes = useStyles();

  const [team1, team2] = match.teams;

  return (
    <Grid className={classes.root} container>
      <Grid item xs={12}>
        <Paper className={classes.matchTitle}>
          <Typography variant="h5">Match {match.matchNumber}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={5}>
        <TeamView winner={team1.id === match.result} teamName={team1.name} />
      </Grid>
      <Grid className={classes.matchTitle} item xs={2}>
        <Typography variant="h6">VS</Typography>
      </Grid>
      <Grid item xs={5}>
        <TeamView winner={team2.id === match.result} teamName={team2.name} />
      </Grid>
    </Grid>
  );
};

export default MatchView;
