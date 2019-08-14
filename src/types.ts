export interface Tournament {
  id: string;
  name: string;
  schedule: MatchDay[];
}

export interface MatchDay {
  matchDay: number;
  matches: Match[];
}

export interface Match {
  matchNumber: number;
  teams: Pair<Team, Team>;
  result: string;
}

export interface Team {
  id: string;
  name: string;
  members: User[];
}

export interface User {
  id: string;
  displayName: string;
}

export type Pair<L, R> = [L, R];
