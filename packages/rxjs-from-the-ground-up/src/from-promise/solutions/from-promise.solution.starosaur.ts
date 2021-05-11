import { createObservable } from "../../create-observable/solutions/create-observable.solution.starosaur";

export function fromPromise(promise) {
  const observable$ = createObservable((subscriber) => {
    promise.then((result) => {
      subscriber.next(result);
      subscriber.complete();
    });
  });

  return observable$;
}
