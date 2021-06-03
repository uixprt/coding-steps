import { Subscriber } from "../../types/subscriber";

export function createSubject() {
  const subscribers = new Map();
  const subject = {
    next: (val) => {
      subscribers.forEach((subscriber) => {
        subscriber.next(val);
      });
    },
    complete: () => {
      subscribers.forEach((subscriber) => {
        subscriber.complete();
      });
    },
    error: (err) => {
      subscribers.forEach((subscriber) => {
        subscriber.error(err);
      });
    },
    subscribe: (subscriber: Subscriber) => {
      subscribers.set(subscriber, subscriber);

      return {
        unsubscribe: () => {
          subscribers.delete(subscriber);
        },
      };
    },
  };

  return subject;
}
