import { SchedulerLike } from "../../types/scheduler-like";
import { createObservable } from "../../create-observable/solutions/create-observable.solution.starosaur";
import { Observable } from "../../types/observable";

export function debounceTime(dueTime: number, scheduler: SchedulerLike) {
  return (source$: Observable) => {
    return createObservable((subscriber) => {
      let timeoutId: number;
      const sub = source$.subscribe({
        next: (value) => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          } else {
            timeoutId = setTimeout(() => {
              subscriber.next(value);
            }, dueTime);
          }
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
