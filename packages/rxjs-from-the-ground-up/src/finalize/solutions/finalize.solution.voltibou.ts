import { Observable } from "../../types/observable";
import { createObservable } from "../../create-observable/solutions/create-observable.solution.starosaur";

export function finalize<T>(finalFn: () => any) {
  return (source$: Observable) => {
    const newSource$ = createObservable((subscriber) => {
      const sourceSubscription = source$.subscribe({
        next: (val: T) => {
          subscriber.next(val);
        },
        error: (err: Error) => {
          finalFn();
          subscriber.error(err);
        },
        complete: () => {
          finalFn();
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
