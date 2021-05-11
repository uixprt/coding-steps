import { solutions } from "./solutions";

function runSpecs(of) {
  describe("of", () => {
    test("create observable that emit the given arguments", (done) => {
      const numbers$ = of(1, 2, 3, 4, 5);

      let results = [];

      numbers$.subscribe({
        next: (val: number) => {
          results = [...results, val];
        },
        error: (err: Error) => done(err),
        complete: () => {
          expect(results).toEqual([1, 2, 3, 4, 5]);
          done();
        },
      });
    });
  });
}

solutions.forEach((of) => runSpecs(of));
