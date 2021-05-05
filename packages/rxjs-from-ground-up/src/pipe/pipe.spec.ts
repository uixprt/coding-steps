import {of} from '../of/of.solution-example';
import {map} from '../map/map.solution-example';
import {pipe} from './pipe';
// import {pipe} from './pipe.solution-example';

describe('pipe', () => {
  xtest('create one observable from combination of the operators', (done) => {
    const newObs$ = pipe(
      map(num => num * 10),
      map(num => num + 5),
    )(of(1,2,3,4));

    let results = [];

    newObs$.subscribe(
      function next(val) {
        results = [...results, val];
      },
      function error(err) { done(err); },
      function complete() {
        expect(results).toEqual([15, 25, 35, 45]);
        done();
      }
    );
  });
});
