import { createObservable } from "./create-observable";

describe("createObservable", () => {
  test.skip("Get results on subscribing", (done) => {
    const numbers$ = createObservable((subscriber) => {
      for (let i = 0; i < 10; i += 1) {
        subscriber.next(i);
      }
      subscriber.complete();
    });

    let results = [];

    numbers$.subscribe(
      function next(val) {
        results = [...results, val];
      },
      function error(err) {
        throw err;
      },
      function complete() {
        expect(results).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        done();
      }
    );
  });

  test.skip("Get error notification when observable emit error", (done) => {
    const computation$ = createObservable((subscriber) => {
      try {
        const computationResult = {}.nonExistingMethod();
        subscriber.next(computationResult);
      } catch (err) {
        subscriber.error("error in computation");
      }
    });

    computation$.subscribe(
      function next(val) {},
      function error(err) {
        expect(err).toEqual("error in computation");
        done();
      },
      function complete() {}
    );
  });

  test.skip("Get complete notification when observable emit complete", (done) => {
    const computation$ = createObservable((subscriber) => {
      subscriber.next(1234);
      subscriber.complete();
    });

    computation$.subscribe(
      function next(val) {},
      function error(err) {},
      function complete() {
        done();
      }
    );
  });
});
