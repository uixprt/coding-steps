import { Observable } from "../../types/observable";
import { createObservable } from "../../create-observable/solutions/create-observable.solution.starosaur";

export function map<T>(transformationFn: (incoming: T) => any) {
  return (source$: Observable) => {
    const newSource$ = createObservable((subscriber) => {
      const sourceSubscription = source$.subscribe({
        next: (val: T) => {
          const newVal = transformationFn(val);
          subscriber.next(newVal);
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
