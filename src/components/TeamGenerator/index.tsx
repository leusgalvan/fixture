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
import { RouteComponentProps } from "react-router";
import { AppActions, AppContext } from "../../state/index";

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

  buttonsPanel: {
    display: "flex",
    justifyContent: "center",
  },

  generate: {
    margin: theme.spacing(2),
  },

  save: {
    margin: theme.spacing(2),
  },

  usersList: {
    overflowY: "auto",
    maxHeight: 580,
  },
}));

const TeamGenerator = ({ history }: RouteComponentProps) => {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const [teamSize, setTeamSize] = useState<number>(2);
  const [fetchingUsers, setFetchingUsers] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserIndexes, setSelectedUserIndexes] = useState<number[]>([]);
  const [saving, setSaving] = useState<boolean>(false);
  const [generatedTeams, setGeneratedTeams] = useState<Omit<Team, "id">[]>([]);
  const { dispatch } = useContext(AppContext);
  useEffect(() => {
    return firebase.fetchAllUsers(allUsers => {
      setUsers(allUsers);
      setFetchingUsers(false);
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
    setSaving(true);
    const savedTeams = await Promise.all(
      generatedTeams.map(team => firebase.addTeam(team))
    );
    dispatch({
      type: AppActions.TEAMS_GENERATED,
      payload: savedTeams,
    });
    history.push("/tournament/add");
  };
  const handleGenerate = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedUsers = selectedUserIndexes.map(i => users[i]);
    const generatedTeams = generateTeams(selectedUsers, teamSize);
    setGeneratedTeams(generatedTeams);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  const isGenerateDisabled: boolean =
    teamSize <= 0 ||
    selectedUserIndexes.length === 0 ||
    selectedUserIndexes.length % teamSize !== 0;

  const isSaveDisabled: boolean = generatedTeams.length === 0;

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
            {!fetchingUsers ? (
              <SelectableList
                className={classes.usersList}
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

      <div className={classes.buttonsPanel}>
        <Button
          className={classes.generate}
          variant="contained"
          color="primary"
          onClick={handleGenerate}
          disabled={isGenerateDisabled}
        >
          Generate
        </Button>

        <Button
          className={classes.save}
          variant="contained"
          color="primary"
          type="submit"
          form="generateTeamsForm"
          disabled={isSaveDisabled}
        >
          {saving ? <CircularProgress /> : "Save"}
        </Button>
      </div>
    </>
  );
};

export default TeamGenerator;
