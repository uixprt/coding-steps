import { of } from "../of/solutions/of.solution.starosaur";
import { map } from "../map/solutions/map.solution.starosaur";
import { solutions } from "./solutions";

function runSpecs(pipe: any) {
  describe("pipe", () => {
    test("create one observable from combination of the operators", (done) => {
      const newObs$ = pipe(
        map((num) => num * 10),
        map((num) => num + 5)
      )(of(1, 2, 3, 4));

      let results: number[] = [];

      newObs$.subscribe(
        function next(val: number) {
          results = [...results, val];
        },
        function error(err: Error) {
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
