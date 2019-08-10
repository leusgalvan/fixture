import React, { useMemo } from "react";
import mapTournamentToStandings from "./mapTournamentToStandings";
import StandingsTable from "./StandingsTable";

const Standings = ({ tournament }) => {
  const standings = useMemo(() => mapTournamentToStandings(tournament), [
    tournament
  ]);

  return tournament && <StandingsTable standings={standings} />;
};

export default Standings;
