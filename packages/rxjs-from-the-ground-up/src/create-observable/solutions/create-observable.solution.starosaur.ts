import { Subscriber } from "../../types/subscriber";
import { Subscription } from "../../types/subscription";

export function createObservable(
  onSubscribe: (subscriber: Subscriber) => any
): Subscription {
  const observable = {
    subscribe: (next, error, complete) => {
      const subscriber = {
        next,
        error,
        complete,
        closed: false,
      };

      const cleanupFn = onSubscribe(subscriber) || (() => {});

      return {
        unsubscribe: () => {
          subscriber.closed = true;
          cleanupFn();
        },
      };
    },
  };

  return observable;
}
