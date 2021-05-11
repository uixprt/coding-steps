import { solutions } from "./solutions";

function runSpecs(createObservable) {
  describe("createObservable", () => {
    test("Get results on subscribing", (done) => {
      const numbers$ = createObservable((subscriber) => {
        for (let i = 0; i < 10; i += 1) {
          subscriber.next(i);
        }
        subscriber.complete();
      });

      let results = [];

      numbers$.subscribe({
        next: (val) => {
          results = [...results, val];
        },
        error: (err) => {
          throw err;
        },
        complete: () => {
          expect(results).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
          done();
        },
      });
    });

    test("Get error notification when observable emit error", (done) => {
      const computation$ = createObservable((subscriber) => {
        try {
          const computationResult = {}.nonExistingMethod();
          subscriber.next(computationResult);
        } catch (err) {
          subscriber.error("error in computation");
        }
      });

      computation$.subscribe({
        next: (val) => {},
        error: (err) => {
          expect(err).toEqual("error in computation");
          done();
        },
        complete: () => {},
      });
    });

    test("Get complete notification when observable emit complete", (done) => {
      const computation$ = createObservable((subscriber) => {
        subscriber.next(1234);
        subscriber.complete();
      });

      computation$.subscribe({
        next: (val) => {},
        error: (err) => {},
        complete: () => {
          done();
        },
      });
    });

    test("Stop receiving emittion after unsubcribing", (done) => {
      const numbersAsync$ = createObservable((subscriber) => {
        const timeoutMs = 0;
        const max = 10;
        let intervalIndex = 0;

        const generator = () => {
          if (subscriber.closed) {
            subscriber.complete();
            return;
          }

          setTimeout(() => {
            if (intervalIndex >= max) {
              subscriber.complete();
            }

            subscriber.next(intervalIndex);
            intervalIndex += 1;

            generator();
          }, timeoutMs);
        };

        generator();

        return () => {};
      });

      let results = [];

      const subscription = numbersAsync$.subscribe({
        next: (val) => {
          if (val === 3) {
            subscription.unsubscribe();
            return;
          }

          if (val > 3) {
            throw new Error(
              "Was expected to not recive values after unsubscribe"
            );
          }

          results = [...results, val];
        },
        error: (err) => {
          throw err;
        },
        complete: () => {
          expect(results).toEqual([0, 1, 2]);
          done();
        },
      });
    });
  });
}

solutions.forEach((fn) => runSpecs(fn));
