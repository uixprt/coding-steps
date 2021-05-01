import {createObservable} from '../create-observable/create-observable.solution-example';

export function fromArray(array) {
  const observable$ = createObservable((subscriber) => {
    for (let item of array) {
      subscriber.next(item);
    }

    subscriber.complete();
  });

  return observable$;
}
