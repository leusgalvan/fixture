import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => {
  return {
    root: { padding: "5%" },
    matchTitle: { textAlign: "center" },
    teams: {
      padding: "5%",
      textAlign: "center",
      backgroundColor: theme.palette.secondary["900"],
      color: "white"
    }
  };
});
const MatchView = ({ match }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container>
      <Grid item xs={12}>
        <Paper className={classes.matchTitle}>
          <Typography variant="h6">Match {match.match}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={5}>
        <Paper className={classes.teams}>{match.teams[0].label}</Paper>
      </Grid>
      <Grid className={classes.matchTitle} item xs={2}>
        <Typography variant="h6">VS</Typography>
      </Grid>
      <Grid item xs={5}>
        <Paper className={classes.teams}>{match.teams[1].label}</Paper>
      </Grid>
    </Grid>
  );
};

export default MatchView;
