import { of } from "../of/solutions/of.solution.starosaur";
import { pipe } from "../pipe/solutions/pipe.solution.starosaur";
import { solutions } from "./solutions";

function runSpecs(tap) {
  describe("tap", () => {
    test("tap should perform side effect and return the original value", (done) => {
      const numbers$ = of(1, 2, 3, 4, 5);
      let results = [];

      const mockCallback = jest.fn((num) => num * 10);

      pipe(
        () => numbers$,
        tap(mockCallback)
      )(null).subscribe({
        next: (val: number) => {
          results = [...results, val];
        },
        error: (err: Error) => done(err),
        complete: () => {
          expect(results).toEqual([1, 2, 3, 4, 5]);
          expect(mockCallback.mock.calls.length).toBe(5);

          done();
        },
      });
    });
  });
}

solutions.forEach((fn) => runSpecs(fn));
