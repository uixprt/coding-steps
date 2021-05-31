import { createObservable } from "../create-observable/solutions/create-observable.solution.starosaur";
import { of } from "../of/solutions/of.solution.starosaur";
import { pipe } from "../pipe/solutions/pipe.solution.starosaur";
import { solutions } from "./solutions";

function runSpecs(distinctUntilChange) {
  describe("distinctUntilChange", () => {
    test("Only emit when the current value is different than the last", (done) => {
      const testObject = { prop: 123 };
      const numbers$ = of(testObject, testObject, 2, 2, 3, 4, 5);
      let results = [];

      pipe(
        () => numbers$,
        distinctUntilChange()
      )(null).subscribe({
        next: (val: number) => {
          results = [...results, val];
        },
        error: (err: Error) => done(err),
        complete: () => {
          expect(results).toEqual([testObject, 2, 3, 4, 5]);
          done();
        },
      });
    });
  });
}

solutions.forEach((fn) => runSpecs(fn));
