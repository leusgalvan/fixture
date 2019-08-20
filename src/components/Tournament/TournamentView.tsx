import React from "react";
import Card from "@material-ui/core/Card";
import {
  CardHeader,
  Typography,
  CardContent,
  Grid,
  Button,
} from "@material-ui/core";
import MatchView from "./MatchView";
import { Tournament } from "../../types";
import EmptyFeedbackImage from "../Common/EmptyFeedbackImage";
import { Link } from "react-router-dom";

interface TournamentViewProps {
  schedule: Tournament["schedule"];
  handleTeamSelected?: (teamId: string, matchDay: number) => void;
}

const TournamentView = ({
  schedule,
  handleTeamSelected,
}: TournamentViewProps) => {
  if (!schedule)
    return (
      <>
        <EmptyFeedbackImage />
        <Typography variant="h1">No results found.</Typography>
        <Link to="/mainMenu">
          <Button color="secondary">Go to main menu</Button>
        </Link>
      </>
    );
  return (
    <>
      {schedule.map(matchDay => (
        <Card key={matchDay.matchDay}>
          <CardHeader
            title={
              <Typography variant="h4">Matchday {matchDay.matchDay}</Typography>
            }
          />
          <CardContent>
            <Grid container>
              {matchDay.matches.map(match => {
                return (
                  <Grid key={match.matchNumber} item xs={12} md={6}>
                    <MatchView
                      matchDay={matchDay.matchDay}
                      handleTeamSelected={handleTeamSelected}
                      match={match}
                    />
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
