import { solutions } from "./solutions";

function runSpec(groupBy) {
  describe("groupBy", () => {
    test("groupBy 'length' return array of strings grouped by length of each string item", () => {
      expect(groupBy(["one", "two", "three"], "length")).toEqual({
        3: ["one", "two"],
        5: ["three"],
      });
    });

    test("groupBy 'inner object key' return array of objects grouped by the given key", () => {
      expect(
        groupBy(
          [
            { worker: "asher", level: "intern" },
            { worker: "eyal", level: "team-lead" },
          ],
          "level"
        )
      ).toEqual({
        intern: [{ worker: "asher", level: "intern" }],
        "team-lead": [{ worker: "eyal", level: "team-lead" }],
      });
    });

    test("groupBy 'function' return array of objects grouped by the function result", () => {
      expect(groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({
        4: [4.2],
        6: [6.1, 6.3],
      });
    });
  });
}

solutions.forEach((groupBy) => runSpec(groupBy));
