import React from "react";
import Card from "@material-ui/core/Card";
import { CardHeader, Typography, CardContent, Grid } from "@material-ui/core";
import MatchView from "./MatchView";
import { Tournament } from "../../types";

interface TournamentViewProps {
  schedule: Tournament["schedule"];
}

const TournamentView = ({ schedule }: TournamentViewProps) => {
  return (
    <>
      {schedule.map(matchDay => (
        <Card key={matchDay.matchDay}>
          <CardHeader
            title={
              <Typography variant="h4">
                Match day {matchDay.matchDay}
              </Typography>
            }
          />
          <CardContent>
            <Grid container>
              {matchDay.matches.map(match => {
                return (
                  <Grid key={match.matchNumber} item xs={12} md={6}>
                    <MatchView match={match} />
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default TournamentView;
