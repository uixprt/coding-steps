import { Observable } from "../../types/observable";
import { createObservable } from "../../create-observable/solutions/create-observable.solution.starosaur";

export function tap<T>(sideEffectFn: (incoming: T) => any) {
  return (source$: Observable) => {
    const newSource$ = createObservable((subscriber) => {
      const sourceSubscription = source$.subscribe({
        next: (val: T) => {
          sideEffectFn(val);
          subscriber.next(val);
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
