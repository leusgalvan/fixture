import mapTournamentToStandings from "./mapTournamentToStandings";

describe("mapTournamentToStandings", () => {
  it("should return empty array when there are no matches", () => {
    const dummyTournament = {
      id: "lskj2342",
      name: "Metegol",
      schedule: []
    };

    expect(mapTournamentToStandings(dummyTournament)).toEqual([]);
  });

  it("should show teams without score when no matches were played", () => {
    const dummyTournament = {
      id: "lskj2342",
      name: "Metegol",
      schedule: [
        {
          matchDay: 1,
          matches: [
            {
              matchNumber: 1,
              teams: [
                {
                  id: "a",
                  name: "A",
                  members: [
                    { id: "gino", displayName: "Gino" },
                    { id: "chino", displayName: "Chino" }
                  ]
                },
                {
                  id: "b",
                  name: "B",
                  members: [
                    { id: "leus", displayName: "Leus" },
                    { id: "euge", displayName: "Euge" }
                  ]
                }
              ],
              result: "not played"
            }
          ]
        }
      ]
    };

    const standings = mapTournamentToStandings(dummyTournament);

    expect(standings).toEqual([
      {
        teamId: "a",
        teamName: "A",
        score: 0
      },
      {
        teamId: "b",
        teamName: "B",
        score: 0
      }
    ]);
  });

  it("should position the teams correctly: 1st use case", () => {
    const dummyTournament = {
      id: "lskj2342",
      name: "Metegol",
      schedule: [
        {
          matchDay: 1,
          matches: [
            {
              matchNumber: 1,
              teams: [
                {
                  id: "a",
                  name: "A",
                  members: [
                    { id: "gino", displayName: "Gino" },
                    { id: "chino", displayName: "Chino" }
                  ]
                },
                {
                  id: "b",
                  name: "B",
                  members: [
                    { id: "leus", displayName: "Leus" },
                    { id: "euge", displayName: "Euge" }
                  ]
                }
              ],
              result: "a"
            }
          ]
        }
      ]
    };

    const standings = mapTournamentToStandings(dummyTournament);

    expect(standings).toEqual([
      {
        teamId: "a",
        teamName: "A",
        score: 1
      },
      {
        teamId: "b",
        teamName: "B",
        score: 0
      }
    ]);
  });

  it("should position the teams correctly: 2nd use case", () => {
    const dummyTournament = {
      id: "lskj2342",
      name: "Metegol",
      schedule: [
        {
          matchDay: 1,
          matches: [
            {
              matchNumber: 1,
              teams: [
                {
                  id: "a",
                  name: "A",
                  members: [
                    { id: "gino", displayName: "Gino" },
                    { id: "chino", displayName: "Chino" }
                  ]
                },
                {
                  id: "b",
                  name: "B",
                  members: [
                    { id: "leus", displayName: "Leus" },
                    { id: "euge", displayName: "Euge" }
                  ]
                }
              ],
              result: "a"
            },
            {
              matchNumber: 1,
              teams: [
                {
                  id: "c",
                  name: "C",
                  members: [
                    { id: "gino", displayName: "Gino" },
                    { id: "chino", displayName: "Chino" }
                  ]
                },
                {
                  id: "d",
                  name: "D",
                  members: [
                    { id: "leus", displayName: "Leus" },
                    { id: "euge", displayName: "Euge" }
                  ]
                }
              ],
              result: "c"
            }
          ]
        }
      ]
    };

    const standings = mapTournamentToStandings(dummyTournament);

    expect(standings).toEqual([
      {
        teamId: "a",
        teamName: "A",
        score: 1
      },
      {
        teamId: "c",
        teamName: "C",
        score: 1
      },
      {
        teamId: "b",
        teamName: "B",
        score: 0
      },
      {
        teamId: "d",
        teamName: "D",
        score: 0
      }
    ]);
  });
});
