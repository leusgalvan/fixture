import React, { useState, useContext, useEffect } from "react";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import createTournament from "./createTournament";
import TournamentView from "./TournamentView";
import { Grid, Typography } from "@material-ui/core";
import { FirebaseContext } from "../Firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    padding: 20,
  },
});

const Tournament = () => {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [tournament, setTournament] = useState([]);
  const [availableTeams, setAvailableTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const firebase = useContext(FirebaseContext);

  const classes = useStyles();

  useEffect(() => {
    const fetchTeamsFromDB = async () => {
      const data = await firebase.fetchAllTeams();
      const teamOptions = data.map(t => ({ value: t.name, label: t.name }));
      setAvailableTeams(teamOptions);
      setLoading(false);
    };
    fetchTeamsFromDB();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    const tournament = createTournament(selectedTeams);
    setTournament(tournament);
  };

  return (
    <>
      <Grid container justify="center">
        {loading ? (
          <Grid item className={classes.root}>
            <CircularProgress className={classes.progress} />
            <Typography variant="h6">Loading teams...</Typography>
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
            <Grid className={classes.root} item xs={12} sm={6}>
              <Button variant="contained" color="primary" onClick={handleClick}>
                Generate league
              </Button>
            </Grid>
          </>
        )}
      </Grid>
      <TournamentView tournament={tournament} />
    </>
  );
};

export default Tournament;
