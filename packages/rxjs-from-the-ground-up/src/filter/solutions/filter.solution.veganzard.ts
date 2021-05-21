import { Observable } from "../../types/observable";
import { createObservable } from "../../create-observable/solutions/create-observable.solution.starosaur";

export function filter<T>(checkFn: (item: T) => boolean) {
  return (source$: Observable) => {
    return createObservable((subscriber) => {
      const sub = source$.subscribe({
        next: (val: T) => {
          const isPassed = checkFn(val);
          if (isPassed) {
            subscriber.next(val);
          }
        },
        error: (err: Error) => {
          subscriber.error(err);
        },
        complete: () => {
          subscriber.complete();
        },
      });

      return () => {
        sub.unsubscribe();
      };
    });
  };
}
