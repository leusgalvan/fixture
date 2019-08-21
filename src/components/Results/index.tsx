import React, { useEffect, useContext, useState } from "react";
import { FirebaseContext } from "../Firebase";
import TournamentView from "../Tournament/TournamentView";
import { Typography, Grid, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { RouteComponentProps } from "react-router";
import { Tournament } from "../../types";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    padding: 20
  }
});

const ResultsContainer = ({
  match
}: RouteComponentProps<{ idTournament: string }>) => {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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

  const invalidMatchSelected = (
    teamId: string,
    matchDay: number
  ): boolean | undefined => {
    if (!tournament) return;
    const matchDayFound = tournament.schedule.find(
      md => md.matchDay === matchDay
    );
    if (matchDayFound) {
      const freeMatch = matchDayFound.matches.find(m =>
        m.teams.some(t => t.members.length <= 0)
      );
      if (freeMatch) {
        return freeMatch.teams.some(t => t.id === teamId);
      }
    }
  };

  const handleTeamSelected = (teamId: string, matchDay: number) => {
    if (!tournament || invalidMatchSelected(teamId, matchDay)) return;

    const newSchedule = tournament.schedule.map(md => {
      if (md.matchDay === matchDay) {
        const newMatches = md.matches.map(m => {
          if (m.teams.some(t => t.id === teamId)) {
            return {
              ...m,
              result: teamId
            };
          } else {
            return m;
          }
        });
        return { ...md, matches: newMatches };
      } else {
        return md;
      }
    });
    setTournament({ ...tournament, schedule: newSchedule });
  };

  return (
    <Grid container justify={"center"}>
      {tournament ? (
        <>
          <Grid item className={classes.root} xs={12}>
            <Typography variant="h2" color="primary">
              {tournament.name}
            </Typography>
            <TournamentView
              handleTeamSelected={handleTeamSelected}
              schedule={tournament.schedule}
            />
          </Grid>

          <Grid item className={classes.root} xs={12}>
            {isSaving ? (
              <>
                <CircularProgress />
                <Typography variant="h6">Saving data...</Typography>
              </>
            ) : (
              <Button
                onClick={() => {
                  setIsSaving(true);
                  firebase
                    .updateTournament(tournament)
                    .then(() => setIsSaving(false));
                }}
                variant="contained"
                color="primary"
              >
                Save results
              </Button>
            )}
          </Grid>
        </>
      ) : (
        <Grid item className={classes.root}>
          <CircularProgress />
          <Typography variant="h6">Loading...</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default ResultsContainer;
