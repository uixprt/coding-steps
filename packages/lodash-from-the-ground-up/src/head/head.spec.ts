import { solutions } from "./solutions";

function runSpec(name: string, head) {
  describe(`head - ${name}`, () => {
    test("get first item of array", () => {
      expect(head(["a", "b", "c", "d"])).toEqual("a");
    });

    test("get undefined if array is empty", () => {
      expect(head([])).toBeUndefined();
    });
  });
}

Object.entries(solutions).forEach(([name, chunk]) => runSpec(name, chunk));
