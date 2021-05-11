import {solutions} from './solutions';

function runSpec(interval) {
  describe('interval', () => {
    test('emit sequential numbers in interval', (done) => {
      const numbers$ = interval(200);
      
      let results = [];

      const subscription = numbers$.subscribe(
        function next(val) {
          results = [...results, val];
          if (val === 4) {
            subscription.unsubscribe();
            expect(results).toEqual([0,1,2,3,4]);
            done();
          }
        }, 
        function error(e) {done(e)}, 
        function complete() {done('unexpected complete')});
    });
  });
}

solutions.forEach(fn => runSpec(fn));
