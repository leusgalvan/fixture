import React, { useState, useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FirebaseContext } from "../Firebase";
import List from "@material-ui/core/List";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import TeamListItem from "./TeamListItem";
import { Link } from "react-router-dom";
import EmptyFeedbackImage from "../Common/EmptyFeedbackImage";
import { Box, Typography, CircularProgress } from "@material-ui/core";

const Team = props => {
  const firebase = useContext(FirebaseContext);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filterByLoggedUser, setFilterByLoggedUser] = useState(false);
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    firebase.fetchAllTeams().then(allTeams => {
      setTeams(allTeams);
      setLoading(false);
    });
  }, [firebase]);
  const filterteams = gs => {
    const user = firebase.auth.currentUser;
    const filteredByUser = filterByLoggedUser
      ? gs.filter(g => g.members.some(m => m.userId === user.uid))
      : gs;
    return searchText
      ? filteredByUser.filter(g => g.name.includes(searchText))
      : filteredByUser;
  };

  const filteredTeams = filterteams(teams);
  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          fullWidth
          placeholder="Search…"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          onChange={event => setSearchText(event.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={filterByLoggedUser}
              onChange={event => setFilterByLoggedUser(event.target.checked)}
              color="primary"
            />
          }
          label="My teams"
        />
      </Grid>

      <Grid item xs={12}>
        {!loading && (
          <>
            {filteredTeams.length > 0 && (
              <List component="div">
                {filteredTeams.map((team, i) => (
                  <TeamListItem team={team} key={i} />
                ))}
              </List>
            )}
            {!filteredTeams.length && (
              <Box textAlign="center" width={1}>
                <EmptyFeedbackImage />
                <Typography variant="subtitle1">
                  No se encontraron equipos
                </Typography>
              </Box>
            )}
          </>
        )}

        {loading && (
          <Box textAlign="center" w={1} mt="10vh">
            <CircularProgress />
          </Box>
        )}
      </Grid>

      <Grid item xs={12}>
        <Link to="/team/add">
          <Button variant="contained" color="primary">
            add
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default Team;
