import { solutions } from "./solutions";

function runSpec(drop) {
  describe("drop", () => {
    test("drop the first 2 elements of the given array", () => {
      expect(drop([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5]);
    });

    test("not drop any element", () => {
      expect(drop([1, 2, 3, 4, 5], 0)).toEqual([1, 2, 3, 4, 5]);
    });

    test("drop the first element of the given array", () => {
      expect(drop([1, 2, 3, 4, 5])).toEqual([2, 3, 4, 5]);
    });

    test("drop the last element of the given array", () => {
      expect(drop([1, 2, 3, 4, 5], null, "right")).toEqual([1, 2, 3, 4]);
    });

    test("drop all elements from the given array", () => {
      expect(drop([1, 2, 3, 4, 5], 10)).toEqual([]);
    });

    test("drop the 2 last elements from the given array", () => {
      expect(drop([1, 2, 3, 4, 5], 2, "right")).toEqual([1, 2, 3]);
    });
  });
}

solutions.forEach((drop) => runSpec(drop));
