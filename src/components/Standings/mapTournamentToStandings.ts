import { Tournament, Match } from "../../types";
import { Standing } from "./types";

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
            score: 0
          }
        ];
      }
    });

    const maybeWinnerTeamId = match.result;

    return newStandingsSoFar.map(standing => {
      if (standing.teamId !== maybeWinnerTeamId) {
        return standing;
      }
      return { ...standing, score: standing.score + 1 };
    });
  }, []);

  const sortedStandings = standings.sort((a, b) => b.score - a.score);

  return sortedStandings;
}
