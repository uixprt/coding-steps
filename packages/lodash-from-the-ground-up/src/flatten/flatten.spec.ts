import { solutions } from "./solutions";

function runSpec(flatten) {
  describe("flatten", () => {
    test("flatten reduce one level of nested arrays", () => {
      expect(flatten([1, [2, [3, [4]], 5]])).toEqual([1, 2, [3, [4]], 5]);
    });
  });
}

solutions.forEach((flatten) => runSpec(flatten));
