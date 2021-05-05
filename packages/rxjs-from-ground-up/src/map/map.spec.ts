import {of} from '../of/of.solution-example';
import {pipe} from './../pipe/pipe.solution-example';
// import {map} from './map.solution-example';
import {map} from './map';

describe('map', () => {
  xtest('apply the given transformation on the incoming value', (done) => {
    const numbers$ = of(1,2,3,4,5);
    let results = [];

    pipe(
     () => numbers$,
     map((num) => num * 10),
    )(null).subscribe(
      function next(val) {
        results = [...results, val];
      },
      function error() {
      },
      function complete() {
        expect(results).toEqual([10,20,30,40,50]);
        done();
      }
    );
  });
});
