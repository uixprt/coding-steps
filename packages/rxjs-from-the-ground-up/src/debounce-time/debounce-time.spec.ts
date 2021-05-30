import { pipe } from "../pipe/solutions/pipe.solution.starosaur";
import { solutions } from "./solutions";
import { interval } from "../interval/solutions/interval.solution.starosaur";
import { of } from "../of/solutions/of.solution.starosaur";

function runSpace(debounceTime) {
  describe("debounceTime", () => {
    jest.useFakeTimers();
    test("discard emitted values that takes less than the specified time between output", () => {
      const source$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

      pipe(
        () => source$,
        debounceTime((dueTime) => interval(dueTime))
      )(null).subscribe({
        next: (val: number) => val,
        error: (err: Error) => console.log(err),
        complete: () => {
          expect(setTimeout).toHaveBeenCalledTimes(1);
        },
      });
    });
  });
}

solutions.forEach((fn) => runSpace(fn));
