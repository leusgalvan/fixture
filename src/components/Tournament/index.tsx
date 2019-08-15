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
import { Team, Tournament as TournamentType } from "../../types";
import { ValueType } from "react-select/src/types";
import { RouteComponentProps } from "react-router";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    padding: 20,
  },
});

interface TeamOption extends Team {
  value: string;
  label: string;
}

const Tournament = ({ history }: RouteComponentProps) => {
  const [selectedTeams, setSelectedTeams] = useState<TeamOption[]>([]);
  const [tournament, setTournament] = useState<Omit<
    TournamentType,
    "id"
  > | null>(null);
  const [availableTeams, setAvailableTeams] = useState<TeamOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [tournamentName, setTournamentName] = useState("");
  const [error, setError] = useState(false);

  const firebase = useContext(FirebaseContext);

  const classes = useStyles();

  useEffect(() => {
    const fetchTeamsFromDB = async () => {
      const data = await firebase.fetchAllTeams();
      const teamOptions = data.map(team => ({
        value: team.name,
        label: team.name,
        ...team,
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
    tournament &&
      firebase.saveTournament(tournament).then(tournament => {
        setTournament(null);
        setLoading(false);
        setTournamentName("");
        setSelectedTeams([]);
        history.push(`/standings/${tournament.id}`);
      });
  };

  return (
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
              options={availableTeams}
              value={selectedTeams}
              onChange={(teams: ValueType<TeamOption>) => {
                setSelectedTeams(teams as TeamOption[]);
              }}
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
          {tournament && (
            <>
              <Grid item xs={12}>
                <TournamentView schedule={tournament.schedule} />
              </Grid>
              <Grid className={classes.root} item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirmClick}
                >
                  Save tournament
                </Button>
              </Grid>
            </>
          )}
        </>
      )}
    </Grid>
  );
};

export default Tournament;
