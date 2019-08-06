import createTournament from "./createTournament";

describe("createTournament", () => {
  it("should return empty array when there are no teams", () => {
    const result = createTournament([]);
    expect(result).toEqual([]);
  });

  it("should return one date with one match with two teams", () => {
    const result = createTournament([
      { value: "team 1", label: "team 1" },
      { value: "team 2", label: "team 2" },
    ]);

    expect(result.length).toEqual(1);
    expect(result[0].matchDay).toEqual(1);
    expect(result[0].matches.length).toEqual(1);
    expect(result[0].matches[0].match).toEqual(1);
    expect(result[0].matches[0].teams.length).toEqual(2);
  });

  it("should return one date with one match with two teams", () => {
    const result = createTournament([
      { value: "team 1", label: "team 1" },
      { value: "team 2", label: "team 2" },
      { value: "team 3", label: "team 3" },
      { value: "team 4", label: "team 4" },
    ]);

    expect(result.length).toEqual(3);
    expect(result[0].matches.length).toEqual(2);
  });
});
