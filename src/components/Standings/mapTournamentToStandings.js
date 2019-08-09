/**
 * Maps a tournament to an array representing the standings
 *
 *  * A song
 * @typedef {Object} Standing
 * @property {string} teamId - The team id
 * @property {string} teamName - The team name
 * @property {number} score - The team's score
 *
 * @param {tournament} The tournament
 * @returns {Standing[]}
 */
export default function mapTournamentToStandings(tournament) {
  const matchesDays = tournament.schedule;

  const matches = matchesDays.reduce((matchesSoFar, matchDay) => {
    return matchesSoFar.concat(matchDay.matches);
  }, []);

  const standings = matches.reduce((standingsSoFar, match) => {
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

  const sortedStandings = standings.sort((a, b) => a.score < b.score);

  return sortedStandings;
}
