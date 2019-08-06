import _ from 'lodash'

const createTournament = selectedTeams => {
  if (selectedTeams.length < 2) return []
  const shuffledTeams = _.shuffle(selectedTeams)
  const nrDates = shuffledTeams.length - 1

  const upper = shuffledTeams.slice(0, shuffledTeams.length / 2)
  const lower = shuffledTeams.slice(shuffledTeams.length / 2).reverse()

  const buildMatchDays = (
    upper,
    lower,
    nrDates,
    currentDate = 1,
    matchDays = []
  ) => {
    if (currentDate === 1) {
      const firstDate = {
        matchDay: 1,
        matches: _.zip(upper, lower).map((teams, idx) => ({
          match: idx + 1,
          teams
        }))
      }
      const newMatchDays = matchDays.concat(firstDate)
      return buildMatchDays(
        upper,
        lower,
        nrDates,
        currentDate + 1,
        newMatchDays
      )
    } else if (currentDate <= nrDates) {
      const newUpper = []
        .concat(upper[0])
        .concat(lower[0])
        .concat(upper.slice(1, upper.length - 1))
      const newLower = lower.slice(1).concat(upper[upper.length - 1])
      const newDate = {
        matchDay: currentDate,
        matches: _.zip(newUpper, newLower).map((teams, idx) => ({
          match: idx + 1,
          teams
        }))
      }
      const newDates = matchDays.concat(newDate)
      return buildMatchDays(
        newUpper,
        newLower,
        nrDates,
        currentDate + 1,
        newDates
      )
    } else {
      return matchDays
    }
  }

  return buildMatchDays(upper, lower, nrDates)
}

export default createTournament
