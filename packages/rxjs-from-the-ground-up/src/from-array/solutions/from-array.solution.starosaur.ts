import { createObservable } from "../../create-observable/solutions/create-observable.solution.starosaur";

export function fromArray(array) {
  const observable$ = createObservable((subscriber) => {
    for (let item of array) {
      subscriber.next(item);
    }

    subscriber.complete();
  });

  return observable$;
}
