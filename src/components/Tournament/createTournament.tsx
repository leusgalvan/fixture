import _ from "lodash";
import { Team, MatchDay, Pair, Tournament } from "../../types";

const createTournament = (
  teams: Team[],
  tournamentName: string
): Omit<Tournament, "id"> | null => {
  if (!teams || teams.length < 2) return null;
  var shuffledTeams;
  if (teams.length % 2 !== 0) {
    shuffledTeams = _.shuffle(
      teams.concat({
        id: "LIBRE",
        members: [],
        name: "LIBRE"
      })
    );
  } else {
    shuffledTeams = _.shuffle(teams);
  }
  const nrDates = shuffledTeams.length - 1;

  const upper = shuffledTeams.slice(0, shuffledTeams.length / 2);
  const lower = shuffledTeams.slice(shuffledTeams.length / 2).reverse();

  const buildMatchDays = (
    upper: Team[],
    lower: Team[],
    nrDates: number,
    currentDate = 1,
    matchDays: MatchDay[] = []
  ): MatchDay[] => {
    const buildDate = (
      number: number,
      upper: Team[],
      lower: Team[]
    ): MatchDay => {
      const zippedTeams = _.zip(upper, lower) as Pair<Team, Team>[];
      return {
        matchDay: number,
        matches: zippedTeams.map((teams, idx) => ({
          matchNumber: idx + 1,
          teams,
          result: "not played"
        }))
      };
    };
    if (currentDate === 1) {
      const firstDate = buildDate(1, upper, lower);
      const newMatchDays = matchDays.concat(firstDate);
      return buildMatchDays(
        upper,
        lower,
        nrDates,
        currentDate + 1,
        newMatchDays
      );
    } else if (currentDate <= nrDates) {
      const newUpper = [
        upper[0],
        lower[0],
        ...upper.slice(1, upper.length - 1)
      ];
      const newLower = lower.slice(1).concat(upper[upper.length - 1]);
      const newDate = buildDate(currentDate, upper, lower);
      const newDates = matchDays.concat(newDate);
      return buildMatchDays(
        newUpper,
        newLower,
        nrDates,
        currentDate + 1,
        newDates
      );
    } else {
      return matchDays;
    }
  };

  const matchDays = buildMatchDays(upper, lower, nrDates);
  return {
    name: tournamentName,
    schedule: matchDays
  };
};

export default createTournament;
