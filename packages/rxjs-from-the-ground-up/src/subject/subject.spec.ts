import { solutions } from "./solutions";
import { createSubject } from "./solutions/subject.solution.veganzard";
import { tap } from "../tap/solutions/tap.solution.voltibou";

function runSpace(createSubject: Function) {
  describe("createSubject", () => {
    test("subject can send data and subscribe", (done) => {
      const result = [];
      const subject$ = createSubject();

      subject$.subscribe({
        next: (val: number) => {
          result.push(val);
        },
      });

      subject$.next(1);
      expect(result).toEqual([1]);
      done();
    });
  });

  test("subject can send data to multiple subscribers", (done) => {
    const result1 = [];
    const result2 = [];
    const subject$ = createSubject();

    subject$.subscribe({
      next: (val: number) => {
        result1.push(val);
      },
    });

    subject$.subscribe({
      next: (val: number) => {
        result2.push(val);
      },
    });

    subject$.next(1);
    expect(result1).toEqual([1]);
    expect(result2).toEqual([1]);
    done();
  });

  test("subject complete", (done) => {
    const mockedComplete = jest.fn();
    const subject$ = createSubject();

    subject$.subscribe({
      complete: () => {
        expect(mockedComplete.mock.calls.length).toBe(1);
        done();
      },
    });

    mockedComplete();
    subject$.complete();
  });

  test("subject error", (done) => {
    const mockedError = jest.fn();
    const subject$ = createSubject();

    subject$.subscribe({
      error: () => {
        expect(mockedError.mock.calls.length).toBe(1);
        done();
      },
    });

    mockedError();
    subject$.error();
  });
}

solutions.forEach((fn) => runSpace(fn));
