import React, { useMemo } from "react";
import mapTournamentToStandings from "./mapTournamentToStandings";
import StandingsTable from "./StandingsTable";
import { Tournament } from "../../types";

interface StandingsProps {
  tournament: Tournament;
}

const Standings = ({ tournament }: StandingsProps) => {
  const standings = useMemo(() => mapTournamentToStandings(tournament), [
    tournament
  ]);

  return tournament && <StandingsTable standings={standings} />;
};

export default Standings;
