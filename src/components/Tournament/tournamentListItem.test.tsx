import React from "react";
import { shallow } from "enzyme";
import { ListItemText } from "@material-ui/core";
import TournamentListItem from "./TournamentListItem";
import { Tournament } from "../../types";

describe("TournamentListItem", () => {
  it("should display the tournament name", () => {
    const tournament: Tournament = {
      id: "Test Id",
      name: "Torneito",
      schedule: []
    };
    const tournamentListItem = shallow(
      <TournamentListItem tournament={tournament} onDelete={() => {}} />
    );
    expect(
      tournamentListItem.find(ListItemText).find({ primary: "Torneito" })
    ).toHaveLength(1);
  });
});
