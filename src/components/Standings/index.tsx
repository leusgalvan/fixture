import React, { useEffect, useContext, useState } from "react";
import { FirebaseContext } from "../Firebase";
import Standings from "./Standings";
import { Typography, Grid, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { RouteComponentProps } from "react-router";
import { Tournament } from "../../types";
import TournamentView from "../Tournament/TournamentView";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    padding: 20
  }
});

interface StandingsContainerRouteParams {
  idTournament: string;
}

const StandingsContainer = ({
  match
}: RouteComponentProps<StandingsContainerRouteParams>) => {
  const [tournament, setTournament] = useState<Tournament | null>(null);

  const firebase = useContext(FirebaseContext);

  const classes = useStyles();

  useEffect(() => {
    const fetchTournamentFromDb = async () => {
      const data = await firebase.fetchTournamentById(
        match.params.idTournament
      );
      setTournament(data);
    };
    fetchTournamentFromDb();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container justify={"center"}>
      {tournament ? (
        <>
          <Grid item className={classes.root} xs={12}>
            <Typography variant="h1" color="primary">
              Tournament {tournament.name}
            </Typography>
          </Grid>
          <Grid item className={classes.root} xs={12}>
            <Typography variant="h2" color="primary">
              Standings
            </Typography>
            <Standings tournament={tournament} />
          </Grid>
          <Grid item className={classes.root} xs={12}>
            <Typography variant="h2" color="primary">
              Scores
            </Typography>
            <TournamentView schedule={tournament.schedule} />
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to={`/results/${tournament.id}`}
              color="primary"
              variant="contained"
            >
              Edit results
            </Button>
          </Grid>
        </>
      ) : (
        <>
          <Grid item className={classes.root}>
            <CircularProgress />
            <Typography variant="h6">Loading...</Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default StandingsContainer;
