import {Observable} from '../../types/observable';
import {createObservable} from '../../create-observable/solutions/create-observable.solution.starosaur';

export function map(transformationFn: (incoming) => any) {
  return (source$: Observable) => {
    const newSource$ = createObservable((subscriber) => {

      const sourceSubscription = source$.subscribe(
        function next(val) {
          const newVal = transformationFn(val);
          subscriber.next(newVal);
        },
        function error(err) {
          subscriber.error(err);
        },
        function complete() {
          subscriber.complete();
        },
      );

      return () => {
        sourceSubscription.unsubscribe();
      }
    });

    return newSource$;
  };
}
