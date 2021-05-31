import { Observable } from "../../types/observable";
import { createObservable } from "../../create-observable/solutions/create-observable.solution.starosaur";

export function distinctUntilChange<T>() {
  return (source$: Observable) => {
    const newSource$ = createObservable((subscriber) => {
      let previwesValue = null;
      const sourceSubscription = source$.subscribe({
        next: (val: T) => {
          if (val !== previwesValue) {
            subscriber.next(val);
          }
          previwesValue = val;
        },
        error: (err: Error) => {
          subscriber.error(err);
        },
        complete: () => {
          subscriber.complete();
        },
      });

      return () => {
        sourceSubscription.unsubscribe();
      };
    });

    return newSource$;
  };
}
