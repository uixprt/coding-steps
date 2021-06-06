import { of } from "../of/solutions/of.solution.starosaur";
import { solutions } from "./solutions";

function runSpec(name: string, take) {
  describe(`take - {name}`, () => {
    test("emit only the requested amount of emittions", (done) => {
      let result = [];

      const numbers$ = of(1, 2, 3, 4);

      take(2)(numbers$).subscribe({
        next: (value) => {
          result.push(value);
        },
        error: done,
        complete: () => {
          expect(result).toEqual([1, 2]);
          done();
        },
      });
    });
  });
}

Object.entries(solutions).forEach(([name, take]) => runSpec(name, take));
