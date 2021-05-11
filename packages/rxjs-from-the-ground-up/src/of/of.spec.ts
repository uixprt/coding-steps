import { solutions } from "./solutions";

function runSpecs(of) {
  describe("of", () => {
    xtest("create observable that emit the given arguments", (done) => {
      const numbers$ = of(1, 2, 3, 4, 5);

      let results = [];

      numbers$.subscribe(
        function next(val) {
          results = [...results, val];
        },
        function error() {},
        function complete() {
          expect(results).toEqual([1, 2, 3, 4, 5]);
          done();
        }
      );
    });
  });
}

solutions.forEach((of) => runSpecs(of));
