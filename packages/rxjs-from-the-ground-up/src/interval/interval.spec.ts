import { solutions } from "./solutions";

function runSpec(interval) {
  describe("interval", () => {
    test("emit sequential numbers in interval", (done) => {
      const numbers$ = interval(200);

      let results = [];

      const subscription = numbers$.subscribe({
        next: (val: number) => {
          results = [...results, val];
          if (val === 4) {
            subscription.unsubscribe();
            expect(results).toEqual([0, 1, 2, 3, 4]);
            done();
          }
        },
        error: (e: Error) => {
          done(e);
        },
        complete: () => {
          done("unexpected complete");
        },
      });
    });
  });
}

solutions.forEach((fn) => runSpec(fn));
