import { Tournament, Match } from "../../types";
import { Standing } from "./types";
import _ from "lodash";

/**
 * Maps a tournament to an array representing the standings
 */
export default function mapTournamentToStandings(
  tournament: Tournament
): Standing[] {
  const matchesDays = tournament.schedule;

  const matches = matchesDays.reduce<Match[]>((matchesSoFar, matchDay) => {
    return matchesSoFar.concat(matchDay.matches);
  }, []);

  const standings = matches.reduce<Standing[]>((standingsSoFar, match) => {
    let newStandingsSoFar = standingsSoFar;
    const teams = match.teams;

    teams.forEach(team => {
      if (!newStandingsSoFar.some(standing => standing.teamId === team.id)) {
        newStandingsSoFar = [
          ...newStandingsSoFar,
          {
            teamId: team.id,
            teamName: team.name,
            score: 0,
            gamesPlayed: 0,
          },
        ];
      }
    });

    const maybeWinnerTeamId = match.result;
    return newStandingsSoFar.map(standing => {
      const deltaGamesPlayed =
        match.teams.map(team => team.id).includes(standing.teamId) &&
        maybeWinnerTeamId !== "not played"
          ? 1
          : 0;
      const deltaScore = standing.teamId === maybeWinnerTeamId ? 1 : 0;
      return {
        ...standing,
        score: standing.score + deltaScore,
        gamesPlayed: standing.gamesPlayed + deltaGamesPlayed,
      };
    });
  }, []);

  const sortedStandings = standings.sort((a, b) => b.score - a.score);

  return sortedStandings;
}
