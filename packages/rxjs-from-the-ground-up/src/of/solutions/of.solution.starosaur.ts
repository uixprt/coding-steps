import { createObservable } from "../../create-observable/solutions/create-observable.solution.starosaur";

export function of(...args) {
  const observable = createObservable((subscriber) => {
    for (let val of args) {
      subscriber.next(val);
    }
    subscriber.complete();
  });

  return observable;
}
