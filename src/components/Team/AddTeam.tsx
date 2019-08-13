import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  Button,
  TextField,
  CircularProgress,
  Paper
} from "@material-ui/core";
import { FirebaseContext } from "../Firebase";
import SelectableList from "../SelectableList";
import { makeStyles } from "@material-ui/core/styles";
import { RouteComponentProps } from "react-router";
import { User, Team } from "../../types";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "50%",
    padding: theme.spacing(2)
  },

  save: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(2)
  }
}));

const AddTeam = ({ history }: RouteComponentProps) => {
  const classes = useStyles();

  const firebase = useContext(FirebaseContext);
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>("");
  const [selectedUserIndexes, setSelectedUserIndexes] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    firebase.fetchAllUsers().then(allUsers => {
      setUsers(allUsers);
      setLoading(false);
    });
  }, []);

  const userDisplayNames = users.map(user => user.displayName);
  const onUserClicked = (i: number) => {
    const indexes = selectedUserIndexes.includes(i)
      ? selectedUserIndexes.filter(ix => ix !== i)
      : [...selectedUserIndexes, i];
    setSelectedUserIndexes(indexes);
  };
  const onNameChange: React.ChangeEventHandler<HTMLInputElement> = event =>
    setName(event.target.value);
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    const newTeam = {
      name: name,
      members: selectedUserIndexes.map(i => users[i])
    };
    console.log(newTeam);
    await firebase.addTeam(newTeam);
    history.push("/team");
  };

  return (
    <>
      <Paper className={classes.paper}>
        <Typography variant="h5" color="textPrimary">
          Team
        </Typography>

        <form id="teamForm" onSubmit={onSubmit}>
          <TextField
            id="name"
            value={name}
            onChange={onNameChange}
            required
            fullWidth
            margin="normal"
            variant="outlined"
            label="Name"
          />
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
      <Button
        className={classes.save}
        variant="contained"
        color="primary"
        type="submit"
        form="teamForm"
      >
        {submitting ? <CircularProgress /> : "Save"}
      </Button>
    </>
  );
};

export default AddTeam;
