import { solutions } from "./solutions";
import { createSubject } from "./solutions/subject.solution.veganzard";

function runSpace(createSubject: Function) {
  describe("createSubject", () => {
    test.skip("", (done) => {
      const data$ = createSubject(() => {
        return {
          next: () => {},
          subscribe: () => {},
        };
      });

      data$.next(1);
      console.log(data$);

      done();
    });
  });
}

solutions.forEach((fn) => runSpace(fn));
