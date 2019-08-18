import React, { useState, useContext, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FirebaseContext } from "../Firebase";
import List from "@material-ui/core/List";
import Checkbox from "@material-ui/core/Checkbox";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TournamentListItem from "./TournamentListItem";
import { Link } from "react-router-dom";
import EmptyFeedbackImage from "../Common/EmptyFeedbackImage";
import { Box, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Tournament } from "../../types";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "50%",
    padding: theme.spacing(2)
  },

  fab: {
    position: "fixed",
    right: "20%",
    bottom: theme.spacing(2)
  }
}));

const TournamentListView = () => {
  const classes = useStyles();

  const firebase = useContext(FirebaseContext);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filterByLoggedUser, setFilterByLoggedUser] = useState(false);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [refetch, setRefetch] = useState<Boolean>(false);

  useEffect(() => {
    firebase.fetchAllTournaments().then(allTournaments => {
      setTournaments(allTournaments);
      setLoading(false);
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);
  const filterTournaments = (teams: Tournament[]) => {
    const user = firebase.getCurrentUser();
    const userId = user && user.uid;
    const filteredByUser = filterByLoggedUser
      ? tournaments.filter(tournament =>
          tournament.schedule.some(matchDay =>
            matchDay.matches.some(match =>
              match.teams.some(team =>
                team.members.some(member => member.id === userId)
              )
            )
          )
        )
      : tournaments;
    return searchText
      ? filteredByUser.filter(tournament =>
          tournament.name.includes(searchText)
        )
      : filteredByUser;
  };

  const filteredTournaments = filterTournaments(tournaments);

  const handleDelete = async (tournament: Tournament) => {
    setLoading(true);
    await firebase.deleteTournament(tournament.id);
    setRefetch(!refetch);
  };

  return (
    <>
      <Paper className={classes.paper}>
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

        <FormControlLabel
          control={
            <Checkbox
              checked={filterByLoggedUser}
              onChange={event => setFilterByLoggedUser(event.target.checked)}
              color="primary"
            />
          }
          label="My tournaments"
        />
        {!loading && (
          <>
            {filteredTournaments.length > 0 && (
              <List component="div">
                {filteredTournaments.map(tournament => (
                  <TournamentListItem
                    tournament={tournament}
                    key={`tournament_list_item_${tournament.id}`}
                    onDelete={handleDelete}
                  />
                ))}
              </List>
            )}
            {!filteredTournaments.length && (
              <Box textAlign="center" width={1}>
                <EmptyFeedbackImage />
                <Typography variant="subtitle1">
                  No tournaments found
                </Typography>
              </Box>
            )}
          </>
        )}

        {loading && (
          <Box textAlign="center" width={1} mt="10vh">
            <CircularProgress />
          </Box>
        )}
      </Paper>
      <Link to="/tournament/add">
        <Fab color="primary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Link>
    </>
  );
};

export default TournamentListView;
