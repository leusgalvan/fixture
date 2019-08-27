import { Tournament } from "../../types";
import { User } from "firebase";

export const buildData = (tournaments: Tournament[], user: User | null) => {
    if (!user) return [[], 0, 0];
    const userTournaments = tournaments.filter(t =>
      t.schedule.some(md =>
        md.matches.some(m =>
          m.teams.some(t => t.members.some(m => m.id === user.uid))
        )
      )
    );
    const userMatches = userTournaments
      .flatMap(t => t.schedule.flatMap(md => md.matches))
      .filter(m => m.teams.some(t => t.members.some(m => m.id === user.uid)));
    console.log("usermatches ", userMatches);
    const [matchesWon, matchesLost] = userMatches.reduce(
      ([won, lost], match) => {
        const userTeam = match.teams.find(t => t.members.some(m => user.uid));
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
    return [userTournaments, matchesWon, matchesLost];
  };