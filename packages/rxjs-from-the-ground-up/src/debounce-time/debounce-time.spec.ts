import { pipe } from "../pipe/solutions/pipe.solution.starosaur";
import { solutions } from "./solutions";
import { interval } from "../interval/solutions/interval.solution.starosaur";
import { of } from "../of/solutions/of.solution.starosaur";
import { createSubject } from "../subject/solutions/subject.solution.veganzard";
import { Observable } from "../types/observable";

function runSpace(
  debounceTime: (time: number) => (source: Observable) => Observable
) {
  describe("debounceTime", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    test("emit only one value", (done) => {
      const subject$ = createSubject();
      const results = [];
      pipe(
        () => subject$,
        debounceTime(500)
      )(null).subscribe({
        next: (val: number) => {
          results.push(val);
        },
        error: (err: Error) => console.log(err),
        complete: () => {
          expect(setTimeout).toHaveBeenCalledTimes(1);
          expect(results).toEqual([1]);
          done();
        },
      });

      subject$.next(1);
      jest.runOnlyPendingTimers();
      subject$.complete();
    });

    test("emit 3 values", (done) => {
      const subject$ = createSubject();
      const results = [];
      pipe(
        () => subject$,
        debounceTime(500)
      )(null).subscribe({
        next: (val: number) => {
          results.push(val);
        },
        error: (err: Error) => console.log(err),
        complete: () => {
          expect(results).toEqual([3]);
          done();
        },
      });

      subject$.next(1);
      subject$.next(2);
      subject$.next(3);
      jest.runOnlyPendingTimers();
      subject$.complete();
    });
  });
}

solutions.forEach((fn) => runSpace(fn));
