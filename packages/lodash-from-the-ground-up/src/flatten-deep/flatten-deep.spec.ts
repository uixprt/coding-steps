import { solutions } from "./solutions";

function runSpec(flattenDeep) {
  describe("flattenDeep", () => {
    test("flattenDeep flatten reduce all levels of nested arrays recursively", () => {
      expect(flattenDeep([[2, [3, [4], [[5, 6], [[7]]]], 8]])).toEqual([
        2, 3, 4, 5, 6, 7, 8,
      ]);
    });
  });
}

solutions.forEach((flattenDeep) => runSpec(flattenDeep));
