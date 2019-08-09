import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  Button,
  TextField,
  CircularProgress,
  Grid
} from "@material-ui/core";
import { FirebaseContext } from "../Firebase";
import SelectableList from "../SelectableList";

const AddTeam = ({ classes, history }) => {
  const firebase = useContext(FirebaseContext);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [selectedUserIndexes, setSelectedUserIndexes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    firebase.fetchAllUsers().then(allUsers => {
      setUsers(allUsers);
      setLoading(false);
    });
  }, []);

  const userDisplayNames = users.map(user => user.displayName);
  const onUserClicked = i => {
    const indexes = selectedUserIndexes.includes(i)
      ? selectedUserIndexes.filter(ix => ix !== i)
      : [...selectedUserIndexes, i];
    setSelectedUserIndexes(indexes);
  };
  const onNameChange = event => setName(event.target.value);
  const onSubmit = async event => {
    event.preventDefault();
    setSubmitting(true);
    const newTeam = {
      name: name,
      members: selectedUserIndexes.map(i => users[i])
    };
    await firebase.addTeam(newTeam);
    history.push("/team");
  };

  return (
    <>
      <Typography variant="h5" color="textPrimary">
        Team
      </Typography>

      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            {!loading ? (
              <SelectableList
                id="membersList"
                items={userDisplayNames}
                selectedIndexes={selectedUserIndexes}
                onItemClicked={onUserClicked}
              />
            ) : (
              <CircularProgress />
            )}
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              {submitting ? <CircularProgress /> : "Save"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AddTeam;
