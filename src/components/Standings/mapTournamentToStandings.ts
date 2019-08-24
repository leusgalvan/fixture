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

  const standings = matches
    .filter(m => m.teams.every(t => t.members.length > 0))
    .reduce<Standing[]>((standingsSoFar, match) => {
      const standingsWithNoGames: Standing[] = match.teams
        .filter(
          team => !standingsSoFar.some(standing => standing.teamId === team.id)
        )
        .map(team => ({
          teamId: team.id,
          teamName: team.name,
          score: 0,
          gamesPlayed: 0,
        }));

      const newStandingsSoFar: Standing[] = [
        ...standingsSoFar,
        ...standingsWithNoGames,
      ];

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
