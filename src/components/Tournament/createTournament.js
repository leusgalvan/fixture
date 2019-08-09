import _ from "lodash";

const createTournament = (selectedTeams, name) => {
  if (!selectedTeams || selectedTeams.length < 2) return [];
  var shuffledTeams;
  if (selectedTeams.length % 2 !== 0) {
    shuffledTeams = _.shuffle(
      selectedTeams.concat({
        id: "LIBRE",
        members: [],
        name: "LIBRE",
        label: "LIBRE",
        value: "LIBRE",
      })
    );
  } else {
    shuffledTeams = _.shuffle(selectedTeams);
  }
  const nrDates = shuffledTeams.length - 1;

  const upper = shuffledTeams.slice(0, shuffledTeams.length / 2);
  const lower = shuffledTeams.slice(shuffledTeams.length / 2).reverse();

  const buildMatchDays = (
    upper,
    lower,
    nrDates,
    currentDate = 1,
    matchDays = []
  ) => {
    const buildDate = (number, upper, lower) => ({
      matchDay: number,
      matches: _.zip(upper, lower).map((teams, idx) => ({
        matchNumber: idx + 1,
        teams,
        result: "not played",
      })),
    });
    if (currentDate === 1) {
      const firstDate = buildDate(1, upper, lower);
      const newMatchDays = matchDays.concat(firstDate);
      return buildMatchDays(
        upper,
        lower,
        nrDates,
        currentDate + 1,
        newMatchDays
      );
    } else if (currentDate <= nrDates) {
      const newUpper = []
        .concat(upper[0])
        .concat(lower[0])
        .concat(upper.slice(1, upper.length - 1));
      const newLower = lower.slice(1).concat(upper[upper.length - 1]);
      const newDate = buildDate(currentDate, upper, lower);
      const newDates = matchDays.concat(newDate);
      return buildMatchDays(
        newUpper,
        newLower,
        nrDates,
        currentDate + 1,
        newDates
      );
    } else {
      return matchDays;
    }
  };

  const matchDays = buildMatchDays(upper, lower, nrDates);
  return {
    id:
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15),
    name,
    schedule: matchDays,
  };
};

export default createTournament;
