import { of } from "../of/solutions/of.solution.starosaur";
import { pipe } from "../pipe/solutions/pipe.solution.starosaur";
import { solutions } from "./solutions";

function runSpecs(map) {
  describe("map", () => {
    test("apply the given transformation on the incoming value", (done) => {
      const numbers$ = of(1, 2, 3, 4, 5);
      let results = [];

      pipe(
        () => numbers$,
        map((num) => num * 10)
      )(null).subscribe({
        next: (val: number) => {
          results = [...results, val];
        },
        error: (err: Error) => done(err),
        complete: () => {
          expect(results).toEqual([10, 20, 30, 40, 50]);
          done();
        },
      });
    });
  });
}

solutions.forEach((fn) => runSpecs(fn));
