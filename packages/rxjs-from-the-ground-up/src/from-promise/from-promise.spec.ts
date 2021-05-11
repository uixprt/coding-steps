import { solutions } from "./solutions";

function runSpecs(fromPromise) {
  describe("fromPromise", () => {
    test("create observable that emit the given promise result as a value", (done) => {
      const hero$ = fromPromise(
        new Promise((resolve) => {
          resolve("batman");
        })
      );

      let result = null;

      hero$.subscribe({
        next: (val) => {
          result = val;
        },
        error: () => {},
        complete: () => {
          expect(result).toEqual("batman");
          done();
        },
      });
    });
  });
}

solutions.forEach((fn) => runSpecs(fn));
