import React from "react";
import { shallow } from "enzyme";
import { ListItemText } from "@material-ui/core";
import TeamMemberListItem from "./TeamMemberListItem";
import { User } from "../../types";

describe("TeamMemberListItem", () => {
  it("should display the member's display name", () => {
    const member: User = {
      id: "Test id",
      displayName: "Leus"
    };
    const teamListItem = shallow(<TeamMemberListItem member={member} />);
    expect(
      teamListItem.find(ListItemText).find({ primary: "Leus" })
    ).toHaveLength(1);
  });
});
