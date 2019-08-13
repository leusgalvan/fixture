import createTournament from "./createTournament";
import { Team } from "../../types";

describe("createTournament", () => {
  it("should return empty array when there are no teams", () => {
    const result = createTournament([], "");
    expect(result).toEqual(null);
  });

  it("should return one date with one match with two teams", () => {
    const result = createTournament([createTeam(1), createTeam(2)], "name");

    expect(result).not.toBeNull();

    expect(result && result.schedule.length).toEqual(1);
    expect(result && result.schedule[0].matchDay).toEqual(1);
    expect(result && result.schedule[0].matches.length).toEqual(1);
    expect(result && result.schedule[0].matches[0].matchNumber).toEqual(1);
    expect(result && result.schedule[0].matches[0].teams.length).toEqual(2);
  });

  it("should return one date with one match with two teams", () => {
    const result = createTournament(
      [createTeam(1), createTeam(2), createTeam(3), createTeam(4)],
      "asd"
    );

    expect(result).not.toBeNull();
    expect(result && result.schedule.length).toEqual(3);
    expect(result && result.schedule[0].matches.length).toEqual(2);
  });
});

function createTeam(id: number): Team {
  return {
    id: id.toString(),
    name: "team " + id,
    members: []
  };
}
