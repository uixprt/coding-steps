import { of } from "../of/solutions/of.solution.starosaur";
import { pipe } from "../pipe/solutions/pipe.solution.starosaur";
import { solutions } from "./solutions";

function runSpace(filter) {
  describe("filter", () => {
    test("filter observable by given check", (done) => {
      const source$ = of(10, 15, 47, 30, 24, 58);
      let result = [];

      pipe(
        () => source$,
        filter((item) => item < 30)
      )(null).subscribe({
        next: (val: number) => (result = [...result, val]),
        error: (err: Error) => done(err),
        complete: () => {
          expect(result).toEqual([10, 15, 24]);
          done();
        },
      });
    });
  });
}

solutions.forEach((fn) => runSpace(fn));
