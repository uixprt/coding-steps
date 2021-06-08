import { pipe } from "../pipe/solutions/pipe.solution.starosaur";
import { solutions } from "./solutions";
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
      const results: any[] = [];
      pipe(
        () => subject$,
        debounceTime(500)
      )(null).subscribe({
        next: (val: number) => {
          results.push(val);
        },
        error: (err: Error) => console.log(err),
        complete: () => {
          expect(setTimeout).toHaveBeenCalledTimes(2);
          expect(results).toEqual([1]);
          done();
        },
      });

      subject$.next(1);
      jest.runOnlyPendingTimers();
      subject$.next(2);
      subject$.complete();
    });

    test("emit only the second value", (done) => {
      const subject$ = createSubject();
      const results: any[] = [];
      pipe(
        () => subject$,
        debounceTime(1000)
      )(null).subscribe({
        next: (val: number) => {
          results.push(val);
        },
        error: (err: Error) => console.log(err),
        complete: () => {
          expect(results).toEqual([2]);
          done();
        },
      });

      subject$.next(1);
      subject$.next(2);
      jest.runOnlyPendingTimers();
      subject$.complete();
    });

    test("results contain 2 emissions", (done) => {
      const subject$ = createSubject();
      const results: any[] = [];
      pipe(
        () => subject$,
        debounceTime(1000)
      )(null).subscribe({
        next: (val: number) => {
          results.push(val);
        },
        error: (err: Error) => console.log(err),
        complete: () => {
          expect(results).toEqual([1, 2]);
          done();
        },
      });

      subject$.next(1);
      jest.runOnlyPendingTimers();
      subject$.next(2);
      jest.runOnlyPendingTimers();
      subject$.complete();
    });
  });
}

solutions.forEach((fn) => runSpace(fn));
