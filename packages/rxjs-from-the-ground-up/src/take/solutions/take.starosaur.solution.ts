import { createObservable } from "../../create-observable/solutions/create-observable.solution.starosaur";

export function take(amount: number) {
  return (source$) => {
    return createTakeObservable(source$, amount);
  };
}

function createTakeObservable(source$, amount: number) {
  return createObservable((subsriber) => {
    let counter = 0;

    const subscription = source$.subscribe({
      next: (value) => {
        counter += 1;

        if (counter > amount) {
          subsriber.complete();
          return;
        }

        subsriber.next(value);
      },
      error: (err) => subsriber.error(err),
      complete: () => subsriber.complete(),
    });

    return () => subscription.unsubsribe();
  });
}
