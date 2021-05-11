import { of } from "../of/solutions/of.solution.starosaur";
import { map } from "../map/solutions/map.solution.starosaur";
import { solutions } from "./solutions";

function runSpecs(pipe) {
  describe("pipe", () => {
    test("create one observable from combination of the operators", (done) => {
      const newObs$ = pipe(
        map((num) => num * 10),
        map((num) => num + 5)
      )(of(1, 2, 3, 4));

      let results = [];

      newObs$.subscribe(
        function next(val) {
          results = [...results, val];
        },
        function error(err) {
          done(err);
        },
        function complete() {
          expect(results).toEqual([15, 25, 35, 45]);
          done();
        }
      );
    });
  });
}

solutions.forEach((pipe) => runSpecs(pipe));
