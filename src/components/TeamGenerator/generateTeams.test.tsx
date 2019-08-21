import generateTeams from "./generateTeams";
import { Team, User } from "../../types";
import * as fc from "fast-check";
import { Arbitrary } from "fast-check";
import _ from "lodash";

describe("generateTeams", () => {
  it("should throw when team size is 0", () => {
    const leus = { id: "Leus id", displayName: "Leus Galvan" };
    const gino = { id: "Gino id", displayName: "Gino Emiliozzi" };
    expect(() => generateTeams([leus, gino], 0)).toThrow();
  });

  it("should throw when number of users is not a multiple of team size", () => {
    const leus = { id: "Leus id", displayName: "Leus Galvan" };
    const gino = { id: "Gino id", displayName: "Gino Emiliozzi" };
    const euge = { id: "Euge id", displayName: "Eugenia Simich" };

    expect(() => generateTeams([leus, gino, euge], 2)).toThrow();
  });

  it("should generate teams which users should be exactly the given users", () => {
    fc.assert(
      fc.property(usersAndTeamSizeArbitrary, ([users, teamSize]) => {
        const teams = generateTeams(users, teamSize);
        const sortedUsers = users.map(user => user.id).sort();
        const sortedTeamUsers = getUsers(teams)
          .map(user => user.id)
          .sort();

        teams.every(team => team.members.length === teamSize) &&
          _.isEqual(sortedUsers, sortedTeamUsers);
      })
    );
  });
});

const getUsers = (teams: Omit<Team, "id">[]): User[] =>
  teams.reduce(
    (usersSoFar: User[], team: Omit<Team, "id">) =>
      usersSoFar.concat(team.members),
    []
  );

const usersAndTeamSizeArbitrary = fc
  .integer(1, 10)
  .chain(teamSize =>
    fc
      .integer(1, 10)
      .chain(numberOfTeams =>
        fc.tuple(
          usersArbitrary(teamSize * numberOfTeams),
          fc.constant(teamSize)
        )
      )
  );

const usersArbitrary = (length: number): Arbitrary<User[]> => {
  const userArbitrary: Arbitrary<User> = fc
    .string()
    .chain(id =>
      fc.string().map(displayName => ({ id: id, displayName: displayName }))
    );
  return fc.set(userArbitrary, length, length);
};
