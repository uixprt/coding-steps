import { Subscriber } from "../../types/subscriber";
import { Subscription } from "../../types/subscription";
import { TeardownLogic } from "../../types/teardown-logic";
import { Observable } from "../../types/observable";

export function createObservable(
  onSubscribe: (subscriber: Subscriber) => TeardownLogic
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
