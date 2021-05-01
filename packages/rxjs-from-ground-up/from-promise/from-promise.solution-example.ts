import {createObservable} from '../create-observable/create-observable.solution-example';

export function fromPromise(promise) {
  const observable$ = createObservable((subscriber) => {
    promise.then(result => {
      subscriber.next(result);
      subscriber.complete();
    });
  });

  return observable$;
}
