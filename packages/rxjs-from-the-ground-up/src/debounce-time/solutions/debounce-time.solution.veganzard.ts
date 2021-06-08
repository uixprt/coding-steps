import { createObservable } from "../../create-observable/solutions/create-observable.solution.starosaur";
import { Observable } from "../../types/observable";
import { MonoTypeOperatorFunction } from "../../types/mono-type-operator-function";

export function debounceTime<T>(
  dueTime: number
): (observable: Observable) => Observable {
  return (source$: Observable) => {
    return createObservable((subscriber) => {
      let timeoutId: number;
      const sub = source$.subscribe({
        next: (value) => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          timeoutId = setTimeout(() => {
            subscriber.next(value);
          }, dueTime);
        },
        error: (err: Error) => {
          subscriber.error(err);
        },
        complete: () => {
          subscriber.complete();
        },
      });

      return () => sub.unsubscribe;
    });
  };
}
