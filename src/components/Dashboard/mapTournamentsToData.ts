import { Tournament, Match } from "../../types";
import { User } from "firebase";

export const buildData = (
  tournaments: Tournament[],
  user: User
): [Tournament[], number, number] => {
  const userTournaments = getUserTournaments(tournaments, user);
  const userMatches = getUserMatches(tournaments, user);
  const [matchesWon, matchesLost] = getMatchesStats(userMatches, user);
  return [userTournaments, matchesWon, matchesLost];
};

const getUserTournaments = (tournaments: Tournament[], user: User): Tournament[] => {
  return tournaments.filter(t =>
    t.schedule.some(md =>
      md.matches.some(m =>
        m.teams.some(t => t.members.some(m => m.id === user.uid))
      )
    )
  );
};

const getUserMatches = (tournaments: Tournament[], user: User): Match[] => {
  return tournaments
    .flatMap(t => t.schedule.flatMap(md => md.matches))
    .filter(m => m.teams.some(t => t.members.some(m => m.id === user.uid)));
};

const getMatchesStats = (userMatches: Match[], user: User): [number, number] => {
  return userMatches.reduce(
    ([won, lost], match) => {
      const userTeam = match.teams.find(t =>
        t.members.some(m => m.id === user.uid)
      );
      return [
        won + (userTeam && match.result === userTeam.id ? 1 : 0),
        lost +
          (userTeam &&
          (match.result !== userTeam.id && match.result !== "not played")
            ? 1
            : 0),
      ];
    },
    [0, 0]
  );
};
