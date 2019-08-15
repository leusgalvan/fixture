import React from "react";
import { shallow, mount, ShallowWrapper } from "enzyme";
import { ListItem, ListItemText, Collapse } from "@material-ui/core";
import TeamListItem from "./TeamListItem";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Team } from "../../types";

describe("TeamListItem", () => {
  it("should display one outer list item and one inner list item per member - one member", () => {
    const team: Team = {
      id: "Test Team Id",
      name: "Bonzzu",
      members: [{ displayName: "Leus", id: "TestUserId" }]
    };
    const teamListItem = shallow(<TeamListItem team={team} />);
    expect(
      teamListItem.find(ListItemText).find({ primary: "Bonzzu" })
    ).toHaveLength(1);
    expect(
      teamListItem
        .find(Collapse)
        .find(ListItemText)
        .find({ primary: "Leus" })
    ).toHaveLength(1);
  });

  it("should display one outer list item and one inner list item per member - two members", () => {
    const team = {
      id: "Test Team Id",
      name: "Bonzzu",
      members: [
        { displayName: "Leus", id: "Test User Id" },
        { displayName: "Gino", id: "Test User Id 2" }
      ]
    };
    const teamListItem = shallow(<TeamListItem team={team} />);
    expect(
      teamListItem.find(ListItemText).find({ primary: "Bonzzu" })
    ).toHaveLength(1);
    expect(
      teamListItem
        .find(Collapse)
        .find(ListItemText)
        .find({ primary: "Leus" })
    ).toHaveLength(1);
    expect(
      teamListItem
        .find(Collapse)
        .find(ListItemText)
        .find({ primary: "Gino" })
    ).toHaveLength(1);
  });

  it("should be initially collapsed", () => {
    const team = {
      id: "Test Team Id",
      name: "Bonzzu",
      members: [
        { displayName: "Leus", id: "Test User Id" },
        { displayName: "Gino", id: "Test User Id 2" }
      ]
    };
    const teamListItem = shallow(<TeamListItem team={team} />);
    expect(teamListItem.find(ExpandLess)).toBeUndefined;
    expect(teamListItem.find(ExpandMore)).toBeDefined;
  });

  it("should expand when clicked", () => {
    const team = {
      id: "Test Team Id",
      name: "Bonzzu",
      members: [
        { displayName: "Leus", id: "Test User Id" },
        { displayName: "Gino", id: "Test User Id 2" }
      ]
    };
    const teamListItem = shallow(<TeamListItem team={team} />);
    teamListItem
      .find(ListItem)
      .first()
      .simulate("click");
    expect(teamListItem.find(ExpandLess)).toBeDefined;
    expect(teamListItem.find(ExpandMore)).toBeUndefined;
  });
});
