import React, { Component, useEffect, useContext, useState } from "react";
import Chart from "react-apexcharts";
import {
  Grid,
  Typography,
  ListItem,
  List,
  ListItemText,
  IconButton,
  Paper,
} from "@material-ui/core";
import { FirebaseContext } from "../Firebase";
import { Tournament } from "../../types";
import { Link } from "react-router-dom";
import StandingsIcon from "../StandingsIcon";
import { makeStyles } from "@material-ui/styles";
import { buildData } from "./mapTournamentsToData";

const useStyles = makeStyles({
  infoSection: {
    padding: 35,
    textAlign: "center",
  },
});

const Dashboard = () => {
  const firebase = useContext(FirebaseContext);
  const classes = useStyles();
  const [userTournaments, setUserTournaments] = useState<Tournament[]>([]);
  const [matchesWon, setMatchesWon] = useState(0);
  const [matchesLost, setMatchesLost] = useState(0);

  useEffect(() => {
    return firebase.fetchAllTournaments(tournaments => {
      const [userTournaments, matchesWon, matchesLost] = buildData(
        tournaments,
        firebase.getCurrentUser()
      );
      setUserTournaments(userTournaments);
      setMatchesWon(matchesWon);
      setMatchesLost(matchesLost);
    });
  }, []);

  const options = {
    labels: ["Matches won", "Matches lost"],
    colors: ["#b7e778", "#f67e7d"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  const series = [matchesWon, matchesLost];

  return (
    <Grid container>
      <Grid item xs={12} className={classes.infoSection}>
        <Typography color="primary" variant="h1">
          Personal dashboard
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.infoSection}>
          <Typography variant="h3">Your tournaments</Typography>
          <List>
            {userTournaments.map(t => {
              return (
                <ListItem key={t.id} button>
                  <ListItemText primary={t.name} />
                  <IconButton
                    edge="end"
                    component={Link}
                    to={`/standings/${t.id}`}
                  >
                    <StandingsIcon />
                  </IconButton>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.infoSection}>
          <Typography variant="h3">Your stats</Typography>
          <Chart options={options} series={series} type="pie" width="500" />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
