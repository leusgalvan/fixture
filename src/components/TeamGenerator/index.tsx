import React, { useState, useContext, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  TextField,
  CircularProgress,
  List,
  Button,
} from "@material-ui/core";
import { FirebaseContext } from "../Firebase";
import { User, Team } from "../../types";
import SelectableList from "../SelectableList";
import TeamListItem from "../Team/TeamListItem";
import generateTeams from "./generateTeams";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },

  parametersPanel: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    flex: 1,
  },

  generatedTeamsPanel: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    flex: 3,
  },

  generate: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(2),
  },
}));

const TeamGenerator = () => {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const [teamSize, setTeamSize] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserIndexes, setSelectedUserIndexes] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [generatedTeams, setGeneratedTeams] = useState<Omit<Team, "id">[]>([]);
  useEffect(() => {
    return firebase.fetchAllUsers(allUsers => {
      setUsers(allUsers);
      setLoading(false);
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const userDisplayNames = users.map(user => user.displayName);
  const onUserClicked = (i: number) => {
    const indexes = selectedUserIndexes.includes(i)
      ? selectedUserIndexes.filter(ix => ix !== i)
      : [...selectedUserIndexes, i];
    setSelectedUserIndexes(indexes);
  };
  const onTeamSizeChange: React.ChangeEventHandler<HTMLInputElement> = event =>
    setTeamSize(parseInt(event.target.value));
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    const selectedUsers = selectedUserIndexes.map(i => users[i]);
    const generatedTeams = generateTeams(selectedUsers, teamSize);
    setGeneratedTeams(generatedTeams);
    setSubmitting(false);
  };

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.parametersPanel}>
          <Typography variant="h5" color="textPrimary">
            Parameters
          </Typography>
          <form id="generateTeamsForm" onSubmit={onSubmit}>
            <TextField
              id="teamSize"
              value={teamSize}
              onChange={onTeamSizeChange}
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Team size"
              type="number"
            />

            <Typography variant="h5" color="textPrimary">
              Members
            </Typography>
            {!loading ? (
              <SelectableList
                items={userDisplayNames}
                selectedIndexes={selectedUserIndexes}
                onItemClicked={onUserClicked}
              />
            ) : (
              <CircularProgress />
            )}
          </form>
        </Paper>
        <Paper className={classes.generatedTeamsPanel}>
          <Typography variant="h5" color="textPrimary">
            Generated teams
          </Typography>
          <List>
            {generatedTeams.map(team => (
              <TeamListItem team={team} key={`team_list_item_${team.name}`} />
            ))}
          </List>
        </Paper>
      </div>

      <Button
        className={classes.generate}
        variant="contained"
        color="primary"
        type="submit"
        form="generateTeamsForm"
      >
        {submitting ? <CircularProgress /> : "Generate"}
      </Button>
    </>
  );
};

export default TeamGenerator;
