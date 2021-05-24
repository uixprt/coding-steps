import { createObservable } from "../create-observable/solutions/create-observable.solution.starosaur";
import { of } from "../of/solutions/of.solution.starosaur";
import { pipe } from "../pipe/solutions/pipe.solution.starosaur";
import { solutions } from "./solutions";

function runSpecs(finalize) {
  describe("finalize", () => {
    test("Call a function when observable completes", (done) => {
      const numbers$ = of(1, 2, 3, 4, 5);
      let results = [];

      const mockCallback = jest.fn(() => true);

      pipe(
        () => numbers$,
        finalize(mockCallback)
      )(null).subscribe({
        next: (val: number) => {
          results = [...results, val];
        },
        error: (err: Error) => done(err),
        complete: () => {
          expect(results).toEqual([1, 2, 3, 4, 5]);
          expect(mockCallback.mock.calls.length).toBe(1);
          done();
        },
      });
    });

    test("Call a function when observable fail", (done) => {
      const computation$ = createObservable((subscriber) => {
        try {
          const computationResult = {}.nonExistingMethod();
          subscriber.next(computationResult);
        } catch (err) {
          subscriber.error("error in computation");
        }
      });
      let results = [];

      const mockCallback = jest.fn(() => true);

      pipe(
        () => computation$,
        finalize(mockCallback)
      )(null).subscribe({
        next: (val: number) => {
          results = [...results, val];
        },
        error: (err: Error) => {
          expect(mockCallback.mock.calls.length).toBe(1);
          done();
        },
        complete: () => {
          done();
        },
      });
    });
  });
}

solutions.forEach((fn) => runSpecs(fn));
