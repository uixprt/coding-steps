import { pipe } from "../pipe/solutions/pipe.solution.starosaur";
import { solutions } from "./solutions";
import { interval } from "../interval/solutions/interval.solution.starosaur";
import { of } from "../of/solutions/of.solution.starosaur";
import { MonoTypeOperatorFunction } from "../types/mono-type-operator-function";

function runSpace(debounceTime: (time: number) => MonoTypeOperatorFunction) {
  describe("debounceTime", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    jest.useFakeTimers();
    test("discard emitted values that takes less than the specified time between output", (done) => {
      const source$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

      pipe(
        () => source$,
        debounceTime((dueTime: number) => interval(dueTime))
      )(null).subscribe({
        next: (val: number) => val,
        error: (err: Error) => console.log(err),
        complete: () => {
          jest.runOnlyPendingTimers();
          expect(setTimeout).toHaveBeenCalledTimes(1);
          done();
        },
      });
    });
  });
}

solutions.forEach((fn) => runSpace(fn));
