import React, { useState, useContext, useEffect } from "react";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import createTournament from "./createTournament";
import TournamentView from "./TournamentView";
import { Grid, Typography } from "@material-ui/core";
import { FirebaseContext } from "../Firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    padding: 20
  }
});

const Tournament = () => {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [tournament, setTournament] = useState({ schedule: [], name: "" });
  const [availableTeams, setAvailableTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tournamentName, setTournamentName] = useState("");
  const [error, setError] = useState(false);

  const firebase = useContext(FirebaseContext);

  const classes = useStyles();

  useEffect(() => {
    const fetchTeamsFromDB = async () => {
      const data = await firebase.fetchAllTeams();
      const teamOptions = data.map(t => ({
        value: t.name,
        label: t.name,
        ...t,
      }));
      setAvailableTeams(teamOptions);
      setLoading(false);
    };
    fetchTeamsFromDB();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerateClick = () => {
    if (!tournamentName) {
      setError(true);
      return;
    }
    const tournament = createTournament(selectedTeams, tournamentName);
    setTournament(tournament);
  };

  const handleConfirmClick = () => {
    setLoading(true);
    firebase.saveTournament(tournament).then(() => {
      setTournament({ schedule: [], name: "" });
      setLoading(false);
      setTournamentName("");
      setSelectedTeams([]);
      //TODO redirect user to tournament/tournamentID page to see scores
    });
  };

  return (
    <>
      <Grid container justify="center">
        {loading ? (
          <Grid item className={classes.root}>
            <CircularProgress />
            <Typography variant="h6">Loading...</Typography>
          </Grid>
        ) : (
          <>
            <Grid className={classes.root} item xs={12} sm={6}>
              <Select
                isMulti
                value={selectedTeams}
                onChange={newTeams => setSelectedTeams(newTeams)}
                options={availableTeams}
              />
            </Grid>
            <Grid className={classes.root} item xs={12}>
              <TextField
                label="Tournament name"
                value={tournamentName}
                onFocus={() => setError(false)}
                onChange={e => setTournamentName(e.target.value)}
                margin="normal"
                error={error}
                helperText={error ? "Please enter a tournament name" : ""}
              />
            </Grid>
            <Grid className={classes.root} item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateClick}
              >
                Generate league
              </Button>
            </Grid>

            <Grid item xs={12}>
              <TournamentView
                schedule={tournament.schedule ? tournament.schedule : []}
              />
            </Grid>
            {tournament.schedule.length > 0 && (
              <Grid className={classes.root} item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirmClick}
                >
                  Save tournament
                </Button>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </>
  );
};

export default Tournament;
