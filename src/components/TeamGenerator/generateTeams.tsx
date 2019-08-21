import { User, Team } from "../../types";
import _ from "lodash";

const generateTeams = (users: User[], teamSize: number): Omit<Team, "id">[] => {
  if (teamSize === 0) throw new Error("Team size must be greater than 0");

  if (users.length % teamSize !== 0)
    throw new Error("The number of users must be a multiple of the team size");

  const numberOfTeams = users.length / teamSize;
  const shuffledUsers = _.shuffle(users);
  return _.range(numberOfTeams).map(n => {
    const members = shuffledUsers.slice(n * teamSize, (n + 1) * teamSize);
    return { name: makeName(members), members: members };
  });
};

const makeName = (members: User[]): string =>
  members.map(member => member.displayName).join(" - ");

export default generateTeams;
