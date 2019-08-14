import React from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { Standing } from "./types";

interface StandingsTableProps {
  standings: Standing[];
}

const StandingsTable = ({ standings }: StandingsTableProps) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Team name</TableCell>
            <TableCell>Games played</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {standings.map(standing => (
            <TableRow key={standing.teamId}>
              <TableCell>{standing.teamName}</TableCell>
              <TableCell>{standing.gamesPlayed}</TableCell>
              <TableCell>{standing.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default StandingsTable;
