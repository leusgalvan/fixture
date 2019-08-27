import React, { Component, useEffect, useContext, useState } from "react";
import Chart from "react-apexcharts";
import {
  Grid,
  Typography,
  ListItem,
  List,
  ListItemText,
  IconButton
} from "@material-ui/core";
import { FirebaseContext } from "../Firebase";
import { Tournament } from "../../types";
import { Link } from "react-router-dom";
import StandingsIcon from "../StandingsIcon";
import { User } from "firebase";

const buildData = (tournaments: Tournament[], user: User | null) => {
  if (!user) return [[], 0, 0];
  const userTournaments = tournaments.filter(t =>
    t.schedule.some(md =>
      md.matches.some(m =>
        m.teams.some(t => t.members.some(m => m.id === user.uid))
      )
    )
  );
  const userMatches = userTournaments.flatMap(t =>
    t.schedule.flatMap(md => md.matches)
  );
  const [matchesWon, matchesLost] = userMatches.reduce(
    ([won, lost], match) => {
      const userTeam = match.teams.find(t => t.members.some(m => user.uid));
      return [
        won + (userTeam && match.result === userTeam.id ? 1 : 0),
        lost +
          (userTeam &&
          (match.result !== userTeam.id && match.result !== "not played")
            ? 1
            : 0)
      ];
    },
    [0, 0]
  );
  return [userTournaments, matchesWon, matchesLost];
};
const Dashboard = () => {
  const firebase = useContext(FirebaseContext);
  const [userTournaments, setUserTournaments] = useState<Tournament[]>([]);
  const [matchesWon, setMatchesWon] = useState(0);
  const [matchesLost, setMatchesLost] = useState(0);
  useEffect(() => {
    return firebase.fetchAllTournaments(tournaments => {
      const [userTournaments, matchesWon, matchesLost] = buildData(
        tournaments,
        firebase.getCurrentUser()
      );
      setUserTournaments(userTournaments as Tournament[]);
      setMatchesWon(matchesWon as number);
      setMatchesLost(matchesLost as number);
    });
  }, []);
  const options = {
    labels: ["Matches won", "Matches lost"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };
  const series = [matchesWon, matchesLost];

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography color="primary" variant="h1">
          Personal dashboard
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h3">Your tournaments</Typography>
        <List>
          {userTournaments.map(t => {
            return (
              <ListItem button>
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
      </Grid>
      <Grid xs={2} />
      <Grid item xs={4}>
        <Typography variant="h3">Your stats</Typography>
        <Chart options={options} series={series} type="pie" width="500" />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
